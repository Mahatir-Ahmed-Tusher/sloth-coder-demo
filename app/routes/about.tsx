import { json, type MetaFunction } from '@remix-run/cloudflare';
import { Header } from '~/components/header/Header';
import { Footer } from '~/components/ui/Footer';
import BackgroundRays from '~/components/ui/BackgroundRays';

export const meta: MetaFunction = () => {
  return [{ title: 'About Sloth Coder' }, { name: 'description', content: 'Learn about the team behind Sloth Coder' }];
};

export const loader = () => json({});

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-bolt-elements-background-depth-1">
      <BackgroundRays />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-bolt-elements-textPrimary mb-8">About Sloth Coder</h1>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-bolt-elements-textPrimary mb-4">Our Mission</h2>
            <p className="text-bolt-elements-textSecondary mb-4">
              At Sloth Coder, we believe in taking things slow but doing them right. Our mission is to provide
              developers with a powerful, intuitive coding environment that enhances productivity without sacrificing
              quality.
            </p>
            <p className="text-bolt-elements-textSecondary">
              We're committed to building tools that make coding more accessible, enjoyable, and efficient for
              developers of all skill levels.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-bolt-elements-textPrimary mb-6">Our Team</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Founder & CEO */}
              <div className="bg-bolt-elements-background-depth-2 p-6 rounded-lg border border-bolt-elements-borderColor">
                <div className="w-24 h-24 bg-bolt-elements-background-depth-3 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">👨‍💻</span>
                </div>
                <h3 className="text-xl font-semibold text-bolt-elements-textPrimary text-center">
                  Mahatir Ahmed Tusher
                </h3>
                <p className="text-bolt-elements-textSecondary text-center mb-2">Founder & CEO</p>
                <p className="text-bolt-elements-textSecondary text-center text-sm">
                  <a
                    href="mailto:mahatirtusher@gmail.com"
                    className="hover:text-bolt-elements-textPrimary transition-colors"
                  >
                    mahatirtusher@gmail.com
                  </a>
                </p>
              </div>

              {/* Chief Technology Strategist */}
              <div className="bg-bolt-elements-background-depth-2 p-6 rounded-lg border border-bolt-elements-borderColor">
                <div className="w-24 h-24 bg-bolt-elements-background-depth-3 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">🧠</span>
                </div>
                <h3 className="text-xl font-semibold text-bolt-elements-textPrimary text-center">
                  Saket Choudary Kongara
                </h3>
                <p className="text-bolt-elements-textSecondary text-center mb-2">Chief Technology Strategist</p>
                <p className="text-bolt-elements-textSecondary text-center text-sm">
                  Driving innovation and technical direction
                </p>
              </div>

              {/* Lead Product Innovator */}
              <div className="bg-bolt-elements-background-depth-2 p-6 rounded-lg border border-bolt-elements-borderColor">
                <div className="w-24 h-24 bg-bolt-elements-background-depth-3 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">💡</span>
                </div>
                <h3 className="text-xl font-semibold text-bolt-elements-textPrimary text-center">Sagar Chandra Dey</h3>
                <p className="text-bolt-elements-textSecondary text-center mb-2">Lead Product Innovator</p>
                <p className="text-bolt-elements-textSecondary text-center text-sm">
                  Crafting exceptional user experiences
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-bolt-elements-textPrimary mb-4">Our Story</h2>
            <p className="text-bolt-elements-textSecondary mb-4">
              Sloth Coder was born from a simple idea: coding tools should be powerful yet approachable. Founded in
              2023, our team set out to create an IDE that combines the best aspects of modern development environments
              with an intuitive interface that doesn't get in your way.
            </p>
            <p className="text-bolt-elements-textSecondary">
              Today, we're proud to offer a platform that helps developers around the world build better software,
              faster and with less friction. But like the sloth, we believe in sustainable progress—moving deliberately
              and thoughtfully as we continue to evolve our product.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-bolt-elements-textPrimary mb-4">Join Our Journey</h2>
            <p className="text-bolt-elements-textSecondary mb-4">
              We're always looking for passionate individuals to join our team. If you're excited about creating tools
              that empower developers, we'd love to hear from you.
            </p>
            <div className="flex justify-center">
              <a
                href="#"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
              >
                View Open Positions
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
