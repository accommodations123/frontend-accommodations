"use client"

import React, { useState } from 'react';
import { 
  Heart, Star, MapPin, Users, Wifi, Car, Utensils, Tv,
  ChevronRight, Home, TrendingUp, Clock, Globe, CheckCircle,
  ArrowRight, ShieldCheck, UsersRound, Building, Calendar,
  Thermometer, Search, Bed, Check, Filter, Bookmark,
  Dumbbell, ShoppingBag, CalendarDays, UsersIcon, Package,
  Sparkles, Plane, MessageCircle, Shield, Building2,
  Share2, Ticket, ArrowLeft, Video, Monitor
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetApprovedPropertiesQuery, useGetApprovedEventsQuery } from '@/store/api/hostApi';
import { VerificationBadge } from '@/components/ui/VerificationBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FaWhatsapp } from "react-icons/fa";


// Simple inline Skeleton component since the import doesn't exist
const Skeleton = ({ className = "", ...props }) => {
  return (
    <div 
      className={`animate-pulse bg-gray-200 rounded-md ${className}`}
      {...props}
    />
  );
};

// ============ CONSTANTS WITH COMMUNITY-FOCUSED DATA ============
const TRAVEL_PLANS = [
  {
    id: 1,
    user: {
      name: "Aarav Sharma",
      age: 28,
      from: "Mumbai",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
    },
    destination: "Bali, Indonesia",
    dates: "Dec 15-25, 2024",
    type: "Adventure",
    preference: "Cultural Exchange",
    lookingFor: "Looking for adventure buddies to explore temples, waterfalls, and local cuisine. Open to sharing experiences and creating amazing memories!",
    interests: ["Hiking", "Photography", "Food", "Cultural Exploration"]
  },
  {
    id: 2,
    user: {
      name: "Priya Patel",
      age: 32,
      from: "Delhi",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=100&auto=format&fit=crop"
    },
    destination: "Tokyo, Japan",
    dates: "Jan 10-20, 2025",
    type: "Cultural",
    preference: "Shared Experience",
    lookingFor: "Fellow community members to explore Tokyo's hidden gems and authentic Japanese experiences.",
    interests: ["Food Tours", "Anime", "Traditional Arts", "Shopping"]
  },
  {
    id: 3,
    user: {
      name: "Rohan Verma",
      age: 25,
      from: "Bangalore",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop"
    },
    destination: "Swiss Alps",
    dates: "Feb 5-15, 2025",
    type: "Ski Trip",
    preference: "Community Exchange",
    lookingFor: "Ski enthusiasts for Swiss Alps adventure. Looking to share accommodation and experiences.",
    interests: ["Skiing", "Snowboarding", "Hot Springs", "Mountain Trekking"]
  }
];

const SAFETY_TIPS = [
  {
    id: 1,
    title: "Verify Profiles",
    content: "Always check verification badges and read community feedback before connecting."
  },
  {
    id: 2,
    title: "Meet in Public",
    content: "First meetings should always be in well-lit, public places during daylight hours."
  },
  {
    id: 3,
    title: "Share Itinerary",
    content: "Share your travel plans with friends or family members for community safety."
  },
  {
    id: 4,
    title: "Trust Your Instincts",
    content: "If something doesn't feel right, politely excuse yourself from the situation."
  }
];

const GROUPS = [
  {
    id: 1,
    name: "Indian Community in NYC",
    members: 2450,
    location: "New York, USA",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=400&h=200&fit=crop",
    category: "Community",
    upcomingEvents: 3
  },
  
  {
    id: 2,
    name: "Tech Professionals Community",
    members: 3850,
    location: "Bangalore, India",
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=400&h=200&fit=crop",
    category: "Professional",
    upcomingEvents: 5
  },
  {
    id: 3,
    name: "Indian Students Community",
    members: 1800,
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=400&h=200&fit=crop",
    category: "Student",
    upcomingEvents: 2
  },
  {
    id: 4,
    name: "Indian Food & Culture Community",
    members: 5200,
    location: "Global",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=400&h=200&fit=crop",
    category: "Food & Culture",
    upcomingEvents: 4
  }
];

