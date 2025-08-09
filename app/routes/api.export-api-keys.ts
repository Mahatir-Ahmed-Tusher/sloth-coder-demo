import { LLMManager } from '~/lib/modules/llm/manager';
import { getApiKeysFromCookie } from '~/lib/api/cookies';
import {
  createUniversalRoute,
  createUniversalResponse,
  getUniversalEnvironment,
  type UniversalLoaderArgs,
} from '~/lib/utils/universal-remix';

export const loader = createUniversalRoute(async ({ context, request }: UniversalLoaderArgs) => {
  // Get API keys from cookie
  const cookieHeader = request.headers.get('Cookie');
  const apiKeysFromCookie = getApiKeysFromCookie(cookieHeader);

  // Get merged server environment for cross-platform compatibility
  const serverEnv = getUniversalEnvironment(context);
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

    // Check environment variables (serverEnv already has the right precedence)
    const envValue = serverEnv[envVarName] || llmManager.env[envVarName];

    if (envValue) {
      apiKeys[provider.name] = envValue;
    }
  }

  return createUniversalResponse(apiKeys);
});
