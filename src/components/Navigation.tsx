import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  LayoutDashboard, 
  ShoppingBag, 
  LogIn, 
  LogOut, 
  User, 
  Film, 
  DollarSign, 
  Users, 
  Settings,
  Briefcase,
  Video
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Navigation = () => {
  const { user, signOut, loading } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center px-2 py-2 text-gray-900 hover:text-indigo-600">
              <Home className="h-5 w-5 mr-1" />
              <span className="font-semibold">ClipperHive</span>
            </Link>
            
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              {/* Main Navigation Links */}
              <Link
                to="/marketplace"
                className={`flex items-center px-3 py-2 ${
                  isActive('/marketplace') ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                <ShoppingBag className="h-5 w-5 mr-1" />
                <span>Marketplace</span>
              </Link>
              
              {!loading && user && (
                <>
                  <Link
                    to="/dashboard"
                    className={`flex items-center px-3 py-2 ${
                      isActive('/dashboard') ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                    }`}
                  >
                    <LayoutDashboard className="h-5 w-5 mr-1" />
                    <span>Dashboard</span>
                  </Link>
                  
                  {user.role === 'booker' && (
                    <>
                      <Link
                        to="/projects"
                        className={`flex items-center px-3 py-2 ${
                          isActive('/projects') ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                        }`}
                      >
                        <Briefcase className="h-5 w-5 mr-1" />
                        <span>Projects</span>
                      </Link>
                      
                      <Link
                        to="/clippers"
                        className={`flex items-center px-3 py-2 ${
                          isActive('/clippers') ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                        }`}
                      >
                        <Users className="h-5 w-5 mr-1" />
                        <span>Clippers</span>
                      </Link>
                    </>
                  )}
                  
                  {user.role === 'clipper' && (
                    <>
                      <Link
                        to="/myclips"
                        className={`flex items-center px-3 py-2 ${
                          isActive('/myclips') ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                        }`}
                      >
                        <Video className="h-5 w-5 mr-1" />
                        <span>My Clips</span>
                      </Link>
                      
                      <Link
                        to="/earnings"
                        className={`flex items-center px-3 py-2 ${
                          isActive('/earnings') ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                        }`}
                      >
                        <DollarSign className="h-5 w-5 mr-1" />
                        <span>Earnings</span>
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-4">
            {!loading && (
              user ? (
                <>
                  <Link
                    to="/profile"
                    className={`flex items-center px-3 py-2 ${
                      isActive('/profile') ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                    }`}
                  >
                    <Film className="h-5 w-5 mr-1" />
                    <span>Channels</span>
                  </Link>
                  
                  <div className="relative group">
                    <button className="flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600">
                      <User className="h-5 w-5 mr-1" />
                      <span>{user.username}</span>
                    </button>
                    <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="px-4 py-3">
                        <p className="text-sm leading-5 text-gray-900 truncate">
                          {user.email}
                        </p>
                        <p className="text-xs leading-4 text-gray-500 capitalize">
                          {user.role === 'booker' ? 'Brand' : 'Clipper'} Account
                        </p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/settings"
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Settings
                        </Link>
                        <button
                          onClick={signOut}
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  to="/auth"
                  className={`flex items-center px-3 py-2 ${
                    isActive('/auth') ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                  }`}
                >
                  <LogIn className="h-5 w-5 mr-1" />
                  <span>Login</span>
                </Link>
              )
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on state */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/marketplace"
              className={`flex items-center px-3 py-2 rounded-md ${
                isActive('/marketplace') ? 'bg-indigo-100 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              <span>Marketplace</span>
            </Link>
            
            {!loading && user && (
              <>
                <Link
                  to="/dashboard"
                  className={`flex items-center px-3 py-2 rounded-md ${
                    isActive('/dashboard') ? 'bg-indigo-100 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="h-5 w-5 mr-2" />
                  <span>Dashboard</span>
                </Link>
                
                {user.role === 'booker' && (
                  <>
                    <Link
                      to="/projects"
                      className={`flex items-center px-3 py-2 rounded-md ${
                        isActive('/projects') ? 'bg-indigo-100 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Briefcase className="h-5 w-5 mr-2" />
                      <span>Projects</span>
                    </Link>
                    
                    <Link
                      to="/clippers"
                      className={`flex items-center px-3 py-2 rounded-md ${
                        isActive('/clippers') ? 'bg-indigo-100 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Users className="h-5 w-5 mr-2" />
                      <span>Clippers</span>
                    </Link>
                  </>
                )}
                
                {user.role === 'clipper' && (
                  <>
                    <Link
                      to="/myclips"
                      className={`flex items-center px-3 py-2 rounded-md ${
                        isActive('/myclips') ? 'bg-indigo-100 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Video className="h-5 w-5 mr-2" />
                      <span>My Clips</span>
                    </Link>
                    
                    <Link
                      to="/earnings"
                      className={`flex items-center px-3 py-2 rounded-md ${
                        isActive('/earnings') ? 'bg-indigo-100 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <DollarSign className="h-5 w-5 mr-2" />
                      <span>Earnings</span>
                    </Link>
                  </>
                )}
                
                <Link
                  to="/profile"
                  className={`flex items-center px-3 py-2 rounded-md ${
                    isActive('/profile') ? 'bg-indigo-100 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Film className="h-5 w-5 mr-2" />
                  <span>Channels</span>
                </Link>
                
                <Link
                  to="/settings"
                  className={`flex items-center px-3 py-2 rounded-md ${
                    isActive('/settings') ? 'bg-indigo-100 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Settings className="h-5 w-5 mr-2" />
                  <span>Settings</span>
                </Link>
                
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  <span>Sign out</span>
                </button>
              </>
            )}
            
            {!loading && !user && (
              <Link
                to="/auth"
                className={`flex items-center px-3 py-2 rounded-md ${
                  isActive('/auth') ? 'bg-indigo-100 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <LogIn className="h-5 w-5 mr-2" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;