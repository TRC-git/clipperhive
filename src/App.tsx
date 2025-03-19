import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import MarketplacePage from './pages/MarketplacePage';
import AuthPage from './pages/AuthPage';
import Navigation from './components/Navigation';
import PlaceholderPage from './pages/PlaceholderPage'; // We'll create this

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
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
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;