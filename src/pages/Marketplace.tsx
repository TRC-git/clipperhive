import React from 'react';
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

const Marketplace: React.FC = () => {
  // Sample clipper data
  const clippers = [
    {
      id: 1,
      name: "Sarah Johnson",
      specialty: "TikTok Expert",
      rating: 4.8,
      projects: 56,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Marcus Chen",
      specialty: "YouTube Shorts",
      rating: 4.9,
      projects: 78,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Ava Williams",
      specialty: "Instagram Reels",
      rating: 4.7,
      projects: 42,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1970&auto=format&fit=crop"
    },
    {
      id: 4,
      name: "Jordan Smith",
      specialty: "Multi-platform",
      rating: 4.6,
      projects: 35,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 5,
      name: "Taylor Kim",
      specialty: "Gaming Content",
      rating: 4.9,
      projects: 61,
      image: "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?q=80&w=1964&auto=format&fit=crop"
    },
    {
      id: 6,
      name: "Riley Johnson",
      specialty: "Educational Content",
      rating: 4.7,
      projects: 48,
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop"
    }
  ];

  return (
    <>
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4 text-charcoal-800 dark:text-white">
            Discover Top Content Clippers
          </h1>
          <p className="text-lg text-charcoal-600 dark:text-charcoal-300 max-w-2xl mx-auto">
            Connect with skilled clippers who can transform your content into viral short-form videos
          </p>
        </div>

        {/* Search and filters */}
        <div className="mb-10 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-grow max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-charcoal-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, specialty, or platform..."
              className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 dark:border-charcoal-600 focus:outline-none focus:ring-2 focus:ring-honey-500 dark:bg-charcoal-800 dark:text-white"
            />
          </div>
          <Button variant="outline" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Clipper cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clippers.map((clipper) => (
            <div 
              key={clipper.id}
              className="bg-white dark:bg-charcoal-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                <img 
                  src={clipper.image} 
                  alt={clipper.name} 
                  className="object-cover w-full h-48"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-charcoal-800 dark:text-white">{clipper.name}</h3>
                <p className="text-honey-500 font-medium">{clipper.specialty}</p>
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(clipper.rating) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                    <span className="ml-2 text-sm text-charcoal-600 dark:text-charcoal-400">{clipper.rating}</span>
                  </div>
                  <span className="mx-2 text-charcoal-300 dark:text-charcoal-600">•</span>
                  <span className="text-sm text-charcoal-600 dark:text-charcoal-400">{clipper.projects} projects</span>
                </div>
                <div className="mt-4">
                  <Button className="w-full bg-honey-500 hover:bg-honey-600 text-charcoal-800">
                    View Profile
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" className="mx-auto">
            Load More Clippers
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Marketplace;
