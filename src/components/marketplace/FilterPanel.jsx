import React from 'react';
import { SlidersHorizontal, ChevronDown, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function FilterPanel() {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-3 mb-6 shadow-sm flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full border border-gray-300 rounded-lg">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                    placeholder="Search for items..."
                    className="pl-9 h-10 bg-white border-gray-300 text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-gray-500 transition-colors text-sm"
                />
            </div>

            {/* Filters Row */}
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                <Button variant="outline" size="sm" className="h-9 border-gray-300 text-white font-medium whitespace-nowrap hover:bg-gray-50 hover:text-gray-900">
                    <SlidersHorizontal className="h-3.5 w-3.5 mr-2" /> All Filters
                </Button>

                <div className="h-6 w-px bg-gray-200 mx-1"></div>

                <Button variant="outline" size="sm" className="h-9 border-gray-300 text-white font-medium whitespace-nowrap hover:bg-gray-50 hover:text-gray-900">
                    Price Range <ChevronDown className="h-3.5 w-3.5 ml-1 opacity-50" />
                </Button>
                <Button variant="outline" size="sm" className="h-9 border-gray-300 text-whitefont-medium whitespace-nowrap hover:bg-gray-50 hover:text-gray-900">
                    Condition <ChevronDown className="h-3.5 w-3.5 ml-1 opacity-50" />
                </Button>
                <Button variant="outline" size="sm" className="h-9 border-gray-300 text-white font-medium whitespace-nowrap hover:bg-gray-50 hover:text-gray-900">
                    Category <ChevronDown className="h-3.5 w-3.5 ml-1 opacity-50" />
                </Button>

                <div className="ml-auto md:ml-2">
                    <select className="h-9 text-sm border border-gray-300 bg-white rounded-lg px-3 font-medium text-gray-900 focus:outline-none cursor-pointer hover:bg-gray-50 transition-colors shadow-sm">
                        <option>Sort: Recent</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
