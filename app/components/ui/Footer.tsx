import React from 'react';
import { classNames } from '~/utils/classNames';
import { Link } from '@remix-run/react';

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
        { name: 'Our Story', href: '/about' },
        { name: 'Team', href: '/about' },
        { name: 'Mission', href: '/about' },
        { name: 'Careers', href: '/about' },
      ],
    },
    {
      title: 'APIs',
      links: [
        { name: 'Documentation', href: '/apis' },
        { name: 'Subscription Plans', href: '/apis' },
        { name: 'Examples', href: '/apis' },
        { name: 'Status', href: '/apis' },
      ],
    },
    {
      title: 'Terms',
      links: [
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Acceptable Use', href: '/terms' },
        { name: 'Service Level Agreement', href: '/terms' },
        { name: 'Data Processing', href: '/terms' },
      ],
    },
    {
      title: 'Privacy',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Cookie Policy', href: '/privacy' },
        { name: 'Data Protection', href: '/privacy' },
        { name: 'GDPR', href: '/privacy' },
      ],
    },
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', href: '/' },
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
        { name: 'Support', href: '/contact' },
        { name: 'Sales', href: '/contact' },
        { name: 'Partnership', href: '/contact' },
        { name: 'Feedback', href: '/contact' },
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
                    <Link
                      to={link.href}
                      className="text-sm text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
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
