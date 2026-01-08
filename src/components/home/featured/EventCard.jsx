import React from 'react';
import { MapPin, Calendar, Users, Star, MessageCircle, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCountry } from '@/context/CountryContext';

const HostPhoto = ({ host }) => {
    const photoUrl =
        host?.selfie_photo ||
        host?.photo ||
        host?.avatar_image ||
        host?.image ||
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

export const EventCard = ({ event, viewMode = "grid", onViewDetails }) => {
    const { activeCountry } = useCountry();
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
        if (timeString.includes(':') && (timeString.includes('AM') || timeString.includes('PM'))) {
            return timeString;
        }
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
        const host = event.Host || event.host || event.creator || event.organizer;
        if (host?.full_name) return host.full_name;
        if (host?.name) return host.name;
        if (host?.User?.full_name) return host.User.full_name;
        if (typeof host === 'string') return host;
        if (event.host_name) return event.host_name;
        return "Organizer";
    };

    return (
        <div className={`bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all overflow-hidden ${viewMode === "list" ? "flex" : ""
            }`}>
            {/* Event Image */}
            {viewMode !== "list" && (
                <div className="relative h-40 overflow-hidden">
                    <img
                        src={event.banner_image || event.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=400&h=200&fit=crop"}
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
                                {formatDate(event.date || event.start_date || event.event_date)}
                                {(event.time || event.start_time) && ` at ${formatTime(event.time || event.start_time)}`}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                            <span className="text-xs sm:text-sm text-gray-600">
                                {event.attendees_count || 0} attending
                            </span>
                        </div>
                    </div>

                    {/* Organizer */}
                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                        <HostPhoto host={event.Host || event.host || event.creator} />
                        <div>
                            <p className="text-xs text-gray-500">Organized by</p>
                            <p className="text-sm font-medium text-gray-900">{getOrganizerName()}</p>
                        </div>
                    </div>
                </div>

                {/* Rating */}
                {event.rating > 0 && (
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className={`h-3 w-3 sm:h-4 sm:w-4 ${star <= event.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                            ))}
                            <span className="text-xs sm:text-sm text-gray-600 ml-1">
                                ({event.reviews_count || 0})
                            </span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                            <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="text-xs sm:text-sm">
                                {event.comments_count || 0}
                            </span>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <Button
                        onClick={() => onViewDetails(event.id || event._id)}
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
