"use client"

import * as React from "react"
import { Menu, Globe, User, ChevronDown, X, Search, Users, Briefcase, Home, Calendar, Building, Plane, BookOpen, ShoppingBag, HomeIcon, Bell, Check } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CATEGORIES, COUNTRIES } from "@/lib/mock-data"
import { getHostPath } from "@/lib/navigationUtils"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useCountry } from "@/context/CountryContext"
import { useClickOutside } from "@/hooks/useClickOutside"
import { getSocket } from "@/lib/socket"
import { useDispatch, useSelector } from "react-redux"
import { useGetMeQuery, useLogoutMutation, authApi } from "@/store/api/authApi"
import { useGetHostProfileQuery, hostApi } from "@/store/api/hostApi"
import { addNotification, markAllAsRead } from "@/store/slices/notificationSlice"

export function Navbar({ minimal = false, onMenuClick }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const socketRef = React.useRef(null);
    const isSocketInitialized = React.useRef(false);

    // const socket = React.useMemo(() => getSocket(), []); // Removed to avoid conflict with manual management

    const [logout] = useLogoutMutation()
    const [isScrolled, setIsScrolled] = React.useState(false)
    const { activeCountry, setCountry, isSelected } = useCountry()
    const [isCountryOpen, setIsCountryOpen] = React.useState(false)
    const [isProfileOpen, setIsProfileOpen] = React.useState(false)
    const [isHostDropdownOpen, setIsHostDropdownOpen] = React.useState(false)

    // ================= AUTH STATE (BACKEND VERIFIED) =================
    const { data: userData, isLoading: isAuthLoading, isError: isAuthError } = useGetMeQuery()
    const isAuthenticated = !!userData && !isAuthError

    // ================= NOTIFICATION STATE (REDUX) =================
    const notifications = useSelector(state => state.notifications.items)
    const unreadCount = useSelector(state => state.notifications.unreadCount)
    const [isNotificationOpen, setIsNotificationOpen] = React.useState(false)
    const notificationRef = useClickOutside(() => setIsNotificationOpen(false))


    // Fetch host profile if authenticated
    const { data: hostProfile } = useGetHostProfileQuery(undefined, {
        skip: !isAuthenticated,
    })

    // Auto-scroll listener
    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // ================= WEBSOCKET LOGIC =================
    React.useEffect(() => {
        // If not authenticated, or if the socket is already set up, do nothing.
        if (!isAuthenticated || isSocketInitialized.current) {
            return;
        }

        const apiUrl = "http://3.147.226.49:5000";
        if (!apiUrl) {
            console.error("❌ Socket URL missing in environment config");
            return;
        }

        // const token = localStorage.getItem("access_token");
        // if (!token) {
        //     console.error("❌ Cannot connect to socket: No token found in localStorage.");
        //     return;
        // }

        const socket = getSocket();

        socketRef.current = socket;

        socket.on("connect", () => {
            console.log("✅ Connected to Socket.IO Server:", socket.id);
        });

        socket.on("connect_error", (err) => {
            console.error("❌ Socket Connection Error:", err.message);
        });

        // Explicitly connect!
        socket.connect();

        socket.on("notification", (data) => {
            console.log("📩 Received Notification:", data);
            if (data) {
                dispatch(addNotification(data));
            }
        });

        // Mark the socket as initialized
        isSocketInitialized.current = true;

        // Cleanup function
        return () => {
            if (socketRef.current) {
                console.log("🔌 Disconnecting socket...");
                socketRef.current.disconnect();
                socketRef.current = null;
                // Reset the flag on cleanup so it can be re-initialized if the user logs out and back in
                isSocketInitialized.current = false;
            }
        };
    }, [isAuthenticated, dispatch]);



    // Helper to mark all as read
    const handleMarkAllAsRead = () => {
        dispatch(markAllAsRead())
    }

    // Mobile State
    const [isMobileCountryOpen, setIsMobileCountryOpen] = React.useState(false)
    const location = useLocation()

    // Define Explore section paths
    const explorePaths = ["/", "/events", "/search"]
    const isExploreActive = explorePaths.includes(location.pathname) || location.pathname.startsWith("/rooms")
    const isGroupsPage = location.pathname === "/groups"
    const isHostEventPage = location.pathname === "/events/host"
    const isMarketplacePage = location.pathname.startsWith("/marketplace")
    const isRoomDetailsPage = location.pathname.startsWith("/rooms/")
    const isEventDetailsPage = location.pathname.startsWith("/events/") && location.pathname !== "/events" && location.pathname !== "/events/host"

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Close mobile menus on route change
    React.useEffect(() => {
        setIsMobileCountryOpen(false)
        setIsHostDropdownOpen(false)
    }, [location.pathname])

    // Click Outside Refs
    const countryRef = useClickOutside(() => setIsCountryOpen(false))
    const profileRef = useClickOutside(() => setIsProfileOpen(false))
    const mobileCountryRef = useClickOutside(() => setIsMobileCountryOpen(false))
    const hostDropdownRef = useClickOutside(() => setIsHostDropdownOpen(false))

    // Dynamic Host Path


    // Host options for dropdown
    const hostOptions = [
        {
            id: 'property',
            title: 'Share Your Space',
            description: 'List your property for stays',
            icon: <Home className="h-5 w-5" />,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            path: getHostPath('property', isAuthenticated)
        },
        {
            id: 'event',
            title: 'Host an Event',
            description: 'Organize workshops, meetups or festivals.',
            icon: <Calendar className="h-5 w-5" />,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
            path: getHostPath('event', isAuthenticated)
        },
        {
            id: 'group',
            title: 'Start a Group',
            description: 'Build a community of like-minded people.',
            icon: <Users className="h-5 w-5" />,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            path: getHostPath('group', isAuthenticated)
        },
    ]

    // Navigation items in the specified order (without icons)
    const navItems = [
        { name: "Home", path: "/" },
        { name: "Events", path: "/events" },
        // { name: "Accommodation", path: "/resources/accommodation" },
        { name: "Buy/Sell", path: "/marketplace" },
        { name: "Groups", path: "/groups" },
        { name: "Resources", path: "/resources", hasDropdown: true },
        { name: "Rooms", path: "/search" },
    ]

    // Resources dropdown items
    const resourceItems = [
        { name: "Travel Partners", path: "/resources/travel", icon: Plane, desc: "Find travel buddies" },
        { name: "Community & Daily Life", path: "/resources/community", icon: Users, desc: "Local groups & living guides" },
        { name: "Legal & Documentation", path: "/resources/legal", icon: BookOpen, desc: "Visa guides & legal aid" },
        { name: "Career", path: "/career", icon: Briefcase, desc: "Job opportunities & career advice" },
        { name: "Support", path: "/support", icon: User, desc: "Get help & support" },
    ]

    // Safely get country code with fallback
    const getCountryCode = () => {
        if (!activeCountry) return "";
        if (activeCountry.code) return activeCountry.code;
        if (activeCountry.country) return activeCountry.country;
        return "";
    };

    return (
        <>
            {/* ================= DESKTOP NAVBAR ================= */}
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:block",
                    isScrolled ? "bg-primary shadow-md py-2" : "bg-primary"
                )}
            >
                <div className="container mx-auto px-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 z-50">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                            <img
                                src="/logo.jpeg"
                                alt="NextKinLife Logo"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    {!minimal && (
                        <nav className="flex items-center gap-8">
                            {navItems.map((item) => (
                                <div key={item.name} className="relative group">
                                    {item.hasDropdown ? (
                                        <button
                                            type="button"
                                            className="text-white/90 hover:text-accent font-medium transition-colors flex items-center gap-1 py-4 cursor-default"
                                        >
                                            {item.name}
                                            <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                                        </button>
                                    ) : (
                                        <Link
                                            to={item.path}
                                            className="text-white/90 hover:text-accent font-medium transition-colors flex items-center gap-1 py-4"
                                        >
                                            {item.name}
                                        </Link>
                                    )}

                                    {/* Mega Menu for Resources */}
                                    {item.hasDropdown && (
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white rounded-xl shadow-xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-40">
                                            <div className="grid grid-cols-2 gap-4">
                                                {resourceItems.map((resource) => (
                                                    <Link
                                                        key={resource.name}
                                                        to={resource.path}
                                                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group/item"
                                                    >
                                                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover/item:bg-indigo-100 transition-colors">
                                                            <resource.icon className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold text-gray-900 text-sm group-hover/item:text-indigo-700">{resource.name}</h4>
                                                            <p className="text-xs text-gray-500 mt-0.5">{resource.desc}</p>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>
                    )}

                    {/* Desktop Right Actions */}
                    <div className="flex items-center gap-4">
                        <div className="relative" ref={countryRef}>
                            <Button
                                variant="ghost"
                                className="text-white hover:text-white hover:bg-white/10 flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border border-white/10"
                                onClick={() => setIsCountryOpen(!isCountryOpen)}
                            >
                                {!isSelected ? (
                                    <>
                                        <Globe className="h-5 w-5" />
                                        <span className="text-sm font-medium">Select Country</span>
                                    </>
                                ) : (
                                    <>
                                        {activeCountry && activeCountry.flag && (
                                            activeCountry.flag.startsWith('/') ? (
                                                <img src={activeCountry.flag} alt={activeCountry.name} className="w-6 h-4 object-cover rounded-sm" />
                                            ) : (
                                                <span className="text-lg">{activeCountry.flag}</span>
                                            )
                                        )}
                                        <span className="text-sm font-medium">{getCountryCode()}</span>
                                    </>
                                )}
                                <ChevronDown className={cn("h-4 w-4 transition-transform", isCountryOpen && "rotate-180")} />
                            </Button>

                            {isCountryOpen && (
                                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                                    <div className="px-4 py-2 border-b mb-2">
                                        <p className="text-xs font-bold text-gray-500 uppercase">Select Country</p>
                                    </div>
                                    {COUNTRIES.map((country) => (
                                        <button
                                            key={country.code}
                                            className={cn(
                                                "w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between ",
                                                getCountryCode() === country.code ? "text-accent font-bold" : "text-gray-700"
                                            )}
                                            onClick={() => {
                                                setCountry(country)
                                                setIsCountryOpen(false)
                                            }}
                                        >
                                            <span className="flex items-center gap-2">
                                                {country.flag.startsWith('/') ? (
                                                    <img src={country.flag} alt={country.name} className="w-6 h-4 object-cover rounded-sm" />
                                                ) : (
                                                    <span className="text-lg">{country.flag}</span>
                                                )}
                                                {country.name}
                                            </span>
                                            {getCountryCode() === country.code && <div className="h-1.5 w-1.5 rounded-full bg-accent" />}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Become Host Dropdown */}
                        <div className="relative" ref={hostDropdownRef}>
                            <button
                                onClick={() => setIsHostDropdownOpen(!isHostDropdownOpen)}
                                className="bg-accent hover:bg-accent/90 text-white cursor-pointer rounded-full px-6 py-2 font-medium transition-colors flex items-center gap-2"
                            >
                                Become Host
                            </button>

                            {isHostDropdownOpen && (
                                <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                                    <div className="px-4 py-2 border-b mb-2">
                                        <p className="text-xs font-bold text-gray-500 uppercase">Choose Host Type</p>
                                    </div>
                                    <div className="px-2">
                                        {hostOptions.map((option) => (
                                            <button
                                                key={option.id}
                                                onClick={() => {
                                                    navigate(option.path)
                                                    setIsHostDropdownOpen(false)
                                                }}
                                                className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3 cursor-pointer"
                                            >
                                                <div className={`p-2 rounded-lg ${option.bgColor} ${option.color}`}>
                                                    {option.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-semibold text-gray-900 text-sm">{option.title}</div>
                                                    <div className="text-xs text-gray-500">{option.description}</div>
                                                </div>
                                                <ChevronDown className="h-4 w-4 text-gray-400 rotate-90" />
                                            </button>
                                        ))}
                                    </div>
                                    <div className="px-4 py-3 border-t mt-2">
                                        <p className="text-xs text-gray-500">All hosts are verified for community safety</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* ================= NOTIFICATION DROPDOWN (DESKTOP) ================= */}
                        <div className="relative" ref={notificationRef}>
                            <Button
                                variant="ghost"
                                className={cn(
                                    "text-white hover:text-white hover:bg-white/10 rounded-full p-2 relative transition-colors",
                                    unreadCount > 0 && "bg-white/5"
                                )}
                                onClick={() => {
                                    setIsNotificationOpen(!isNotificationOpen)
                                    if (isNotificationOpen) markAllAsRead()
                                }}
                            >
                                <Bell className="h-6 w-6" />
                                {unreadCount > 0 && (
                                    <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-red-500 rounded-full animate-pulse border-2 border-primary" />
                                )}
                            </Button>

                            {isNotificationOpen && (
                                <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-200 max-h-[400px] overflow-y-auto">
                                    <div className="px-4 py-2 border-b flex justify-between items-center">
                                        <p className="text-sm font-bold text-gray-900">Notifications</p>
                                        {unreadCount > 0 && (
                                            <button
                                                onClick={handleMarkAllAsRead}
                                                className="text-xs font-medium text-accent hover:text-accent/80"
                                            >
                                                Mark all read
                                            </button>
                                        )}
                                    </div>
                                    <div className="py-1">
                                        {notifications.length === 0 ? (
                                            <p className="text-center text-sm text-gray-500 py-4">No new notifications</p>
                                        ) : (
                                            notifications.map((notif) => (
                                                <div
                                                    key={notif.id}
                                                    className={cn(
                                                        "px-4 py-3 border-b last:border-0 hover:bg-gray-50 cursor-pointer transition-colors",
                                                        !notif.read && "bg-blue-50/50"
                                                    )}
                                                >
                                                    <div className="flex gap-3">
                                                        <div className={cn(
                                                            "mt-0.5 h-2 w-2 rounded-full shrink-0",
                                                            notif.read ? "bg-transparent" : "bg-blue-600"
                                                        )} />
                                                        <div>
                                                            <p className="text-sm text-gray-800 font-medium">{notif.message}</p>
                                                            <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {!isAuthenticated ? (
                            <Button
                                variant="outline"
                                className="rounded-full border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white px-6 font-medium cursor-pointer"
                                onClick={() => navigate("/signin")}
                            >
                                Sign In
                            </Button>
                        ) : (
                            <div className="relative" ref={profileRef}>
                                <Button
                                    variant="outline"
                                    className="rounded-full border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white gap-2 pl-3 pr-4 cursor-pointer"
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                >
                                    <div className="bg-gray-500 rounded-full p-1">
                                        <User className="h-4 w-4 text-white" />
                                    </div>
                                </Button>

                                {isProfileOpen && (() => {
                                    const userName = userData?.full_name || userData?.name || userData?.email || "User";
                                    const isHost = hostProfile && (hostProfile.id || hostProfile._id);
                                    const hostStatus = hostProfile?.status || "pending";

                                    return (
                                        <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                                            {/* User Info with Role Badge */}
                                            <div className="px-4 py-3 border-b">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700">
                                                        {userName.split(" ").map(s => s[0]).slice(0, 2).join("").toUpperCase() || "U"}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-semibold text-gray-900 truncate">{userName}</p>
                                                        {/* <p className="text-xs text-gray-400 mt-0.5">{user?.email || "Account Member"}</p> */}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Menu Items - Reordered by frequency */}
                                            <div className="py-1">
                                                {[
                                                    { label: "Messages", href: "/messages" },
                                                    { label: "Account", href: "/account-v2" },
                                                ].map((item) => (
                                                    <Link
                                                        key={item.label}
                                                        to={item.href}
                                                        onClick={() => setIsProfileOpen(false)}
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-medium"
                                                    >
                                                        {item.label}
                                                    </Link>
                                                ))}
                                            </div>
                                            <div className="border-t my-1" />
                                            <div className="py-1">
                                                <button
                                                    onClick={async () => {
                                                        try {
                                                            await logout().unwrap();
                                                        } catch (e) {
                                                            console.warn("Backend logout failed, proceeding with local cleanup", e);
                                                        }
                                                        dispatch(authApi.util.resetApiState());
                                                        dispatch(hostApi.util.resetApiState());
                                                        localStorage.removeItem("user");
                                                        setIsProfileOpen(false);
                                                        navigate("/signin");
                                                    }}
                                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-medium cursor-pointer text-red-600"
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })()}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* ================= MOBILE LAYOUT ================= */}
            <div className="md:hidden">
                {/* Mobile Top Bar removed - replaced by global MobileHomeHeader in RootLayout */}


                {/* 3. Bottom Navigation Bar */}
                {/* 3. Bottom Navigation Bar - Removed as it's now global in RootLayout via MobileFooterNav */}
                {/* <div className="fixed bottom-0 left-0 right-0 z-50 ..."> ... </div> */}
            </div>
        </>
    )
}