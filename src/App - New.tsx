import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import HowItWorks from "./pages/HowItWorks";
import Marketplace from "./pages/Marketplace";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import DashboardPage from './pages/DashboardPage';
import AuthPage from './pages/AuthPage';
import PlaceholderPage from './pages/PlaceholderPage';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <Navigation />
          <Routes>
            {/* New frontend routes */}
            <Route path="/" element={<Index />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />

            {/* Dashboard and auth routes */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/auth" element={<AuthPage />} />
            
            {/* Booker routes */}
            <Route path="/projects" element={<PlaceholderPage title="Projects" description="Manage your content projects" />} />
            <Route path="/clippers" element={<PlaceholderPage title="Clipper Directory" description="Browse and connect with content creators" />} />
            
            {/* Clipper routes */}
            <Route path="/myclips" element={<PlaceholderPage title="My Clips" description="View and manage your submitted clips" />} />
            <Route path="/earnings" element={<PlaceholderPage title="Earnings" description="Track your revenue and payment history" />} />
            
            {/* Common routes */}
            <Route path="/profile" element={<PlaceholderPage title="Channel Management" description="Manage your YouTube channels and connections" />} />
            <Route path="/settings" element={<PlaceholderPage title="Account Settings" description="Update your profile and preferences" />} />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
