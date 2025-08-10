import { json, type MetaFunction } from '@remix-run/cloudflare';
import { Header } from '~/components/header/Header';
import { Footer } from '~/components/ui/Footer';
import BackgroundRays from '~/components/ui/BackgroundRays';

export const meta: MetaFunction = () => {
  return [
    { title: 'Sloth Coder APIs' },
    { name: 'description', content: 'Explore our API offerings and subscription plans' },
  ];
};

export const loader = () => json({});

export default function Apis() {
  return (
    <div className="flex flex-col min-h-screen bg-bolt-elements-background-depth-1">
      <BackgroundRays />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-bolt-elements-textPrimary mb-8">Sloth Coder APIs</h1>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-bolt-elements-textPrimary mb-4">API Overview</h2>
            <p className="text-bolt-elements-textSecondary mb-4">
              Sloth Coder provides powerful APIs that enable developers to integrate advanced AI-powered code generation
              capabilities into their own applications and workflows. Our APIs are designed to be easy to use, reliable,
              and highly performant.
            </p>
            <p className="text-bolt-elements-textSecondary">
              Whether you're building a development tool, creating an educational platform, or enhancing your internal
              workflows, our APIs can help you deliver exceptional coding experiences to your users.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-bolt-elements-textPrimary mb-8 text-center">
              Subscription Plans
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Free Plan */}
              <div className="bg-bolt-elements-background-depth-2 rounded-lg border border-bolt-elements-borderColor overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-bolt-elements-textPrimary mb-2">Free</h3>
                  <p className="text-3xl font-bold text-bolt-elements-textPrimary mb-4">
                    $0 <span className="text-sm font-normal text-bolt-elements-textSecondary">forever</span>
                  </p>
                  <p className="text-bolt-elements-textSecondary mb-6">Perfect for beginners and hobbyists</p>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-bolt-elements-textSecondary">Unlimited prompts</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-bolt-elements-textSecondary">Gemini API access</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-bolt-elements-textSecondary">Mistral API access</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-bolt-elements-textSecondary">Together API access</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-bolt-elements-textSecondary">Basic code generation</span>
                    </li>
                  </ul>

                  <button className="w-full py-2 px-4 bg-bolt-elements-background-depth-3 text-bolt-elements-textPrimary rounded border border-bolt-elements-borderColor hover:bg-bolt-elements-background-depth-4 transition-colors duration-200">
                    Get Started
                  </button>
                </div>
              </div>

              {/* Pro Plan - Highlighted */}
              <div className="bg-bolt-elements-background-depth-2 rounded-lg border-2 border-purple-500 overflow-hidden relative">
                <div className="absolute top-0 right-0 bg-purple-500 text-white px-4 py-1 text-sm font-medium">
                  Most Popular
                </div>
                <div className="p-6 pt-8">
                  <h3 className="text-xl font-semibold text-bolt-elements-textPrimary mb-2">Pro</h3>
                  <div className="flex items-baseline mb-4">
                    <p className="text-3xl font-bold text-bolt-elements-textPrimary">$8</p>
                    <span className="text-sm ml-1 text-bolt-elements-textSecondary">/ month</span>
                    <span className="text-sm ml-2 text-bolt-elements-textSecondary">(1000 BDT)</span>
                  </div>
                  <p className="text-bolt-elements-textSecondary mb-6">For professional developers</p>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-bolt-elements-textSecondary">200,000 tokens (~50 prompts)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-bolt-elements-textSecondary">10-digit Sloth API key</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-bolt-elements-textSecondary">Anthropic API (Claude series)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-bolt-elements-textSecondary">OpenAI GPT-5 API</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-bolt-elements-textSecondary">Multi-page code generation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-bolt-elements-textSecondary">All Free plan features</span>
                    </li>
                  </ul>

                  <button className="w-full py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors duration-200">
                    Subscribe Now
                  </button>
                </div>
              </div>

              {/* Max Plan */}
              <div className="bg-bolt-elements-background-depth-2 rounded-lg border border-bolt-elements-borderColor overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-bolt-elements-textPrimary mb-2">Max</h3>
                  <div className="flex items-baseline mb-4">
                    <p className="text-3xl font-bold text-bolt-elements-textPrimary">$24</p>
                    <span className="text-sm ml-1 text-bolt-elements-textSecondary">/ month</span>
                  </div>
                  <p className="text-bolt-elements-textSecondary mb-6">For startups and production use</p>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-bolt-elements-textSecondary">1,000,000 tokens (~150 prompts)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-bolt-elements-textSecondary">15-digit Sloth API key</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-bolt-elements-textSecondary">Ultra-fast code generation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-bolt-elements-textSecondary">Exclusive premium APIs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-bolt-elements-textSecondary">High-accuracy generation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-bolt-elements-textSecondary">All Pro plan features</span>
                    </li>
                  </ul>

                  <button className="w-full py-2 px-4 bg-bolt-elements-background-depth-3 text-bolt-elements-textPrimary rounded border border-bolt-elements-borderColor hover:bg-bolt-elements-background-depth-4 transition-colors duration-200">
                    Upgrade to Max
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-bolt-elements-textPrimary mb-6">How It Works</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-bolt-elements-background-depth-2 p-6 rounded-lg border border-bolt-elements-borderColor">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                  <span className="text-purple-600 dark:text-purple-300 text-xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold text-bolt-elements-textPrimary mb-2">Subscribe</h3>
                <p className="text-bolt-elements-textSecondary">
                  Choose the plan that fits your needs and complete the subscription process.
                </p>
              </div>

              <div className="bg-bolt-elements-background-depth-2 p-6 rounded-lg border border-bolt-elements-borderColor">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                  <span className="text-purple-600 dark:text-purple-300 text-xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold text-bolt-elements-textPrimary mb-2">Get Your API Key</h3>
                <p className="text-bolt-elements-textSecondary">
                  Receive your Sloth API key, which will be verified against our secure JSON records.
                </p>
              </div>

              <div className="bg-bolt-elements-background-depth-2 p-6 rounded-lg border border-bolt-elements-borderColor">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                  <span className="text-purple-600 dark:text-purple-300 text-xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold text-bolt-elements-textPrimary mb-2">Start Using</h3>
                <p className="text-bolt-elements-textSecondary">
                  Integrate the API into your applications and start generating high-quality code.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-bolt-elements-textPrimary mb-6">Payment Methods</h2>

            <div className="bg-bolt-elements-background-depth-2 p-6 rounded-lg border border-bolt-elements-borderColor">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center p-4 bg-bolt-elements-background-depth-3 rounded-lg">
                  <span className="text-2xl mb-2">💳</span>
                  <span className="text-sm text-bolt-elements-textSecondary">Visa</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-bolt-elements-background-depth-3 rounded-lg">
                  <span className="text-2xl mb-2">💳</span>
                  <span className="text-sm text-bolt-elements-textSecondary">MasterCard</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-bolt-elements-background-depth-3 rounded-lg">
                  <span className="text-2xl mb-2">💳</span>
                  <span className="text-sm text-bolt-elements-textSecondary">American Express</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-bolt-elements-background-depth-3 rounded-lg">
                  <span className="text-2xl mb-2">🔄</span>
                  <span className="text-sm text-bolt-elements-textSecondary">Stripe</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-bolt-elements-background-depth-3 rounded-lg">
                  <span className="text-2xl mb-2">📱</span>
                  <span className="text-sm text-bolt-elements-textSecondary">bKash</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-bolt-elements-background-depth-3 rounded-lg">
                  <span className="text-2xl mb-2">📱</span>
                  <span className="text-sm text-bolt-elements-textSecondary">UPI</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-bolt-elements-background-depth-3 rounded-lg">
                  <span className="text-2xl mb-2">🏦</span>
                  <span className="text-sm text-bolt-elements-textSecondary">Bank Transfer</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-bolt-elements-background-depth-3 rounded-lg">
                  <span className="text-2xl mb-2">💰</span>
                  <span className="text-sm text-bolt-elements-textSecondary">Other Methods</span>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-bolt-elements-textPrimary mb-4">Need Help?</h2>
            <p className="text-bolt-elements-textSecondary mb-6">
              Our team is ready to assist you with any questions about our API offerings or subscription plans.
            </p>
            <div className="flex justify-center">
              <a
                href="#"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
              >
                Contact Support
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