const EVENTS = [
  {
    id: 1,
    title: "Diwali Celebration 2024",
    date: "Nov 1, 2024",
    time: "6:00 PM",
    location: "London, UK",
    city: "London",
    country: "UK",
    image: "https://images.unsplash.com/photo-1604591259955-f18835aca253?q=80&w=400&h=200&fit=crop",
    category: "Festival",
    attendees_count: 450,
    type: "Community Hosted",
    description: "Join us for a grand Diwali celebration with traditional food, music, and fireworks.",
    host: {
      name: "Indian Cultural Society",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
    },
    reviews_count: 85,
    comments_count: 42
  },
  {
    id: 2,
    title: "Indian Community Meetup",
    date: "Dec 15, 2024",
    time: "9:00 AM",
    location: "San Francisco, USA",
    city: "San Francisco",
    country: "USA",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=400&h=200&fit=crop",
    category: "Community",
    attendees_count: 1200,
    type: "Free",
    description: "A networking event for Indian professionals in the Bay Area to connect and share experiences.",
    host: {
      name: "Bay Area Indian Network",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=100&auto=format&fit=crop"
    },
    reviews_count: 120,
    comments_count: 65
  },
  {
    id: 3,
    title: "Holi Festival Celebration",
    date: "Mar 25, 2025",
    time: "11:00 AM",
    location: "Toronto, Canada",
    city: "Toronto",
    country: "Canada",
    image: "https://images.unsplash.com/photo-1611510187053-2cb6d39a8e52?q=80&w=400&h=200&fit=crop",
    category: "Festival",
    attendees_count: 800,
    type: "Community Hosted",
    description: "Celebrate the festival of colors with music, dance, and traditional Indian sweets.",
    host: {
      name: "Toronto Indian Association",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop"
    },
    reviews_count: 95,
    comments_count: 38
  },
  {
    id: 4,
    title: "Indian Community Networking",
    date: "Jan 20, 2025",
    time: "5:00 PM",
    location: "Dubai, UAE",
    city: "Dubai",
    country: "UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=400&h=200&fit=crop",
    category: "Networking",
    attendees_count: 300,
    type: "Free",
    description: "Connect with Indian entrepreneurs and professionals in Dubai for business opportunities.",
    host: {
      name: "Dubai Indian Professionals",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop"
    },
    reviews_count: 75,
    comments_count: 28
  }
];

const COMMUNITY_SHARES = [
  {
    id: 1,
    title: "Indian Cookware Set",
    description: "Traditional cookware for authentic Indian cooking",
    location: "New York, USA",
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=400&h=200&fit=crop",
    category: "Home Goods",
    condition: "Excellent",
    posted: "2 hours ago"
  },
  {
    id: 2,
    title: "Indian Silk Saree Collection",
    description: "Traditional sarees for cultural events",
    location: "Mumbai, India",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=400&h=200&fit=crop",
    category: "Clothing",
    condition: "New",
    posted: "1 day ago"
  },
  {
    id: 3,
    title: "Hindi Learning Books",
    description: "Collection of books for learning Hindi language",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=400&h=200&fit=crop",
    category: "Education",
    condition: "Good",
    posted: "5 hours ago"
  },
  {
    id: 4,
    title: "Traditional Indian Jewelry",
    description: "For festive occasions and cultural celebrations",
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=400&h=200&fit=crop",
    category: "Cultural Items",
    condition: "Excellent",
    posted: "3 days ago"
  }
];

