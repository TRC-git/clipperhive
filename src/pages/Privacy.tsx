
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-charcoal-900">
      <NavBar />
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-charcoal-800 dark:text-white mb-8">Privacy Policy</h1>
          
          <div className="bg-white dark:bg-charcoal-800 rounded-xl p-8 shadow-sm">
            <div className="prose dark:prose-invert max-w-none">
              <p className="lead">
                Effective Date: August 1, 2023
              </p>
              
              <h2>1. Introduction</h2>
              <p>
                ClipperHive ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy 
                explains how we collect, use, and share information about you when you use our services.
              </p>
              
              <h2>2. Information We Collect</h2>
              <p>
                We collect information you provide directly, including:
              </p>
              <ul>
                <li>Account information (name, email, password)</li>
                <li>Profile information (bio, skills, portfolio)</li>
                <li>Payment information</li>
                <li>Communications with us and other users</li>
                <li>Content you upload or create on our platform</li>
              </ul>
              
              <p>
                We also automatically collect:
              </p>
              <ul>
                <li>Usage information (pages visited, actions taken)</li>
                <li>Device information (IP address, browser type)</li>
                <li>Cookies and similar technologies</li>
              </ul>
              
              <h2>3. How We Use Your Information</h2>
              <p>
                We use your information to:
              </p>
              <ul>
                <li>Provide and improve our services</li>
                <li>Process transactions and payments</li>
                <li>Communicate with you about our services</li>
                <li>Monitor and analyze trends and usage</li>
                <li>Prevent fraud and enhance security</li>
                <li>Comply with legal obligations</li>
              </ul>
              
              <h2>4. Sharing Your Information</h2>
              <p>
                We may share your information with:
              </p>
              <ul>
                <li>Other users (as necessary for the service)</li>
                <li>Service providers who help us operate our business</li>
                <li>Legal authorities when required by law</li>
                <li>Business partners with your consent</li>
              </ul>
              
              <h2>5. Your Rights and Choices</h2>
              <p>
                Depending on your location, you may have rights to:
              </p>
              <ul>
                <li>Access personal information we hold about you</li>
                <li>Correct inaccurate information</li>
                <li>Delete your personal information</li>
                <li>Object to certain processing activities</li>
                <li>Data portability</li>
              </ul>
              
              <h2>6. Data Security</h2>
              <p>
                We implement reasonable security measures to protect your personal information from 
                unauthorized access and disclosure.
              </p>
              
              <h2>7. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than the country 
                in which you reside, which may have different data protection laws.
              </p>
              
              <h2>8. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of significant 
                changes by posting the new policy or by other means.
              </p>
              
              <h2>9. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at privacy@clipperhive.com.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
