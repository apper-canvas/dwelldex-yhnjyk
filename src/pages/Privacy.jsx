import { useState } from 'react';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

function Privacy() {
  const [activeSection, setActiveSection] = useState('collection');

  // Icon component declarations
  const ShieldIcon = getIcon('Shield');
  const DatabaseIcon = getIcon('Database');
  const EyeIcon = getIcon('Eye');
  const PrinterIcon = getIcon('Printer');
  const UserPlusIcon = getIcon('UserPlus');
  const CookieIcon = getIcon('Cookie');
  const AlertCircleIcon = getIcon('AlertCircle');
  const LockIcon = getIcon('Lock');
  const RefreshCwIcon = getIcon('RefreshCw');

  // Privacy sections
  const sections = [
    { id: 'collection', title: 'Information Collection', icon: <DatabaseIcon className="h-5 w-5" /> },
    { id: 'use', title: 'How We Use Information', icon: <EyeIcon className="h-5 w-5" /> },
    { id: 'sharing', title: 'Information Sharing', icon: <UserPlusIcon className="h-5 w-5" /> },
    { id: 'cookies', title: 'Cookies & Tracking', icon: <CookieIcon className="h-5 w-5" /> },
    { id: 'security', title: 'Data Security', icon: <LockIcon className="h-5 w-5" /> },
    { id: 'rights', title: 'Your Rights', icon: <ShieldIcon className="h-5 w-5" /> },
    { id: 'updates', title: 'Policy Updates', icon: <RefreshCwIcon className="h-5 w-5" /> },
    { id: 'contact', title: 'Contact Us', icon: <AlertCircleIcon className="h-5 w-5" /> }
  ];

  const handlePrint = () => {
    window.print();
  };

  const sectionContent = {
    collection: (
      <div>
        <h3 className="text-xl font-bold mb-4">Information We Collect</h3>
        <p className="mb-4">
          We collect various types of information to provide and improve our services. This may include:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>
            <span className="font-medium">Personal Information:</span> Name, email address, phone number, and mailing address when you create an account, contact us, or use certain features.
          </li>
          <li>
            <span className="font-medium">Property Search Information:</span> Your search criteria, viewed properties, saved favorites, and other interactions with our platform.
          </li>
          <li>
            <span className="font-medium">Device Information:</span> Information about your device, browser, IP address, and how you interact with our website.
          </li>
          <li>
            <span className="font-medium">Location Data:</span> With your permission, we may collect precise location data to provide location-based services.
          </li>
        </ul>
        <p>
          We collect information through direct interactions, automated technologies, and occasionally from third parties.
        </p>
      </div>
    ),
    use: (
      <div>
        <h3 className="text-xl font-bold mb-4">How We Use Your Information</h3>
        <p className="mb-4">
          We use the information we collect for various purposes, including:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Providing and improving our services</li>
          <li>Personalizing your experience on our platform</li>
          <li>Processing property inquiries and connecting you with sellers or agents</li>
          <li>Sending you updates about properties matching your criteria</li>
          <li>Communicating with you about your account or our services</li>
          <li>Conducting analytics to better understand how users interact with our platform</li>
          <li>Ensuring the security and integrity of our services</li>
          <li>Complying with legal obligations</li>
        </ul>
        <p>
          We process your information based on legitimate interests, consent, contractual necessity, or legal obligations.
        </p>
      </div>
    ),
    sharing: (
      <div>
        <h3 className="text-xl font-bold mb-4">Information Sharing</h3>
        <p className="mb-4">
          We may share your information with:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>
            <span className="font-medium">Property Listers and Agents:</span> When you express interest in a property, we share your contact details with the relevant property lister or agent.
          </li>
          <li>
            <span className="font-medium">Service Providers:</span> Companies that help us provide our services, such as hosting providers, analytics services, customer support tools, and payment processors.
          </li>
          <li>
            <span className="font-medium">Business Partners:</span> Trusted partners who may offer complementary services like mortgage brokers or moving services.
          </li>
          <li>
            <span className="font-medium">Legal Requirements:</span> When required by law, court order, or governmental authority.
          </li>
        </ul>
        <p>
          We do not sell your personal information to third parties for advertising purposes.
        </p>
      </div>
    ),
    cookies: (
      <div>
        <h3 className="text-xl font-bold mb-4">Cookies & Tracking Technologies</h3>
        <p className="mb-4">
          We use cookies and similar tracking technologies to:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Remember your preferences and settings</li>
          <li>Keep you logged in across sessions</li>
          <li>Understand how you use our platform</li>
          <li>Analyze the performance of our website</li>
          <li>Customize our advertising and content</li>
        </ul>
        <p className="mb-4">
          You can manage your cookie preferences through your browser settings. However, disabling certain cookies may affect the functionality of our services.
        </p>
        <p>
          We work with analytics providers like Google Analytics to understand how users interact with our platform. These providers may collect information about your online activities across different websites.
        </p>
      </div>
    ),
    security: (
      <div>
        <h3 className="text-xl font-bold mb-4">Data Security</h3>
        <p className="mb-4">
          We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. Our security measures include:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Encryption of data in transit and at rest</li>
          <li>Regular security assessments and testing</li>
          <li>Access controls and authentication mechanisms</li>
          <li>Regular security training for our employees</li>
          <li>Monitoring for suspicious activities</li>
        </ul>
        <p>
          While we strive to use commercially acceptable means to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.
        </p>
      </div>
    ),
    rights: (
      <div>
        <h3 className="text-xl font-bold mb-4">Your Privacy Rights</h3>
        <p className="mb-4">
          Depending on your location, you may have certain rights regarding your personal information:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Right to access the personal information we hold about you</li>
          <li>Right to correct inaccurate information</li>
          <li>Right to delete your personal information</li>
          <li>Right to restrict certain processing of your data</li>
          <li>Right to data portability</li>
          <li>Right to object to certain processing activities</li>
          <li>Right to withdraw consent at any time</li>
        </ul>
        <p>
          To exercise these rights, please contact us at privacy@dwelldex.com. We will respond to your request within the timeframe required by applicable law.
        </p>
      </div>
    ),
    updates: (
      <div>
        <h3 className="text-xl font-bold mb-4">Privacy Policy Updates</h3>
        <p className="mb-4">
          We may update this Privacy Policy from time to time to reflect changes in our practices, services, or applicable laws. We will notify you of any material changes by:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Posting a notice on our website</li>
          <li>Sending an email to the address associated with your account</li>
          <li>Displaying a prominent notice when you next log in</li>
        </ul>
        <p>
          The "Last Updated" date at the top of this Privacy Policy indicates when it was last revised. We encourage you to review this policy periodically to stay informed about how we protect your information.
        </p>
      </div>
    ),
    contact: (
      <div>
        <h3 className="text-xl font-bold mb-4">Contact Us About Privacy</h3>
        <p className="mb-4">
          If you have any questions, concerns, or feedback about this Privacy Policy or our privacy practices, please contact us at:
        </p>
        <div className="bg-surface-100 dark:bg-surface-700 p-4 rounded-lg mb-4">
          <p className="font-medium">Email: privacy@dwelldex.com</p>
          <p className="font-medium">Address: 1234 Property Lane, Suite 500, San Francisco, CA 94103</p>
          <p className="font-medium">Phone: +1 (555) 123-4567</p>
        </div>
        <p>
          If you have an unresolved privacy concern that we have not addressed satisfactorily, please contact your local data protection authority.
        </p>
      </div>
    )
  };

  return (
    <div className="privacy-policy">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 to-surface-100 dark:from-primary/5 dark:to-surface-800 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="mb-6">Privacy Policy</h1>
            <p className="text-lg md:text-xl text-surface-600 dark:text-surface-400 mb-8">
              Last Updated: May 15, 2023
            </p>
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/10 dark:bg-primary/20 text-primary mb-4">
              <ShieldIcon className="h-8 w-8" />
            </div>
            <p className="text-surface-600 dark:text-surface-400">
              Your privacy is important to us. This Privacy Policy explains how DwellDex collects, uses, and safeguards your information when you use our services.
            </p>
            <button 
              onClick={handlePrint}
              className="mt-8 inline-flex items-center px-4 py-2 bg-white dark:bg-surface-700 border border-surface-300 dark:border-surface-600 rounded-lg shadow-sm hover:bg-surface-50 dark:hover:bg-surface-600 transition-colors print:hidden"
              aria-label="Print Privacy Policy"
            >
              <PrinterIcon className="h-5 w-5 mr-2 text-surface-600 dark:text-surface-400" />
              <span className="text-surface-800 dark:text-surface-200 font-medium">
                Print as PDF
              </span>
            </button>

          </motion.div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16 bg-surface-50 dark:bg-surface-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 print:grid-cols-1 print:gap-0">
            {/* Navigation Sidebar */}
            <div className="lg:sticky lg:top-20 h-fit print:hidden">
              <div className="bg-white dark:bg-surface-800 rounded-xl shadow-neu-light dark:shadow-neu-dark p-4 print:shadow-none">
                <h3 className="font-bold text-lg mb-4">Privacy Policy Contents</h3>
                <nav>
                  <ul className="space-y-1">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <button
                          onClick={() => setActiveSection(section.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                            activeSection === section.id
                              ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light'
                              : 'hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300'
                          }`}
                        >
                          {section.icon}
                          <span>{section.title}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
            
            {/* Content Area */}
            <div className="lg:col-span-3 print:col-span-full">
              <div className="bg-white dark:bg-surface-800 rounded-xl shadow-neu-light dark:shadow-neu-dark p-6 md:p-8 print:shadow-none print:p-0 print:bg-white">
                {/* Print-only all sections header */}
                <div className="hidden print:block print:mb-8">
                  <h2 className="text-2xl font-bold mb-6 print:text-black">Complete Privacy Policy</h2>
                </div>
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {sectionContent[activeSection]}
                  
                  {/* Print-only: all other sections */}
                  <div className="hidden print:block print:mt-8">
                    {sections
                      .filter(section => section.id !== activeSection)
                      .map(section => (
                        <div key={section.id} className="print:mb-10">
                          <hr className="print:mb-6 print:border-gray-300" />
                          {sectionContent[section.id]}
                        </div>
                      ))}
                  </div>
                  
                  {/* Print-only footer */}
                  <div className="hidden print:block print:mt-12 print:border-t print:border-gray-300 print:pt-6">
                    <div className="print:flex print:justify-between">
                      <div>
                        <p className="print:text-sm print:text-gray-600">
                          DwellDex Privacy Policy
                        </p>
                      </div>
                      <div>
                        <p className="print:text-sm print:text-gray-600">
                          Last Updated: May 15, 2023
                        </p>
                      </div>
                    </div>
                    <p className="print:text-sm print:text-gray-600 print:mt-2">
                      This document was printed on {new Date().toLocaleDateString()}
                    </p>
                    <p className="print:text-sm print:text-gray-600 print:mt-4">
                      For the most up-to-date version of our Privacy Policy, please visit{" "}
                      <span className="print:font-medium">
                        https://dwelldex.com/privacy
                      </span>
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Privacy;