
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-charcoal-900">
      <NavBar />
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-charcoal-800 dark:text-white mb-8">Terms of Service</h1>
          
          <div className="bg-white dark:bg-charcoal-800 rounded-xl p-8 shadow-sm">
            <div className="prose dark:prose-invert max-w-none">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using ClipperHive's services, you acknowledge that you have read, 
                understood, and agree to be bound by these Terms of Service. If you do not agree 
                with any part of these terms, you may not use our services.
              </p>
              
              <h2>2. Description of Service</h2>
              <p>
                ClipperHive provides a platform connecting brands with content clippers for the creation 
                of short-form video content. Our service includes marketplace listings, project management 
                tools, and payment processing for completed projects.
              </p>
              
              <h2>3. User Accounts</h2>
              <p>
                To use certain features of our services, you must register for an account. You are 
                responsible for maintaining the confidentiality of your account information and for 
                all activities that occur under your account.
              </p>
              
              <h2>4. Content Rights and Licensing</h2>
              <p>
                Users retain ownership of their original content. By using our platform, you grant 
                ClipperHive a non-exclusive license to display, promote, and distribute content as 
                necessary to provide our services.
              </p>
              
              <h2>5. Payments and Fees</h2>
              <p>
                ClipperHive charges fees for successful transactions between brands and clippers. 
                Fee structures are outlined in our pricing page and may be updated from time to time 
                with notice to users.
              </p>
              
              <h2>6. Prohibited Activities</h2>
              <p>
                Users may not engage in illegal activities, intellectual property infringement, 
                harassment, or any actions that interfere with the proper functioning of our services.
              </p>
              
              <h2>7. Termination</h2>
              <p>
                ClipperHive reserves the right to terminate or suspend accounts that violate these 
                terms or engage in harmful behavior at our sole discretion.
              </p>
              
              <h2>8. Limitation of Liability</h2>
              <p>
                ClipperHive is not liable for indirect, incidental, or consequential damages arising 
                from your use of our services or any content posted on our platform.
              </p>
              
              <h2>9. Changes to Terms</h2>
              <p>
                We may modify these terms at any time. Continued use of our services following any 
                changes constitutes acceptance of the modified terms.
              </p>
              
              <h2>10. Contact Information</h2>
              <p>
                If you have questions about these Terms, please contact us at legal@clipperhive.com.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
