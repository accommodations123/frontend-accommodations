import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Users, Plane, ShoppingBag } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useSelector } from 'react-redux';

export function MobileFooterNav() {
    const location = useLocation();

    // Check if we should hide the nav (e.g., inside specific flows if needed, but user asked for "every page")
    // For now, we render it everywhere as requested.

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-gray-200 pb-safe">
            <div className="grid grid-cols-5 items-end px-2 py-2">
                {/* Home */}
                <Link
                    to="/"
                    className={cn(
                        "flex flex-col items-center gap-1 p-2 transition-colors",
                        location.pathname === "/" ? "text-primary" : "text-gray-500"
                    )}
                >
                    <Home className="h-6 w-6" />
                    <span className="text-[10px] font-medium">Home</span>
                </Link>

                {/* Events */}
                <Link
                    to="/events"
                    className={cn(
                        "flex flex-col items-center gap-1 p-2 transition-colors",
                        location.pathname === "/events" ? "text-primary" : "text-gray-500"
                    )}
                >
                    <Calendar className="h-6 w-6" />
                    <span className="text-[10px] font-medium">Events</span>
                </Link>

                {/* Groups */}
                <Link
                    to="/groups"
                    className={cn(
                        "flex flex-col items-center gap-1 p-2 transition-colors",
                        location.pathname === "/groups" ? "text-primary" : "text-gray-500"
                    )}
                >
                    <Users className="h-6 w-6" />
                    <span className="text-[10px] font-medium">Groups</span>
                </Link>

                {/* Travel */}
                <Link
                    to="/resources/travel"
                    className={cn(
                        "flex flex-col items-center gap-1 p-2 transition-colors",
                        location.pathname === "/resources/travel" ? "text-primary" : "text-gray-500"
                    )}
                >
                    <Plane className="h-6 w-6" />
                    <span className="text-[10px] font-medium whitespace-nowrap">Travel</span>
                </Link>

                {/* Buy/Sell */}
                <Link
                    to="/marketplace"
                    className={cn(
                        "flex flex-col items-center gap-1 p-2 transition-colors",
                        location.pathname === "/marketplace" ? "text-primary" : "text-gray-500"
                    )}
                >
                    <ShoppingBag className="h-6 w-6" />
                    <span className="text-[10px] font-medium">Buy/Sell</span>
                </Link>
            </div>
        </div>
    );
}
