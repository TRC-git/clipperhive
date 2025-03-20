
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const Cookies = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-charcoal-900">
      <NavBar />
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-charcoal-800 dark:text-white mb-8">Cookie Policy</h1>
          
          <div className="bg-white dark:bg-charcoal-800 rounded-xl p-8 shadow-sm">
            <div className="prose dark:prose-invert max-w-none">
              <p className="lead">
                Effective Date: August 1, 2023
              </p>
              
              <h2>1. What Are Cookies</h2>
              <p>
                Cookies are small text files that are placed on your device when you visit a website. 
                They are widely used to make websites work more efficiently and provide information to 
                the website owners.
              </p>
              
              <h2>2. How We Use Cookies</h2>
              <p>
                ClipperHive uses cookies for the following purposes:
              </p>
              <ul>
                <li>
                  <strong>Essential Cookies:</strong> These cookies are necessary for the website to function 
                  properly. They enable core functionality such as security, account management, and network management.
                </li>
                <li>
                  <strong>Preference Cookies:</strong> These cookies remember your preferences and settings to 
                  enhance your experience on our site.
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> These cookies help us understand how visitors interact with 
                  our website by collecting and reporting information anonymously.
                </li>
                <li>
                  <strong>Marketing Cookies:</strong> These cookies track your online activity to help advertisers 
                  deliver more relevant advertising or to limit how many times you see an ad.
                </li>
              </ul>
              
              <h2>3. Types of Cookies We Use</h2>
              <h3>First-Party Cookies</h3>
              <p>
                These are cookies that we set and can only be read by our website.
              </p>
              <h3>Third-Party Cookies</h3>
              <p>
                These are cookies set by partners and service providers we work with. They help us understand 
                how you use our site and allow us to provide certain features.
              </p>
              
              <h2>4. Cookie Management</h2>
              <p>
                You can manage your cookie preferences through your browser settings. Most browsers allow 
                you to block or delete cookies. However, please note that if you block essential cookies, 
                you may not be able to access all or parts of our website.
              </p>
              
              <h2>5. Specific Cookies We Use</h2>
              <table className="min-w-full divide-y divide-gray-200 dark:divide-charcoal-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Purpose</th>
                    <th className="px-4 py-3 text-left">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-charcoal-700">
                  <tr>
                    <td className="px-4 py-3">session_id</td>
                    <td className="px-4 py-3">Maintains user session state</td>
                    <td className="px-4 py-3">Session</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">auth_token</td>
                    <td className="px-4 py-3">Authentication</td>
                    <td className="px-4 py-3">30 days</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">_ga</td>
                    <td className="px-4 py-3">Google Analytics</td>
                    <td className="px-4 py-3">2 years</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">_gid</td>
                    <td className="px-4 py-3">Google Analytics</td>
                    <td className="px-4 py-3">24 hours</td>
                  </tr>
                </tbody>
              </table>
              
              <h2>6. Changes to This Cookie Policy</h2>
              <p>
                We may update our Cookie Policy from time to time. We will notify you of any changes by 
                posting the new Cookie Policy on this page and updating the "Effective Date" at the top.
              </p>
              
              <h2>7. Contact Us</h2>
              <p>
                If you have any questions about our Cookie Policy, please contact us at privacy@clipperhive.com.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cookies;
