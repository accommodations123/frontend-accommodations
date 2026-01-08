import React from 'react';
import { User, Home, MapPin, Heart, Bell, LifeBuoy, Settings, HelpCircle } from 'lucide-react';

export const Sidebar = ({ activeTab, onTabChange }) => {
    const menuItems = [
        { id: 'overview', label: 'Overview', icon: User },
        { id: 'personal', label: 'Personal Info', icon: User },
        { id: 'listings', label: 'My Listings', icon: Home },
        { id: 'trips', label: 'Trips', icon: MapPin },
        { id: 'wishlists', label: 'Wishlists', icon: Heart },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'support', label: 'Support', icon: LifeBuoy },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="w-64 flex-shrink-0">
            <nav className="space-y-1">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onTabChange(item.id)}
                        className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === item.id
                            ? 'text-gray-900 bg-gray-100 border-l-4 border-blue-500' // Active style
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                    >
                        <item.icon className="mr-3 h-5 w-5 text-gray-400" />
                        {item.label}
                    </button>
                ))}
            </nav>

            <div className="mt-8 pt-4 border-t border-gray-200">
                <button className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md">
                    <HelpCircle className="mr-3 h-5 w-5 text-gray-400" />
                    Help
                </button>
                <div className="mt-2 px-4 text-xs text-gray-400 flex items-center gap-2">
                    <span>Language</span>
                    <span>•</span>
                    <span>More</span>
                </div>
            </div>
        </div>
    );
};
