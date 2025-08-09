import React from 'react';
import { classNames } from '~/utils/classNames';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const footerSections = [
    {
      title: 'Blogs',
      links: [
        { name: 'Latest Posts', href: '#' },
        { name: 'Tutorials', href: '#' },
        { name: 'Case Studies', href: '#' },
        { name: 'News', href: '#' },
      ],
    },
    {
      title: 'About',
      links: [
        { name: 'Our Story', href: '#' },
        { name: 'Team', href: '#' },
        { name: 'Mission', href: '#' },
        { name: 'Careers', href: '#' },
      ],
    },
    {
      title: 'APIs',
      links: [
        { name: 'Documentation', href: '#' },
        { name: 'SDK', href: '#' },
        { name: 'Examples', href: '#' },
        { name: 'Status', href: '#' },
      ],
    },
    {
      title: 'Terms',
      links: [
        { name: 'Terms of Service', href: '#' },
        { name: 'Acceptable Use', href: '#' },
        { name: 'Service Level Agreement', href: '#' },
        { name: 'Data Processing', href: '#' },
      ],
    },
    {
      title: 'Privacy',
      links: [
        { name: 'Privacy Policy', href: '#' },
        { name: 'Cookie Policy', href: '#' },
        { name: 'Data Protection', href: '#' },
        { name: 'GDPR', href: '#' },
      ],
    },
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', href: '#' },
        { name: 'Features', href: '#' },
        { name: 'Pricing', href: '#' },
        { name: 'Support', href: '#' },
      ],
    },
    {
      title: 'User Guide',
      links: [
        { name: 'Getting Started', href: '#' },
        { name: 'Tutorials', href: '#' },
        { name: 'FAQ', href: '#' },
        { name: 'Best Practices', href: '#' },
      ],
    },
    {
      title: 'Contact',
      links: [
        { name: 'Support', href: '#' },
        { name: 'Sales', href: '#' },
        { name: 'Partnership', href: '#' },
        { name: 'Feedback', href: '#' },
      ],
    },
  ];

  return (
    <footer
      className={classNames('bg-bolt-elements-background-depth-2 border-t border-bolt-elements-borderColor', className)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 lg:gap-8">
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-sm font-semibold text-bolt-elements-textPrimary uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-bolt-elements-borderColor">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <img src="/favicon.ico" alt="Sloth Logo" className="w-8 h-8" />
              <span className="text-lg font-semibold text-bolt-elements-textPrimary">Sloth</span>
            </div>
            <p className="text-sm text-bolt-elements-textSecondary">
              © {new Date().getFullYear()} Sloth. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
