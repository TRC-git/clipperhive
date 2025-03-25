import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export interface BrandData {
  id: number;
  name: string;
  industry: string;
  projects: number;
  image: string;
  tags: string[];
  bio: string;
}

interface BrandCardProps {
  brand: BrandData;
  index?: number;
}

const BrandCard: React.FC<BrandCardProps> = ({ brand, index = 0 }) => {
  const navigate = useNavigate();
  // Calculate animation delay based on index
  const animationDelay = `${index * 0.1}s`;
  
  const handleViewBrand = () => {
    navigate('/clipper-signup');
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
            <AvatarImage src={brand.image} alt={brand.name} />
            <AvatarFallback>{brand.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h3 className="font-bold text-xl text-charcoal-800 dark:text-white">{brand.name}</h3>
            <p className="text-honey-500 font-medium">{brand.industry}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {brand.tags.map((tag, index) => (
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
          {brand.bio}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm text-charcoal-600 dark:text-charcoal-400">{brand.projects} active projects</span>
          <Button 
            variant="default" 
            className="bg-honey-500 hover:bg-honey-600 text-charcoal-800 font-medium rounded-full shadow-sm"
            onClick={handleViewBrand}
          >
            View Brand
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BrandCard;
