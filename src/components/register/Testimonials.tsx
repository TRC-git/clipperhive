
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  stars?: number;
  image?: string;
}

const Testimonial: React.FC<TestimonialProps> = ({
  name,
  role,
  content,
  stars = 5,
  image
}) => <Card className="bg-white/80 dark:bg-charcoal-800/80 backdrop-blur-sm transition-all duration-300 h-full border-0 shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
    <CardContent className="p-6 transition-all duration-300 hover:bg-honey-50/40 dark:hover:bg-charcoal-700/40 hover:scale-[1.01] rounded-lg">
      <div className="flex mb-4 items-center">
        <Avatar className="h-12 w-12 mr-4">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-charcoal-800 dark:text-white">{name}</p>
          <p className="text-sm text-charcoal-600 dark:text-charcoal-400">{role}</p>
        </div>
      </div>
      <div className="flex mb-2">
        {[...Array(stars)].map((_, i) => <Star key={i} size={16} className="text-honey-500 fill-honey-500 mr-1" />)}
      </div>
      <p className="text-charcoal-700 dark:text-charcoal-200 mb-4 italic">{content}</p>
    </CardContent>
  </Card>;

const Testimonials: React.FC = () => {
  return <div className="mt-[150px] mb-4 max-w-6xl mx-auto">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-charcoal-800 dark:text-white mb-2">
          Hear from our community
        </h2>
        <p className="text-charcoal-600 dark:text-charcoal-300 max-w-2xl mx-auto">
          Join thousands of satisfied users who are already benefiting from our platform
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-center mb-4">
          <Separator className="w-16 mx-4" />
          <h3 className="text-xl font-semibold text-honey-500">What Brands Say</h3>
          <Separator className="w-16 mx-4" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-6">
          <Testimonial 
            name="Sarah Johnson" 
            role="Marketing Director at TechFlow" 
            content="We've seen a 35% increase in engagement since working with creators from ClipperHive. The quality of content exceeds our expectations every time." 
            image="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&auto=format&fit=crop&q=80" 
          />
          <Testimonial 
            name="Michael Roberts" 
            role="Brand Manager at StyleCo" 
            content="Finding talented creators used to be a headache. ClipperHive streamlined our process and helped us discover amazing talent we wouldn't have found otherwise." 
            image="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=150&h=150&auto=format&fit=crop&q=80" 
          />
          <Testimonial 
            name="Jennifer Lee" 
            role="Social Media Lead at FreshEats" 
            content="The ROI we've gotten from ClipperHive creators is incredible. Our latest campaign went viral thanks to the perfect match we found on this platform." 
            stars={5} 
            image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&auto=format&fit=crop&q=80" 
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-center mb-4">
          <Separator className="w-16 mx-4" />
          <h3 className="text-xl font-semibold text-honey-500">What Clippers Say</h3>
          <Separator className="w-16 mx-4" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-6">
          <Testimonial 
            name="Alex Chen" 
            role="Content Creator" 
            content="I was creating content with no clear path to monetization. ClipperHive connected me with brands that value my creative skills and pay me what I'm worth." 
            stars={5} 
            image="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=150&h=150&auto=format&fit=crop&q=80" 
          />
          <Testimonial 
            name="Tasha Williams" 
            role="Video Editor & Creator" 
            content="Thanks to ClipperHive, I've turned my side-hustle into a full-time career. The platform makes it easy to showcase my work and find consistent clients." 
            image="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&auto=format&fit=crop&q=80" 
          />
          <Testimonial 
            name="David Patel" 
            role="Short-form Video Specialist" 
            content="The best part about ClipperHive is the community. I've connected with other creators, learned new techniques, and found amazing brand partners. It's a game-changer!" 
            stars={5} 
            image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&auto=format&fit=crop&q=80" 
          />
        </div>
      </div>
    </div>;
};

export default Testimonials;