const FEATURE_CARDS = [
  {
    icon: <Home className="w-8 h-8" />,
    title: "Community Stays",
    description: "Verified homes with Indian hosts",
    stats: "10K+"
  },
  {
    icon: <UsersIcon className="w-8 h-8" />,
    title: "Join Communities",
    description: "Connect with like-minded people",
    stats: "500+"
  },
  {
    icon: <Plane className="w-8 h-8" />,
    title: "Travel Community",
    description: "Find travel companions",
    stats: "200+"
  },
  {
    icon: <Package className="w-8 h-8" />,
    title: "Community Sharing",
    description: "Share trusted items within community",
    stats: "50K+"
  }
];

const QUICK_STATS = [
  { value: "50K+", label: "Community Members", icon: <UsersIcon className="w-4 h-4" /> },
  { value: "4.9★", label: "Community Rating", icon: <Star className="w-4 h-4 fill-current" /> },
  { value: "24/7", label: "Community Support", icon: <ShieldCheck className="w-4 h-4" /> },
  { value: "100+", label: "Cities", icon: <Globe className="w-4 h-4" /> }
];

// ============ SUB-COMPONENTS ============
const SectionHeader = ({ title, subtitle, linkText, linkTo }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
    <div className="mb-4 md:mb-0">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-3 h-8 bg-gradient-to-b from-[#01172d] to-[#02305d] rounded-full"></div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#01172d]">{title}</h2>
      </div>
      <p className="text-gray-600 max-w-2xl">{subtitle}</p>
    </div>
    {linkText && linkTo && (
      <Link 
        to={linkTo}
        className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold text-sm bg-accent/10 hover:bg-accent/20 px-4 py-2 rounded-lg transition-all"
        aria-label={`View ${linkText}`}
      >
        {linkText}
        <ArrowRight className="h-4 w-4" />
      </Link>
    )}
  </div>
);

const CardContainer = ({ children, linkTo, className = "" }) => (
  <Link to={linkTo} className="group block h-full" aria-label="View details">
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl hover:border-accent/30 transition-all duration-300 h-full flex flex-col ${className}`}>
      {children}
    </div>
  </Link>
);

const PropertyCard = ({ property }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // Safely get property data
  const propertyData = {
    id: property.id || property._id || 'unknown',
    title: property.title || "Community Apartment with City View",
    location: property.city || "Community Location",
    hostPreference: property.host_preference || "Cultural Exchange",
    image: (property.photos && property.photos.length > 0)
      ? property.photos[0]
      : "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=400&h=300&fit=crop",
    isVerified: property.status === 'approved',
    rating: property.rating || 4.8,
    reviews: property.reviews || 42,
    amenities: property.amenities || ['wifi', 'kitchen', 'tv', 'ac'],
    bedrooms: property.bedrooms || 2,
    bathrooms: property.bathrooms || 2,
    area: property.area || "1200 sqft"
  };

  const getAmenityIcons = (amenities) => {
    const iconMap = {
      'wifi': <Wifi key="wifi" className="w-4 h-4 text-accent" />,
      'parking': <Car key="parking" className="w-4 h-4 text-accent" />,
      'kitchen': <Utensils key="kitchen" className="w-4 h-4 text-accent" />,
      'tv': <Tv key="tv" className="w-4 h-4 text-accent" />,
      'ac': <Thermometer key="ac" className="w-4 h-4 text-accent" />,
      'gym': <Dumbbell key="gym" className="w-4 h-4 text-accent" />,
    };
    
    const icons = [];
    amenities.forEach(amenity => {
      const lowerAmenity = amenity.toLowerCase();
      if (iconMap[lowerAmenity]) {
        icons.push(iconMap[lowerAmenity]);
      } else if (lowerAmenity.includes('wifi')) {
        icons.push(<Wifi key="wifi" className="w-4 h-4 text-accent" />);
      } else if (lowerAmenity.includes('parking')) {
        icons.push(<Car key="parking" className="w-4 h-4 text-accent" />);
      } else if (lowerAmenity.includes('kitchen')) {
        icons.push(<Utensils key="kitchen" className="w-4 h-4 text-accent" />);
      }
    });
    
    return icons.slice(0, 5);
  };

  return (
    <CardContainer key={propertyData.id} linkTo={`/rooms/${propertyData.id}`}>
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden rounded-t-xl">
        {!isImageLoaded && (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse"></div>
        )}
        <img
          src={propertyData.image}
          alt={propertyData.title}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${isImageLoaded ? 'block' : 'hidden'}`}
          onLoad={() => setIsImageLoaded(true)}
          loading="lazy"
        />
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button 
            className={`h-8 w-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform ${isFavorited ? 'bg-red-100' : 'bg-white/90'}`}
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
            onClick={(e) => {
              e.preventDefault();
              setIsFavorited(!isFavorited);
            }}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'text-red-500 fill-red-500' : 'text-gray-700'}`} />
          </button>
          <button 
            className={`h-8 w-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform ${isBookmarked ? 'bg-blue-100' : 'bg-white/90'}`}
            aria-label={isBookmarked ? "Remove bookmark" : "Save property"}
            onClick={(e) => {
              e.preventDefault();
              setIsBookmarked(!isBookmarked);
            }}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'text-blue-500 fill-blue-500' : 'text-gray-700'}`} />
          </button>
        </div>
        <div className="absolute bottom-3 left-3 flex gap-2">
          <VerificationBadge isVerified={propertyData.isVerified} />
          <span className="bg-accent text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
            Verified
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-sm leading-tight line-clamp-2 mb-1">
              {propertyData.title}
            </h3>
            <div className="flex items-center gap-1 text-gray-600 text-xs">
              <MapPin className="w-3 h-3" />
              <span>{propertyData.location}</span>
            </div>
          </div>
          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full shadow-sm">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="text-xs font-semibold text-gray-900 ml-1">
              {propertyData.rating}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <Bed className="w-3 h-3" />
            {propertyData.bedrooms} bed
          </span>
          <span className="text-gray-400">•</span>
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {propertyData.bathrooms} bath
          </span>
          <span className="text-gray-400">•</span>
          <span>{propertyData.area}</span>
        </div>

        {propertyData.amenities && propertyData.amenities.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1 flex-wrap">
              {getAmenityIcons(propertyData.amenities).slice(0, 4)}
              {propertyData.amenities.length > 4 && (
                <span className="text-xs text-gray-500 ml-1">
                  +{propertyData.amenities.length - 4}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
         <div>
  <div className="flex items-center gap-2">
    <Users className="w-4 h-4 text-accent" />
    <span className="text-lg font-bold text-gray-900">
      Host:-
    </span>
    {/* <span className="text-md font-bold text-accent">
      {propertyData.hostPreference}
    </span> */}
  </div>

  <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
    <CheckCircle className="w-3 h-3 text-green-500" />
    <span>No brokerage</span>
    <span className="text-gray-300">•</span>
    <ShieldCheck className="w-3 h-3 text-blue-500" />
    <span>Community rules apply</span>
  </div>
</div>

<button
  className="h-10 w-10 border border-green-600 text-green-600 hover:bg-green-50 rounded-full flex items-center justify-center transition-all shadow-sm hover:shadow"
  aria-label="Chat on WhatsApp"
  onClick={(e) => {
    e.preventDefault();
    // WhatsApp logic here
  }}
>
  <FaWhatsapp className="w-5 h-5" />
</button>
        </div>
      </div>
    </CardContainer>
  );
};

const TravelPlanCard = ({ plan }) => {
  const getPreferenceColor = (preference) => {
    switch (preference) {
      case "Cultural Exchange": return "bg-purple-50 text-purple-700 border-purple-100";
      case "Shared Experience": return "bg-blue-50 text-blue-700 border-blue-100";
      case "Community Exchange": return "bg-green-50 text-green-700 border-green-100";
      default: return "bg-gray-50 text-gray-700 border-gray-100";
    }
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all h-full flex flex-col">
      {/* User Profile */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <img
            src={plan.user.image}
            alt={`Profile of ${plan.user.name}`}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
            loading="lazy"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
            <Check className="w-2 h-2 text-white" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-[#01172d] text-lg">{plan.user.name}</h3>
          <p className="text-xs text-gray-500">{plan.user.age} • {plan.user.from}</p>
        </div>
        <Badge variant="outline" className={`ml-auto border ${getPreferenceColor(plan.preference)}`}>
          {plan.preference}
        </Badge>
      </div>

      {/* Trip Details */}
      <div className="mb-4 flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="h-4 w-4 text-accent" />
          <h4 className="font-bold text-gray-800 text-lg">{plan.destination}</h4>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{plan.dates}</span>
          </div>
          <div className="flex items-center gap-1">
            <Plane className="h-4 w-4" />
            <span>{plan.type}</span>
          </div>
        </div>
        <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg border border-gray-100 mb-4 leading-relaxed">
          "{plan.lookingFor}"
        </p>
      </div>

      {/* Interests */}
      <div className="flex flex-wrap gap-2 mb-4">
        {plan.interests.map(interest => (
          <Badge 
            key={interest} 
            variant="secondary" 
            className="bg-blue-50 text-[#01172d] hover:bg-blue-100 border border-blue-100 font-normal text-xs"
          >
            {interest}
          </Badge>
        ))}
      </div>

      <Button 
        className="w-full bg-gradient-to-r from-[#01172d] to-[#02305d] hover:from-[#02305d] hover:to-[#034078] text-white shadow-sm hover:shadow transition-all"
        aria-label={`Connect with ${plan.user.name}`}
      >
        <FaWhatsapp className="h-4 w-4 mr-2" />

        Connect with {plan.user.name.split(' ')[0]}
      </Button>
    </div>
  );
};

// Event Card Component with all fields from the user's code
const EventCard = ({ event, viewMode = "grid", onViewDetails }) => {
  // Helper functions for formatting date and time
  const formatDate = (dateString) => {
    if (!dateString) return "Date TBA";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    // If time is already in format like "6:00 PM", return as is
    if (timeString.includes(':') && (timeString.includes('AM') || timeString.includes('PM'))) {
      return timeString;
    }
    // Otherwise format the time
    try {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const formattedHour = hour % 12 || 12;
      return `${formattedHour}:${minutes || '00'} ${ampm}`;
    } catch (e) {
      return timeString;
    }
  };

  const getOrganizerName = () => {
     if (event.host?.full_name) return event.host.full_name;
    if (event.host?.name) return event.host.name;
    if (event.organizer) return event.organizer;
    if (event.host_name) return event.host_name;
    return "Community Host";
  };

 const HostPhoto = ({ host }) => {
  const photoUrl =
    host?.selfie_photo ||   // ✅ API Host image
    host?.photo ||          // fallback
    host?.image ||          // fallback
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop";

  return (
    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-gray-100">
      <img
        src={photoUrl}
        alt="Organizer"
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
};


  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all overflow-hidden ${
      viewMode === "list" ? "flex" : ""
    }`}>
      {/* Event Image */}
      {viewMode !== "list" && (
        <div className="relative h-40 overflow-hidden">
          <img
            src={event.banner_image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=400&h=200&fit=crop"}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
              {event.category || "Community"}
            </span>
          </div>
          <div className="absolute bottom-3 right-3">
            <span className="bg-black/70 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              {event.type || "Free"}
            </span>
          </div>
        </div>
      )}

      <div className={`p-4 sm:p-5 ${viewMode === "list" ? "flex-1 flex flex-col justify-between" : ""}`}>
        <div>
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
            <span className="text-xs sm:text-sm text-gray-600">
              {event.city ? `${event.city}, ${event.country || ""}` : event.location || "Location TBA"}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
          <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{event.description}</p>

          {/* Event Stats */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
              <span className="text-xs sm:text-sm text-gray-600">
                {formatDate(event.date || event.start_date)}
                {event.time && ` at ${formatTime(event.time)}`}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
              <span className="text-xs sm:text-sm text-gray-600">
                {event.attendees_count || Math.floor(Math.random() * 500) + 100} attending
              </span>
            </div>
          </div>

          {/* Organizer */}
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <HostPhoto host={event.host} />
            <div>
              <p className="text-xs text-gray-500">Organized by</p>
              <p className="text-sm font-medium text-gray-900">{getOrganizerName()}</p>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-xs sm:text-sm text-gray-600 ml-1">
              ({event.reviews_count || Math.floor(Math.random() * 100) + 50})
            </span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm">
              {event.comments_count || Math.floor(Math.random() * 50) + 10}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={() => onViewDetails(event.id)}
            className="flex-1 bg-[#ff0000] hover:bg-[#cc0000] text-white rounded-lg py-2 text-xs sm:text-sm font-medium transition-all duration-200"
          >
            View Details
          </Button>
          <Button variant="outline" className="px-3 sm:px-4 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200">
            <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// ============ MAIN COMPONENT ============
const HomeFeatured = ({ filters }) => {
  // Move the hooks inside the component
  const { data: approvedProperties, isLoading, error } = useGetApprovedPropertiesQuery();
  const { data: approvedEvents, isLoading: eventsLoading, error: eventsError } = useGetApprovedEventsQuery();
  const [travelSearchTerm, setTravelSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  // Function to handle view details click
  const handleViewDetails = (eventId) => {
    // Navigate to event details page
    window.location.href = `/events/${eventId}`;
  };

  // Filter travel plans based on search
  const filteredTravelPlans = TRAVEL_PLANS.filter(plan =>
    plan.destination.toLowerCase().includes(travelSearchTerm.toLowerCase()) ||
    plan.type.toLowerCase().includes(travelSearchTerm.toLowerCase()) ||
    plan.user.name.toLowerCase().includes(travelSearchTerm.toLowerCase())
  );

  // Error handling
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Properties</h2>
            <p className="text-gray-600 mb-6">We're having trouble loading the properties. Please try again.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={() => window.location.reload()}
                className="bg-accent hover:bg-accent/90 text-white px-6"
              >
                Refresh Page
              </Button>
              <Link to="/contact">
                <Button variant="outline" className="border-gray-300">
                  Contact Community Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Community Properties Section */}
        <section aria-labelledby="community-properties-title">
          <SectionHeader 
            title="Community Stays"
            subtitle="Verified homes with Indian hosts and cultural amenities"
            linkText="View All Stays"
            linkTo="/search"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              [1, 2, 3, 4].map((n) => (
                <div key={n} className="h-[400px] bg-gray-100 rounded-xl animate-pulse"></div>
              ))
            ) : approvedProperties && approvedProperties.length > 0 ? (
              approvedProperties.slice(0, 4).map((property) => (
                <PropertyCard key={property.id || property._id} property={property} />
              ))
            ) : (
              <>
                {/* Fallback properties when no API data */}
                {[1, 2, 3, 4].map((n) => (
                  <PropertyCard key={n} property={{
                    id: n,
                    title: `Community Stay ${n}`,
                    city: ['New York', 'London', 'Dubai', 'Sydney'][n-1],
                    host_preference: ['Cultural Exchange', 'Shared Experience', 'Community Exchange', 'Cultural Immersion'][n-1],
                    photos: [
                      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=400&h=300&fit=crop',
                      'https://images.unsplash.com/photo-1499916078039-922301b0eb9b?q=80&w=400&h=300&fit=crop',
                      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400&h=300&fit=crop',
                      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=400&h=300&fit=crop'
                    ][n-1],
                    status: 'approved',
                    rating: [4.8, 4.7, 4.9, 4.6][n-1],
                    reviews: [42, 38, 51, 29][n-1],
                    amenities: ['wifi', 'kitchen', 'tv', 'ac'],
                    bedrooms: 2,
                    bathrooms: 2
                  }} />
                ))}
              </>
            )}
          </div>
        </section>

        {/* Travel Community Section */}
        <section aria-labelledby="travel-community-title" className="mt-16">
          <SectionHeader 
            title="Find Travel Community"
            subtitle="Connect with fellow Indian travelers, share experiences, and explore the world together"
            linkText="View All Trips"
            linkTo="/travel"
          />

          {/* Travel Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTravelPlans.map(plan => (
              <TravelPlanCard key={plan.id} plan={plan} />
            ))}
            
            {filteredTravelPlans.length === 0 && (
              <div className="col-span-3 text-center py-12">
                <div className="max-w-md mx-auto">
                  <Plane className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No matching travel plans found</h3>
                  <p className="text-gray-500 mb-6">Try searching for popular destinations like Bali, Tokyo, or Paris</p>
                  <Button 
                    onClick={() => setTravelSearchTerm("")}
                    className="bg-accent hover:bg-accent/90 text-white"
                  >
                    View All Travel Plans
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Community Groups Section */}
        <section aria-labelledby="community-groups-title" className="mt-16">
          <SectionHeader 
            title="Community Groups"
            subtitle="Connect with fellow Indians based on interests, locations, and professions"
            linkText="Explore All Groups"
            linkTo="/groups"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {GROUPS.map((group) => (
              <CardContainer key={group.id} linkTo={`/groups/${group.id}`}>
                {/* Group Image */}
                <div className="relative h-40 overflow-hidden rounded-t-xl">
                  <img
                    src={group.image}
                    alt={group.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-white/90 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                      {group.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 rounded-full px-3 py-1.5 flex items-center gap-1 shadow-sm">
                    <UsersIcon className="w-3 h-3 text-gray-700" />
                    <span className="text-xs font-semibold text-gray-800">
                      {group.members.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Group Info */}
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2">
                    {group.name}
                  </h3>
                  <div className="flex items-center gap-1 text-gray-600 text-xs mb-3">
                    <MapPin className="w-3 h-3" />
                    <span>{group.location}</span>
                  </div>
                  
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                      <Calendar className="w-3 h-3" />
                      <span>{group.upcomingEvents} community events</span>
                    </div>
                    <button 
                      className="bg-accent hover:bg-accent/90 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm hover:shadow transition-all"
                      onClick={(e) => {
                        e.preventDefault();
                        // Handle join group logic
                      }}
                    >
                      Join Community
                    </button>
                  </div>
                </div>
              </CardContainer>
            ))}
          </div>
        </section>

        {/* Community Events Section */}
        <section aria-labelledby="community-events-title" className="mt-16">
          <SectionHeader 
            title="Community Events"
            subtitle="Cultural festivals, networking meetups, and community gatherings"
            linkText="View All Events"
            linkTo="/events"
          />

          {/* View Mode Toggle */}
          <div className="flex justify-end mb-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1 inline-flex">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === "grid"
                    ? "bg-accent text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Grid View
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === "list"
                    ? "bg-accent text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                List View
              </button>
            </div>
          </div>

          <div className={`${
            viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" 
              : "space-y-4"
          }`}>
            {eventsLoading ? (
              [1, 2, 3, 4].map((n) => (
                <div key={n} className="h-[400px] bg-gray-100 rounded-xl animate-pulse"></div>
              ))
            ) : approvedEvents && approvedEvents.length > 0 ? (
              approvedEvents.slice(0, 4).map((event) => (
                <EventCard 
                  key={event.id || event._id} 
                  event={event}
                  viewMode={viewMode}
                  onViewDetails={handleViewDetails}
                />
              ))
            ) : (
              <>
                {/* Fallback events when no API data */}
                {EVENTS.map((event) => (
                  <EventCard 
                    key={event.id} 
                    event={event}
                    viewMode={viewMode}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </>
            )}
          </div>
        </section>

        {/* Community Sharing Section */}
        <section aria-labelledby="community-sharing-title" className="mt-16">
          <SectionHeader 
            title="Community Sharing"
            subtitle="Share and exchange trusted items within the Indian community worldwide"
            linkText="Browse Community Shares"
            linkTo="/marketplace"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMMUNITY_SHARES.map((item) => (
              <CardContainer key={item.id} linkTo={`/community-share/${item.id}`}>
                {/* Item Image */}
                <div className="relative h-40 overflow-hidden rounded-t-xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-white/90 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                      {item.condition}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="bg-black/70 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                      {item.posted}
                    </span>
                  </div>
                </div>

                {/* Item Info */}
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xs text-gray-500">
                      Community sharing
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                      <Clock className="w-3 h-3" />
                      <span>{item.posted}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-gray-600 text-xs mb-4">
                    <MapPin className="w-3 h-3" />
                    <span>{item.location}</span>
                  </div>
                  
                  <button 
                    className="w-full bg-accent hover:bg-accent/90 text-white py-2.5 rounded-lg text-sm font-semibold shadow-sm hover:shadow transition-all mt-auto"
                    onClick={(e) => {
                      e.preventDefault();
                      // Handle view details logic
                    }}
                  >
                    View Details
                  </button>
                </div>
              </CardContainer>
            ))}
          </div>
        </section>

        {/* Features & Safety Section */}
        <section aria-labelledby="features-safety-title" className="mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Community Overview */}
            <div className="lg:col-span-2 bg-gradient-to-br from-[#01172d] via-[#01172d] to-[#02305d] rounded-2xl p-8 text-white shadow-xl">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-4">
                  Your Complete Community Platform for Life Abroad
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Everything you need to settle, connect, and thrive in your new community
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {FEATURE_CARDS.map((category, idx) => (
                  <div key={idx} className="text-center group">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-accent">
                        {category.icon}
                      </div>
                    </div>
                    <div className="text-2xl font-bold mb-1">{category.stats}</div>
                    <h3 className="text-lg font-semibold mb-1">{category.title}</h3>
                    <p className="text-gray-300 text-sm">{category.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Safety Widget */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 h-fit">
              <div className="flex items-center gap-3 text-[#01172d] mb-6">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-xl">Community Safety</h3>
                  <p className="text-sm text-gray-500">Stay safe within our community</p>
                </div>
              </div>

              <div className="space-y-6">
                {SAFETY_TIPS.map((tip, index) => (
                  <div key={tip.id} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-50 text-accent flex items-center justify-center text-sm font-bold border border-red-100 shadow-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#01172d] text-sm mb-1 flex items-center gap-2">
                        {tip.title}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{tip.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Verification CTA */}
              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                  <ShieldCheck className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-bold text-[#01172d] mb-2">Get Community Verified</h4>
                <p className="text-sm text-gray-600 mb-4">Build trust with our community members</p>
                <Button 
                  className="w-full bg-gradient-to-r from-[#01172d] to-[#02305d] hover:from-[#02305d] hover:to-[#034078] text-white font-bold shadow-sm hover:shadow transition-all"
                  aria-label="Verify your profile with community"
                >
                  Get Community Verified
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section aria-labelledby="final-cta-title" className="mt-16">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-10 text-center max-w-4xl mx-auto border border-blue-100 shadow-sm">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-[#01172d] mb-4">
                Ready to Join Our Community?
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Start your journey with thousands of Indians who've found their home away from home
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="groups"
                  className="px-8 py-4 bg-gradient-to-r from-[#01172d] to-[#02305d] hover:from-[#02305d] hover:to-[#034078] text-white rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  aria-label="Join our community"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Join Our Community
                  </div>
                </Link>
                <Link 
                  to="/resources/travel"
                  className="px-8 py-4 border-2 border-[#01172d] text-[#01172d] hover:bg-[#01172d] hover:text-white rounded-full font-semibold text-lg transition-all duration-300 shadow-sm hover:shadow"
                  aria-label="Find travel community"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Plane className="h-5 w-5" />
                    Find Travel Community
                  </div>
                </Link>
              </div>
              <p className="text-sm text-gray-500 mt-6">
                Join 50,000+ community members already connected worldwide
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeFeatured;