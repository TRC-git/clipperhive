import React, { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuthContext } from './providers/AuthProvider';
import Navigation from '@/components/Navigation';
import NavBar from '@/components/NavBar';
import Index from '@/pages/Index';
import HowItWorks from '@/pages/HowItWorks';
import Marketplace from '@/pages/Marketplace';
import MarketplacePage from '@/pages/MarketplacePage';
import PortfolioPage from '@/pages/PortfolioPage';
import Pricing from '@/pages/Pricing';
import About from '@/pages/About';
import FAQ from '@/pages/FAQ';
import Contact from '@/pages/Contact';
import AuthPage from '@/pages/AuthPage';
import NotFound from '@/pages/NotFound';
import DashboardPage from '@/pages/DashboardPage';
import PlaceholderPage from '@/pages/PlaceholderPage';
import ChannelsPage from '@/pages/ChannelsPage';
import SettingsPage from '@/pages/SettingsPage';
import ProjectsPage from '@/pages/ProjectsPage';
import ClippersPage from '@/pages/ClippersPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';
import Cookies from '@/pages/Cookies';
import Careers from "./pages/Careers";
import CareerDetails from "./pages/CareerDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import BrandSignup from "./pages/BrandSignup";
import ClipperSignup from "./pages/ClipperSignup";
import BrandLogin from "./pages/BrandLogin";
import ClipperLogin from "./pages/ClipperLogin";


const queryClient = new QueryClient();

// Routes that require authentication to access
const authenticatedRoutes = [
  '/dashboard',
  '/projects',
  '/clippers',
  '/myclips',
  '/earnings',
  '/channels',
  '/settings',
  '/marketplace'
];

// A wrapper component that handles auth-required routes
const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuthContext();
  const location = useLocation();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  if (!user) {
    // Redirect to auth page but save the current location
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

// Add ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppContent = () => {
  const location = useLocation();
  const { user } = useAuthContext();
  
  // Define public routes that should always show the NavBar
  const publicRoutes = [
    '/',
    '/how-it-works',
    '/pricing',
    '/about',
    '/faq',
    '/blog',
    '/careers',
    '/contact',
    '/legal',
    '/terms',
    '/cookies',
    '/auth',
    '/register',
    '/login',
    '/brand-signup',
    '/clipper-signup',
    '/brand-login',
    '/clipper-login'
  ];

  // Check if the current path is an authenticated route or starts with /projects/
  const isAuthenticatedRoute = authenticatedRoutes.includes(location.pathname) || location.pathname.startsWith('/projects/');
  
  // Show NavBar on public routes, Navigation on authenticated routes
  const showAuthenticatedNav = !publicRoutes.includes(location.pathname) && (user || isAuthenticatedRoute);

  // Add this to reset bookmarks on application start (for testing)
  useEffect(() => {
    // Check localStorage bookmarks state
    try {
      const bookmarks = localStorage.getItem('clipper_bookmarks');
      console.log('App starting, current bookmarks:', bookmarks);
      
      // IMPORTANT: This was causing the bookmark state reset issue
      // DO NOT reset bookmarks automatically - let user manage state
      
      // localStorage.setItem('clipper_bookmarks', '[]');
      // console.log('Reset bookmarks for testing');
    } catch (e) {
      console.error('Error checking bookmarks:', e);
    }
  }, []);

  // Create a marketplace element based on user state to avoid remounting
  const marketplaceElement = () => {
    return user ? <MarketplacePage /> : <Marketplace />;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {showAuthenticatedNav ? <Navigation /> : <NavBar />}
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/marketplace" element={marketplaceElement()} />
        <Route path="/portfolio/:username" element={<PortfolioPage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<AuthPage />} />
        
        {/* Auth routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/brand-signup" element={<BrandSignup />} />
        <Route path="/clipper-signup" element={<ClipperSignup />} />
        <Route path="/brand-login" element={<BrandLogin />} />
        <Route path="/clipper-login" element={<ClipperLogin />} />
        
        {/* Legal routes */}
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/careers/:id" element={<CareerDetails />} />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={
          <RequireAuth>
            <DashboardPage />
          </RequireAuth>
        } />
        
        {/* Booker routes */}
        <Route path="/projects" element={
          <RequireAuth>
            <ProjectsPage />
          </RequireAuth>
        } />
        <Route path="/projects/:id" element={
          <RequireAuth>
            <ProjectDetailPage />
          </RequireAuth>
        } />
        <Route path="/clippers" element={
          <RequireAuth>
            <ClippersPage />
          </RequireAuth>
        } />
        
        {/* Clipper routes */}
        <Route path="/myclips" element={
          <RequireAuth>
            <PlaceholderPage title="My Clips" description="View and manage your submitted clips" />
          </RequireAuth>
        } />
        <Route path="/earnings" element={
          <RequireAuth>
            <PlaceholderPage title="Earnings" description="Track your revenue and payment history" />
          </RequireAuth>
        } />
        
        {/* Common routes */}
        <Route path="/channels" element={
          <RequireAuth>
            <ChannelsPage />
          </RequireAuth>
        } />
        <Route path="/settings" element={
          <RequireAuth>
            <SettingsPage />
          </RequireAuth>
        } />
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
