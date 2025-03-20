import React, { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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

const AppContent = () => {
  const location = useLocation();
  const { user, loading } = useAuthContext();
  
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
    '/cookies'
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

  // Redirect to auth page if trying to access authenticated route without being logged in
  if (!loading && isAuthenticatedRoute && !user) {
    return <AuthPage />;
  }

  // Create a marketplace element based on user state to avoid remounting
  const marketplaceElement = () => {
    return user ? <MarketplacePage /> : <Marketplace />;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Show Navigation for authenticated routes, NavBar for public routes */}
      {showAuthenticatedNav ? <Navigation /> : <NavBar />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/marketplace" element={marketplaceElement()} />
        <Route path="/portfolio/:username" element={<PortfolioPage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        
        {/* Booker routes */}
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/clippers" element={<ClippersPage />} />
        
        {/* Clipper routes */}
        <Route path="/myclips" element={<PlaceholderPage title="My Clips" description="View and manage your submitted clips" />} />
        <Route path="/earnings" element={<PlaceholderPage title="Earnings" description="Track your revenue and payment history" />} />
        
        {/* Common routes */}
        <Route path="/channels" element={<ChannelsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        
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