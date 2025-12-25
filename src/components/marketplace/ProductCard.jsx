import React from "react";
import { MapPin, Clock, MessageCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1585386959984-a41552231693?w=600&q=80";

export function ProductCard({ product, onMessage }) {
    const navigate = useNavigate();

    if (!product) return null;

    const imageUrl =
        product?.images?.length > 0
            ? product.images[0]
            : product?.image || FALLBACK_IMAGE;

    const postedDate = product?.postedTime
        ? product.postedTime
        : product?.createdAt
        ? new Date(product.createdAt).toLocaleDateString()
        : "Recently";

    return (
        <div
            onClick={() => navigate(`/marketplace/${product._id}`)}
            className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group flex flex-col h-full cursor-pointer"
        >
            {/* Image */}
            <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                <img
                    src={imageUrl}
                    alt={product?.title || "Marketplace product"}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Wishlist */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        // TODO: wishlist logic
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 transition-colors"
                >
                    <Heart className="h-4 w-4" />
                </button>

                {/* Tags */}
                <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
                    {product?.tags?.includes("urgent") && (
                        <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full shadow-sm">
                            Urgent
                        </span>
                    )}
                    {product?.tags?.includes("moving") && (
                        <span className="px-2 py-0.5 bg-blue-500 text-white text-[10px] font-bold rounded-full shadow-sm">
                            Moving
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-3 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-900 text-sm line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                        {product.title}
                    </h3>
                    <span className="font-bold text-primary text-sm whitespace-nowrap ml-2">
                        ₹{Number(product.price || 0).toLocaleString()}
                    </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                    {product.condition && (
                        <Badge
                            variant="secondary"
                            className="text-[10px] px-1.5 py-0 h-5 bg-gray-100 text-gray-600 font-medium border-gray-200"
                        >
                            {product.condition}
                        </Badge>
                    )}
                    <span className="text-[10px] text-gray-400">•</span>
                    <span className="text-[10px] text-gray-500 flex items-center gap-0.5">
                        <Clock className="h-3 w-3" />
                        {postedDate}
                    </span>
                </div>

                {/* Footer */}
                <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[11px] text-gray-500 truncate max-w-[55%]">
                        <MapPin className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">
                            {product.location || "Location not specified"}
                        </span>
                    </div>

                    {typeof onMessage === "function" && (
                        <Button
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                onMessage(product);
                            }}
                            className="h-7 text-xs px-3 bg-white border border-primary text-primary hover:bg-primary hover:text-white transition-colors shadow-none"
                        >
                            <MessageCircle className="h-3 w-3 mr-1" />
                            Chat
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
