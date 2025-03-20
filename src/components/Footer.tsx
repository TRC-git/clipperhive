import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-charcoal-900 border-t border-gray-200 dark:border-charcoal-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16">
          {/* Footer Top */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Company Info */}
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center space-x-2 mb-6">
                <div className="hexagon bg-honey-500 w-10 h-9 flex items-center justify-center">
                  <span className="text-charcoal-800 font-bold text-sm">CH</span>
                </div>
                <span className="font-display font-bold text-xl text-charcoal-800 dark:text-white">
                  ClipperHive
                </span>
              </Link>
              <p className="text-charcoal-600 dark:text-charcoal-300 mb-4 max-w-sm">
                The premier marketplace connecting brands with skilled content clippers for engaging short-form videos.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-charcoal-500 hover:text-honey-500 dark:text-charcoal-400 dark:hover:text-honey-400">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-charcoal-500 hover:text-honey-500 dark:text-charcoal-400 dark:hover:text-honey-400">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-charcoal-500 hover:text-honey-500 dark:text-charcoal-400 dark:hover:text-honey-400">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-charcoal-500 hover:text-honey-500 dark:text-charcoal-400 dark:hover:text-honey-400">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            {/* Links */}
            <div>
              <h3 className="text-charcoal-800 dark:text-white font-semibold mb-4">Platform</h3>
              <ul className="space-y-3">
                {[
                  { name: 'How It Works', path: '/how-it-works' },
                  { name: 'Marketplace', path: '/marketplace' },
                  { name: 'Pricing', path: '/pricing' },
                  { name: 'FAQ', path: '/faq' },
                  { name: 'Blog', path: '/blog' }
                ].map((item) => (
                  <li key={item.name}>
                    <Link 
                      to={item.path}
                      className="text-charcoal-600 hover:text-honey-500 dark:text-charcoal-400 dark:hover:text-honey-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-charcoal-800 dark:text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                {[
                  { name: 'About', path: '/about' },
                  { name: 'Careers', path: '/careers' },
                  { name: 'Contact', path: '/contact' }
                ].map((item) => (
                  <li key={item.name}>
                    <Link 
                      to={item.path}
                      className="text-charcoal-600 hover:text-honey-500 dark:text-charcoal-400 dark:hover:text-honey-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <h3 className="text-charcoal-800 dark:text-white font-semibold mt-6 mb-4">Legal</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Terms', path: '/terms' },
                  { name: 'Privacy', path: '/privacy' },
                  { name: 'Cookies', path: '/cookies' }
                ].map((item) => (
                  <li key={item.name}>
                    <Link 
                      to={item.path}
                      className="text-charcoal-600 hover:text-honey-500 dark:text-charcoal-400 dark:hover:text-honey-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Newsletter */}
          <div className="border-t border-gray-200 dark:border-charcoal-700 mt-12 pt-12">
            <div className="max-w-md">
              <h3 className="text-charcoal-800 dark:text-white font-semibold mb-4">Subscribe to our newsletter</h3>
              <p className="text-charcoal-600 dark:text-charcoal-300 mb-4">
                Get the latest updates and news from the ClipperHive community.
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-2 rounded-l-md border border-gray-300 dark:border-charcoal-600 focus:outline-none focus:ring-2 focus:ring-honey-500 dark:bg-charcoal-800 dark:text-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-honey-500 text-charcoal-800 rounded-r-md hover:bg-honey-600 transition-colors duration-200"
                >
                  <Mail className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
          
          {/* Footer Bottom */}
          <div className="border-t border-gray-200 dark:border-charcoal-700 mt-12 pt-6 text-center md:flex md:justify-between md:text-left">
            <p className="text-charcoal-500 dark:text-charcoal-400 text-sm">
              &copy; {new Date().getFullYear()} ClipperHive. All rights reserved.
            </p>
            <p className="text-charcoal-500 dark:text-charcoal-400 text-sm mt-2 md:mt-0">
              Designed with care for the creator economy
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
