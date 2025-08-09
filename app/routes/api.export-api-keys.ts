import type { LoaderFunction } from '@remix-run/cloudflare';
import { LLMManager } from '~/lib/modules/llm/manager';
import { getApiKeysFromCookie } from '~/lib/api/cookies';
import { getServerEnvironment } from '~/lib/utils/env';

export const loader: LoaderFunction = async ({ context, request }) => {
  try {
    // Get API keys from cookie
    const cookieHeader = request.headers.get('Cookie');
    const apiKeysFromCookie = getApiKeysFromCookie(cookieHeader);

    // Get merged server environment for cross-platform compatibility
    const serverEnv = getServerEnvironment(context);
    const llmManager = LLMManager.getInstance(serverEnv);

    // Get all provider instances to find their API token keys
    const providers = llmManager.getAllProviders();

    // Create a comprehensive API keys object
    const apiKeys: Record<string, string> = { ...apiKeysFromCookie };

    // For each provider, check all possible sources for API keys
    for (const provider of providers) {
      if (!provider.config.apiTokenKey) {
        continue;
      }

      const envVarName = provider.config.apiTokenKey;

      // Skip if we already have this provider's key from cookies
      if (apiKeys[provider.name]) {
        continue;
      }

      // Check environment variables in order of precedence
      const envValue =
        process.env[envVarName] ||
        (context?.cloudflare?.env as Record<string, any>)?.[envVarName] ||
        llmManager.env[envVarName];

      if (envValue) {
        apiKeys[provider.name] = envValue;
      }
    }

    return Response.json(apiKeys);

  } catch (error: unknown) {
    console.error('Error in export-api-keys API:', error);

    // Always return valid JSON, even on errors
    return Response.json(
      {
        error: 'Failed to export API keys',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
