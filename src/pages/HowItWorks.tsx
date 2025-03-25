import React, { useEffect } from 'react';
import Footer from '@/components/Footer';
import { CheckCircle, ArrowRight, Upload, Search, Calendar, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks: React.FC = () => {
  useEffect(() => {
    // Add the intersection observer for animation-on-scroll elements
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Observe all elements with the animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });
    
    return () => {
      // Clean up the observer when the component unmounts
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-honey-50 dark:from-charcoal-900 dark:to-charcoal-800">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal-800 dark:text-white mb-6 animate-fade-in">
            How ClipperHive Works
          </h1>
          <p className="text-xl text-charcoal-600 dark:text-charcoal-300 max-w-3xl mx-auto mb-8 animate-fade-in">
            We've built a streamlined platform that connects brands with professional content clippers for short-form video creation.
          </p>
          <div className="flex justify-center gap-4 animate-fade-in">
            <a href="#for-brands" className="brand-button">For Brands</a>
            <a href="#for-clippers" className="secondary-button">For Clippers</a>
          </div>
        </div>
      </section>
      
      {/* For Brands Process */}
      <section id="for-brands" className="section-padding bg-white dark:bg-charcoal-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <span className="inline-block bg-honey-100 dark:bg-charcoal-700 text-honey-600 dark:text-honey-400 px-4 py-1 rounded-full text-sm font-medium mb-4">
              Brand Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-charcoal-800 dark:text-white">
              How it works for Brands
            </h2>
            <p className="text-lg text-charcoal-600 dark:text-charcoal-300 max-w-2xl mx-auto">
              Find the perfect content clipper for your project in 4 simple steps.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-honey-200 dark:bg-charcoal-700 -translate-x-1/2"></div>
            
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center mb-16 md:mb-24 relative">
              <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 text-right animate-on-scroll">
                <h3 className="text-2xl font-bold mb-3 text-charcoal-800 dark:text-white">Create Your Project</h3>
                <p className="text-charcoal-600 dark:text-charcoal-300">
                  Define your project requirements, including platform (TikTok, Instagram, YouTube), budget, timeline, and any specific needs.
                </p>
              </div>
              
              <div className="z-10 flex items-center justify-center bg-honey-500 w-14 h-14 rounded-full shadow-md animate-on-scroll">
                <Upload className="h-6 w-6 text-white" />
              </div>
              
              <div className="md:w-1/2 md:pl-12 animate-on-scroll">
                <div className="bg-honey-50 dark:bg-charcoal-800 p-5 rounded-lg shadow-sm">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-honey-500 mr-2 mt-0.5" />
                      <span>Choose your content type and target audience</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-honey-500 mr-2 mt-0.5" />
                      <span>Set your budget and project timeline</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-honey-500 mr-2 mt-0.5" />
                      <span>Upload reference materials and brand guidelines</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center mb-16 md:mb-24 relative">
              <div className="md:w-1/2 md:pl-12 mb-8 md:mb-0 animate-on-scroll">
                <h3 className="text-2xl font-bold mb-3 text-charcoal-800 dark:text-white">Find the Perfect Clipper</h3>
                <p className="text-charcoal-600 dark:text-charcoal-300">
                  Browse our network of pre-vetted clippers or let our matching system recommend the best fit for your project.
                </p>
              </div>
              
              <div className="z-10 flex items-center justify-center bg-honey-500 w-14 h-14 rounded-full shadow-md animate-on-scroll">
                <Search className="h-6 w-6 text-white" />
              </div>
              
              <div className="md:w-1/2 md:pr-12 text-right animate-on-scroll">
                <div className="bg-honey-50 dark:bg-charcoal-800 p-5 rounded-lg shadow-sm">
                  <ul className="space-y-3">
                    <li className="flex items-start justify-end">
                      <span>Filter by platform specialization, style, and expertise</span>
                      <CheckCircle className="h-5 w-5 text-honey-500 ml-2 mt-0.5" />
                    </li>
                    <li className="flex items-start justify-end">
                      <span>Review portfolios and previous work examples</span>
                      <CheckCircle className="h-5 w-5 text-honey-500 ml-2 mt-0.5" />
                    </li>
                    <li className="flex items-start justify-end">
                      <span>Read clipper ratings and client testimonials</span>
                      <CheckCircle className="h-5 w-5 text-honey-500 ml-2 mt-0.5" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center mb-16 md:mb-24 relative">
              <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 text-right animate-on-scroll">
                <h3 className="text-2xl font-bold mb-3 text-charcoal-800 dark:text-white">Collaborate and Create</h3>
                <p className="text-charcoal-600 dark:text-charcoal-300">
                  Work directly with your selected clipper on your project, provide feedback, and receive updates.
                </p>
              </div>
              
              <div className="z-10 flex items-center justify-center bg-honey-500 w-14 h-14 rounded-full shadow-md animate-on-scroll">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              
              <div className="md:w-1/2 md:pl-12 animate-on-scroll">
                <div className="bg-honey-50 dark:bg-charcoal-800 p-5 rounded-lg shadow-sm">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-honey-500 mr-2 mt-0.5" />
                      <span>Communicate through our secure platform</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-honey-500 mr-2 mt-0.5" />
                      <span>Request revisions and provide feedback</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-honey-500 mr-2 mt-0.5" />
                      <span>Track progress with milestone updates</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Step 4 */}
            <div className="flex flex-col md:flex-row-reverse items-center relative">
              <div className="md:w-1/2 md:pl-12 mb-8 md:mb-0 animate-on-scroll">
                <h3 className="text-2xl font-bold mb-3 text-charcoal-800 dark:text-white">Receive and Release Payment</h3>
                <p className="text-charcoal-600 dark:text-charcoal-300">
                  Review the final content, approve the release of funds, and build an ongoing relationship with your clipper.
                </p>
              </div>
              
              <div className="z-10 flex items-center justify-center bg-honey-500 w-14 h-14 rounded-full shadow-md animate-on-scroll">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              
              <div className="md:w-1/2 md:pr-12 text-right animate-on-scroll">
                <div className="bg-honey-50 dark:bg-charcoal-800 p-5 rounded-lg shadow-sm">
                  <ul className="space-y-3">
                    <li className="flex items-start justify-end">
                      <span>Download final content in your preferred formats</span>
                      <CheckCircle className="h-5 w-5 text-honey-500 ml-2 mt-0.5" />
                    </li>
                    <li className="flex items-start justify-end">
                      <span>Release payment through our secure escrow system</span>
                      <CheckCircle className="h-5 w-5 text-honey-500 ml-2 mt-0.5" />
                    </li>
                    <li className="flex items-start justify-end">
                      <span>Leave a review and add to your trusted creators</span>
                      <CheckCircle className="h-5 w-5 text-honey-500 ml-2 mt-0.5" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center animate-on-scroll">
            <Link 
              to="/register?type=brand" 
              className="brand-button group inline-flex items-center"
            >
              Get Started as a Brand
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* For Clippers Process */}
      <section id="for-clippers" className="section-padding bg-honey-50 dark:bg-charcoal-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <span className="inline-block bg-honey-100 dark:bg-charcoal-700 text-honey-600 dark:text-honey-400 px-4 py-1 rounded-full text-sm font-medium mb-4">
              Clipper Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-charcoal-800 dark:text-white">
              How it works for Clippers
            </h2>
            <p className="text-lg text-charcoal-600 dark:text-charcoal-300 max-w-2xl mx-auto">
              Turn your clipping skills into a steady income in 4 easy steps.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-honey-200 dark:bg-charcoal-700 -translate-x-1/2"></div>
            
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center mb-16 md:mb-24 relative">
              <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 text-right animate-on-scroll">
                <h3 className="text-2xl font-bold mb-3 text-charcoal-800 dark:text-white">Create Your Profile</h3>
                <p className="text-charcoal-600 dark:text-charcoal-300">
                  Set up your professional clipper profile, showcase your best work, and highlight your expertise in specific platforms and niches.
                </p>
              </div>
              
              <div className="z-10 flex items-center justify-center bg-honey-500 w-14 h-14 rounded-full shadow-md animate-on-scroll">
                <Upload className="h-6 w-6 text-white" />
              </div>
              
              <div className="md:w-1/2 md:pl-12 animate-on-scroll">
                <div className="bg-honey-50 dark:bg-charcoal-800 p-5 rounded-lg shadow-sm">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-honey-500 mr-2 mt-0.5" />
                      <span>Upload your portfolio and sample clips</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-honey-500 mr-2 mt-0.5" />
                      <span>Set your rates and availability</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-honey-500 mr-2 mt-0.5" />
                      <span>Specify your platform specialties</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center mb-16 md:mb-24 relative">
              <div className="md:w-1/2 md:pl-12 mb-8 md:mb-0 animate-on-scroll">
                <h3 className="text-2xl font-bold mb-3 text-charcoal-800 dark:text-white">Browse Projects</h3>
                <p className="text-charcoal-600 dark:text-charcoal-300">
                  Find projects that match your skills and interests, and submit proposals to brands you'd love to work with.
                </p>
              </div>
              
              <div className="z-10 flex items-center justify-center bg-honey-500 w-14 h-14 rounded-full shadow-md animate-on-scroll">
                <Search className="h-6 w-6 text-white" />
              </div>
              
              <div className="md:w-1/2 md:pr-12 text-right animate-on-scroll">
                <div className="bg-honey-50 dark:bg-charcoal-800 p-5 rounded-lg shadow-sm">
                  <ul className="space-y-3">
                    <li className="flex items-start justify-end">
                      <span>Filter projects by platform and requirements</span>
                      <CheckCircle className="h-5 w-5 text-honey-500 ml-2 mt-0.5" />
                    </li>
                    <li className="flex items-start justify-end">
                      <span>Submit customized proposals to brands</span>
                      <CheckCircle className="h-5 w-5 text-honey-500 ml-2 mt-0.5" />
                    </li>
                    <li className="flex items-start justify-end">
                      <span>Set clear expectations and timelines</span>
                      <CheckCircle className="h-5 w-5 text-honey-500 ml-2 mt-0.5" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center mb-16 md:mb-24 relative">
              <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 text-right animate-on-scroll">
                <h3 className="text-2xl font-bold mb-3 text-charcoal-800 dark:text-white">Deliver Quality Work</h3>
                <p className="text-charcoal-600 dark:text-charcoal-300">
                  Create engaging short-form content that meets brand requirements and drives audience engagement.
                </p>
              </div>
              
              <div className="z-10 flex items-center justify-center bg-honey-500 w-14 h-14 rounded-full shadow-md animate-on-scroll">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              
              <div className="md:w-1/2 md:pl-12 animate-on-scroll">
                <div className="bg-honey-50 dark:bg-charcoal-800 p-5 rounded-lg shadow-sm">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-honey-500 mr-2 mt-0.5" />
                      <span>Follow brand guidelines and requirements</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-honey-500 mr-2 mt-0.5" />
                      <span>Optimize content for each platform</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-honey-500 mr-2 mt-0.5" />
                      <span>Meet project deadlines consistently</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Step 4 */}
            <div className="flex flex-col md:flex-row-reverse items-center relative">
              <div className="md:w-1/2 md:pl-12 mb-8 md:mb-0 animate-on-scroll">
                <h3 className="text-2xl font-bold mb-3 text-charcoal-800 dark:text-white">Grow Your Business</h3>
                <p className="text-charcoal-600 dark:text-charcoal-300">
                  Build your reputation, earn great reviews, and develop long-term relationships with brands.
                </p>
              </div>
              
              <div className="z-10 flex items-center justify-center bg-honey-500 w-14 h-14 rounded-full shadow-md animate-on-scroll">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              
              <div className="md:w-1/2 md:pr-12 text-right animate-on-scroll">
                <div className="bg-honey-50 dark:bg-charcoal-800 p-5 rounded-lg shadow-sm">
                  <ul className="space-y-3">
                    <li className="flex items-start justify-end">
                      <span>Receive secure payments through escrow</span>
                      <CheckCircle className="h-5 w-5 text-honey-500 ml-2 mt-0.5" />
                    </li>
                    <li className="flex items-start justify-end">
                      <span>Collect testimonials and build reputation</span>
                      <CheckCircle className="h-5 w-5 text-honey-500 ml-2 mt-0.5" />
                    </li>
                    <li className="flex items-start justify-end">
                      <span>Establish recurring client relationships</span>
                      <CheckCircle className="h-5 w-5 text-honey-500 ml-2 mt-0.5" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center animate-on-scroll">
            <Link 
              to="/register?type=clipper" 
              className="secondary-button group inline-flex items-center"
            >
              Join as a Clipper
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="section-padding bg-white dark:bg-charcoal-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <span className="inline-block bg-honey-100 dark:bg-charcoal-700 text-honey-600 dark:text-honey-400 px-4 py-1 rounded-full text-sm font-medium mb-4">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-charcoal-800 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-charcoal-600 dark:text-charcoal-300">
              Everything you need to know about ClipperHive.
            </p>
          </div>
          
          <div className="space-y-6 animate-on-scroll">
            {[
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
            ].map((faq, index) => (
              <div 
                key={index} 
                className="bg-honey-50 dark:bg-charcoal-800 rounded-lg p-6 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <h3 className="text-xl font-semibold mb-3 text-charcoal-800 dark:text-white">{faq.question}</h3>
                <p className="text-charcoal-600 dark:text-charcoal-300">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center animate-on-scroll">
            <Link to="/faq" className="ghost-button">
              View All FAQs
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section-padding bg-honey-50 dark:bg-charcoal-800">
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-white dark:bg-charcoal-700 rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-charcoal-600 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-charcoal-800 dark:text-white">
              Ready to get started?
            </h2>
            <p className="text-lg text-charcoal-600 dark:text-charcoal-300 mb-8 max-w-2xl mx-auto">
              Join the ClipperHive community today and revolutionize your content strategy.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register?type=brand" className="brand-button py-3 px-8">
                I'm a Brand
              </Link>
              <Link to="/register?type=clipper" className="secondary-button py-3 px-8">
                I'm a Clipper
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
