import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

function PropertyDetail({ toast }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [similarProperties, setSimilarProperties] = useState([]);

  // Reviews state
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    email: '',
    comment: '',
    ratings: {
      overall: 0,
      location: 0,
      cleanliness: 0,
      amenities: 0,
      value: 0
    }
  });
  // Icon component declarations
  const ArrowLeftIcon = getIcon('ArrowLeft');
  const HomeIcon = getIcon('Home');
  const HeartIcon = getIcon('Heart');
  const ShareIcon = getIcon('Share');
  const PrinterIcon = getIcon('Printer');
  const BedDoubleIcon = getIcon('BedDouble');
  const BathIcon = getIcon('Bath');
  const RulerIcon = getIcon('Ruler');
  const Calendar = getIcon('Calendar');
  const MapPinIcon = getIcon('MapPin');
  const TagIcon = getIcon('Tag');
  const CheckIcon = getIcon('Check');
  const PhoneIcon = getIcon('Phone');
  const MailIcon = getIcon('Mail');
  const StarIcon = getIcon('Star');
  const StarHalfIcon = getIcon('StarHalf');
  const ClipboardEditIcon = getIcon('ClipboardEdit');
  const SendIcon = getIcon('Send');
  const XIcon = getIcon('X');

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
      featured: true,
      description: "This stunning waterfront villa offers breathtaking views and modern amenities. With an open floor plan, high ceilings, and floor-to-ceiling windows, this property captures natural light and the beauty of its surroundings. The gourmet kitchen features top-of-the-line appliances, custom cabinetry, and a large island with breakfast bar. The spacious master suite includes a luxurious bathroom with double vanities, a soaking tub, and a walk-in shower.",
      yearBuilt: 2018,
      garage: 2,
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      amenities: ["Swimming Pool", "Ocean View", "Smart Home System", "Chef's Kitchen", "Gym", "Home Office"]
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
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Luxurious apartment in the heart of Manhattan with stunning city views, hardwood floors, and high-end finishes throughout. Modern open kitchen with stainless steel appliances and granite countertops. Building amenities include 24-hour doorman, fitness center, and rooftop terrace.",
      yearBuilt: 2015,
      garage: 1,
      images: [
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      amenities: ["Doorman", "Elevator", "Fitness Center", "Rooftop Deck", "In-unit Laundry", "City Views"]
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
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Charming mountain cabin nestled in the woods with breathtaking mountain views. Features include a stone fireplace, exposed beam ceilings, and large windows to enjoy the natural surroundings. The property includes a wraparound deck perfect for entertaining and enjoying the outdoors.",
      yearBuilt: 1994,
      garage: 1,
      images: [
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1464146072230-91cabc968266?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      amenities: ["Fireplace", "Mountain View", "Wraparound Deck", "Hiking Trails", "Wood Burning Stove", "Hot Tub"]
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
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Stylish and modern condo in downtown Seattle with spectacular city and water views. Features include floor-to-ceiling windows, hardwood floors, and an open concept layout. The gourmet kitchen includes quartz countertops and high-end appliances.",
      yearBuilt: 2017,
      garage: 1,
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1617104678098-de229292053b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      amenities: ["Concierge", "Fitness Center", "Rooftop Lounge", "Pet Friendly", "Bike Storage", "EV Charging"]
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
      image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Charming beachfront bungalow just steps from the sand. This property features an open floor plan with large windows and sliding doors that open to a spacious deck with unobstructed ocean views. Recently renovated with high-end finishes throughout.",
      yearBuilt: 1978,
      garage: 1,
      images: [
        "https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1512916194211-3f2b7f5f7de3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      amenities: ["Beach Access", "Ocean View", "Outdoor Shower", "Renovated Kitchen", "Deck", "Air Conditioning"]
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
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Stylish studio loft in a converted warehouse featuring exposed brick walls, high ceilings, and large industrial windows. The open floor plan includes a modern kitchen with stainless steel appliances and a breakfast bar. Building amenities include a fitness center and rooftop deck.",
      yearBuilt: 2010,
      garage: 0,
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1630699144236-249eb0cf956e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      amenities: ["Exposed Brick", "High Ceilings", "Industrial Windows", "Fitness Center", "Bike Room", "Package Service"]
    }
  ];
  // Dummy reviews data
  const dummyReviews = [
    {
      id: 101,
      propertyId: 1,
      name: "Michael Brown",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      date: "2023-09-14",
      ratings: { overall: 5, location: 5, cleanliness: 4, amenities: 5, value: 4 },
      comment: "Absolutely stunning property with incredible views! The villa exceeded all our expectations with its modern design and luxurious amenities. The waterfront location is breathtaking, especially at sunset. Everything was immaculate upon our arrival and the management team was responsive and professional."
    },
    {
      id: 102,
      propertyId: 1,
      name: "Jennifer Wilson",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      date: "2023-08-22",
      ratings: { overall: 4, location: 5, cleanliness: 4, amenities: 4, value: 3 },
      comment: "We had a wonderful stay at this beautiful villa. The location is perfect - close to restaurants and shopping while still feeling private and secluded. The kitchen was well-equipped and the bedrooms were comfortable. My only suggestion would be to update some of the outdoor furniture. Overall, a great experience and we would definitely return!"
    },
    {
      id: 103,
      propertyId: 2,
      name: "Robert Taylor",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      date: "2023-07-30",
      ratings: { overall: 5, location: 5, cleanliness: 5, amenities: 4, value: 4 },
      comment: "Perfect location in the heart of Manhattan! The apartment was exactly as pictured - modern, clean, and well-appointed. The building amenities were fantastic, especially the rooftop terrace with amazing city views. Highly recommend for anyone wanting a luxury stay in NYC."
    },
    {
      id: 104,
      propertyId: 3,
      name: "Lisa Martinez",
      avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      date: "2023-10-05",
      ratings: { overall: 5, location: 5, cleanliness: 5, amenities: 5, value: 5 },
      comment: "This mountain cabin is a dream come true! The location is serene and the views are spectacular. We loved waking up each morning to see the mountains right outside our window. The interior is rustic yet comfortable, and the fireplace made our evenings so cozy. Perfect for a retreat from city life."
    }
  ];

  // Ref for scrolling to review form
  const reviewFormRef = useRef(null);

  // Function to scroll to review form
  const scrollToReviewForm = () => reviewFormRef.current?.scrollIntoView({ behavior: 'smooth' });


  useEffect(() => {
    // Simulate loading property data
    const timer = setTimeout(() => {
      const foundProperty = dummyProperties.find(p => p.id.toString() === id);
      if (foundProperty) {
        setProperty(foundProperty);
        
        // Find similar properties (same type or location)
        const similar = dummyProperties
          .filter(p => p.id !== foundProperty.id && (p.type === foundProperty.type || p.location === foundProperty.location))
          .slice(0, 3);
        
        // Set reviews for the property
        const propertyReviews = dummyReviews.filter(review => 
          review.propertyId === foundProperty.id
        );
        setReviews(propertyReviews);
        setSimilarProperties(similar);
      }
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  // Format price with commas
  const formatPrice = (price) => {
    return "$" + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleSaveProperty = () => {
    toast.success("Property saved to favorites!");
  };

  const handleShareProperty = () => {
    toast.info("Share link copied to clipboard!");
  };

  const handleContactAgent = () => {
    toast.success("Your request has been sent to the agent!");
  };

  // Calculate average rating
  const calculateAverageRating = (category = 'overall') => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.ratings[category], 0);
    return sum / reviews.length;
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Render stars for rating
  const renderStars = (rating, size = 'h-5 w-5') => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <StarIcon key={`full-${i}`} className={`${size} text-yellow-400 fill-current`} />
        ))}
        {hasHalfStar && <StarHalfIcon className={`${size} text-yellow-400 fill-current`} />}
        {[...Array(emptyStars)].map((_, i) => (
          <StarIcon key={`empty-${i}`} className={`${size} text-surface-300 dark:text-surface-600`} />
        ))}
      </div>
    );
  };

  // Handle star rating selection
  const handleRatingChange = (category, value) => {
    setNewReview(prev => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        [category]: value,
        overall: category === 'overall' ? value : prev.ratings.overall
      }
    }));
  };
  
  // Render selectable stars for review form
  const renderSelectableStars = (category) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => handleRatingChange(category, value)}
            className="focus:outline-none"
          >
            <StarIcon 
              className={`h-6 w-6 ${
                value <= newReview.ratings[category] 
                  ? 'text-yellow-400 fill-current' 
                  : 'text-surface-300 dark:text-surface-600'
              }`} 
            />
          </button>
        ))}
      </div>
    );
  };

  // Handle review form change
  const handleReviewFormChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle review submission
  const handleSubmitReview = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!newReview.name || !newReview.email || !newReview.comment || newReview.ratings.overall === 0) {
      toast.error("Please complete all required fields");
      return;
    }
    
    // Create new review object
    const review = {
      id: Date.now(),
      propertyId: property.id,
      name: newReview.name,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80", // Default avatar
      date: new Date().toISOString().split('T')[0],
      ratings: { ...newReview.ratings },
      comment: newReview.comment
    };
    
    // Add new review to reviews array
    setReviews(prev => [review, ...prev]);
    toast.success("Thank you for your review!");
    setShowReviewForm(false);
    setNewReview({ name: '', email: '', comment: '', ratings: { overall: 0, location: 0, cleanliness: 0, amenities: 0, value: 0 } });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="animate-pulse">
          <div className="h-8 bg-surface-200 dark:bg-surface-700 rounded-full w-48 mb-6"></div>
          <div className="h-64 bg-surface-200 dark:bg-surface-700 rounded-xl mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-2">
              <div className="h-10 bg-surface-200 dark:bg-surface-700 rounded-full w-3/4 mb-4"></div>
              <div className="h-6 bg-surface-200 dark:bg-surface-700 rounded-full w-1/4 mb-8"></div>
              <div className="h-40 bg-surface-200 dark:bg-surface-700 rounded-lg mb-8"></div>
              <div className="h-60 bg-surface-200 dark:bg-surface-700 rounded-lg"></div>
            </div>
            <div>
              <div className="h-40 bg-surface-200 dark:bg-surface-700 rounded-xl mb-8"></div>
              <div className="h-80 bg-surface-200 dark:bg-surface-700 rounded-xl mb-8"></div>
              <div className="h-40 bg-surface-200 dark:bg-surface-700 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="inline-block p-4 rounded-full bg-surface-100 dark:bg-surface-800 mb-4">
          <HomeIcon className="h-8 w-8 text-surface-400" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          The property you're looking for doesn't exist or has been removed.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="btn-primary"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="bg-surface-50 dark:bg-surface-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb and back button */}
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to listings
          </button>
        </div>

        {/* Property Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{property.title}</h1>
          <div className="flex items-center text-surface-600 dark:text-surface-400 mb-4">
            <MapPinIcon className="h-5 w-5 mr-1" />
            <span>{property.location}</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-2xl font-bold text-primary dark:text-primary-light">
              {formatPrice(property.price)}
            </span>
            {property.featured && (
              <span className="badge-primary">Featured</span>
            )}
            <span className="badge bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300">
              {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
            </span>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-12">
          <div className="md:col-span-8 rounded-xl overflow-hidden h-[400px] relative">
            <img 
              src={property.images[activeImage]} 
              alt={property.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:col-span-4 grid grid-cols-2 gap-4 h-[400px]">
            {property.images.slice(1, 5).map((image, index) => (
              <div 
                key={index}
                className={`rounded-xl overflow-hidden cursor-pointer ${index === 2 ? 'hidden md:block' : ''} ${index === 3 ? 'hidden md:block' : ''}`}
                onClick={() => setActiveImage(index + 1)}
              >
                <img 
                  src={image} 
                  alt={`${property.title} ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            {/* Main Details */}
            <div className="bg-white dark:bg-surface-800 rounded-xl p-6 mb-8 shadow-card">
              <h2 className="text-2xl font-bold mb-6">Property Details</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="flex flex-col items-center p-4 bg-surface-50 dark:bg-surface-700 rounded-lg">
                  <BedDoubleIcon className="h-6 w-6 text-primary dark:text-primary-light mb-2" />
                  <span className="text-lg font-bold">{property.bedrooms}</span>
                  <span className="text-sm text-surface-600 dark:text-surface-400">Bedrooms</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-surface-50 dark:bg-surface-700 rounded-lg">
                  <BathIcon className="h-6 w-6 text-primary dark:text-primary-light mb-2" />
                  <span className="text-lg font-bold">{property.bathrooms}</span>
                  <span className="text-sm text-surface-600 dark:text-surface-400">Bathrooms</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-surface-50 dark:bg-surface-700 rounded-lg">
                  <RulerIcon className="h-6 w-6 text-primary dark:text-primary-light mb-2" />
                  <span className="text-lg font-bold">{property.area}</span>
                  <span className="text-sm text-surface-600 dark:text-surface-400">Sq Ft</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-surface-50 dark:bg-surface-700 rounded-lg">
                  <Calendar className="h-6 w-6 text-primary dark:text-primary-light mb-2" />
                  <span className="text-lg font-bold">{property.yearBuilt}</span>
                  <span className="text-sm text-surface-600 dark:text-surface-400">Year Built</span>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Description</h3>
                <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                  {property.description}
                </p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Amenities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-primary dark:text-primary-light mr-2" />
                      <span className="text-surface-600 dark:text-surface-400">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">Location</h3>
                <div className="bg-surface-100 dark:bg-surface-700 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MapPinIcon className="h-10 w-10 text-primary dark:text-primary-light mb-2 mx-auto" />
                    <p className="text-surface-600 dark:text-surface-400">
                      {property.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ratings and Reviews Section */}
            <div className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Ratings & Reviews</h2>
                <button 
                  onClick={() => {
                    setShowReviewForm(true);
                    // Small delay to ensure component is rendered before scrolling
                    setTimeout(scrollToReviewForm, 100);
                  }}
                  className="btn-primary flex items-center gap-2"
                >
                  <ClipboardEditIcon className="h-4 w-4" />
                  Write a Review
                </button>
              </div>
              
              {/* Overall Rating */}
              <div className="flex flex-col md:flex-row gap-8 mb-8 pb-8 border-b border-surface-200 dark:border-surface-700">
                <div className="flex flex-col items-center justify-center">
                  <div className="text-5xl font-bold text-primary dark:text-primary-light mb-2">
                    {calculateAverageRating().toFixed(1)}
                  </div>
                  <div className="mb-2">
                    {renderStars(calculateAverageRating(), 'h-6 w-6')}
                  </div>
                  <div className="text-sm text-surface-500 dark:text-surface-400">
                    Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                  </div>
                </div>
                
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium w-24">Location</span>
                    <div className="flex-1">
                      {renderStars(calculateAverageRating('location'), 'h-4 w-4')}
                    </div>
                    <span className="text-sm font-bold">{calculateAverageRating('location').toFixed(1)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium w-24">Cleanliness</span>
                    <div className="flex-1">
                      {renderStars(calculateAverageRating('cleanliness'), 'h-4 w-4')}
                    </div>
                    <span className="text-sm font-bold">{calculateAverageRating('cleanliness').toFixed(1)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium w-24">Amenities</span>
                    <div className="flex-1">
                      {renderStars(calculateAverageRating('amenities'), 'h-4 w-4')}
                    </div>
                    <span className="text-sm font-bold">{calculateAverageRating('amenities').toFixed(1)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium w-24">Value</span>
                    <div className="flex-1">
                      {renderStars(calculateAverageRating('value'), 'h-4 w-4')}
                    </div>
                    <span className="text-sm font-bold">{calculateAverageRating('value').toFixed(1)}</span>
                  </div>
                </div>
              </div>
              
              {/* Review Form */}
              {showReviewForm && (
                <div 
                  ref={reviewFormRef}
                  className="mb-8 p-6 bg-surface-50 dark:bg-surface-700 rounded-xl"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Write Your Review</h3>
                    <button 
                      onClick={() => setShowReviewForm(false)}
                      className="p-1 rounded-full hover:bg-surface-200 dark:hover:bg-surface-600"
                    >
                      <XIcon className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <form onSubmit={handleSubmitReview}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Name*</label>
                        <input 
                          type="text" 
                          name="name" 
                          value={newReview.name} 
                          onChange={handleReviewFormChange} 
                          className="input" 
                          required 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Email*</label>
                        <input 
                          type="email" 
                          name="email" 
                          value={newReview.email} 
                          onChange={handleReviewFormChange} 
                          className="input" 
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Overall Rating*</label>
                      {renderSelectableStars('overall')}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Location</label>
                        {renderSelectableStars('location')}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Cleanliness</label>
                        {renderSelectableStars('cleanliness')}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Amenities</label>
                        {renderSelectableStars('amenities')}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Value</label>
                        {renderSelectableStars('value')}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Your Review*</label>
                      <textarea 
                        name="comment" 
                        value={newReview.comment} 
                        onChange={handleReviewFormChange} 
                        className="input min-h-32" 
                        required
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit" 
                      className="btn-primary flex items-center justify-center gap-2"
                    >
                      <SendIcon className="h-4 w-4" />
                      Submit Review
                    </button>
                  </form>
                </div>
              )}
              
              {/* Reviews List */}
              <div>
                {reviews.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-surface-500 dark:text-surface-400 mb-4">No reviews yet</p>
                    <button 
                      onClick={() => {
                        setShowReviewForm(true);
                        setTimeout(scrollToReviewForm, 100);
                      }}
                      className="btn-outline"
                    >
                      Be the first to review
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="pb-6 border-b border-surface-200 dark:border-surface-700 last:border-0">
                        <div className="flex items-start gap-4 mb-3">
                          <div className="h-12 w-12 rounded-full bg-surface-200 dark:bg-surface-700 overflow-hidden flex-shrink-0">
                            <img 
                              src={review.avatar} 
                              alt={review.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                              <h4 className="font-bold">{review.name}</h4>
                              <span className="text-sm text-surface-500 dark:text-surface-400">
                                {formatDate(review.date)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                              {renderStars(review.ratings.overall, 'h-4 w-4')}
                              <span className="text-sm font-medium">
                                {review.ratings.overall.toFixed(1)}
                              </span>
                            </div>
                            <p className="text-surface-600 dark:text-surface-400">
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="md:col-span-1">
            {/* Action Buttons */}
            <div className="bg-white dark:bg-surface-800 rounded-xl p-6 mb-8 shadow-card">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <button 
                  onClick={handleSaveProperty}
                  className="flex flex-col items-center justify-center p-3 bg-surface-50 dark:bg-surface-700 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors"
                >
                  <HeartIcon className="h-6 w-6 text-primary dark:text-primary-light mb-2" />
                  <span className="text-xs text-surface-600 dark:text-surface-400">Save</span>
                </button>
                <button 
                  onClick={handleShareProperty}
                  className="flex flex-col items-center justify-center p-3 bg-surface-50 dark:bg-surface-700 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors"
                >
                  <ShareIcon className="h-6 w-6 text-primary dark:text-primary-light mb-2" />
                  <span className="text-xs text-surface-600 dark:text-surface-400">Share</span>
                </button>
                <button 
                  onClick={() => window.print()}
                  className="flex flex-col items-center justify-center p-3 bg-surface-50 dark:bg-surface-700 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors print-hide"
                >
                  <PrinterIcon className="h-6 w-6 text-primary dark:text-primary-light mb-2" />
                  <span className="text-xs text-surface-600 dark:text-surface-400">Print</span>
                </button>
              </div>
              
              <div className="border-t border-surface-200 dark:border-surface-700 pt-6 mb-6">
                <h3 className="text-xl font-bold mb-4">Contact Agent</h3>
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="h-12 w-12 rounded-full bg-surface-200 dark:bg-surface-700 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" 
                        alt="Agent"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">Sarah Johnson</h4>
                      <p className="text-sm text-surface-600 dark:text-surface-400">Senior Agent</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mb-4">
                    <a href="tel:+11234567890" className="flex items-center text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors">
                      <PhoneIcon className="h-4 w-4 mr-2" />
                      (123) 456-7890
                    </a>
                    <a href="mailto:sarah@dwelldex.com" className="flex items-center text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors">
                      <MailIcon className="h-4 w-4 mr-2" />
                      sarah@dwelldex.com
                    </a>
                  </div>
                </div>
                
                <button 
                  onClick={handleContactAgent}
                  className="w-full btn-primary"
                >
                  Request Information
                </button>
              </div>
              
              <div className="border-t border-surface-200 dark:border-surface-700 pt-6">
                <h3 className="text-xl font-bold mb-4">Property Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center bg-surface-100 dark:bg-surface-700 px-3 py-1 rounded-full">
                    <TagIcon className="h-3 w-3 mr-1 text-surface-500 dark:text-surface-400" />
                    <span className="text-xs text-surface-600 dark:text-surface-400">{property.type}</span>
                  </div>
                  <div className="flex items-center bg-surface-100 dark:bg-surface-700 px-3 py-1 rounded-full">
                    <TagIcon className="h-3 w-3 mr-1 text-surface-500 dark:text-surface-400" />
                    <span className="text-xs text-surface-600 dark:text-surface-400">{property.bedrooms} beds</span>
                  </div>
                  <div className="flex items-center bg-surface-100 dark:bg-surface-700 px-3 py-1 rounded-full">
                    <TagIcon className="h-3 w-3 mr-1 text-surface-500 dark:text-surface-400" />
                    <span className="text-xs text-surface-600 dark:text-surface-400">{property.area} sqft</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarProperties.map((similarProperty) => (
                <motion.div
                  key={similarProperty.id}
                  className="property-card relative group"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="relative h-48 overflow-hidden rounded-t-xl">
                    <img 
                      src={similarProperty.image} 
                      alt={similarProperty.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <button 
                      onClick={() => handleSaveProperty()}
                      className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm dark:bg-surface-800/80 hover:bg-white dark:hover:bg-surface-700 transition-colors"
                    >
                      <HeartIcon className="h-5 w-5 text-surface-400 hover:text-red-500" />
                    </button>
                  </div>
                  
                  <div className="p-5">
                    <div className="mb-2 flex items-center gap-1 text-sm text-surface-500 dark:text-surface-400">
                      <MapPinIcon className="h-4 w-4" />
                      <span>{similarProperty.location}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">{similarProperty.title}</h3>
                    
                    <div className="text-xl font-bold text-primary dark:text-primary-light mb-4">
                      {formatPrice(similarProperty.price)}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mb-5">
                      <div className="flex items-center gap-1 text-sm text-surface-600 dark:text-surface-400">
                        <BedDoubleIcon className="h-4 w-4" />
                        <span>{similarProperty.bedrooms} Beds</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-surface-600 dark:text-surface-400">
                        <BathIcon className="h-4 w-4" />
                        <span>{similarProperty.bathrooms} Baths</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-surface-600 dark:text-surface-400">
                        <RulerIcon className="h-4 w-4" />
                        <span>{similarProperty.area} sqft</span>
                      </div>
                    </div>
                    
                    <button 
                      className="w-full btn-primary"
                      onClick={() => navigate(`/property/${similarProperty.id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PropertyDetail;