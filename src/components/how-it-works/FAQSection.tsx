
import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from './SectionHeader';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection = () => {
  const faqItems: FAQItem[] = [
    {
      question: "What is ClipperHive?",
      answer: "ClipperHive is a specialized marketplace that connects brands with professional content clippers who can transform long-form content into engaging short-form videos for platforms like TikTok, Instagram Reels, and YouTube Shorts."
    },
    {
      question: "How do I get started as a brand?",
      answer: "Simply create an account, set up your brand profile, and post your first project. You'll be able to browse clipper portfolios, receive proposals, and select the perfect creator for your needs."
    },
    {
      question: "How do you vet the clippers on your platform?",
      answer: "All clippers undergo a thorough application process, portfolio review, and skills assessment before being accepted to the platform. We maintain high-quality standards to ensure brands receive professional work."
    },
    {
      question: "What are the fees for using ClipperHive?",
      answer: "Brands pay the agreed project rate plus a small platform fee. Clippers receive their full project rate minus a competitive service fee. Full pricing details are available on our Pricing page."
    },
    {
      question: "Who owns the content created through ClipperHive?",
      answer: "When payment is released, the brand receives full ownership rights to the content as specified in the project agreement. Clippers may request portfolio usage rights if desired."
    }
  ];

  return (
    <section className="section-padding bg-white dark:bg-charcoal-900">
      <div className="max-w-4xl mx-auto">
        <SectionHeader 
          badge="FAQ"
          title="Frequently Asked Questions"
          description="Everything you need to know about ClipperHive."
        />
        
        <div className="mt-10 space-y-2 animate-on-scroll">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-honey-50 dark:bg-charcoal-800 rounded-lg mb-4 overflow-hidden border border-honey-100 dark:border-charcoal-700">
                <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-charcoal-800 dark:text-white hover:no-underline shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-charcoal-600 dark:text-charcoal-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="mt-10 text-center animate-on-scroll">
          <Link to="/faq" className="ghost-button">
            View All FAQs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
