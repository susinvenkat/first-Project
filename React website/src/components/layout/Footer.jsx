import { Link } from 'react-router-dom';
import { useState } from 'react';
import Alert from '../common/Alert';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const footerSections = [
    {
      title: 'Products',
      links: [
        { label: 'Pneumatic Actuators', href: '/products#pneumatic' },
        { label: 'Electro-Hydraulic', href: '/products#electro-hydraulic' },
        { label: 'Electrical Actuators', href: '/products#electrical' },
        { label: 'Gearboxes', href: '/products#gearboxes' },
        { label: 'Accessories', href: '/products#accessories' }
      ]
    },
    {
      title: 'Solutions',
      links: [
        { label: 'Industries', href: '/industries' },
        { label: 'Services', href: '/services' },
        { label: 'Resources', href: '/resources' },
        { label: 'Case Studies', href: '/resources#case-studies' },
        { label: 'Certifications', href: '/resources#certificates' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Leadership', href: '/about#leadership' },
        { label: 'Careers', href: '/careers' },
        { label: 'Sustainability', href: '/sustainability' },
        { label: 'Contact', href: '/contact' }
      ]
    },
    {
      title: 'Global',
      links: [
        { label: 'India', href: '/global/india' },
        { label: 'UAE', href: '/global/uae' },
        { label: 'Qatar', href: '/global/qatar' },
        { label: 'Locations', href: '/contact#locations' },
        { label: 'Partner Network', href: '/about#partners' }
      ]
    }
  ];

  return (
    <footer className="bg-gradient-to-b from-secondary-900 to-secondary-950 text-secondary-300">
      {/* Newsletter Subscription */}
      <div className="border-b border-secondary-800 bg-secondary-900/50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
            <p className="text-secondary-300 mb-6">
              Subscribe to our newsletter for product updates, industry insights, and exclusive offers.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-secondary-800 border border-secondary-700 text-white placeholder-secondary-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg font-semibold transition-all whitespace-nowrap"
              >
                <i className="fas fa-envelope mr-2"></i>
                Subscribe
              </button>
            </form>

            {subscribed && (
              <Alert
                type="success"
                title="Subscribed!"
                message="Thank you for subscribing to our newsletter."
                closeable={false}
              />
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <img 
                  src="/assets/img/susin-logo.svg" 
                  alt="Susin Group Logo" 
                  className="h-12 w-12 relative z-10 transition-transform duration-300 group-hover:scale-110"
                  style={{ filter: 'drop-shadow(0 0 6px rgba(37, 99, 235, 0.4))' }}
                />
              </div>
              <div>
                <h3 className="text-white text-lg font-bold">SUSIN GROUP</h3>
                <p className="text-xs text-secondary-400">Since 1992</p>
              </div>
            </div>
            <p className="text-sm text-secondary-400 mb-6">
              Leading manufacturer of industrial actuators and valve automation solutions. Trusted by global enterprises.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 mb-4">
              <a href="#" className="w-10 h-10 rounded-full bg-secondary-800 hover:bg-primary-600 text-secondary-300 hover:text-white flex items-center justify-center transition-all" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary-800 hover:bg-primary-600 text-secondary-300 hover:text-white flex items-center justify-center transition-all" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary-800 hover:bg-primary-600 text-secondary-300 hover:text-white flex items-center justify-center transition-all" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary-800 hover:bg-primary-600 text-secondary-300 hover:text-white flex items-center justify-center transition-all" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>

            {/* Certifications */}
            <div className="flex items-center space-x-2 text-xs">
              <i className="fas fa-certificate text-primary-400"></i>
              <span>ISO 9001:2015 Certified</span>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-secondary-400 hover:text-primary-400 transition-colors text-sm inline-flex items-center group"
                    >
                      <i className="fas fa-chevron-right text-xs mr-2 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1"></i>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="border-t border-secondary-800 pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h4 className="text-white font-semibold mb-3 flex items-center">
              <i className="fas fa-map-marker-alt mr-2 text-primary-400"></i>
              Headquarters
            </h4>
            <p className="text-sm text-secondary-400">
              Coimbatore, Tamil Nadu<br/>
              India
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-3 flex items-center">
              <i className="fas fa-phone mr-2 text-primary-400"></i>
              Phone
            </h4>
            <p className="text-sm text-secondary-400">
              <a href="tel:+917708097242" className="hover:text-primary-400 transition-colors">
                +91 77080 97242
              </a>
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 flex items-center">
              <i className="fas fa-envelope mr-2 text-primary-400"></i>
              Email
            </h4>
            <p className="text-sm text-secondary-400">
              <a href="mailto:info@susin.in" className="hover:text-primary-400 transition-colors">
                info@susin.in
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-secondary-500">
            &copy; {currentYear} Susin Group. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-6 text-sm">
            <a href="/privacy" className="text-secondary-400 hover:text-primary-400 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-secondary-400 hover:text-primary-400 transition-colors">
              Terms of Service
            </a>
            <a href="/sitemap" className="text-secondary-400 hover:text-primary-400 transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-600 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-600 rounded-full blur-3xl"></div>
      </div>
    </footer>
  );
}
