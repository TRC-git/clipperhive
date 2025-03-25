
import React, { useState } from 'react';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

const FAQ: React.FC = () => {
  const faqCategories = [
    {
      name: "General",
      questions: [
        {
          question: "What is ClipperHive?",
          answer: "ClipperHive is a marketplace that connects brands with skilled content clippers who can transform long-form content into engaging short-form videos for platforms like TikTok, Instagram Reels, and YouTube Shorts."
        },
        {
          question: "How does ClipperHive work?",
          answer: "Brands post projects with their requirements. Clippers apply with their portfolios and proposals. Brands choose the clippers they want to work with. Clippers create and deliver the content. Payment is processed through our secure platform."
        },
        {
          question: "Is ClipperHive available worldwide?",
          answer: "Yes, ClipperHive is available globally. We have clippers and brands from around the world using our platform."
        }
      ]
    },
    {
      name: "For Brands",
      questions: [
        {
          question: "How do I find the right clipper for my project?",
          answer: "You can browse clipper profiles, view their portfolios, and check their ratings. You can also post a project and receive applications from interested clippers."
        },
        {
          question: "What if I'm not satisfied with the work?",
          answer: "We have a revision policy in place. If the work doesn't meet your requirements, you can request revisions. If issues persist, our support team will assist in resolving the situation."
        },
        {
          question: "How much does it cost to hire a clipper?",
          answer: "Prices vary depending on the clipper's experience, the complexity of the project, and your specific requirements. You can set your budget when posting a project."
        }
      ]
    },
    {
      name: "For Clippers",
      questions: [
        {
          question: "How do I become a clipper on ClipperHive?",
          answer: "Sign up for an account, create your profile, showcase your portfolio, and start applying for projects that match your skills and interests."
        },
        {
          question: "How do I get paid?",
          answer: "Payments are processed through our secure platform. Once a project is completed and approved by the brand, payment is released to your account. You can then withdraw funds to your preferred payment method."
        },
        {
          question: "Can I set my own rates?",
          answer: "Yes, you have the freedom to set your own rates and decide which projects you want to apply for based on the budget offered."
        }
      ]
    },
    {
      name: "Technical",
      questions: [
        {
          question: "What file formats do you support?",
          answer: "We support all major video and audio formats including MP4, MOV, AVI, WAV, and MP3."
        },
        {
          question: "Is my content secure on your platform?",
          answer: "Yes, we take security seriously. All content is encrypted and protected. We have strict privacy policies in place to protect your intellectual property."
        },
        {
          question: "Do you offer integration with other platforms?",
          answer: "We offer direct publishing to major social media platforms and integrations with popular content management systems. More integrations are being added regularly."
        }
      ]
    }
  ];

  const [activeCategory, setActiveCategory] = useState("General");
  const [openQuestions, setOpenQuestions] = useState<{[key: string]: boolean}>({});

  const toggleQuestion = (question: string) => {
    setOpenQuestions(prev => ({
      ...prev,
      [question]: !prev[question]
    }));
  };

  return (
    <>
      <NavBar />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4 text-charcoal-800 dark:text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-charcoal-600 dark:text-charcoal-300 max-w-2xl mx-auto">
            Find answers to common questions about ClipperHive
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex overflow-x-auto scrollbar-hide space-x-2 mb-8 pb-2">
          {faqCategories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                activeCategory === category.name
                  ? 'bg-honey-500 text-charcoal-800'
                  : 'bg-gray-100 dark:bg-charcoal-700 text-charcoal-700 dark:text-charcoal-300 hover:bg-gray-200 dark:hover:bg-charcoal-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* FAQ accordion */}
        <div className="bg-white dark:bg-charcoal-800 rounded-lg shadow-md overflow-hidden mb-12">
          {faqCategories
            .find(category => category.name === activeCategory)?.questions
            .map((faq, index) => (
              <div 
                key={index}
                className={`border-b border-gray-100 dark:border-charcoal-700 last:border-b-0`}
              >
                <button
                  onClick={() => toggleQuestion(faq.question)}
                  className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
                >
                  <span className="font-medium text-charcoal-800 dark:text-white">{faq.question}</span>
                  {openQuestions[faq.question] ? (
                    <Minus className="h-5 w-5 text-honey-500 flex-shrink-0" />
                  ) : (
                    <Plus className="h-5 w-5 text-honey-500 flex-shrink-0" />
                  )}
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ${
                    openQuestions[faq.question] ? 'max-h-96 pb-4' : 'max-h-0'
                  }`}
                >
                  <p className="text-charcoal-600 dark:text-charcoal-300">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
        </div>

        {/* Still have questions */}
        <div className="bg-gray-50 dark:bg-charcoal-700/30 rounded-lg p-8 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal-800 dark:text-white mb-4">Still have questions?</h2>
          <p className="text-charcoal-600 dark:text-charcoal-300 mb-6">
            Our support team is here to help. Reach out to us and we'll get back to you as soon as possible.
          </p>
          <Button className="bg-honey-500 hover:bg-honey-600 text-charcoal-800">
            Contact Support
          </Button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default FAQ;
