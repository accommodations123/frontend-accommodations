import React from 'react';
import { MapPin, Calendar, Plane, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FaWhatsapp } from "react-icons/fa";

export const TravelPlanCard = ({ plan }) => {
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
