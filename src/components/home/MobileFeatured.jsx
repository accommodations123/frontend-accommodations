import React from 'react';
import { Heart, Home, Armchair, LayoutPanelLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetApprovedHostDetailsQuery } from '@/store/api/hostApi';

export function MobileFeatured() {
    const { data: approvedHosts } = useGetApprovedHostDetailsQuery();

    const recommendedListings = approvedHosts?.map(host => ({
        id: host._id,
        title: host.host_full_name,
        location: host.host_city || "Unknown",
        price: 5000,
        image: host.host_id_photo || host.host_selfie_photo || null,
        type: "Verified Host"
    })) || [];



    return (
        <div className="pb-24 pt-4 bg-gray-50/50 min-h-screen">
            {/* 1. Recommended Section */}
            <div className="mb-8">
                <div className="flex items-center justify-between px-4 mb-4">
                    <h3 className="font-bold text-gray-900 text-lg">Recommended</h3>
                    <button className="text-accent text-xs font-bold flex items-center">
                        View All &gt;
                    </button>
                </div>

                <div className="flex gap-4 overflow-x-auto px-4 pb-4 no-scrollbar snap-x">
                    {recommendedListings.map((item) => (
                        <Link to={`/rooms/${item.id}`} key={item.id} className="min-w-[280px] snap-center">
                            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 p-2">
                                <div className="relative h-40 rounded-xl overflow-hidden mb-3">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                    <div className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center">
                                        <Heart className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="absolute bottom-2 left-2 flex items-center gap-2">
                                        <span className="bg-accent text-white text-[10px] font-bold px-2 py-1 rounded-md">Rent</span>
                                        <span className="bg-black/40 backdrop-blur-md text-white text-[10px] font-medium px-2 py-1 rounded-md">2m ago</span>
                                    </div>
                                </div>

                                <div className="px-1 pb-1">
                                    <h4 className="font-bold text-gray-900 truncate">{item.title}</h4>
                                    <p className="text-xs text-gray-500 mb-3">{item.type} | {item.area || "1180 sq ft"}</p>

                                    <div className="flex items-center justify-between">
                                        <span className="text-primary font-bold text-lg">${item.price}</span>
                                        <span className="text-xs text-gray-400">{item.location && item.location.split(',')[0]}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>



            {/* 3. Related Property Mock */}
            <div className="mb-8">
                <div className="flex items-center justify-between px-4 mb-4">
                    <h3 className="font-bold text-gray-900 text-lg">Related Property</h3>
                    <button className="text-accent text-xs font-bold flex items-center">
                        View All &gt;
                    </button>
                </div>
            </div>

        </div>
    );
}
