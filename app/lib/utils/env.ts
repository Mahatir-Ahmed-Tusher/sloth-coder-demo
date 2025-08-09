/**
 * Merges environment variables from different sources with proper precedence for cross-platform deployment.
 *
 * Precedence order:
 * 1. process.env (works on Vercel, Node.js environments)
 * 2. context.cloudflare.env (works on Cloudflare Workers/Pages)
 * 3. import.meta.env (build-time environment variables)
 *
 * @param context - The Remix context object (may contain cloudflare.env)
 * @returns Merged environment variables object compatible with Env interface
 */
export function getServerEnvironment(context?: any): any {
  const cloudflareEnv = context?.cloudflare?.env || {};

  // Merge environments with proper precedence
  // process.env takes priority for Vercel compatibility
  const mergedEnv = {
    ...cloudflareEnv,
    ...process.env,
  };

  // Filter out undefined values and convert to strings
  const cleanEnv: Record<string, any> = {};

  for (const [key, value] of Object.entries(mergedEnv)) {
    if (value !== undefined && value !== null) {
      cleanEnv[key] = String(value);
    }
  }

  return cleanEnv;
}
