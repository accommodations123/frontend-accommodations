import React, { useState, useEffect, useRef } from "react";
import { Bell, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useClickOutside } from "@/hooks/useClickOutside";
import { getSocket } from "@/lib/socket";
import { useNavigate } from "react-router-dom";

export function NotificationDropdown({ minimal = false }) {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const dropdownRef = useClickOutside(() => setIsOpen(false));
    const navigate = useNavigate();

    // Mock initial notifications (optional)
    useEffect(() => {
        // TODO: Fetch existing unread notifications from API if available
    }, []);

    // Socket Listener
    useEffect(() => {
        try {
            const socket = getSocket();

            const handleNotification = (payload) => {
                console.log("🔔 Notification received:", payload);
                setNotifications((prev) => [payload, ...prev]);
                setUnreadCount((prev) => prev + 1);
            };

            socket.on("notification", handleNotification);

            return () => {
                socket.off("notification", handleNotification);
            };
        } catch (err) {
            console.error("Socket not ready for notifications:", err);
        }
    }, []);

    const handleMarkAsRead = (id) => {
        // In a real app, call API to mark read
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
    };

    const handleClearAll = () => {
        setNotifications([]);
        setUnreadCount(0);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-full hover:bg-white/10 transition-colors text-white"
            >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-[#0A1A2F] animate-pulse" />
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-3 w-80 sm:w-96 bg-[#0F2238]/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] z-50 border border-white/10 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="px-4 py-3 border-b border-white/5 bg-white/5 flex items-center justify-between">
                            <h3 className="text-sm font-bold text-white">Notifications</h3>
                            {notifications.length > 0 && (
                                <button
                                    onClick={handleClearAll}
                                    className="text-xs text-white/50 hover:text-white transition-colors"
                                >
                                    Clear all
                                </button>
                            )}
                        </div>

                        {/* List */}
                        <div className="max-h-[60vh] overflow-y-auto scrollbar-hide p-2 space-y-1">
                            {notifications.length === 0 ? (
                                <div className="py-8 text-center text-white/40 text-sm">
                                    <Bell className="w-8 h-8 mx-auto mb-2 opacity-20" />
                                    No new notifications
                                </div>
                            ) : (
                                notifications.map((notif, idx) => (
                                    <div
                                        key={notif.id || idx}
                                        className={cn(
                                            "relative group p-3 rounded-xl transition-all border border-transparent hover:border-white/5",
                                            notif.is_read ? "bg-transparent text-white/60" : "bg-white/5 text-white"
                                        )}
                                    >
                                        <div className="flex gap-3">
                                            <div className="mt-1 w-2 h-2 rounded-full bg-accent shrink-0" style={{ opacity: notif.is_read ? 0 : 1 }} />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold truncate">{notif.title}</p>
                                                <p className="text-xs text-white/70 line-clamp-2 mt-0.5">{notif.message}</p>
                                                <p className="text-[10px] text-white/40 mt-1.5">
                                                    {notif.created_at ? new Date(notif.created_at).toLocaleTimeString() : 'Just now'}
                                                </p>
                                            </div>
                                            {!notif.is_read && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleMarkAsRead(notif.id);
                                                    }}
                                                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded-full transition-all self-start text-white/60 hover:text-accent"
                                                    title="Mark as read"
                                                >
                                                    <Check className="w-3 h-3" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
