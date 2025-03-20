import React from 'react';
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const About: React.FC = () => {
  const teamMembers = [
    {
      name: "Alex Morgan",
      role: "Founder & CEO",
      bio: "Former content creator turned entrepreneur with a passion for connecting talent with opportunity.",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1470&auto=format&fit=crop"
    },
    {
      name: "Zoe Chen",
      role: "Chief Product Officer",
      bio: "Product leader with experience at top tech companies, focused on building intuitive creator tools.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
    },
    {
      name: "Daniel Okafor",
      role: "Head of Marketplace",
      bio: "Expert in marketplace dynamics with a background in growing two-sided platforms and communities.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
    },
    {
      name: "Maya Patel",
      role: "Chief Technology Officer",
      bio: "Software engineer and architect who's passionate about building technology that empowers creators.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
    }
  ];

  return (
    <>
      <div className="pt-24 pb-16">
        {/* Hero section */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-6 text-charcoal-800 dark:text-white">
            Our Mission
          </h1>
          <p className="text-xl md:text-2xl text-charcoal-600 dark:text-charcoal-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            We're building the bridge between brands and talented content clippers to create the next generation of viral short-form video content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-honey-500 hover:bg-honey-600 text-charcoal-800">
              Join Our Team
            </Button>
            <Button variant="outline">
              Learn Our Story
            </Button>
          </div>
        </div>

        {/* Our story section */}
        <div className="bg-gray-50 dark:bg-charcoal-800/50 py-16">
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=1470&auto=format&fit=crop" 
                  alt="ClipperHive origin story" 
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold font-display mb-4 text-charcoal-800 dark:text-white">
                  Our Story
                </h2>
                <p className="text-charcoal-600 dark:text-charcoal-300 mb-6">
                  ClipperHive was born from a simple observation: brands needed short-form video content, and skilled clippers needed consistent work. Yet, there was no dedicated platform connecting these two communities.
                </p>
                <p className="text-charcoal-600 dark:text-charcoal-300 mb-6">
                  Founded in 2023, we set out to create a marketplace that would respect the craft of content clipping while making it accessible and efficient for brands to find the perfect creative partners.
                </p>
                <p className="text-charcoal-600 dark:text-charcoal-300">
                  Today, ClipperHive is the leading platform connecting content creators with businesses of all sizes, powering the short-form video revolution across TikTok, Instagram Reels, YouTube Shorts, and beyond.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team section */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-20">
          <h2 className="text-3xl font-bold font-display mb-4 text-charcoal-800 dark:text-white text-center">
            Meet Our Team
          </h2>
          <p className="text-lg text-charcoal-600 dark:text-charcoal-300 max-w-2xl mx-auto text-center mb-12">
            A diverse group of passionate individuals dedicated to empowering the creator economy
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div 
                key={member.name}
                className="bg-white dark:bg-charcoal-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="object-cover w-full h-60"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-charcoal-800 dark:text-white">{member.name}</h3>
                  <p className="text-honey-500 font-medium mb-2">{member.role}</p>
                  <p className="text-charcoal-600 dark:text-charcoal-300 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values section */}
        <div className="bg-gray-50 dark:bg-charcoal-800/50 py-16">
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold font-display mb-4 text-charcoal-800 dark:text-white text-center">
              Our Values
            </h2>
            <p className="text-lg text-charcoal-600 dark:text-charcoal-300 max-w-2xl mx-auto text-center mb-12">
              Principles that guide everything we do at ClipperHive
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  title: "Creator First", 
                  description: "We build with creators in mind, ensuring fair compensation and opportunities for growth." 
                },
                { 
                  title: "Quality Over Quantity", 
                  description: "We believe in the power of exceptional content that resonates, not just content that fills space." 
                },
                { 
                  title: "Continuous Innovation", 
                  description: "We're constantly evolving our platform to meet the changing needs of the creator economy." 
                }
              ].map((value, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-charcoal-800 p-8 rounded-lg shadow-md"
                >
                  <div className="hexagon bg-honey-100 dark:bg-honey-900/20 w-12 h-12 flex items-center justify-center mb-6">
                    <span className="text-honey-500 font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-charcoal-800 dark:text-white mb-3">{value.title}</h3>
                  <p className="text-charcoal-600 dark:text-charcoal-300">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
