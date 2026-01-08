import React from 'react';

export const ProfileCard = ({ user, onEdit }) => {
    const defaultImage = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
            <div className="relative aspect-square mb-4 rounded-lg overflow-hidden bg-gray-100">
                <img
                    src={user?.profile_image || defaultImage}
                    alt={user?.full_name || "Profile"}
                    className="w-full h-full object-cover"
                />
            </div>
            <button
                onClick={onEdit}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors text-sm"
            >
                Edit Profile
            </button>
        </div>
    );
};
