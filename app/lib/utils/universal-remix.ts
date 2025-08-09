/**
 * Universal Remix utilities that work across different deployment platforms
 * This module provides platform-agnostic way to handle Remix routes
 */

// Universal types that work on both Node.js and Cloudflare Workers
export interface UniversalRequest extends Request {}

export interface UniversalContext {
  cloudflare?: {
    env?: Record<string, any>;
  };
  [key: string]: any;
}

export interface UniversalActionArgs {
  request: UniversalRequest;
  context?: UniversalContext;
  params?: Record<string, string>;
}

export interface UniversalLoaderArgs {
  request: UniversalRequest;
  context?: UniversalContext;
  params?: Record<string, string>;
}

/**
 * Creates a universal JSON response that works on all platforms
 */
export function createUniversalResponse(
  data: any,
  init?: {
    status?: number;
    statusText?: string;
    headers?: Record<string, string>;
  }
) {
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    ...init?.headers
  };

  return new Response(JSON.stringify(data), {
    status: init?.status || 200,
    statusText: init?.statusText,
    headers
  });
}

/**
 * Universal error response handler that always returns JSON
 */
export function createUniversalErrorResponse(
  error: unknown,
  context?: string
) {
  const errorData = {
    error: true,
    message: error instanceof Error ? error.message : 'Unknown error',
    context: context || 'unknown',
    timestamp: new Date().toISOString(),
    ...(error instanceof Error && { stack: error.stack })
  };

  return createUniversalResponse(errorData, {
    status: 500,
    statusText: 'Internal Server Error'
  });
}

/**
 * Universal environment variable access that works on all platforms
 */
export function getUniversalEnvironment(context?: UniversalContext): Record<string, string> {
  const cloudflareEnv = context?.cloudflare?.env || {};

  // Merge environments with proper precedence
  // process.env takes priority for Node.js platforms (Vercel)
  const mergedEnv = {
    ...cloudflareEnv,
    ...process.env,
  };

  // Filter out undefined values and convert to strings
  const cleanEnv: Record<string, string> = {};

  for (const [key, value] of Object.entries(mergedEnv)) {
    if (value !== undefined && value !== null) {
      cleanEnv[key] = String(value);
    }
  }

  return cleanEnv;
}

/**
 * Universal route wrapper that handles errors consistently across platforms
 */
export function createUniversalRoute<T = any>(
  handler: (args: UniversalLoaderArgs | UniversalActionArgs) => Promise<Response | T>
) {
  return async (args: any): Promise<Response> => {
    try {
      const result = await handler(args);

      // If result is already a Response, return it
      if (result instanceof Response) {
        return result;
      }

      // Otherwise, wrap it in a universal response
      return createUniversalResponse(result);

    } catch (error) {
      console.error('Universal route error:', error);
      return createUniversalErrorResponse(error, 'route_handler');
    }
  };
}
