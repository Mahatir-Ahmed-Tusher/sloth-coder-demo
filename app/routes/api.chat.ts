import { type UniversalActionArgs } from '~/lib/utils/universal-remix';
import { type FileMap } from '~/lib/.server/llm/constants';
import { streamText, type Messages, type StreamingOptions } from '~/lib/.server/llm/stream-text';
import type { IProviderSetting } from '~/types/model';
import { createScopedLogger } from '~/utils/logger';
import { getFilePaths, selectContext } from '~/lib/.server/llm/select-context';
import { createSummary } from '~/lib/.server/llm/create-summary';
import type { DesignScheme } from '~/types/design-scheme';
import { MCPService } from '~/lib/services/mcpService';
import { getUniversalEnvironment } from '~/lib/utils/universal-remix';
import { LLMManager } from '~/lib/modules/llm/manager';

export async function action(args: UniversalActionArgs) {
  return chatAction(args);
}

const logger = createScopedLogger('api.chat');

function parseCookies(cookieHeader: string): Record<string, string> {
  const cookies: Record<string, string> = {};

  const items = cookieHeader.split(';').map((cookie) => cookie.trim());

  items.forEach((item) => {
    const [name, ...rest] = item.split('=');

    if (name && rest) {
      const decodedName = decodeURIComponent(name.trim());
      const decodedValue = decodeURIComponent(rest.join('=').trim());
      cookies[decodedName] = decodedValue;
    }
  });

  return cookies;
}

