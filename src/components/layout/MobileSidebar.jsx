import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    X, User, ShoppingBag, HelpCircle, Settings, Bell, MessageSquare, LogOut, Plane, Heart, ChevronRight, Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetMeQuery, useLogoutMutation } from "@/store/api/authApi";
import { useDispatch } from "react-redux";
import { authApi } from "@/store/api/authApi";
import { hostApi } from "@/store/api/hostApi";

export function MobileSidebar({ isOpen, onClose }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data: userData } = useGetMeQuery();
    const [logout] = useLogoutMutation();

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            // Reset API state to clear cached data
            dispatch(authApi.util.resetApiState());
            dispatch(hostApi.util.resetApiState());
            onClose();
            navigate("/signin");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    {/*  <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
                    /> */}

                    {/* Sidebar - Full Screen */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed inset-0 w-full bg-[#FAFAFA] z-50 overflow-y-auto"
                    >
                        {/* Header Section */}
                        <div className="bg-white px-6 pt-safe pb-6 flex items-start justify-between sticky top-0 z-10 border-b border-gray-100">
                            <div className="flex items-center gap-4 pt-12 md:pt-4">
                                <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 border-2 border-white shadow-sm overflow-hidden">
                                    {userData?.profileImage || userData?.avatar ? (
                                        <img src={userData.profileImage || userData.avatar} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-7 h-7" />
                                    )}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 leading-tight">
                                        {userData?.firstName ? `${userData.firstName} ${userData.lastName || ''}` : "Guest User"}
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-0.5">
                                        {userData?.email || userData?.phoneNumber || "Sign in"}
                                    </p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full mt-12 md:mt-4">
                                <X className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>

                        {/* Quick Actions Grid */}
                        <div className="p-4 grid grid-cols-2 gap-4">
                            <Link to="/wishlist" onClick={onClose} className="bg-white p-4 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-sm border border-gray-100 hover:scale-[1.02] transition-transform">
                                <Heart className="w-6 h-6 text-pink-500" />
                                <span className="text-sm font-bold text-gray-700">Wishlist</span>
                            </Link>
                            <Link to="/trips" onClick={onClose} className="bg-white p-4 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-sm border border-gray-100 hover:scale-[1.02] transition-transform">
                                <Plane className="w-6 h-6 text-blue-500" />
                                <span className="text-sm font-bold text-gray-700">Your Trips</span>
                            </Link>
                        </div>

                        {/* Menu Lists */}
                        <div className="px-4 pb-20 space-y-6">
                            {/* Information Section */}
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Account</h3>
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-sm">
                                    <Link to="/account" onClick={onClose} className="flex items-center justify-between p-4 border-b border-gray-50 hover:bg-gray-50">
                                        <div className="flex items-center gap-3">
                                            <User className="w-5 h-5 text-gray-500" />
                                            <span className="font-medium text-gray-900">Profile</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-300" />
                                    </Link>
                                    <Link to="/host/dashboard" onClick={onClose} className="flex items-center justify-between p-4 hover:bg-gray-50">
                                        <div className="flex items-center gap-3">
                                            <ShoppingBag className="w-5 h-5 text-gray-500" />
                                            <span className="font-medium text-gray-900">My Listings</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-300" />
                                    </Link>
                                </div>
                            </div>

                            {/* Resources Section */}
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Resources</h3>
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-sm">
                                    <Link to="/career" onClick={onClose} className="flex items-center justify-between p-4 hover:bg-gray-50">
                                        <div className="flex items-center gap-3">
                                            <Briefcase className="w-5 h-5 text-gray-500" />
                                            <span className="font-medium text-gray-900">Career</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-300" />
                                    </Link>
                                </div>
                            </div>

                            {/* Settings & Support Section */}
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Settings & Support</h3>
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-sm">
                                    <Link to="/notifications" onClick={onClose} className="flex items-center justify-between p-4 border-b border-gray-50 hover:bg-gray-50">
                                        <div className="flex items-center gap-3">
                                            <Bell className="w-5 h-5 text-gray-500" />
                                            <span className="font-medium text-gray-900">Notifications</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-300" />
                                    </Link>
                                    <Link to="/messages" onClick={onClose} className="flex items-center justify-between p-4 border-b border-gray-50 hover:bg-gray-50">
                                        <div className="flex items-center gap-3">
                                            <MessageSquare className="w-5 h-5 text-gray-500" />
                                            <span className="font-medium text-gray-900">Messages</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-300" />
                                    </Link>
                                    <Link to="/account/settings" onClick={onClose} className="flex items-center justify-between p-4 border-b border-gray-50 hover:bg-gray-50">
                                        <div className="flex items-center gap-3">
                                            <Settings className="w-5 h-5 text-gray-500" />
                                            <span className="font-medium text-gray-900">Settings</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-300" />
                                    </Link>
                                    <Link to="/help" onClick={onClose} className="flex items-center justify-between p-4 border-b border-gray-50 hover:bg-gray-50">
                                        <div className="flex items-center gap-3">
                                            <HelpCircle className="w-5 h-5 text-gray-500" />
                                            <span className="font-medium text-gray-900">Help</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-300" />
                                    </Link>
                                    <Link to="/support" onClick={onClose} className="flex items-center justify-between p-4 hover:bg-gray-50">
                                        <div className="flex items-center gap-3">
                                            <User className="w-5 h-5 text-gray-500" />
                                            <span className="font-medium text-gray-900">Support</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-300" />
                                    </Link>
                                </div>
                            </div>

                            {/* Logout Button */}
                            {userData && (
                                <button
                                    onClick={handleLogout}
                                    className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-center gap-2 text-red-600 font-medium active:bg-red-50 transition-colors"
                                >
                                    <LogOut className="w-5 h-5" />
                                    Log Out
                                </button>
                            )}

                            <div className="py-6 text-center text-gray-400 text-xs">
                                v2.4.0 • Made with ❤️ in India
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
