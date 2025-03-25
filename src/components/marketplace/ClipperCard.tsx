
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, Instagram, Youtube, MessageCircle } from "lucide-react";

export interface ClipperData {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  projects: number;
  image: string;
  tags: string[];
  bio: string;
}

interface ClipperCardProps {
  clipper: ClipperData;
  index?: number;
}

const ClipperCard: React.FC<ClipperCardProps> = ({ clipper, index = 0 }) => {
  const navigate = useNavigate();
  // Calculate animation delay based on index
  const animationDelay = `${index * 0.1}s`;

  const handleViewProfile = () => {
    navigate('/brand-signup');
  };

  return (
    <Card 
      className="bg-white dark:bg-charcoal-800 rounded-xl overflow-hidden transition-all duration-300 shadow-md animate-fade-in opacity-0 border-none hover:shadow-none"
      style={{ 
        animationDelay, 
        animationFillMode: 'forwards',
        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.25)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 10px 30px -5px rgba(247, 183, 51, 0.25)';
        e.currentTarget.style.transform = 'scale(1.07)'; // Increased scale factor for more noticeable effect
        e.currentTarget.style.border = '1px solid rgba(247, 183, 51, 0.5)'; // Add border on hover
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 10px 30px -5px rgba(0, 0, 0, 0.25)';
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.border = 'none'; // Remove border on leave
      }}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-20 w-20 border-2 border-white shadow-md">
            <AvatarImage 
              src={clipper.image} 
              alt={clipper.name}
              className="object-cover"
            />
            <AvatarFallback>{clipper.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h3 className="font-bold text-xl text-charcoal-800 dark:text-white">{clipper.name}</h3>
            <div className="flex items-center">
              <Star className="h-5 w-5 fill-honey-500 text-honey-500 mr-1" />
              <span className="text-lg font-medium text-charcoal-800 dark:text-white">{clipper.rating}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {clipper.tags.map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="bg-gray-200 dark:bg-charcoal-700 text-charcoal-600 dark:text-charcoal-300 hover:bg-gray-300 dark:hover:bg-charcoal-600"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <p className="mt-4 text-charcoal-600 dark:text-charcoal-300 text-center">
          {clipper.bio}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex space-x-4">
            <button className="text-charcoal-500 dark:text-charcoal-400 hover:text-honey-500 dark:hover:text-honey-500 transition-colors">
              <Instagram className="h-6 w-6" />
            </button>
            <button className="text-charcoal-500 dark:text-charcoal-400 hover:text-honey-500 dark:hover:text-honey-500 transition-colors">
              <Youtube className="h-6 w-6" />
            </button>
            <button className="text-charcoal-500 dark:text-charcoal-400 hover:text-honey-500 dark:hover:text-honey-500 transition-colors">
              <MessageCircle className="h-6 w-6" />
            </button>
          </div>
          <Button 
            variant="default" 
            className="bg-honey-500 hover:bg-honey-600 text-charcoal-800 font-medium rounded-full shadow-sm"
            onClick={handleViewProfile}
          >
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClipperCard;
