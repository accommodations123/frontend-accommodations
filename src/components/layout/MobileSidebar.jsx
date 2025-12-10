import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    X, HelpCircle, Search, Calendar, Plane, Users, Scale, Home
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

export function MobileSidebar({ isOpen, onClose }) {
    const navigate = useNavigate();

    const menuItems = [
        { label: "Support", path: "/support", icon: HelpCircle },
        { label: "Rooms", path: "/search", icon: Home },
        { label: "Events", path: "/events", icon: Calendar },
        { label: "Travel Partner", path: "/resources/travel", icon: Plane },
        { label: "Community & Daily Life", path: "/resources/community", icon: Users },
        { label: "Legal & Documentation", path: "/resources/legal", icon: Scale },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 left-0 bottom-0 w-3/4 max-w-xs bg-white shadow-2xl z-50 overflow-y-auto"
                    >
                        <div className="p-6 flex flex-col h-full">
                            <div className="flex items-center justify-between mb-8">
                                <Link to="/" onClick={onClose} className="flex items-center gap-2">
                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                                        <img
                                            src="/logo.jpeg"
                                            alt="NextKinLife Logo"
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <span className="font-bold text-lg text-primary">NextKinLife</span>
                                </Link>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6 text-gray-500" />
                                </button>
                            </div>

                            <div className="flex-1 space-y-2">
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.label}
                                        to={item.path}
                                        onClick={onClose}
                                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 text-gray-700 transition-all active:scale-98"
                                    >
                                        <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium">{item.label}</span>
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-100">
                                <p className="text-xs text-gray-400 text-center">
                                    Version 1.0.0
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
