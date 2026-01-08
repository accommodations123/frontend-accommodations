import React from 'react';

export const ContactsWidget = () => {
    // Mock contacts
    const contacts = [
        { name: "Vasily Terkin", count: "125 contacts", img: "https://i.pravatar.cc/150?u=a042581f4e29026024d" },
        { name: "Natasha Rostova", count: "2 contacts", img: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
    ];

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-500 text-sm font-medium">Contacts <span className="text-gray-400 ml-1">12673</span></h3>
            </div>
            <div className="space-y-4">
                {contacts.map((contact, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                        <img src={contact.img} alt={contact.name} className="w-10 h-10 rounded-full" />
                        <div>
                            <p className="text-sm font-medium text-gray-900 leading-none hover:text-blue-500 cursor-pointer">{contact.name}</p>
                            <p className="text-xs text-gray-400 mt-1">{contact.count}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const CommunitiesWidget = () => {
    // Mock communities
    const communities = [
        { name: "Get busy", count: "1259 participants", img: "https://picsum.photos/id/1/200/200" },
        { name: "Healthy Nutrition", count: "522 participants", img: "https://picsum.photos/id/2/200/200" },
    ];

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-500 text-sm font-medium">Communities <span className="text-gray-400 ml-1">54</span></h3>
            </div>
            <div className="space-y-4">
                {communities.map((comm, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                        <img src={comm.img} alt={comm.name} className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                            <p className="text-sm font-medium text-gray-900 leading-none hover:text-blue-500 cursor-pointer">{comm.name}</p>
                            <p className="text-xs text-gray-400 mt-1">{comm.count}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
