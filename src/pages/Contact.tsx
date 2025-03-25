
import React from 'react';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, MessageSquare } from "lucide-react";

const Contact: React.FC = () => {
  return (
    <>
      <NavBar />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4 text-charcoal-800 dark:text-white">
            Get in Touch
          </h1>
          <p className="text-lg text-charcoal-600 dark:text-charcoal-300 max-w-2xl mx-auto">
            We'd love to hear from you. Reach out with any questions, feedback, or inquiries.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact info */}
          <div className="lg:w-1/3">
            <div className="bg-white dark:bg-charcoal-800 rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-charcoal-800 dark:text-white mb-6">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-honey-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-charcoal-800 dark:text-white">Email</h3>
                    <p className="text-charcoal-600 dark:text-charcoal-300 mt-1">
                      <a href="mailto:hello@clipperhive.com" className="hover:text-honey-500 transition-colors">
                        hello@clipperhive.com
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-honey-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-charcoal-800 dark:text-white">Phone</h3>
                    <p className="text-charcoal-600 dark:text-charcoal-300 mt-1">
                      <a href="tel:+15555551234" className="hover:text-honey-500 transition-colors">
                        +1 (555) 555-1234
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-honey-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-charcoal-800 dark:text-white">Office</h3>
                    <p className="text-charcoal-600 dark:text-charcoal-300 mt-1">
                      123 Creator Avenue<br />
                      San Francisco, CA 94107<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MessageSquare className="h-6 w-6 text-honey-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-charcoal-800 dark:text-white">Live Chat</h3>
                    <p className="text-charcoal-600 dark:text-charcoal-300 mt-1">
                      Available Monday to Friday<br />
                      9:00 AM - 6:00 PM PT
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-charcoal-700">
                <h3 className="font-medium text-charcoal-800 dark:text-white mb-4">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                    <a 
                      key={social}
                      href={`#${social}`}
                      className="bg-gray-100 dark:bg-charcoal-700 h-10 w-10 rounded-full flex items-center justify-center hover:bg-honey-500 transition-colors"
                    >
                      <img src={`/${social}-icon.svg`} alt={social} className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact form */}
          <div className="lg:w-2/3">
            <div className="bg-white dark:bg-charcoal-800 rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-charcoal-800 dark:text-white mb-6">
                Send Us a Message
              </h2>
              
              <form>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-charcoal-600 focus:outline-none focus:ring-2 focus:ring-honey-500 dark:bg-charcoal-700 dark:text-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-charcoal-600 focus:outline-none focus:ring-2 focus:ring-honey-500 dark:bg-charcoal-700 dark:text-white"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-charcoal-600 focus:outline-none focus:ring-2 focus:ring-honey-500 dark:bg-charcoal-700 dark:text-white"
                    placeholder="How can we help you?"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-charcoal-600 focus:outline-none focus:ring-2 focus:ring-honey-500 dark:bg-charcoal-700 dark:text-white"
                    placeholder="Tell us about your inquiry..."
                  ></textarea>
                </div>
                
                <div className="flex items-center mb-8">
                  <input
                    type="checkbox"
                    id="privacy"
                    className="h-4 w-4 text-honey-500 focus:ring-honey-500 border-gray-300 rounded"
                  />
                  <label htmlFor="privacy" className="ml-2 block text-sm text-charcoal-600 dark:text-charcoal-400">
                    I agree to the <a href="/privacy" className="text-honey-500 hover:underline">Privacy Policy</a>
                  </label>
                </div>
                
                <Button className="w-full sm:w-auto bg-honey-500 hover:bg-honey-600 text-charcoal-800">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
