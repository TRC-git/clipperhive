import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Menu, X } from 'lucide-react';
import { useAuthContext } from '../providers/AuthProvider';

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuthContext();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "bg-white/90 dark:bg-charcoal-800/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="flex items-center space-x-2 transition-opacity duration-200 hover:opacity-80"
          >
            <div className="hexagon bg-honey-500 w-8 h-7 flex items-center justify-center">
              <span className="text-charcoal-800 font-bold text-sm">CH</span>
            </div>
            <span className="font-display font-bold text-xl text-charcoal-800 dark:text-white">
              ClipperHive
            </span>
          </Link>

          <div className="hidden md:flex md:items-center md:space-x-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "font-medium hover-lift",
                  location.pathname === link.path 
                    ? "text-honey-500" 
                    : "text-charcoal-600 hover:text-honey-500 dark:text-white dark:hover:text-honey-500"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            {user ? (
              <Link 
                to="/dashboard" 
                className="brand-button py-2 px-4"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link 
                  to="/auth" 
                  className="ghost-button py-2 px-4"
                >
                  Sign In
                </Link>
                <Link 
                  to="/auth" 
                  className="brand-button py-2 px-4"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden flex items-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-charcoal-800 dark:text-white" />
            ) : (
              <Menu className="h-6 w-6 text-charcoal-800 dark:text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden py-2 px-4 bg-white dark:bg-charcoal-800 shadow-lg">
          <div className="flex flex-col space-y-3 pt-3 pb-4 border-t border-gray-200 dark:border-charcoal-700">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "px-2 py-1 font-medium rounded-md",
                  location.pathname === link.path 
                    ? "bg-honey-100 text-honey-500 dark:bg-charcoal-700" 
                    : "text-charcoal-600 hover:bg-honey-50 hover:text-honey-500 dark:text-white dark:hover:bg-charcoal-700"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-2 pt-2">
              {user ? (
                <Link 
                  to="/dashboard" 
                  className="brand-button w-full justify-center"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link 
                    to="/auth" 
                    className="ghost-button w-full justify-center"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/auth" 
                    className="brand-button w-full justify-center"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
