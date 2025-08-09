import type { LoaderFunction } from '@remix-run/cloudflare';
import { LLMManager } from '~/lib/modules/llm/manager';
import { getApiKeysFromCookie } from '~/lib/api/cookies';
import { getServerEnvironment } from '~/lib/utils/env';
import { createScopedLogger } from '~/utils/logger';

const logger = createScopedLogger('api.check-env-key');

export const loader: LoaderFunction = async ({ context, request }) => {
  try {
    const url = new URL(request.url);
    const provider = url.searchParams.get('provider');

    if (!provider) {
      logger.warn('No provider specified in request');
      return Response.json({ isSet: false });
    }

    // Get merged server environment for cross-platform compatibility
    const serverEnv = getServerEnvironment(context);
    const llmManager = LLMManager.getInstance(serverEnv);
    const providerInstance = llmManager.getProvider(provider);

    if (!providerInstance || !providerInstance.config.apiTokenKey) {
      logger.warn(`Provider ${provider} not found or has no API token key configured`);
      return Response.json({ isSet: false });
    }

    const envVarName = providerInstance.config.apiTokenKey;

    // Get API keys from cookie
    const cookieHeader = request.headers.get('Cookie');
    const apiKeys = getApiKeysFromCookie(cookieHeader);

    /*
     * Check API key in order of precedence:
     * 1. Client-side API keys (from cookies)
     * 2. Server environment variables (Vercel: process.env, Cloudflare: context.cloudflare.env)
     * 3. LLMManager environment variables (from import.meta.env)
     */
    const isSet = !!(
      apiKeys?.[provider] ||
      process.env[envVarName] ||
      (context?.cloudflare?.env as Record<string, any>)?.[envVarName] ||
      llmManager.env[envVarName]
    );

    logger.debug(`Provider ${provider} API key check result: ${isSet}`);
    return Response.json({ isSet });

  } catch (error: unknown) {
    logger.error('Error checking environment API key:', error);

    // Always return a valid JSON response, even on errors
    return Response.json(
      {
        isSet: false,
        error: 'Failed to check API key',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
