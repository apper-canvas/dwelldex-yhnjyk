import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

function About() {
  // Icon component declarations
  const HomeIcon = getIcon('Home');
  const UsersIcon = getIcon('Users');
  const CheckCircleIcon = getIcon('CheckCircle');
  const AwardIcon = getIcon('Award');
  const TrendingUpIcon = getIcon('TrendingUp');
  const ShieldIcon = getIcon('Shield');
  const TargetIcon = getIcon('Target');
  const LightbulbIcon = getIcon('Lightbulb');
  const SmileIcon = getIcon('Smile');

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
      bio: '15+ years in real estate technology'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
      bio: 'Former tech lead at major property platforms'
    },
    {
      id: 3,
      name: 'Alexis Rivera',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
      bio: 'Passionate about streamlining property search'
    },
    {
      id: 4,
      name: 'Robert Thompson',
      role: 'Head of Partnerships',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
      bio: 'Built network of 500+ real estate partners'
    }
  ];

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
            <h1 className="mb-6">About DwellDex</h1>
            <p className="text-lg md:text-xl text-surface-600 dark:text-surface-400 mb-8">
              Transforming how people discover, evaluate, and acquire their ideal properties since 2020.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-surface-50 dark:bg-surface-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-surface-700 dark:text-surface-300 mb-4">
                DwellDex was founded in 2020 with a simple mission: to simplify the often complicated process of finding and purchasing real estate. We noticed that while many property listing platforms existed, few truly focused on the user experience and transparency.
              </p>
              <p className="text-surface-700 dark:text-surface-300 mb-4">
                Our founder, Sarah Johnson, experienced firsthand the frustrations of property hunting and decided to build a platform that addresses the pain points she encountered. What began as a small startup has now grown into a trusted platform serving thousands of property seekers across the country.
              </p>
              <p className="text-surface-700 dark:text-surface-300">
                Today, DwellDex partners with over 500 real estate agencies and has helped more than 10,000 families find their perfect home. We continue to innovate and improve our platform, guided by our core values of transparency, accessibility, and user-centered design.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="DwellDex office" 
                className="rounded-xl shadow-neu-light dark:shadow-neu-dark w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-surface-100 dark:bg-surface-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
              These core principles guide our work and relationships with our users, partners, and team members.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <TrendingUpIcon className="h-8 w-8" />, title: 'Innovation', description: 'We constantly evolve our platform with cutting-edge technology to improve user experience.' },
              { icon: <ShieldIcon className="h-8 w-8" />, title: 'Trust', description: 'We build trust through transparency, reliability, and consistent service quality.' },
              { icon: <TargetIcon className="h-8 w-8" />, title: 'Precision', description: 'We focus on accuracy in our listings and matching algorithms to save you time.' },
              { icon: <CheckCircleIcon className="h-8 w-8" />, title: 'Quality', description: 'We maintain high standards in our property listings and verification processes.' },
              { icon: <LightbulbIcon className="h-8 w-8" />, title: 'Accessibility', description: 'We design our platform to be intuitive and accessible to users of all backgrounds.' },
              { icon: <SmileIcon className="h-8 w-8" />, title: 'User Satisfaction', description: 'We measure our success by the satisfaction and positive outcomes of our users.' }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white dark:bg-surface-700 p-6 rounded-xl shadow-neu-light dark:shadow-neu-dark"
              >
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 dark:bg-primary/20 text-primary mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-surface-600 dark:text-surface-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;