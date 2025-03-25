
import React from 'react';
import { Upload, Search, Calendar, DollarSign, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeader from './SectionHeader';
import ProcessTimeline from './ProcessTimeline';

const BrandsProcess = () => {
  const brandSteps = [
    {
      title: "Create Your Project",
      description: "Define your project requirements, including platform (TikTok, Instagram, YouTube), budget, timeline, and any specific needs.",
      icon: <Upload className="h-6 w-6 text-white" />,
      items: [
        "Choose your content type and target audience",
        "Set your budget and project timeline",
        "Upload reference materials and brand guidelines"
      ],
      position: 'left' as const
    },
    {
      title: "Find the Perfect Clipper",
      description: "Browse our network of pre-vetted clippers or let our matching system recommend the best fit for your project.",
      icon: <Search className="h-6 w-6 text-white" />,
      items: [
        "Filter by platform specialization, style, and expertise",
        "Review portfolios and previous work examples",
        "Read clipper ratings and client testimonials"
      ],
      position: 'right' as const
    },
    {
      title: "Collaborate and Create",
      description: "Work directly with your selected clipper on your project, provide feedback, and receive updates.",
      icon: <Calendar className="h-6 w-6 text-white" />,
      items: [
        "Communicate through our secure platform",
        "Request revisions and provide feedback",
        "Track progress with milestone updates"
      ],
      position: 'left' as const
    },
    {
      title: "Receive and Release Payment",
      description: "Review the final content, approve the release of funds, and build an ongoing relationship with your clipper.",
      icon: <DollarSign className="h-6 w-6 text-white" />,
      items: [
        "Download final content in your preferred formats",
        "Release payment through our secure escrow system",
        "Leave a review and add to your trusted creators"
      ],
      position: 'right' as const
    }
  ];

  return (
    <section id="for-brands" className="section-padding bg-white dark:bg-charcoal-900">
      <div className="max-w-6xl mx-auto">
        <SectionHeader 
          badge="Brand Process"
          title="How it works for Brands"
          description="Find the perfect content clipper for your project in 4 simple steps."
        />
        
        <ProcessTimeline steps={brandSteps} />
        
        <div className="mt-16 text-center animate-on-scroll">
          <Link 
            to="/brand-signup" 
            className="brand-button group inline-flex items-center"
          >
            Get Started as a Brand
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BrandsProcess;