async function chatAction({ context, request }: UniversalActionArgs) {
  const requestData = await request.json<{
    messages: Messages;
    files: any;
    promptId?: string;
    contextOptimization: boolean;
    chatMode: 'discuss' | 'build';
    designScheme?: DesignScheme;
    supabase?: {
      isConnected: boolean;
      hasSelectedProject: boolean;
      credentials?: {
        anonKey?: string;
        supabaseUrl?: string;
      };
    };
    maxLLMSteps: number;
  }>();

  const { messages, files, promptId, contextOptimization, supabase, designScheme, maxLLMSteps } = requestData;
  let { chatMode } = requestData;

  // Get merged server environment for cross-platform compatibility
  const serverEnv = getUniversalEnvironment(context);

  // Add comprehensive debugging for environment variables
  logger.debug('Server environment keys:', Object.keys(serverEnv));
  logger.debug('Has OPENAI_API_KEY:', !!serverEnv.OPENAI_API_KEY);
  logger.debug('Has ANTHROPIC_API_KEY:', !!serverEnv.ANTHROPIC_API_KEY);
  logger.debug(
    'Process env keys:',
    Object.keys(process.env).filter((k) => k.includes('API_KEY')),
  );

  // Verify LLMManager initialization
  const llmManager = LLMManager.getInstance(serverEnv);
  logger.debug('LLMManager initialized:', !!llmManager);
  logger.debug('LLMManager providers count:', llmManager.getAllProviders().length);

  const cookieHeader = request.headers.get('Cookie');
  const apiKeys = JSON.parse(parseCookies(cookieHeader || '').apiKeys || '{}');
  const providerSettings: Record<string, IProviderSetting> = JSON.parse(
    parseCookies(cookieHeader || '').providers || '{}',
  );

  try {
    const mcpService = MCPService.getInstance();
    const totalMessageContent = messages.reduce((acc, message) => acc + message.content, '');
    logger.debug(`Total message length: ${totalMessageContent.split(' ').length}, words`);

    /*
     * Process MCP tool invocations with a simple pass-through for now
     * TODO: Re-implement MCP tool processing compatible with useChat
     */
    const processedMessages = messages; // Simplified for compatibility

    const filePaths = getFilePaths(files || {});
    let filteredFiles: FileMap | undefined = undefined;
    let summary: string | undefined = undefined;

    // Simplified context processing for compatibility
    if (filePaths.length > 0 && contextOptimization) {
      logger.debug('Processing context files for chat...');

      // Create a summary of the chat
      summary = await createSummary({
        messages: [...processedMessages],
        env: serverEnv as any,
        apiKeys,
        providerSettings,
        promptId,
        contextOptimization,
      });

      // Select context files
      filteredFiles = await selectContext({
        messages: [...processedMessages],
        env: serverEnv as any,
        apiKeys,
        files,
        providerSettings,
        promptId,
        contextOptimization,
        summary,
      });

      if (filteredFiles) {
        logger.debug(`files in context : ${JSON.stringify(Object.keys(filteredFiles))}`);
      }
    }

    const options: StreamingOptions = {
      supabaseConnection: supabase,
      toolChoice: 'auto',
      tools: mcpService.toolsWithoutExecute,
      maxSteps: maxLLMSteps,
      onStepFinish: ({ toolCalls }) => {
        // Log tool calls for debugging
        logger.debug(
          'Tool calls in chat:',
          toolCalls.map((tc) => tc.toolName),
        );
      },
    };

    // CRITICAL: Check and correct chatMode FIRST before any streamText calls
    logger.info(
      `Original chat mode received: ${chatMode} - Using ${chatMode === 'build' ? 'build/artifact' : 'discuss/consultation'} prompt`,
    );

    if (chatMode !== 'build') {
      logger.warn('Chat mode is not "build" - this will use discuss prompt which does not generate artifacts!');
      logger.info('FORCING chatMode to "build" to ensure artifact generation works');

      // Temporarily force to build mode to fix the parsing issue
      chatMode = 'build';
    }

    logger.debug('About to call streamText with:', {
      messagesCount: processedMessages.length,
      hasServerEnv: !!serverEnv,
      serverEnvKeys: Object.keys(serverEnv || {}).filter((k) => k.includes('API_KEY')),
      apiKeysFromCookie: Object.keys(apiKeys || {}),
      hasOptions: !!options,
      hasFiles: !!files,
      hasProviderSettings: !!providerSettings,
      promptId,
      contextOptimization,
      hasFilteredFiles: !!filteredFiles,
      chatMode, // This should now be 'build' for artifact generation
      hasDesignScheme: !!designScheme,
      hasSummary: !!summary,
    });

    // FINAL verification that chatMode is 'build'
    logger.info(`FINAL: About to call streamText with corrected chatMode: ${chatMode}`);

    if (chatMode !== 'build') {
      logger.error('CRITICAL: chatMode is still not "build" when calling streamText!');
    }

    const result = await streamText({
      messages: [...processedMessages],
      env: serverEnv as any,
      options,
      apiKeys,
      files,
      providerSettings,
      promptId,
      contextOptimization,
      contextFiles: filteredFiles,
      chatMode, // This now uses the corrected chatMode value
      designScheme,
      summary,
      messageSliceId: 0,
    });

    logger.debug('streamText result created successfully:', {
      hasResult: !!result,
      hasFullStream: !!result?.fullStream,
      hasTextStream: !!result?.textStream,
      textStreamType: typeof result?.textStream,
      isReadableStream: result?.textStream instanceof ReadableStream,
    });

    // Handle streaming errors in a non-blocking way
    (async () => {
      try {
        for await (const part of result.fullStream) {
          if (part.type === 'error') {
            const error: any = part.error;
            logger.error('Streaming error:', error);
            break;
          }
        }
      } catch (error) {
        logger.error('Error processing stream:', error);
      }
    })();

    /*
     * Use toTextStreamResponse() for proper AI SDK compatibility
     * This ensures the correct format for useChat with streamProtocol: 'text'
     */
    logger.debug('Returning textStreamResponse for useChat text protocol compatibility');

    return result.toTextStreamResponse({
      headers: {
        'Content-Type': 'text/event-stream',
        Connection: 'keep-alive',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error: any) {
    logger.error('Chat API error:', error);
    logger.error('Error stack:', error?.stack);

    // Log additional debugging information
    logger.error('Server environment keys:', Object.keys(serverEnv));
    logger.error('Has LLM Manager instance:', !!LLMManager);

    if (error.message?.includes('API key')) {
      throw new Response('Invalid or missing API key', {
        status: 401,
        statusText: 'Unauthorized',
      });
    }

    throw new Response(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
}
