
import React from 'react';
import { Star, Search, Video, DollarSign, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import SectionHeader from './SectionHeader';
import ProcessTimeline from './ProcessTimeline';

const ClippersProcess = () => {
  const clipperSteps = [
    {
      title: "Create Your Profile",
      description: "Build a comprehensive profile that showcases your skills, experience, and clipping style to attract the right clients.",
      icon: <Star className="h-6 w-6 text-white" />,
      items: [
        "Highlight your platform specialties (TikTok, Instagram, YouTube)",
        "Upload portfolio examples of your best work",
        "Set your rates and availability schedule"
      ],
      position: 'left' as const
    },
    {
      title: "Browse Brand Projects",
      description: "Explore available projects from brands looking for your specific skills and expertise in content clipping.",
      icon: <Search className="h-6 w-6 text-white" />,
      items: [
        "Filter projects by platform, budget, and timeline",
        "Review detailed project requirements and deliverables",
        "Submit proposals for projects that match your skills"
      ],
      position: 'right' as const
    },
    {
      title: "Create Engaging Content",
      description: "Work on brand projects, applying your editing skills to create viral-worthy short-form content that meets client specifications.",
      icon: <Video className="h-6 w-6 text-white" />,
      items: [
        "Access source content through our secure platform",
        "Create content following brand guidelines",
        "Submit drafts and collaborate on feedback"
      ],
      position: 'left' as const
    },
    {
      title: "Get Paid and Grow",
      description: "Receive secure payment for your completed work, build your reputation, and develop long-term client relationships.",
      icon: <DollarSign className="h-6 w-6 text-white" />,
      items: [
        "Receive payment through our secure payment system",
        "Collect positive reviews to enhance your profile",
        "Build recurring relationships with your favorite brands"
      ],
      position: 'right' as const
    }
  ];

  return (
    <section id="for-clippers" className="section-padding bg-honey-50 dark:bg-charcoal-800">
      <div className="max-w-6xl mx-auto">
        <SectionHeader 
          badge="Clipper Process"
          title="How it works for Clippers"
          description="Turn your clipping skills into a steady income in 4 easy steps."
        />
        
        <ProcessTimeline steps={clipperSteps} />
        
        <div className="mt-16 text-center animate-on-scroll">
          <Button 
            variant="secondary"
            className="group"
            asChild
          >
            <Link to="/clipper-signup">
              Join as a Clipper
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ClippersProcess;
