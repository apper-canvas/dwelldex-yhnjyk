import { useState } from 'react';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

// Icons
const MapPinIcon = getIcon('MapPin');
const SchoolIcon = getIcon('School');
const ShoppingBagIcon = getIcon('ShoppingBag');
const TreePineIcon = getIcon('Palmtree');
const HeartPulseIcon = getIcon('HeartPulse');
const CarIcon = getIcon('Car');
const BusIcon = getIcon('Bus');
const TrainIcon = getIcon('Train');
const UmbrellaIcon = getIcon('Umbrella');
const UserIcon = getIcon('User');
const UsersIcon = getIcon('Users');
const HomeIcon = getIcon('Home');
const TrendingUpIcon = getIcon('TrendingUp');
const TrendingDownIcon = getIcon('TrendingDown');
const SearchIcon = getIcon('Search');
const FilterIcon = getIcon('Filter');

// Sample data for neighborhoods
const neighborhoods = [
  {
    id: 1,
    name: "Downtown Heights",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    overview: "A vibrant urban center with a mix of modern high-rises and historic buildings. Popular for young professionals and those seeking an active lifestyle with everything at your doorstep.",
    safetyScore: 85,
    amenitiesScore: 95,
    transitScore: 90,
    qualityScore: 88,
    priceRange: "$$$",
    priceGrowth: 5.8,
    amenities: {
      schools: 12,
      parks: 8,
      shops: 48,
      restaurants: 76,
      hospitals: 4
    },
    transit: {
      subway: true,
      bus: true,
      bikeLanes: true,
      walkScore: 92
    },
    demographics: {
      avgAge: 34,
      familyPercentage: 28,
      singlePercentage: 52,
      averageIncome: "$85,000"
    }
  },
  {
    id: 2,
    name: "Riverside Community",
    image: "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    overview: "A peaceful residential area along the river with beautiful parks and walking trails. Perfect for families and outdoor enthusiasts looking for a balance of nature and urban convenience.",
    safetyScore: 92,
    amenitiesScore: 78,
    transitScore: 75,
    qualityScore: 90,
    priceRange: "$$",
    priceGrowth: 4.2,
    amenities: {
      schools: 8,
      parks: 14,
      shops: 22,
      restaurants: 34,
      hospitals: 2
    },
    transit: {
      subway: false,
      bus: true,
      bikeLanes: true,
      walkScore: 78
    },
    demographics: {
      avgAge: 42,
      familyPercentage: 65,
      singlePercentage: 22,
      averageIncome: "$92,000"
    }
  },
  {
    id: 3,
    name: "Tech Village",
    image: "https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    overview: "A modern, newly developed area that's home to tech companies and startups. Features contemporary architecture, smart homes, and innovative community spaces.",
    safetyScore: 88,
    amenitiesScore: 82,
    transitScore: 86,
    qualityScore: 85,
    priceRange: "$$$",
    priceGrowth: 7.2,
    amenities: {
      schools: 6,
      parks: 10,
      shops: 38,
      restaurants: 52,
      hospitals: 3
    },
    transit: {
      subway: true,
      bus: true,
      bikeLanes: true,
      walkScore: 84
    },
    demographics: {
      avgAge: 31,
      familyPercentage: 35,
      singlePercentage: 45,
      averageIncome: "$105,000"
    }
  }
];

function ScoreIndicator({ score, label, color = "primary" }) {
  const getColor = () => {
    if (color === "primary") return "bg-primary";
    if (color === "secondary") return "bg-secondary";
    if (color === "green") return "bg-green-500";
    return "bg-primary";
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-16 h-16 mb-2">
        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="currentColor"
            className="text-surface-200 dark:text-surface-700"
            strokeWidth="12"
          />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="currentColor"
            className={`text-${color} dark:text-${color}-light`}
            strokeWidth="12"
            strokeDasharray="339.292"
            strokeDashoffset={339.292 * (1 - score / 100)}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold">{score}</span>
        </div>
      </div>
      <span className="text-sm text-surface-600 dark:text-surface-400">{label}</span>
    </div>
  );
}

