import { useEffect } from 'react';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const StarIcon = getIcon('Star');
const StarFilledIcon = getIcon('StarFilled');
const QuoteIcon = getIcon('Quote');

const Testimonials = () => {
  useEffect(() => {
    // Set page title
    document.title = 'Testimonials | DwellDex';
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Helper function to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <StarFilledIcon 
            key={i} 
            className="w-5 h-5 text-secondary" 
            aria-hidden="true" 
          />
        );
      } else {
        stars.push(
          <StarIcon 
            key={i} 
            className="w-5 h-5 text-surface-300 dark:text-surface-600" 
            aria-hidden="true" 
          />
        );
      }
    }
    return stars;
  };

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "First-time Homebuyer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      rating: 5,
      testimonial: "DwellDex made finding my first home so much easier than I expected. The interface is intuitive, and I was able to filter properties based on exactly what I was looking for. Highly recommend!",
      featured: true
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Real Estate Investor",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      rating: 4,
      testimonial: "As someone who regularly invests in properties, I need a reliable platform. DwellDex provides comprehensive data that helps me make informed decisions quickly. It's become an essential tool for my business."
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      role: "Property Manager",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      rating: 5,
      testimonial: "The rental management features are outstanding. I can keep track of multiple properties, tenant communications, and maintenance requests all in one place. It's simplified my workflow tremendously."
    },
    {
      id: 4,
      name: "James Wilson",
      role: "Real Estate Agent",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      rating: 5,
      testimonial: "DwellDex has transformed how I present properties to clients. The virtual tours and detailed information make it easy to showcase homes remotely. My clients love the experience, and it's helped me close deals faster."
    },
    {
      id: 5,
      name: "Priya Patel",
      role: "Relocating Professional",
      image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      rating: 4,
      testimonial: "When I needed to relocate for work, DwellDex made finding a new home in an unfamiliar city much less stressful. The neighborhood insights and commute time calculator were particularly helpful features."
    },
    {
      id: 6,
      name: "Thomas Anderson",
      role: "Property Developer",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      rating: 5,
      testimonial: "The market analysis tools on DwellDex are exceptional. I can quickly assess property values, growth trends, and investment potential. It's become invaluable for our development planning."
    }
  ];

  return (
    <div className="bg-white dark:bg-surface-900">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-br from-primary-light/10 to-transparent dark:from-primary/5 dark:to-transparent"></div>
        </div>
        
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-surface-900 dark:text-white">
              What Our Clients Say
            </h1>
            <p className="text-xl text-surface-600 dark:text-surface-300 mb-8 leading-relaxed">
              Discover why thousands of homebuyers, sellers, and property investors trust DwellDex 
              to help them make informed real estate decisions.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mt-10 bg-white dark:bg-surface-800 rounded-2xl p-8 md:p-10 shadow-soft dark:shadow-none border border-surface-200 dark:border-surface-700 max-w-4xl mx-auto"
          >
            <div className="absolute -top-5 right-10 text-primary-light dark:text-primary opacity-40">
              <QuoteIcon className="w-16 h-16" />
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white dark:border-surface-700 shadow-lg flex-shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80" 
                  alt="Lisa Morgan" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center mb-3">
                  {renderStars(5)}
                </div>
                <blockquote className="text-lg md:text-xl italic mb-4 text-surface-700 dark:text-surface-200">
                  "Using DwellDex changed our home buying experience completely. The detailed property comparisons and neighborhood insights gave us confidence in our decision. We found our dream home in half the time we expected!"
                </blockquote>
                <p className="font-semibold text-surface-900 dark:text-white">Lisa Morgan</p>
                <p className="text-sm text-surface-500 dark:text-surface-400">Family Homeowner, Chicago</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Testimonials Grid Section */}
      <section className="py-16 bg-surface-50 dark:bg-surface-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-surface-900 dark:text-white">
              Trusted by Thousands
            </h2>
            <p className="text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
              Join our community of satisfied users who have found success with DwellDex for their real estate needs.
            </p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                className={`card p-6 flex flex-col h-full ${
                  testimonial.featured 
                    ? 'border-primary dark:border-primary bg-primary/5 dark:bg-primary/10' 
                    : ''
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-white dark:border-surface-700 shadow-sm">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-surface-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-surface-500 dark:text-surface-400">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                
                <blockquote className="flex-1 text-surface-700 dark:text-surface-300 relative">
                  <span className="absolute text-primary/10 dark:text-primary/20 -top-2 -left-1">
                    <QuoteIcon className="w-8 h-8" />
                  </span>
                  <p className="pl-4 italic">"{testimonial.testimonial}"</p>
                </blockquote>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-surface-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-surface-900 dark:text-white">
              Join Thousands of Satisfied Customers
            </h2>
            <p className="text-lg text-surface-600 dark:text-surface-300 mb-8">
              Start your property journey with DwellDex today and experience why our customers rate us so highly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/" className="btn-primary">
                Get Started Today
              </a>
              <a href="/contact" className="btn-outline">
                Contact Us
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 flex justify-center"
          >
            <div className="bg-surface-100 dark:bg-surface-800 rounded-xl px-6 py-4 inline-flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarFilledIcon 
                    key={star} 
                    className="w-5 h-5 text-secondary" 
                    aria-hidden="true" 
                  />
                ))}
              </div>
              <span className="text-surface-700 dark:text-surface-300">
                <strong>4.9</strong> from over <strong>1,254</strong> reviews
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;