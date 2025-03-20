
import React, { useEffect, useRef } from 'react';
import { 
  Users, 
  Sparkles, 
  TrendingUp, 
  Globe,
  Search,
  CheckCircle
} from 'lucide-react';

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}> = ({ icon, title, description, delay }) => {
  return (
    <div 
      className="animate-on-scroll flex flex-col p-6 bg-white dark:bg-charcoal-800 rounded-2xl shadow-sm border border-gray-100 dark:border-charcoal-700 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="p-3 mb-4 rounded-full bg-honey-100 dark:bg-charcoal-700 w-12 h-12 flex items-center justify-center text-honey-500">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-charcoal-800 dark:text-white">{title}</h3>
      <p className="text-charcoal-600 dark:text-charcoal-300">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.animate-on-scroll');
            elements.forEach((el) => {
              el.classList.add('is-visible');
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);

  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Connect Instantly",
      description: "Find the perfect match between brands and video clipping experts with our smart matching algorithm."
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Professional Clippers",
      description: "Access a vetted network of experienced short-form content creators specialized in viral formats."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Maximize Engagement",
      description: "Boost your social presence with optimized clips that drive higher engagement and reach."
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Cross-platform Delivery",
      description: "Get content optimized for TikTok, Instagram Reels, YouTube Shorts, and more."
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "Find Your Niche",
      description: "Easily browse clippers by industry expertise, style, or platform specialization."
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Secure Payments",
      description: "Protected contracts and milestone-based payment system for both parties."
    }
  ];

  return (
    <section 
      id="features" 
      ref={featuresRef}
      className="section-padding bg-gradient-to-b from-white to-honey-50 dark:from-charcoal-900 dark:to-charcoal-800"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll">
          <span className="text-honey-500 font-medium text-sm uppercase tracking-wider">Features</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-charcoal-800 dark:text-white">
            The Ultimate Clipper Marketplace
          </h2>
          <p className="text-lg text-charcoal-600 dark:text-charcoal-300 max-w-2xl mx-auto">
            Connect, create, and collaborate on short-form videos that captivate audiences and drive results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
