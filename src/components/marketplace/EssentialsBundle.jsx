import React from 'react';
import { Package, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const BUNDLES = [
    {
        id: 1,
        title: "Kitchen Starter Kit",
        price: "$149",
        items: "Pressure Cooker, Tawa, Masala Dabba + 5 more",
        image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=300&h=200",
        color: "bg-orange-50 border-orange-100"
    },
    {
        id: 2,
        title: "Student Essentials",
        price: "$89",
        items: "Bedding, Desk Lamp, Laundry Bag, Extension Cord",
        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=300&h=200",
        color: "bg-blue-50 border-blue-100"
    },
    {
        id: 3,
        title: "Pooja Kit",
        price: "$45",
        items: "Thali, Diya, Incense Holder, Bell, Idol",
        image: "https://images.unsplash.com/photo-1604608670379-32b8ce5da6b1?auto=format&fit=crop&q=80&w=300&h=200",
        color: "bg-yellow-50 border-yellow-100"
    }
];

export function EssentialsBundle() {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-4 px-1">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <Package className="h-5 w-5 text-accent" /> Indian Essentials Bundles
                </h3>
                <Button variant="link" className="text-primary text-sm font-semibold p-0 h-auto">
                    View All <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {BUNDLES.map(bundle => (
                    <div
                        key={bundle.id}
                        className={`min-w-[280px] rounded-xl border p-4 flex gap-4 items-center cursor-pointer hover:shadow-md transition-shadow ${bundle.color}`}
                    >
                        <img src={bundle.image} alt={bundle.title} className="h-16 w-16 rounded-lg object-cover shadow-sm" />
                        <div>
                            <h4 className="font-bold text-gray-900 text-sm">{bundle.title}</h4>
                            <p className="text-xs text-gray-600 line-clamp-1 my-1">{bundle.items}</p>
                            <span className="font-bold text-primary">{bundle.price}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