function LocalityInsights() {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(neighborhoods[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNeighborhoods = neighborhoods.filter(
    (neighborhood) => neighborhood.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-center mb-6">Locality Insights</h1>
        <p className="text-center text-surface-600 dark:text-surface-400 max-w-3xl mx-auto mb-8">
          Discover detailed information about neighborhoods and communities to help you make informed decisions about where to live. Compare metrics, amenities, and market trends across different areas.
        </p>

        <div className="relative max-w-xl mx-auto mb-12">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search neighborhoods..."
            className="input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {filteredNeighborhoods.map((neighborhood) => (
          <motion.div
            key={neighborhood.id}
            whileHover={{ y: -5 }}
            className={`card cursor-pointer ${selectedNeighborhood.id === neighborhood.id ? 'ring-2 ring-primary dark:ring-primary-light' : ''}`}
            onClick={() => setSelectedNeighborhood(neighborhood)}
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={neighborhood.image} 
                alt={neighborhood.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <h3 className="text-xl">{neighborhood.name}</h3>
                  <div className="flex items-center text-sm">
                    <MapPinIcon className="w-4 h-4 mr-1" />
                    <span>Price Range: {neighborhood.priceRange}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between mb-4">
                <ScoreIndicator score={neighborhood.safetyScore} label="Safety" />
                <ScoreIndicator score={neighborhood.amenitiesScore} label="Amenities" color="secondary" />
                <ScoreIndicator score={neighborhood.transitScore} label="Transit" color="green" />
              </div>
              <p className="text-sm text-surface-600 dark:text-surface-400 line-clamp-3 mb-2">{neighborhood.overview}</p>
              <div className="flex items-center text-sm">
                <TrendingUpIcon className="w-4 h-4 mr-1 text-green-500" />
                <span>Price growth: <span className="font-medium">{neighborhood.priceGrowth}%</span> annually</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedNeighborhood && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card p-6"
        >
          <h2 className="mb-6">{selectedNeighborhood.name} Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl mb-4">Overview</h3>
              <p className="mb-6 text-surface-600 dark:text-surface-400">{selectedNeighborhood.overview}</p>
              
              <h3 className="text-xl mb-4">Demographics</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="card p-4 flex items-center">
                  <UserIcon className="w-5 h-5 mr-3 text-primary" />
                  <div>
                    <div className="text-sm text-surface-500 dark:text-surface-400">Average Age</div>
                    <div className="font-medium">{selectedNeighborhood.demographics.avgAge} years</div>
                  </div>
                </div>
                <div className="card p-4 flex items-center">
                  <UsersIcon className="w-5 h-5 mr-3 text-primary" />
                  <div>
                    <div className="text-sm text-surface-500 dark:text-surface-400">Families</div>
                    <div className="font-medium">{selectedNeighborhood.demographics.familyPercentage}%</div>
                  </div>
                </div>
                <div className="card p-4 flex items-center">
                  <UserIcon className="w-5 h-5 mr-3 text-primary" />
                  <div>
                    <div className="text-sm text-surface-500 dark:text-surface-400">Singles</div>
                    <div className="font-medium">{selectedNeighborhood.demographics.singlePercentage}%</div>
                  </div>
                </div>
                <div className="card p-4 flex items-center">
                  <HomeIcon className="w-5 h-5 mr-3 text-primary" />
                  <div>
                    <div className="text-sm text-surface-500 dark:text-surface-400">Average Income</div>
                    <div className="font-medium">{selectedNeighborhood.demographics.averageIncome}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl mb-4">Amenities</h3>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="card p-4 flex flex-col items-center text-center">
                  <SchoolIcon className="w-6 h-6 mb-2 text-blue-500" />
                  <div className="text-2xl font-bold">{selectedNeighborhood.amenities.schools}</div>
                  <div className="text-sm text-surface-500 dark:text-surface-400">Schools</div>
                </div>
                <div className="card p-4 flex flex-col items-center text-center">
                  <TreePineIcon className="w-6 h-6 mb-2 text-green-500" />
                  <div className="text-2xl font-bold">{selectedNeighborhood.amenities.parks}</div>
                  <div className="text-sm text-surface-500 dark:text-surface-400">Parks</div>
                </div>
                <div className="card p-4 flex flex-col items-center text-center">
                  <ShoppingBagIcon className="w-6 h-6 mb-2 text-purple-500" />
                  <div className="text-2xl font-bold">{selectedNeighborhood.amenities.shops}</div>
                  <div className="text-sm text-surface-500 dark:text-surface-400">Shops</div>
                </div>
                <div className="card p-4 flex flex-col items-center text-center">
                  <UmbrellaIcon className="w-6 h-6 mb-2 text-red-500" />
                  <div className="text-2xl font-bold">{selectedNeighborhood.amenities.restaurants}</div>
                  <div className="text-sm text-surface-500 dark:text-surface-400">Restaurants</div>
                </div>
                <div className="card p-4 flex flex-col items-center text-center">
                  <HeartPulseIcon className="w-6 h-6 mb-2 text-red-500" />
                  <div className="text-2xl font-bold">{selectedNeighborhood.amenities.hospitals}</div>
                  <div className="text-sm text-surface-500 dark:text-surface-400">Hospitals</div>
                </div>
              </div>
              
              <h3 className="text-xl mb-4">Transportation</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className={`card p-4 flex items-center ${selectedNeighborhood.transit.subway ? 'bg-green-50 dark:bg-green-900/20' : 'bg-surface-100 dark:bg-surface-800'}`}>
                  <TrainIcon className={`w-5 h-5 mr-3 ${selectedNeighborhood.transit.subway ? 'text-green-500' : 'text-surface-400'}`} />
                  <div>
                    <div className="font-medium">Subway / Metro</div>
                    <div className="text-sm text-surface-500 dark:text-surface-400">
                      {selectedNeighborhood.transit.subway ? 'Available' : 'Not available'}
                    </div>
                  </div>
                </div>
                <div className={`card p-4 flex items-center ${selectedNeighborhood.transit.bus ? 'bg-green-50 dark:bg-green-900/20' : 'bg-surface-100 dark:bg-surface-800'}`}>
                  <BusIcon className={`w-5 h-5 mr-3 ${selectedNeighborhood.transit.bus ? 'text-green-500' : 'text-surface-400'}`} />
                  <div>
                    <div className="font-medium">Bus Service</div>
                    <div className="text-sm text-surface-500 dark:text-surface-400">
                      {selectedNeighborhood.transit.bus ? 'Available' : 'Not available'}
                    </div>
                  </div>
                </div>
                <div className={`card p-4 flex items-center ${selectedNeighborhood.transit.bikeLanes ? 'bg-green-50 dark:bg-green-900/20' : 'bg-surface-100 dark:bg-surface-800'}`}>
                  <BusIcon className={`w-5 h-5 mr-3 ${selectedNeighborhood.transit.bikeLanes ? 'text-green-500' : 'text-surface-400'}`} />
                  <div>
                    <div className="font-medium">Bike Lanes</div>
                    <div className="text-sm text-surface-500 dark:text-surface-400">
                      {selectedNeighborhood.transit.bikeLanes ? 'Available' : 'Not available'}
                    </div>
                  </div>
                </div>
                <div className="card p-4 flex items-center">
                  <CarIcon className="w-5 h-5 mr-3 text-blue-500" />
                  <div>
                    <div className="font-medium">Walk Score</div>
                    <div className="text-sm text-surface-500 dark:text-surface-400">
                      {selectedNeighborhood.transit.walkScore}/100
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default LocalityInsights;