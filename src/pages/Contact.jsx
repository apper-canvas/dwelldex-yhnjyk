import { useState } from 'react';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

function Contact({ toast }) {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Icon component declarations
  const MailIcon = getIcon('Mail');
  const PhoneIcon = getIcon('Phone');
  const MapPinIcon = getIcon('MapPin');
  const SendIcon = getIcon('Send');
  const UserIcon = getIcon('User');
  const AtSignIcon = getIcon('AtSign');
  const MessageSquareIcon = getIcon('MessageSquare');
  const ClockIcon = getIcon('Clock');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        toast.success("Your message has been sent! We'll get back to you soon.");
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setIsSubmitting(false);
      }, 1500);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 to-surface-100 dark:from-primary/5 dark:to-surface-800 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="mb-6">Contact Us</h1>
            <p className="text-lg md:text-xl text-surface-600 dark:text-surface-400 mb-8">
              Have questions about a property? Need help with your search? We're here to assist you every step of the way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 bg-surface-50 dark:bg-surface-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 dark:bg-primary/20 text-primary">
                    <MapPinIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Our Office</h3>
                    <p className="text-surface-600 dark:text-surface-400">
                      1234 Property Lane<br />
                      Suite 500<br />
                      San Francisco, CA 94103
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 dark:bg-primary/20 text-primary">
                    <MailIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email Us</h3>
                    <p className="text-surface-600 dark:text-surface-400">
                      info@dwelldex.com<br />
                      support@dwelldex.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 dark:bg-primary/20 text-primary">
                    <PhoneIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Call Us</h3>
                    <p className="text-surface-600 dark:text-surface-400">
                      +1 (555) 123-4567<br />
                      Mon-Fri, 9am-6pm PST
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 dark:bg-primary/20 text-primary">
                    <ClockIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Business Hours</h3>
                    <p className="text-surface-600 dark:text-surface-400">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-surface-800 rounded-xl shadow-neu-light dark:shadow-neu-dark p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-surface-700 dark:text-surface-300">
                    Your Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center justify-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-surface-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`pl-10 w-full rounded-lg border ${errors.name ? 'border-red-500 dark:border-red-500' : 'border-surface-300 dark:border-surface-600'} p-3 bg-white dark:bg-surface-700 focus:ring-2 focus:ring-primary dark:focus:ring-primary-light focus:border-transparent outline-none transition-all`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-surface-700 dark:text-surface-300">
                    Your Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center justify-center pointer-events-none">
                      <AtSignIcon className="h-5 w-5 text-surface-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`pl-10 w-full rounded-lg border ${errors.email ? 'border-red-500 dark:border-red-500' : 'border-surface-300 dark:border-surface-600'} p-3 bg-white dark:bg-surface-700 focus:ring-2 focus:ring-primary dark:focus:ring-primary-light focus:border-transparent outline-none transition-all`}
                      placeholder="example@email.com"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
                
                <div>
                  <label htmlFor="subject" className="block mb-2 text-sm font-medium text-surface-700 dark:text-surface-300">
                    Subject
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center justify-center pointer-events-none">
                      <MessageSquareIcon className="h-5 w-5 text-surface-400" />
                    </div>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`pl-10 w-full rounded-lg border ${errors.subject ? 'border-red-500 dark:border-red-500' : 'border-surface-300 dark:border-surface-600'} p-3 bg-white dark:bg-surface-700 focus:ring-2 focus:ring-primary dark:focus:ring-primary-light focus:border-transparent outline-none transition-all`}
                      placeholder="Property Inquiry"
                    />
                  </div>
                  {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-surface-700 dark:text-surface-300">
                    Your Message
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-0 pl-3 flex items-start justify-center pointer-events-none">
                      <MessageSquareIcon className="h-5 w-5 text-surface-400" />
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      className={`pl-10 w-full rounded-lg border ${errors.message ? 'border-red-500 dark:border-red-500' : 'border-surface-300 dark:border-surface-600'} p-3 bg-white dark:bg-surface-700 focus:ring-2 focus:ring-primary dark:focus:ring-primary-light focus:border-transparent outline-none transition-all`}
                      placeholder="I'm interested in learning more about..."
                    ></textarea>
                  {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary mt-6 flex items-center justify-center gap-2 w-full shadow-md hover:shadow-lg transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      Send Message
                      <SendIcon className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}


export default Contact;