
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ChevronRight, Users, MessageSquare, Share2, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";

const jobOpenings = [
  {
    id: 1,
    title: "Social Media Manager",
    department: "Marketing",
    type: "Full-time",
    location: "Remote",
    icon: <Users className="h-6 w-6 text-honey-500" />,
    description: "Lead our social media strategy across platforms to grow our audience and engage with the creator community.",
    responsibilities: [
      "Develop and implement social media strategies to increase brand awareness",
      "Create engaging content for various platforms (Instagram, TikTok, Twitter, etc.)",
      "Analyze social media metrics and optimize campaigns accordingly",
      "Stay up-to-date with social media trends and best practices",
      "Collaborate with marketing team on cross-channel campaigns"
    ],
    requirements: [
      "2+ years of experience in social media management",
      "Excellent understanding of social media platforms and their audiences",
      "Strong content creation skills and experience with design tools",
      "Knowledge of social media analytics and reporting",
      "Experience working with creators and influencers is a plus"
    ]
  },
  {
    id: 2,
    title: "Discord and Group Moderator",
    department: "Community",
    type: "Part-time / Full-time",
    location: "Remote",
    icon: <MessageSquare className="h-6 w-6 text-honey-500" />,
    description: "Help build and maintain our vibrant community of content creators and brands across Discord and other platforms.",
    responsibilities: [
      "Moderate discussions and ensure community guidelines are followed",
      "Welcome new members and help them navigate the community",
      "Organize and facilitate community events and discussions",
      "Identify and escalate issues that require attention from other teams",
      "Provide feedback on community sentiment and needs"
    ],
    requirements: [
      "Experience moderating online communities, especially Discord",
      "Excellent communication and interpersonal skills",
      "Ability to work flexible hours across different time zones",
      "Familiarity with the creator economy and content creation",
      "Patient and empathetic approach to community management"
    ]
  },
  {
    id: 3,
    title: "Affiliate Manager",
    department: "Growth",
    type: "Full-time",
    location: "Remote",
    icon: <Share2 className="h-6 w-6 text-honey-500" />,
    description: "Build and manage relationships with affiliates and partners to drive platform growth and user acquisition.",
    responsibilities: [
      "Develop and implement affiliate marketing strategies",
      "Recruit, onboard, and manage relationships with affiliates",
      "Monitor affiliate performance and optimize campaigns",
      "Create resources and materials for affiliates",
      "Collaborate with marketing team on promotional strategies"
    ],
    requirements: [
      "2+ years of experience in affiliate or partnership management",
      "Strong relationship building and networking skills",
      "Experience with affiliate marketing platforms and tracking",
      "Analytical mindset and data-driven approach",
      "Knowledge of the creator economy and content creation landscape"
    ]
  },
  {
    id: 4,
    title: "Project Coordinator",
    department: "Operations",
    type: "Full-time",
    location: "Remote",
    icon: <ClipboardList className="h-6 w-6 text-honey-500" />,
    description: "Ensure smooth operations between brands and content clippers by coordinating projects and facilitating communication.",
    responsibilities: [
      "Oversee project workflows and ensure timely delivery",
      "Facilitate communication between brands and content creators",
      "Monitor project quality and adherence to requirements",
      "Troubleshoot and resolve issues that arise during projects",
      "Gather feedback to improve platform services and features"
    ],
    requirements: [
      "2+ years of experience in project management or coordination",
      "Excellent organizational and time management skills",
      "Strong communication and problem-solving abilities",
      "Experience with project management tools and methodologies",
      "Understanding of content creation processes and timelines"
    ]
  }
];

const Careers = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-charcoal-900">
      <NavBar />
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-charcoal-800 dark:text-white mb-4">
              Join the ClipperHive Team
            </h1>
            <p className="text-lg text-charcoal-600 dark:text-charcoal-300 max-w-3xl mx-auto">
              Help us build the future of content creation and connect brands with talented creators worldwide.
              We're a remote-first company with a passion for innovation and creativity.
            </p>
          </div>
          
          {/* Company culture section */}
          <div className="bg-white dark:bg-charcoal-800 rounded-xl p-8 shadow-sm mb-12">
            <h2 className="text-2xl font-bold text-charcoal-800 dark:text-white mb-6">
              Our Culture
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-honey-500 mb-3">Remote-First</h3>
                <p className="text-charcoal-600 dark:text-charcoal-300">
                  Work from anywhere in the world. We believe in flexibility and trust our team to deliver exceptional results regardless of location.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-honey-500 mb-3">Creator-Focused</h3>
                <p className="text-charcoal-600 dark:text-charcoal-300">
                  We're building for creators, by creators. We understand the challenges and opportunities in the creator economy.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-honey-500 mb-3">Inclusive & Diverse</h3>
                <p className="text-charcoal-600 dark:text-charcoal-300">
                  We celebrate diversity and believe that different perspectives make our product and company stronger.
                </p>
              </div>
            </div>
          </div>
          
          {/* Job openings */}
          <h2 className="text-2xl font-bold text-charcoal-800 dark:text-white mb-6">
            Open Positions
          </h2>
          <div className="space-y-6 mb-12">
            {jobOpenings.map((job) => (
              <div key={job.id} className="bg-white dark:bg-charcoal-800 rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="mr-4 p-2 rounded-full bg-honey-100 dark:bg-charcoal-700">
                        {job.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-charcoal-800 dark:text-white">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap items-center mt-1 text-sm text-charcoal-600 dark:text-charcoal-400">
                          <span>{job.department}</span>
                          <span className="mx-2">•</span>
                          <span>{job.type}</span>
                          <span className="mx-2">•</span>
                          <span>{job.location}</span>
                        </div>
                      </div>
                    </div>
                    <Link 
                      to={`/careers/${job.id}`} 
                      className="px-4 py-2 flex items-center text-sm font-medium text-honey-600 hover:text-honey-700 dark:text-honey-500 dark:hover:text-honey-400"
                    >
                      View Details
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                  <p className="mt-4 text-charcoal-600 dark:text-charcoal-300">
                    {job.description}
                  </p>
                  
                  <div className="mt-6 border-t border-gray-200 dark:border-charcoal-700 pt-6">
                    <h4 className="font-medium text-charcoal-800 dark:text-white mb-3">
                      Key Responsibilities
                    </h4>
                    <ul className="list-disc pl-5 space-y-2 text-charcoal-600 dark:text-charcoal-300">
                      {job.responsibilities.slice(0, 3).map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    
                    <h4 className="font-medium text-charcoal-800 dark:text-white mt-5 mb-3">
                      Requirements
                    </h4>
                    <ul className="list-disc pl-5 space-y-2 text-charcoal-600 dark:text-charcoal-300">
                      {job.requirements.slice(0, 3).map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Application CTA */}
          <div className="bg-honey-50 dark:bg-charcoal-700 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-charcoal-800 dark:text-white mb-4">
              Don't see the right role?
            </h2>
            <p className="text-lg text-charcoal-600 dark:text-charcoal-300 mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals to join our team. Send us your resume 
              and tell us how you can contribute to ClipperHive.
            </p>
            <a 
              href="mailto:careers@clipperhive.com" 
              className="inline-block px-6 py-3 bg-honey-500 text-charcoal-800 rounded-lg font-medium hover:bg-honey-600 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Careers;
