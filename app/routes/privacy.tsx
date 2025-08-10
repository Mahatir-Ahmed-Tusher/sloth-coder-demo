import { json, type MetaFunction } from '@remix-run/cloudflare';
import { Header } from '~/components/header/Header';
import { Footer } from '~/components/ui/Footer';
import BackgroundRays from '~/components/ui/BackgroundRays';

export const meta: MetaFunction = () => {
  return [
    { title: 'Privacy Policy - Sloth Coder' },
    { name: 'description', content: 'Privacy Policy for Sloth Coder' },
  ];
};

export const loader = () => json({});

export default function Privacy() {
  return (
    <div className="flex flex-col min-h-screen bg-bolt-elements-background-depth-1">
      <BackgroundRays />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-bolt-elements-textPrimary mb-8">Privacy Policy</h1>

          <section className="mb-8">
            <p className="text-bolt-elements-textSecondary mb-4">
              At Sloth Coder, we take your privacy seriously. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you use our service.
            </p>
            <p className="text-bolt-elements-textSecondary">
              Please read this policy carefully. If you do not agree with the terms of this privacy policy, please do
              not access the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-bolt-elements-textPrimary mb-4">1. Information We Collect</h2>
            <p className="text-bolt-elements-textSecondary mb-4">
              We may collect several types of information from and about users of our service, including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-bolt-elements-textSecondary space-y-2">
              <li>Personal information (such as name, email address, and payment information)</li>
              <li>Usage data (such as how you interact with our service)</li>
              <li>Code and project data that you create or upload to our platform</li>
              <li>Device and connection information</li>
            </ul>
            <p className="text-bolt-elements-textSecondary">
              We collect this information to provide, maintain, and improve our service, as well as to communicate with
              you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-bolt-elements-textPrimary mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-bolt-elements-textSecondary mb-4">
              We may use the information we collect from you for various purposes, including to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-bolt-elements-textSecondary space-y-2">
              <li>Provide and maintain our service</li>
              <li>Improve and personalize your experience</li>
              <li>Develop new features and functionality</li>
              <li>Process transactions and send related information</li>
              <li>Send administrative messages and updates</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Monitor and analyze usage patterns and trends</li>
              <li>Train and improve our AI code generation models</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-bolt-elements-textPrimary mb-4">3. Data Security</h2>
            <p className="text-bolt-elements-textSecondary mb-4">
              We implement appropriate technical and organizational measures to protect the security of your personal
              information. However, please be aware that no method of transmission over the internet or electronic
              storage is 100% secure.
            </p>
            <p className="text-bolt-elements-textSecondary">
              While we strive to use commercially acceptable means to protect your personal information, we cannot
              guarantee its absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-bolt-elements-textPrimary mb-4">4. Data Retention</h2>
            <p className="text-bolt-elements-textSecondary mb-4">
              We will retain your personal information only for as long as is necessary for the purposes set out in this
              privacy policy. We will retain and use your information to the extent necessary to comply with our legal
              obligations, resolve disputes, and enforce our policies.
            </p>
            <p className="text-bolt-elements-textSecondary">
              If you wish to request that we delete your data, please contact us at privacy@slothcoder.com.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-bolt-elements-textPrimary mb-4">
              5. Cookies and Tracking Technologies
            </h2>
            <p className="text-bolt-elements-textSecondary mb-4">
              We use cookies and similar tracking technologies to track activity on our service and hold certain
              information. Cookies are files with a small amount of data which may include an anonymous unique
              identifier.
            </p>
            <p className="text-bolt-elements-textSecondary">
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However,
              if you do not accept cookies, you may not be able to use some portions of our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-bolt-elements-textPrimary mb-4">6. Third-Party Services</h2>
            <p className="text-bolt-elements-textSecondary mb-4">
              Our service may contain links to third-party websites or services that are not owned or controlled by
              Sloth Coder. We have no control over, and assume no responsibility for, the content, privacy policies, or
              practices of any third-party websites or services.
            </p>
            <p className="text-bolt-elements-textSecondary">
              We may use third-party service providers to help us operate our business and the service or administer
              activities on our behalf, such as payment processing or sending emails.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-bolt-elements-textPrimary mb-4">7. Children's Privacy</h2>
            <p className="text-bolt-elements-textSecondary">
              Our service is not intended for use by children under the age of 13. We do not knowingly collect
              personally identifiable information from children under 13. If you are a parent or guardian and you are
              aware that your child has provided us with personal information, please contact us so that we can take
              necessary actions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-bolt-elements-textPrimary mb-4">
              8. Changes to This Privacy Policy
            </h2>
            <p className="text-bolt-elements-textSecondary">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy
              Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-bolt-elements-textPrimary mb-4">9. Contact Us</h2>
            <p className="text-bolt-elements-textSecondary">
              If you have any questions about this Privacy Policy, please contact us at privacy@slothcoder.com.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
