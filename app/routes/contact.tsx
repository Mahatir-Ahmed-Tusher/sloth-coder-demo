import { json, type MetaFunction } from '@remix-run/cloudflare';
import { Header } from '~/components/header/Header';
import { Footer } from '~/components/ui/Footer';
import BackgroundRays from '~/components/ui/BackgroundRays';

export const meta: MetaFunction = () => {
  return [
    { title: 'Contact Us - Sloth Coder' },
    { name: 'description', content: 'Get in touch with the Sloth Coder team' },
  ];
};

export const loader = () => json({});

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen bg-bolt-elements-background-depth-1">
      <BackgroundRays />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-bolt-elements-textPrimary mb-8">Contact Us</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <section>
              <h2 className="text-2xl font-semibold text-bolt-elements-textPrimary mb-6">Get In Touch</h2>
              <p className="text-bolt-elements-textSecondary mb-6">
                Have questions, feedback, or need assistance? We're here to help! Fill out the form and our team will
                get back to you as soon as possible.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 dark:text-purple-300">📧</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-bolt-elements-textPrimary">Email</h3>
                    <p className="text-bolt-elements-textSecondary">support@slothcoder.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 dark:text-purple-300">🌐</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-bolt-elements-textPrimary">Social Media</h3>
                    <div className="flex space-x-4 mt-2">
                      <a
                        href="#"
                        className="text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors"
                      >
                        Twitter
                      </a>
                      <a
                        href="#"
                        className="text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors"
                      >
                        GitHub
                      </a>
                      <a
                        href="#"
                        className="text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors"
                      >
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 dark:text-purple-300">📍</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-bolt-elements-textPrimary">Location</h3>
                    <p className="text-bolt-elements-textSecondary">Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <form className="space-y-6 bg-bolt-elements-background-depth-2 p-6 rounded-lg border border-bolt-elements-borderColor">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-bolt-elements-textPrimary mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 rounded-md bg-bolt-elements-background-depth-3 border border-bolt-elements-borderColor text-bolt-elements-textPrimary focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-bolt-elements-textPrimary mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 rounded-md bg-bolt-elements-background-depth-3 border border-bolt-elements-borderColor text-bolt-elements-textPrimary focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-bolt-elements-textPrimary mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 rounded-md bg-bolt-elements-background-depth-3 border border-bolt-elements-borderColor text-bolt-elements-textPrimary focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-bolt-elements-textPrimary mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 rounded-md bg-bolt-elements-background-depth-3 border border-bolt-elements-borderColor text-bolt-elements-textPrimary focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                    placeholder="Your message..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors duration-200"
                >
                  Send Message
                </button>
              </form>
            </section>
          </div>

          <section className="mt-16">
            <h2 className="text-2xl font-semibold text-bolt-elements-textPrimary mb-6">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="bg-bolt-elements-background-depth-2 p-6 rounded-lg border border-bolt-elements-borderColor">
                <h3 className="text-lg font-medium text-bolt-elements-textPrimary mb-2">
                  How do I get started with Sloth Coder?
                </h3>
                <p className="text-bolt-elements-textSecondary">
                  Simply visit our homepage and click on the "Get Started" button. You'll be guided through the setup
                  process.
                </p>
              </div>

              <div className="bg-bolt-elements-background-depth-2 p-6 rounded-lg border border-bolt-elements-borderColor">
                <h3 className="text-lg font-medium text-bolt-elements-textPrimary mb-2">
                  Is there a free trial available?
                </h3>
                <p className="text-bolt-elements-textSecondary">
                  Yes! We offer a free plan with unlimited prompts powered by Gemini API, Mistral API, or Together API.
                </p>
              </div>

              <div className="bg-bolt-elements-background-depth-2 p-6 rounded-lg border border-bolt-elements-borderColor">
                <h3 className="text-lg font-medium text-bolt-elements-textPrimary mb-2">
                  How do I upgrade my subscription?
                </h3>
                <p className="text-bolt-elements-textSecondary">
                  Visit our APIs page to view our subscription plans and click on the "Subscribe Now" or "Upgrade"
                  button.
                </p>
              </div>

              <div className="bg-bolt-elements-background-depth-2 p-6 rounded-lg border border-bolt-elements-borderColor">
                <h3 className="text-lg font-medium text-bolt-elements-textPrimary mb-2">
                  How can I get technical support?
                </h3>
                <p className="text-bolt-elements-textSecondary">
                  You can reach our support team by filling out the contact form on this page or by emailing
                  support@slothcoder.com.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
