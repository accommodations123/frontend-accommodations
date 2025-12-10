"use client"

import { Button } from "@/components/ui/button"
import { Users, ArrowRight, Flame, MapPin, Hash, Calendar, MessageCircle } from "lucide-react"

export function GroupCard({ type, data }) {
    // Ensure data has all required properties with fallback values
    const cardData = {
        name: data?.name || data?.title || 'Community Name',
        members: data?.members || 0,
        description: data?.description || 'Join this amazing community to connect with like-minded people.',
        image: data?.image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
        flag: data?.flag || '🌍',
        title: data?.title || 'Group Title',
        icon: data?.icon || Hash,
        activePosts: data?.activePosts || 0,
        groupName: data?.groupName || 'Group Name',
        ...data
    }

    if (type === "country") {
        return (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 min-w-[280px] flex flex-col items-center text-center group cursor-pointer transform hover:-translate-y-1">
                <div className="text-7xl mb-4 transform group-hover:scale-125 transition-all duration-500">
                    {cardData.flag}
                </div>
                <h3 className="font-bold text-[#07182A] text-xl mb-2">
                    {cardData.name}
                </h3>
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                    <Users className="h-4 w-4" />
                    <span>{cardData.members} members</span>
                </div>
                <Button className="w-full bg-[#C93A30] hover:bg-[#B82E28] text-white rounded-full font-semibold text-sm py-3 px-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                    Join Community
                </Button>
            </div>
        )
    }

    if (type === "city") {
        return (
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group cursor-pointer h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={cardData.image}
                        alt={cardData.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                        <div className="flex items-center gap-1 text-xs font-medium bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full w-fit mb-2">
                            <Users className="h-3 w-3" />
                            {cardData.members}
                        </div>
                    </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-[#07182A] text-xl mb-2">
                        {cardData.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">
                        {cardData.description}
                    </p>
                    <Button variant="outline" className="w-full border-[#C93A30] text-[#C93A30] hover:bg-[#C93A30] hover:text-white rounded-full font-semibold text-sm py-3 px-6 transition-all duration-300 hover:scale-105">
                        Join Group
                    </Button>
                </div>
            </div>
        )
    }

    if (type === "purpose") {
        const Icon = cardData.icon
        return (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-[#C93A30]/30 hover:shadow-xl transition-all duration-300 cursor-pointer flex items-start gap-4 transform hover:translate-x-2">
                <div className="p-4 bg-gradient-to-br from-[#F1E7D6] to-[#E8D5C4] rounded-xl text-[#07182A] shadow-sm hover:shadow-md transition-all duration-300">
                    <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-[#07182A] text-lg mb-1">
                        {cardData.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                        {cardData.description}
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-[#C93A30]">
                            {cardData.members} members
                        </span>
                        <div className="w-1 h-1 bg-[#C93A30] rounded-full"></div>
                    </div>
                </div>
            </div>
        )
    }

    if (type === "trending") {
        return (
            <div className="relative rounded-2xl overflow-hidden h-64 group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-[#07182A] via-[#07182A]/60 to-transparent opacity-90"></div>
                <img
                    src={cardData.image}
                    alt={cardData.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 text-[#C93A30] font-bold text-sm mb-2">
                        <Flame className="h-4 w-4 fill-current" />
                        <span>Trending • {cardData.activePosts} active posts</span>
                    </div>
                    <h3 className="text-white font-bold text-2xl mb-4">
                        {cardData.name}
                    </h3>
                    <Button size="lg" className="bg-white text-[#07182A] hover:bg-gray-100 rounded-full font-semibold shadow-md hover:shadow-lg w-full transition-all duration-300 hover:scale-105">
                        Join Now
                    </Button>
                </div>
            </div>
        )
    }

    if (type === "recommended") {
        return (
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 flex items-center justify-between gap-4 hover:shadow-xl transition-all duration-300 transform hover:translate-x-2">
                <div className="flex-1">
                    <p className="text-xs font-bold text-[#C93A30] uppercase tracking-wider mb-1">
                        {cardData.title}
                    </p>
                    <h3 className="font-bold text-[#07182A] text-lg">
                        {cardData.groupName}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                        {cardData.members} members
                    </p>
                </div>
                <Button size="icon" variant="ghost" className="rounded-full hover:bg-[#F1E7D6] text-[#07182A] h-10 w-10 transition-all duration-300 hover:scale-110">
                    <ArrowRight className="h-5 w-5" />
                </Button>
            </div>
        )
    }

    if (type === "event") {
        return (
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 rounded-xl">
                        <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-[#07182A] text-lg mb-2">
                            {cardData.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                            {cardData.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>{cardData.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{cardData.date}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return null
}

// Add these CSS animations to your global styles or component file
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .animate-fadeIn {
        animation: fadeIn 0.5s ease-out forwards;
    }
    
    .animate-slideUp {
        animation: slideUp 0.5s ease-out forwards;
    }
    
    .animation-delay-100 {
        animation-delay: 100ms;
    }
`;
document.head.appendChild(style);