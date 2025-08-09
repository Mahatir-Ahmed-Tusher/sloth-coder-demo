/**
 * Diagnostic route to debug environment variable access across different deployment platforms
 * This route helps identify issues with Remix runtime context on Vercel vs Cloudflare
 */

export async function loader({ context, request }: any) {
  try {
    // Log the runtime environment
    const runtime = typeof global !== 'undefined' ? 'node' : 'worker';
    const platform = process.env.VERCEL ? 'vercel' :
                    context?.cloudflare?.env ? 'cloudflare' : 'unknown';

    // Test different ways to access environment variables
    const envTests = {
      processEnv: {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL: process.env.VERCEL,
        OPENAI_API_KEY: process.env.OPENAI_API_KEY ? 'SET' : 'NOT_SET',
        ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY ? 'SET' : 'NOT_SET',
      },
      contextCloudflare: {
        exists: !!context?.cloudflare,
        envExists: !!context?.cloudflare?.env,
        keys: context?.cloudflare?.env ? Object.keys(context.cloudflare.env) : []
      },
      contextDirect: {
        keys: context ? Object.keys(context) : []
      }
    };

    const response = {
      success: true,
      timestamp: new Date().toISOString(),
      runtime,
      platform,
      envTests,
      userAgent: request.headers.get('User-Agent'),
      url: request.url
    };

    return new Response(JSON.stringify(response, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });

  } catch (error: any) {
    // Always return JSON, never HTML error pages
    const errorResponse = {
      success: false,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    };

    return new Response(JSON.stringify(errorResponse, null, 2), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
  }
}
