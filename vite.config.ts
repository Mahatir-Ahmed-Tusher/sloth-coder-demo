import { vitePlugin as remixVitePlugin } from '@remix-run/dev';
import UnoCSS from 'unocss/vite';
import { defineConfig, type ViteDevServer } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { optimizeCssModules } from 'vite-plugin-optimize-css-modules';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig((config) => {
  return {
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),

      // Expose API key environment variables to client-side code
      'import.meta.env.OPENAI_API_KEY': JSON.stringify(process.env.OPENAI_API_KEY),
      'import.meta.env.ANTHROPIC_API_KEY': JSON.stringify(process.env.ANTHROPIC_API_KEY),
      'import.meta.env.GOOGLE_GENERATIVE_AI_API_KEY': JSON.stringify(process.env.GOOGLE_GENERATIVE_AI_API_KEY),
      'import.meta.env.COHERE_API_KEY': JSON.stringify(process.env.COHERE_API_KEY),
      'import.meta.env.MISTRAL_API_KEY': JSON.stringify(process.env.MISTRAL_API_KEY),
      'import.meta.env.GROQ_API_KEY': JSON.stringify(process.env.GROQ_API_KEY),
      'import.meta.env.PERPLEXITY_API_KEY': JSON.stringify(process.env.PERPLEXITY_API_KEY),
      'import.meta.env.XAI_API_KEY': JSON.stringify(process.env.XAI_API_KEY),
      'import.meta.env.OPEN_ROUTER_API_KEY': JSON.stringify(process.env.OPEN_ROUTER_API_KEY),
      'import.meta.env.HuggingFace_API_KEY': JSON.stringify(process.env.HuggingFace_API_KEY),
      'import.meta.env.HYPERBOLIC_API_KEY': JSON.stringify(process.env.HYPERBOLIC_API_KEY),
      'import.meta.env.GITHUB_API_KEY': JSON.stringify(process.env.GITHUB_API_KEY),
      'import.meta.env.DEEPSEEK_API_KEY': JSON.stringify(process.env.DEEPSEEK_API_KEY),
      'import.meta.env.AWS_BEDROCK_CONFIG': JSON.stringify(process.env.AWS_BEDROCK_CONFIG),
      'import.meta.env.TOGETHER_API_KEY': JSON.stringify(process.env.TOGETHER_API_KEY),
      'import.meta.env.OPENAI_LIKE_API_KEY': JSON.stringify(process.env.OPENAI_LIKE_API_KEY),
      'import.meta.env.OPENAI_LIKE_API_BASE_URL': JSON.stringify(process.env.OPENAI_LIKE_API_BASE_URL),
      'import.meta.env.OLLAMA_API_BASE_URL': JSON.stringify(process.env.OLLAMA_API_BASE_URL),
      'import.meta.env.LMSTUDIO_API_BASE_URL': JSON.stringify(process.env.LMSTUDIO_API_BASE_URL),
      'import.meta.env.TOGETHER_API_BASE_URL': JSON.stringify(process.env.TOGETHER_API_BASE_URL),
    },
    build: {
      target: 'esnext',
      minify: 'terser',
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
            return;
          }
          warn(warning);
        },
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('@codemirror/')) {
                return 'codemirror';
              }
              if (id.includes('@radix-ui/')) {
                return 'ui';
              }
              if (id.includes('react') || id.includes('react-dom')) {
                return 'vendor';
              }
            }
          },
        },
      },
    },
    plugins: [
      nodePolyfills({
        include: ['buffer', 'process', 'util', 'stream', 'path'],
        globals: {
          Buffer: true,
          process: true,
          global: true,
        },
        protocolImports: true,
        exclude: ['child_process', 'fs'],
      }),
      {
        name: 'buffer-polyfill',
        transform(code, id) {
          if (id.includes('env.mjs')) {
            return {
              code: `import { Buffer } from 'buffer';\n${code}`,
              map: null,
            };
          }

          return null;
        },
      },

      remixVitePlugin({
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true,
          v3_lazyRouteDiscovery: true,
        },
      }),
      UnoCSS(),
      tsconfigPaths(),
      chrome129IssuePlugin(),
      config.mode === 'production' && optimizeCssModules({ apply: 'build' }),
    ],
    envPrefix: [
      'VITE_',
      'OPENAI_API_KEY',
      'ANTHROPIC_API_KEY',
      'GOOGLE_GENERATIVE_AI_API_KEY',
      'COHERE_API_KEY',
      'MISTRAL_API_KEY',
      'GROQ_API_KEY',
      'PERPLEXITY_API_KEY',
      'XAI_API_KEY',
      'OPEN_ROUTER_API_KEY',
      'HuggingFace_API_KEY',
      'HYPERBOLIC_API_KEY',
      'GITHUB_API_KEY',
      'DEEPSEEK_API_KEY',
      'AWS_BEDROCK_CONFIG',
      'TOGETHER_API_KEY',
      'OPENAI_LIKE_API_KEY',
      'OPENAI_LIKE_API_BASE_URL',
      'OLLAMA_API_BASE_URL',
      'LMSTUDIO_API_BASE_URL',
      'TOGETHER_API_BASE_URL',
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  };
});

function chrome129IssuePlugin() {
  return {
    name: 'chrome129IssuePlugin',
    configureServer(server: ViteDevServer) {
      server.middlewares.use((req, res, next) => {
        const raw = req.headers['user-agent']?.match(/Chrom(e|ium)\/([0-9]+)\./);

        if (raw) {
          const version = parseInt(raw[2], 10);

          if (version === 129) {
            res.setHeader('content-type', 'text/html');
            res.end(
              '<body><h1>Please use Chrome Canary for testing.</h1><p>Chrome 129 has an issue with JavaScript modules & Vite local development, see <a href="https://github.com/stackblitz/bolt.new/issues/86#issuecomment-2395519258">for more information.</a></p><p><b>Note:</b> This only impacts <u>local development</u>. `pnpm run build` and `pnpm run start` will work fine in this browser.</p></body>',
            );

            return;
          }
        }

        next();
      });
    },
  };
}
