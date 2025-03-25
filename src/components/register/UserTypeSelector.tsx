import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Briefcase, Play } from 'lucide-react';

interface UserTypeSelectorProps {
  userType: string;
  onUserTypeChange?: (type: string) => void;
}

const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({
  userType,
  onUserTypeChange
}) => {
  const navigate = useNavigate();
  
  const handleCardClick = (type: string) => {
    if (onUserTypeChange) {
      // If onUserTypeChange is provided, call it (for the Register page)
      onUserTypeChange(type);
    } else {
      // Otherwise navigate to the appropriate page
      navigate(type === 'brand' ? '/brand-signup' : '/clipper-signup');
    }
  };
  
  return (
    <div className="flex flex-col items-center mb-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-charcoal-800 dark:text-white">
        I am...
      </h2>
      <div className="flex flex-col sm:flex-row justify-center gap-6 w-full">
        <Card 
          onClick={() => handleCardClick('brand')}
          className={`relative cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(247,183,51,0.25)] ${
            userType === 'brand' 
              ? 'border-honey-500 bg-honey-50 dark:bg-honey-900/20 shadow-lg ring-2 ring-honey-500' 
              : 'bg-white/60 dark:bg-charcoal-800/60 hover:shadow-md backdrop-blur-sm'
          }`}
        >
          <CardContent className="flex flex-col items-center justify-center p-8">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
              userType === 'brand' 
                ? 'bg-honey-500 text-white' 
                : 'bg-charcoal-100 dark:bg-charcoal-700 text-charcoal-700 dark:text-charcoal-200'
            }`}>
              <Briefcase size={24} />
            </div>
            <CardTitle className="text-xl mb-2">Brand</CardTitle>
            <CardDescription className="text-center">
              I want to find talented creators to make short form content for my Brand
            </CardDescription>
          </CardContent>
          {userType === 'brand' && (
            <div className="absolute top-3 right-3">
              <div className="w-6 h-6 rounded-full bg-honey-500 flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>
          )}
        </Card>
        
        <Card 
          onClick={() => handleCardClick('clipper')}
          className={`relative cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(247,183,51,0.25)] ${
            userType === 'clipper' 
              ? 'border-honey-500 bg-honey-50 dark:bg-honey-900/20 shadow-lg ring-2 ring-honey-500' 
              : 'bg-white/60 dark:bg-charcoal-800/60 hover:shadow-md backdrop-blur-sm'
          }`}
        >
          <CardContent className="flex flex-col items-center justify-center p-8">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
              userType === 'clipper' 
                ? 'bg-honey-500 text-white' 
                : 'bg-charcoal-100 dark:bg-charcoal-700 text-charcoal-700 dark:text-charcoal-200'
            }`}>
              <Play size={24} />
            </div>
            <CardTitle className="text-xl mb-2">Clipper</CardTitle>
            <CardDescription className="text-center">
              I create engaging short form video content and want to monetize my skill
            </CardDescription>
          </CardContent>
          {userType === 'clipper' && (
            <div className="absolute top-3 right-3">
              <div className="w-6 h-6 rounded-full bg-honey-500 flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default UserTypeSelector;
