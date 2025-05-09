import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

function Home({ toast }) {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Icon component declarations
  const SearchIcon = getIcon('Search');
  const HomeIcon = getIcon('Home');
  const BuildingIcon = getIcon('Building');
  const DollarSignIcon = getIcon('DollarSign');
  const BedDoubleIcon = getIcon('BedDouble');
  const BathIcon = getIcon('Bath');
  const RulerIcon = getIcon('Ruler');
  const MapPinIcon = getIcon('MapPin');
  const HeartIcon = getIcon('Heart');

  // Dummy property data
  const dummyProperties = [
    {
      id: 1,
      title: "Modern Waterfront Villa",
      price: 1250000,
      type: "house",
      location: "Miami Beach, FL",
      bedrooms: 4,
      bathrooms: 3,
      area: 2800,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: 2,
      title: "Downtown Luxury Apartment",
      price: 650000,
      type: "apartment",
      location: "Manhattan, NY",
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Rustic Mountain Cabin",
      price: 425000,
      type: "house",
      location: "Aspen, CO",
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Modern Condo with City Views",
      price: 580000,
      type: "condo",
      location: "Seattle, WA",
      bedrooms: 2,
      bathrooms: 2,
      area: 1100,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "Beachfront Bungalow",
      price: 875000,
      type: "house",
      location: "Santa Monica, CA",
      bedrooms: 3,
      bathrooms: 2,
      area: 1600,
      image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "Urban Studio Loft",
      price: 320000,
      type: "apartment",
      location: "Chicago, IL",
      bedrooms: 1,
      bathrooms: 1,
      area: 850,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setProperties(dummyProperties);
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Toggle favorite status for a property (example of toast usage)
  const toggleFavorite = (propertyId) => {
    toast.success("Property added to favorites!");
  };

  // Filter properties based on search query and type filter
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || property.type === filterType;
    return matchesSearch && matchesFilter;
  });

  // Format price with commas
  const formatPrice = (price) => {
    return "$" + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 to-surface-100 dark:from-primary/5 dark:to-surface-800 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 text-balance"
            >
              Find Your Perfect Home with DwellDex
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-surface-600 dark:text-surface-400 mb-8 text-balance"
            >
              Discover properties that match your lifestyle with our intuitive property listing platform
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative mx-auto max-w-2xl"
            >
              <div className="relative flex items-center rounded-full overflow-hidden shadow-soft bg-white dark:bg-surface-800">
                <SearchIcon className="absolute left-4 h-5 w-5 text-surface-400" />
                <input 
                  type="text" 
                  placeholder="Search by location, property name..." 
                  className="pl-12 pr-4 py-4 w-full focus:outline-none bg-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <button 
                  onClick={() => setFilterType('all')} 
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filterType === 'all' 
                      ? 'bg-primary text-white' 
                      : 'bg-white dark:bg-surface-800 hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300'
                  }`}
                >
                  All Properties
                </button>
                <button 
                  onClick={() => setFilterType('house')} 
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filterType === 'house' 
                      ? 'bg-primary text-white' 
                      : 'bg-white dark:bg-surface-800 hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300'
                  }`}
                >
                  Houses
                </button>
                <button 
                  onClick={() => setFilterType('apartment')} 
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filterType === 'apartment' 
                      ? 'bg-primary text-white' 
                      : 'bg-white dark:bg-surface-800 hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300'
                  }`}
                >
                  Apartments
                </button>
                <button 
                  onClick={() => setFilterType('condo')} 
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filterType === 'condo' 
                      ? 'bg-primary text-white' 
                      : 'bg-white dark:bg-surface-800 hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300'
                  }`}
                >
                  Condos
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-r from-transparent via-primary/5 to-transparent"></div>
      </section>

      {/* Property Listings */}
      <section className="py-16 bg-surface-50 dark:bg-surface-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
            <h2 className="text-2xl font-bold mb-4 md:mb-0">
              Featured Properties
            </h2>
            <div className="text-surface-600 dark:text-surface-400">
              Showing {filteredProperties.length} properties
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="property-card animate-pulse">
                  <div className="h-48 bg-surface-200 dark:bg-surface-700 rounded-t-xl"></div>
                  <div className="p-4">
                    <div className="h-6 bg-surface-200 dark:bg-surface-700 rounded-full w-3/4 mb-3"></div>
                    <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded-full w-1/2 mb-4"></div>
                    <div className="h-10 bg-surface-200 dark:bg-surface-700 rounded-lg mb-3"></div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-8 bg-surface-200 dark:bg-surface-700 rounded-lg"></div>
                      <div className="h-8 bg-surface-200 dark:bg-surface-700 rounded-lg"></div>
                      <div className="h-8 bg-surface-200 dark:bg-surface-700 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <motion.div
                  key={property.id}
                  className="property-card relative group"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {property.featured && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="badge-primary">Featured</span>
                    </div>
                  )}
                  
                  <div className="relative h-48 overflow-hidden rounded-t-xl">
                    <img 
                      src={property.image} 
                      alt={property.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <button 
                      onClick={() => toggleFavorite(property.id)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm dark:bg-surface-800/80 hover:bg-white dark:hover:bg-surface-700 transition-colors"
                    >
                      <HeartIcon className="h-5 w-5 text-surface-400 hover:text-red-500" />
                    </button>
                  </div>
                  
                  <div className="p-5">
                    <div className="mb-2 flex items-center gap-1 text-sm text-surface-500 dark:text-surface-400">
                      <MapPinIcon className="h-4 w-4" />
                      <span>{property.location}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">{property.title}</h3>
                    
                    <div className="text-xl font-bold text-primary dark:text-primary-light mb-4">
                      {formatPrice(property.price)}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mb-5">
                      <div className="flex items-center gap-1 text-sm text-surface-600 dark:text-surface-400">
                        <BedDoubleIcon className="h-4 w-4" />
                        <span>{property.bedrooms} Beds</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-surface-600 dark:text-surface-400">
                        <BathIcon className="h-4 w-4" />
                        <span>{property.bathrooms} Baths</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-surface-600 dark:text-surface-400">
                        <RulerIcon className="h-4 w-4" />
                        <span>{property.area} sqft</span>
                      </div>
                    </div>
                    
                    <button className="w-full btn-primary">View Details</button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-block p-4 rounded-full bg-surface-100 dark:bg-surface-800 mb-4">
                <SearchIcon className="h-8 w-8 text-surface-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">No properties found</h3>
              <p className="text-surface-600 dark:text-surface-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}

          {filteredProperties.length > 0 && (
            <div className="mt-12 text-center">
              <button className="btn-outline">
                Load More Properties
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Main Feature Component */}
      <MainFeature toast={toast} />

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-surface-50 dark:from-primary/10 dark:to-surface-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose DwellDex?</h2>
            <p className="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
              We're dedicated to making your property search and listing experience seamless and efficient
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-surface-800 p-8 rounded-xl shadow-neu-light dark:shadow-neu-dark text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 dark:bg-primary/20 text-primary mb-4">
                <HomeIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">10,000+</h3>
              <p className="text-surface-600 dark:text-surface-400">Active Listings</p>
            </div>
            
            <div className="bg-white dark:bg-surface-800 p-8 rounded-xl shadow-neu-light dark:shadow-neu-dark text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-secondary/10 dark:bg-secondary/20 text-secondary mb-4">
                <BuildingIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">500+</h3>
              <p className="text-surface-600 dark:text-surface-400">Partner Agencies</p>
            </div>
            
            <div className="bg-white dark:bg-surface-800 p-8 rounded-xl shadow-neu-light dark:shadow-neu-dark text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-accent/10 dark:bg-accent/20 text-accent mb-4">
                <MapPinIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">200+</h3>
              <p className="text-surface-600 dark:text-surface-400">Cities Covered</p>
            </div>
            
            <div className="bg-white dark:bg-surface-800 p-8 rounded-xl shadow-neu-light dark:shadow-neu-dark text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 dark:bg-primary/20 text-primary mb-4">
                <DollarSignIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">$2B+</h3>
              <p className="text-surface-600 dark:text-surface-400">Property Value</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;