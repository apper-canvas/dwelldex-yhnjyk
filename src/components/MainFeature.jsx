import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import getIcon from '../utils/iconUtils';

function MainFeature({ toast }) {
  // State for property submission form
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    type: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    location: '',
    amenities: [],
    contactEmail: '',
    contactPhone: ''
  });
  
  // State for form validation and submission
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [previewMode, setPreviewMode] = useState(false);
  
  // Icon component declarations
  const HomeIcon = getIcon('Home');
  const BuildingIcon = getIcon('Building');
  const BedDoubleIcon = getIcon('BedDouble');
  const BathIcon = getIcon('Bath');
  const RulerIcon = getIcon('Ruler');
  const MapPinIcon = getIcon('MapPin');
  const DollarSignIcon = getIcon('DollarSign');
  const PlusIcon = getIcon('Plus');
  const CheckIcon = getIcon('Check');
  const XIcon = getIcon('X');
  const MailIcon = getIcon('Mail');
  const PhoneIcon = getIcon('Phone');
  const ImageIcon = getIcon('Image');
  const ChevronRightIcon = getIcon('ChevronRight');
  const EyeIcon = getIcon('Eye');
  const PenIcon = getIcon('Pen');
  const UploadCloudIcon = getIcon('UploadCloud');

  // List of available amenities
  const availableAmenities = [
    'Swimming Pool',
    'Garden',
    'Garage',
    'Air Conditioning',
    'Heating',
    'Balcony',
    'Fireplace',
    'Gym',
    'Security System',
    'Elevator'
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For number fields, ensure they're positive numbers
    if (['price', 'bedrooms', 'bathrooms', 'area'].includes(name)) {
      if (value && parseFloat(value) < 0) return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Handle amenity toggle
  const toggleAmenity = (amenity) => {
    setFormData(prev => {
      if (prev.amenities.includes(amenity)) {
        return {
          ...prev,
          amenities: prev.amenities.filter(a => a !== amenity)
        };
      } else {
        return {
          ...prev,
          amenities: [...prev.amenities, amenity]
        };
      }
    });
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    
    // Step 1 validation
    if (currentStep === 1) {
      if (!formData.title.trim()) newErrors.title = "Title is required";
      if (!formData.description.trim()) newErrors.description = "Description is required";
      if (!formData.type) newErrors.type = "Property type is required";
      if (!formData.location.trim()) newErrors.location = "Location is required";
    }
    
    // Step 2 validation
    if (currentStep === 2) {
      if (!formData.price) newErrors.price = "Price is required";
      else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) 
        newErrors.price = "Price must be a positive number";
      
      if (!formData.bedrooms) newErrors.bedrooms = "Number of bedrooms is required";
      else if (isNaN(formData.bedrooms) || parseInt(formData.bedrooms) <= 0) 
        newErrors.bedrooms = "Bedrooms must be a positive number";
      
      if (!formData.bathrooms) newErrors.bathrooms = "Number of bathrooms is required";
      else if (isNaN(formData.bathrooms) || parseFloat(formData.bathrooms) <= 0) 
        newErrors.bathrooms = "Bathrooms must be a positive number";
      
      if (!formData.area) newErrors.area = "Area is required";
      else if (isNaN(formData.area) || parseFloat(formData.area) <= 0) 
        newErrors.area = "Area must be a positive number";
    }
    
    // Step 3 validation
    if (currentStep === 3) {
      if (!formData.contactEmail.trim()) {
        newErrors.contactEmail = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
        newErrors.contactEmail = "Email is invalid";
      }
      
      if (!formData.contactPhone.trim()) {
        newErrors.contactPhone = "Phone number is required";
      }
    }
    
    return newErrors;
  };

  // Handle next step button
  const handleNextStep = () => {
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setCurrentStep(prev => prev + 1);
    } else {
      setErrors(newErrors);
    }
  };

  // Handle previous step button
  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        toast.success("Property listing submitted successfully!");
        
        // Reset form
        setFormData({
          title: '',
          description: '',
          price: '',
          type: '',
          bedrooms: '',
          bathrooms: '',
          area: '',
          location: '',
          amenities: [],
          contactEmail: '',
          contactPhone: ''
        });
        
        setCurrentStep(1);
        setPreviewMode(false);
      }, 1500);
    } else {
      setErrors(newErrors);
    }
  };

  // Format price with commas
  const formatPrice = (price) => {
    if (!price) return "$0";
    return "$" + parseFloat(price).toLocaleString();
  };

  return (
    <section className="py-16 bg-white dark:bg-surface-900">
      <div className="container mx-auto px-4">
        {/* Main container */}
          
          {/* Progress steps */}
          <div className="mb-10">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 right-0 top-1/2 h-1 bg-surface-200 dark:bg-surface-700 -translate-y-1/2 z-0"></div>
              
              {[1, 2, 3, 4].map((step) => (
                <div 
                  key={step} 
                  className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep >= step 
                      ? 'bg-primary text-white' 
                      : 'bg-surface-200 dark:bg-surface-700 text-surface-600 dark:text-surface-400'
                  } transition-colors duration-300`}
                >
                  {currentStep > step ? (
                    <CheckIcon className="h-5 w-5" />
                  ) : (
                    <span>{step}</span>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex justify-between mt-2 text-sm">
              <div className="text-center w-1/4">Property Details</div>
              <div className="text-center w-1/4">Features & Size</div>
              <div className="text-center w-1/4">Contact Info</div>
              <div className="text-center w-1/4">Preview & Submit</div>
            </div>
          </div>
          
          {/* Form Container */}
          <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft dark:shadow-none border border-surface-200 dark:border-surface-700 overflow-hidden">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Basic Information */}
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 md:p-8"
                  >
                    <h3 className="text-xl font-bold mb-6">Property Details</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="title" className="block mb-1 font-medium">
                          Property Title
                        </label>
                        <input
                          id="title"
                          name="title"
                          type="text"
                          value={formData.title}
                          onChange={handleChange}
                          placeholder="e.g. Modern Waterfront Villa"
                          className={`input ${errors.title ? 'border-red-500 dark:border-red-500' : ''}`}
                        />
                        {errors.title && (
                          <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="type" className="block mb-1 font-medium">
                          Property Type
                        </label>
                        <select
                          id="type"
                          name="type"
                          value={formData.type}
                          onChange={handleChange}
                          className={`input ${errors.type ? 'border-red-500 dark:border-red-500' : ''}`}
                        >
                          <option value="">Select property type</option>
                          <option value="house">House</option>
                          <option value="apartment">Apartment</option>
                          <option value="condo">Condo</option>
                          <option value="land">Land</option>
                          <option value="commercial">Commercial</option>
                        </select>
                        {errors.type && (
                          <p className="mt-1 text-sm text-red-500">{errors.type}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="location" className="block mb-1 font-medium">
                          Location
                        </label>
                        <input
                          id="location"
                          name="location"
                          type="text"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="e.g. Miami Beach, FL"
                          className={`input ${errors.location ? 'border-red-500 dark:border-red-500' : ''}`}
                        />
                        {errors.location && (
                          <p className="mt-1 text-sm text-red-500">{errors.location}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="description" className="block mb-1 font-medium">
                          Description
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          rows="4"
                          placeholder="Describe your property..."
                          className={`input ${errors.description ? 'border-red-500 dark:border-red-500' : ''}`}
                        ></textarea>
                        {errors.description && (
                          <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-8 flex justify-end">
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="btn-primary flex items-center gap-2"
                      >
                        Next Step
                        <ChevronRightIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              
                {/* Step 2: Property Features */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 md:p-8"
                  >
                    <h3 className="text-xl font-bold mb-6">Features & Size</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label htmlFor="price" className="block mb-1 font-medium">
                          Price ($)
                        </label>
                        <div className="relative">
                          <DollarSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-surface-400" />
                          <input
                            id="price"
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="e.g. 450000"
                            className={`input pl-10 ${errors.price ? 'border-red-500 dark:border-red-500' : ''}`}
                          />
                        </div>
                        {errors.price && (
                          <p className="mt-1 text-sm text-red-500">{errors.price}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="area" className="block mb-1 font-medium">
                          Area (sq ft)
                        </label>
                        <div className="relative">
                          <RulerIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-surface-400" />
                          <input
                            id="area"
                            name="area"
                            type="number"
                            value={formData.area}
                            onChange={handleChange}
                            placeholder="e.g. 2000"
                            className={`input pl-10 ${errors.area ? 'border-red-500 dark:border-red-500' : ''}`}
                          />
                        </div>
                        {errors.area && (
                          <p className="mt-1 text-sm text-red-500">{errors.area}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="bedrooms" className="block mb-1 font-medium">
                          Bedrooms
                        </label>
                        <div className="relative">
                          <BedDoubleIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-surface-400" />
                          <input
                            id="bedrooms"
                            name="bedrooms"
                            type="number"
                            value={formData.bedrooms}
                            onChange={handleChange}
                            placeholder="e.g. 3"
                            className={`input pl-10 ${errors.bedrooms ? 'border-red-500 dark:border-red-500' : ''}`}
                          />
                        </div>
                        {errors.bedrooms && (
                          <p className="mt-1 text-sm text-red-500">{errors.bedrooms}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="bathrooms" className="block mb-1 font-medium">
                          Bathrooms
                        </label>
                        <div className="relative">
                          <BathIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-surface-400" />
                          <input
                            id="bathrooms"
                            name="bathrooms"
                            type="number"
                            value={formData.bathrooms}
                            onChange={handleChange}
                            placeholder="e.g. 2"
                            className={`input pl-10 ${errors.bathrooms ? 'border-red-500 dark:border-red-500' : ''}`}
                          />
                        </div>
                        {errors.bathrooms && (
                          <p className="mt-1 text-sm text-red-500">{errors.bathrooms}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block mb-3 font-medium">
                        Amenities
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {availableAmenities.map((amenity) => (
                          <div 
                            key={amenity}
                            onClick={() => toggleAmenity(amenity)}
                            className={`
                              p-3 rounded-lg border-2 cursor-pointer flex items-center gap-2
                              ${formData.amenities.includes(amenity) 
                                ? 'border-primary bg-primary/5 dark:bg-primary/10' 
                                : 'border-surface-200 dark:border-surface-700'}
                              transition-colors duration-200
                            `}
                          >
                            <div className={`
                              w-5 h-5 rounded-full flex items-center justify-center
                              ${formData.amenities.includes(amenity) 
                                ? 'bg-primary text-white' 
                                : 'bg-surface-200 dark:bg-surface-700'}
                              transition-colors duration-200
                            `}>
                              {formData.amenities.includes(amenity) && (
                                <CheckIcon className="h-3 w-3" />
                              )}
                            </div>
                            <span className="text-sm font-medium">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-8 flex justify-between">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="btn bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-300 dark:hover:bg-surface-600"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="btn-primary flex items-center gap-2"
                      >
                        Next Step
                        <ChevronRightIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              
                {/* Step 3: Contact Information */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 md:p-8"
                  >
                    <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="contactEmail" className="block mb-1 font-medium">
                          Email Address
                        </label>
                        <div className="relative">
                          <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-surface-400" />
                          <input
                            id="contactEmail"
                            name="contactEmail"
                            type="email"
                            value={formData.contactEmail}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            className={`input pl-10 ${errors.contactEmail ? 'border-red-500 dark:border-red-500' : ''}`}
                          />
                        </div>
                        {errors.contactEmail && (
                          <p className="mt-1 text-sm text-red-500">{errors.contactEmail}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="contactPhone" className="block mb-1 font-medium">
                          Phone Number
                        </label>
                        <div className="relative">
                          <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-surface-400" />
                          <input
                            id="contactPhone"
                            name="contactPhone"
                            type="tel"
                            value={formData.contactPhone}
                            onChange={handleChange}
                            placeholder="e.g. (555) 123-4567"
                            className={`input pl-10 ${errors.contactPhone ? 'border-red-500 dark:border-red-500' : ''}`}
                          />
                        </div>
                        {errors.contactPhone && (
                          <p className="mt-1 text-sm text-red-500">{errors.contactPhone}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block mb-1 font-medium">
                          Upload Images
                        </label>
                        <div className="border-2 border-dashed border-surface-300 dark:border-surface-600 rounded-lg p-8 text-center">
                          <UploadCloudIcon className="h-10 w-10 mx-auto mb-3 text-surface-400" />
                          <p className="mb-2 text-surface-500 dark:text-surface-400">Drag & drop images here or</p>
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 text-primary dark:text-primary-light hover:underline font-medium"
                          >
                            <PlusIcon className="h-4 w-4" />
                            Browse Files
                          </button>
                          <p className="mt-2 text-xs text-surface-500 dark:text-surface-400">
                            Supports: JPG, PNG (Max: 5MB per file)
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex justify-between">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="btn bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-300 dark:hover:bg-surface-600"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="btn-primary flex items-center gap-2"
                      >
                        Next Step
                        <ChevronRightIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              
                {/* Step 4: Preview & Submit */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 md:p-8"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold">Property Preview</h3>
                      <div>
                        <button
                          type="button"
                          onClick={() => setPreviewMode(!previewMode)}
                          className="flex items-center gap-1 text-sm font-medium text-primary dark:text-primary-light"
                        >
                          {previewMode ? (
                            <>
                              <PenIcon className="h-4 w-4" />
                              Edit Details
                            </>
                          ) : (
                            <>
                              <EyeIcon className="h-4 w-4" />
                              Preview
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    
                    {previewMode ? (
                      <div className="mb-8">
                        <div className="property-card">
                          <div className="relative h-60 bg-surface-200 dark:bg-surface-700 rounded-t-xl flex items-center justify-center">
                            <ImageIcon className="h-12 w-12 text-surface-400" />
                          </div>
                          
                          <div className="p-5">
                            <div className="mb-2 flex items-center gap-1 text-sm text-surface-500 dark:text-surface-400">
                              <MapPinIcon className="h-4 w-4" />
                              <span>{formData.location || 'Location not specified'}</span>
                            </div>
                            
                            <h3 className="text-xl font-bold mb-2">
                              {formData.title || 'Untitled Property'}
                            </h3>
                            
                            <div className="text-xl font-bold text-primary dark:text-primary-light mb-4">
                              {formatPrice(formData.price || 0)}
                            </div>
                            
                            <div className="grid grid-cols-3 gap-2 mb-5">
                              <div className="flex items-center gap-1 text-sm text-surface-600 dark:text-surface-400">
                                <BedDoubleIcon className="h-4 w-4" />
                                <span>{formData.bedrooms || 0} Beds</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-surface-600 dark:text-surface-400">
                                <BathIcon className="h-4 w-4" />
                                <span>{formData.bathrooms || 0} Baths</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-surface-600 dark:text-surface-400">
                                <RulerIcon className="h-4 w-4" />
                                <span>{formData.area || 0} sqft</span>
                              </div>
                            </div>
                            
                            <p className="text-surface-600 dark:text-surface-400 mb-5 text-sm line-clamp-3">
                              {formData.description || 'No description provided'}
                            </p>
                            
                            {formData.amenities.length > 0 && (
                              <div className="mb-5">
                                <h4 className="text-sm font-medium mb-2">Amenities:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {formData.amenities.map(amenity => (
                                    <span key={amenity} className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-surface-100 dark:bg-surface-700">
                                      <CheckIcon className="h-3 w-3 text-primary" />
                                      {amenity}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            <div className="text-sm text-surface-600 dark:text-surface-400">
                              <div className="flex items-center gap-1 mb-1">
                                <MailIcon className="h-4 w-4" />
                                <span>{formData.contactEmail || 'Email not provided'}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <PhoneIcon className="h-4 w-4" />
                                <span>{formData.contactPhone || 'Phone not provided'}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-8 space-y-4">
                        <h4 className="font-medium">Summary</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-surface-50 dark:bg-surface-800 rounded-lg">
                          <div>
                            <p className="text-sm text-surface-500 dark:text-surface-400">Property Title</p>
                            <p className="font-medium">{formData.title}</p>
                          </div>
                          <div>
                            <p className="text-sm text-surface-500 dark:text-surface-400">Type</p>
                            <p className="font-medium capitalize">{formData.type}</p>
                          </div>
                          <div>
                            <p className="text-sm text-surface-500 dark:text-surface-400">Location</p>
                            <p className="font-medium">{formData.location}</p>
                          </div>
                          <div>
                            <p className="text-sm text-surface-500 dark:text-surface-400">Price</p>
                            <p className="font-medium">{formatPrice(formData.price)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-surface-500 dark:text-surface-400">Bedrooms</p>
                            <p className="font-medium">{formData.bedrooms}</p>
                          </div>
                          <div>
                            <p className="text-sm text-surface-500 dark:text-surface-400">Bathrooms</p>
                            <p className="font-medium">{formData.bathrooms}</p>
                          </div>
                          <div>
                            <p className="text-sm text-surface-500 dark:text-surface-400">Area</p>
                            <p className="font-medium">{formData.area} sq ft</p>
                          </div>
                          <div>
                            <p className="text-sm text-surface-500 dark:text-surface-400">Amenities</p>
                            <p className="font-medium">{formData.amenities.length > 0 ? formData.amenities.length : 'None'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-surface-500 dark:text-surface-400">Contact Email</p>
                            <p className="font-medium">{formData.contactEmail}</p>
                          </div>
                          <div>
                            <p className="text-sm text-surface-500 dark:text-surface-400">Contact Phone</p>
                            <p className="font-medium">{formData.contactPhone}</p>
                          </div>
                        </div>
                        
                        <div className="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
                          <p className="text-sm text-surface-500 dark:text-surface-400">Description</p>
                          <p className="font-medium">{formData.description}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-8 flex justify-between">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="btn bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-300 dark:hover:bg-surface-600"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`btn-primary flex items-center gap-2 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                          </>
                        ) : (
                          <>
                            Submit Listing
                            <CheckIcon className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
    </section>
  );
}

export default MainFeature;