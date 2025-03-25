
import React, { useEffect, useRef, useState } from 'react';
import { 
  Users, 
  Sparkles, 
  TrendingUp, 
  Globe,
  Search,
  CheckCircle,
  Briefcase,
  UserPlus,
  MessageSquare,
  BarChart3,
  Filter,
  Clock
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  index: number;
}> = ({ icon, title, description, delay, index }) => {
  // Alternate animation directions based on index
  const getAnimationClass = () => {
    // Alternate between left, right, and bottom for varied animations
    const direction = index % 3 === 0 ? 'left' : index % 3 === 1 ? 'right' : 'bottom';
    return `animate-on-scroll-${direction}`;
  };

  return (
    <div 
      className={`${getAnimationClass()} flex flex-col p-6 rounded-2xl backdrop-blur-md 
                  bg-white/80 dark:bg-charcoal-800/60 shadow-[0_8px_32px_rgba(0,0,0,0.15)] 
                  border border-white/20 dark:border-charcoal-700/30 transition-all duration-500 
                  hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(247,183,51,0.2)] 
                  hover:border-honey-300/50 dark:hover:border-honey-500/30`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="p-3 mb-4 rounded-full bg-gradient-to-br from-honey-400 to-honey-500 dark:from-honey-500 dark:to-honey-600 w-12 h-12 flex items-center justify-center text-white shadow-lg">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-charcoal-800 dark:text-white">{title}</h3>
      <p className="text-charcoal-600 dark:text-charcoal-300">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("brands");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.animate-on-scroll-left, .animate-on-scroll-right, .animate-on-scroll-bottom');
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

  const clipperFeatures = [
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

  const brandFeatures = [
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "Powerful Brand Profiles",
      description: "Provide essential details about your brand, niche, and business, so Clippers understand exactly who you are and what you're looking for."
    },
    {
      icon: <UserPlus className="h-6 w-6" />,
      title: "Create & Manage Projects",
      description: "Instantly create custom offers/projects with detailed CPM pricing options, ensuring you find the right fit for your marketing needs."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Flexible Project Management",
      description: "Manage your projects effortlessly by tracking progress, setting deadlines, and adjusting milestones."
    },
    {
      icon: <Filter className="h-6 w-6" />,
      title: "Discover the Best Clippers",
      description: "Use filters to search for the best Clippers based on industry, style, or platform expertise. Invite them to bid on your projects and get creative with your content."
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Streamlined Workflow Management",
      description: "Seamlessly communicate with Clippers through integrated chat functionality, ensuring smooth and transparent interactions throughout the project."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Track Your Project's Performance",
      description: "View detailed performance stats for each project, including video views, engagement rates, and CPM data. Get a deeper understanding of how well your content is performing."
    }
  ];

  const getFeaturesToDisplay = () => {
    switch(activeTab) {
      case "brands":
        return brandFeatures;
      case "clippers":
        return clipperFeatures;
      default:
        return brandFeatures; // Default to brand features
    }
  };

  const featuresToDisplay = getFeaturesToDisplay();

  return (
    <section 
      id="features" 
      ref={featuresRef}
      className="section-padding relative overflow-hidden bg-gradient-to-b from-white via-honey-50/40 to-honey-50/60 dark:from-charcoal-900 dark:via-charcoal-900/90 dark:to-charcoal-800/90"
    >
      {/* Glassmorphic decorative elements */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-honey-200/20 dark:bg-honey-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-0 w-72 h-72 bg-honey-300/20 dark:bg-honey-500/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-14 animate-on-scroll-bottom">
          <span className="inline-block px-4 py-1 rounded-full text-honey-600 dark:text-honey-400 bg-honey-100/60 dark:bg-charcoal-700/60 backdrop-blur-sm font-medium text-sm uppercase tracking-wider mb-4 shadow-sm">Features</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-charcoal-800 dark:text-white">
            {activeTab === "brands" ? "The Ultimate Clipper Marketplace" : "The Ultimate Brand Marketplace"}
          </h2>
          <p className="text-lg text-charcoal-600 dark:text-charcoal-300 max-w-2xl mx-auto">
            Connect, create, and collaborate on short-form videos that captivate audiences and drive results.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <Tabs 
            defaultValue="brands" 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="w-full max-w-md animate-on-scroll-bottom"
            style={{ transitionDelay: '100ms' }}
          >
            <TabsList className="grid w-full grid-cols-2 p-1 rounded-full bg-white/80 dark:bg-charcoal-700/60 backdrop-blur-md border border-white/30 dark:border-charcoal-600/30 shadow-md">
              <TabsTrigger 
                value="brands" 
                className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-honey-400 data-[state=active]:to-honey-500 data-[state=active]:text-charcoal-800 py-2.5"
              >
                For Brands
              </TabsTrigger>
              <TabsTrigger 
                value="clippers"
                className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-honey-400 data-[state=active]:to-honey-500 data-[state=active]:text-charcoal-800 py-2.5"
              >
                For Clippers
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresToDisplay.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 100}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
