import { LLMManager } from '~/lib/modules/llm/manager';
import { getApiKeysFromCookie } from '~/lib/api/cookies';
import { createScopedLogger } from '~/utils/logger';
import {
  createUniversalRoute,
  createUniversalResponse,
  getUniversalEnvironment,
  type UniversalLoaderArgs,
} from '~/lib/utils/universal-remix';

const logger = createScopedLogger('api.check-env-key');

export const loader = createUniversalRoute(async ({ context, request }: UniversalLoaderArgs) => {
  const url = new URL(request.url);
  const provider = url.searchParams.get('provider');

  if (!provider) {
    logger.warn('No provider specified in request');
    return createUniversalResponse({ isSet: false });
  }

  // Get merged server environment for cross-platform compatibility
  const serverEnv = getUniversalEnvironment(context);
  const llmManager = LLMManager.getInstance(serverEnv);
  const providerInstance = llmManager.getProvider(provider);

  if (!providerInstance || !providerInstance.config.apiTokenKey) {
    logger.warn(`Provider ${provider} not found or has no API token key configured`);
    return createUniversalResponse({ isSet: false });
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
  const isSet = !!(apiKeys?.[provider] || serverEnv[envVarName] || llmManager.env[envVarName]);

  logger.debug(`Provider ${provider} API key check result: ${isSet}`);

  return createUniversalResponse({ isSet });
});
