"use client"

import * as React from "react"
import { Menu, Globe, User, ChevronDown, X, Search, Users, Briefcase, Home, Calendar, Building, Plane, BookOpen, ShoppingBag, HomeIcon, MapPin } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CATEGORIES, COUNTRIES } from "@/lib/mock-data"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useCountry } from "@/context/CountryContext"
import { useClickOutside } from "@/hooks/useClickOutside"

export function Navbar() {
    const navigate = useNavigate()
    const [isScrolled, setIsScrolled] = React.useState(false)
    const { activeCountry, setCountry: setActiveCountry, isSelected } = useCountry()
    const [isCountryOpen, setIsCountryOpen] = React.useState(false)
    const [isProfileOpen, setIsProfileOpen] = React.useState(false)
    const [isAuthenticated, setIsAuthenticated] = React.useState(false)
    const [isHostDropdownOpen, setIsHostDropdownOpen] = React.useState(false)

    // Check auth status on mount and when storage changes
    React.useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("token")
            // Strict check to ensure valid token
            const isValid = token && token !== "undefined" && token !== "null"
            setIsAuthenticated(!!isValid)
        }

        checkAuth()
        window.addEventListener('storage', checkAuth)

        // Also listen for custom event for immediate UI updates
        window.addEventListener('auth-change', checkAuth)

        return () => {
            window.removeEventListener('storage', checkAuth)
            window.removeEventListener('auth-change', checkAuth)
        }
    }, [])

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

    // Host options for dropdown
    const hostOptions = [
        {
            id: 'property',
            title: 'Share Your Space',
            description: 'List your property for stays',
            icon: <Home className="h-5 w-5" />,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            path: '/host/create'
        },
        {
            id: 'event',
            title: 'Host an Event',
            description: 'Organize gatherings or workshops',
            icon: <Calendar className="h-5 w-5" />,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
            path: '/events/host'
        },
        {
            id: 'group',
            title: 'Start a Group',
            description: 'Create community groups',
            icon: <Users className="h-5 w-5" />,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            path: '/groups'
        },
    ]

    // Navigation items in the specified order (without icons)
    const navItems = [
        { name: "Home", path: "/" },
        { name: "Events", path: "/events" },
        { name: "Accommodation", path: "/resources/accommodation" },
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
                                                setActiveCountry(country)
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
                                    <Menu className="h-5 w-5" />
                                    <div className="bg-gray-500 rounded-full p-1">
                                        <User className="h-4 w-4 text-white" />
                                    </div>
                                </Button>

                                {isProfileOpen && (
                                    <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                                        <div className="py-1">
                                            {[
                                                { label: "Messages", href: "/messages" },
                                                { label: "Notifications", href: "/notifications" },
                                                { label: "Trips", href: "/trips" },
                                                { label: "Wishlists", href: "/wishlists" },
                                            ].map((item) => (
                                                <Link
                                                    key={item.label}
                                                    to={item.href}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-medium"
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                        <div className="border-t my-1" />
                                        <div className="py-1">
                                            {[
                                                { label: "Account", href: "/account" },
                                                { label: "Help", href: "/help" },
                                            ].map((item) => (
                                                <Link
                                                    key={item.label}
                                                    to={item.href}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-medium"
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                            <button
                                                onClick={() => {
                                                    localStorage.removeItem("token");
                                                    localStorage.removeItem("user");
                                                    setIsAuthenticated(false);
                                                    navigate("/signin");
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-medium cursor-pointer"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* ================= MOBILE LAYOUT ================= */}
            <div className="md:hidden">
                {/* 1. Top Bar */}
                <div className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    isScrolled ? "bg-primary shadow-md py-2" : "bg-primary"
                )}>
                    <div className="px-4 py-2 flex items-center justify-between">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 z-50">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                                <img
                                    src="/logo.jpeg"
                                    alt="NextKinLife Logo"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </Link>

                        {/* Search Button */}
                        <Link
                            to="/search"
                            className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
                        >
                            <Search className="h-5 w-5 text-white" />
                        </Link>
                    </div>
                </div>

                {/* 2. Country Selector Modal */}
                <AnimatePresence>
                    {isMobileCountryOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-50 flex items-end"
                        >
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="w-full bg-white rounded-t-2xl max-h-[80vh] overflow-hidden"
                                ref={mobileCountryRef}
                            >
                                <div className="p-4 border-b">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-bold text-gray-900">Select Country</h2>
                                        <button
                                            onClick={() => setIsMobileCountryOpen(false)}
                                            className="p-2 hover:bg-gray-100 rounded-full cursor-pointer"
                                        >
                                            <X className="h-5 w-5 text-gray-500" />
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {COUNTRIES.map((country) => (
                                            <button
                                                key={country.code}
                                                className={cn(
                                                    "flex items-center gap-3 p-3 rounded-lg text-left transition-all",
                                                    getCountryCode() === country.code
                                                        ? "bg-accent/10 border border-accent/20"
                                                        : "hover:bg-gray-50"
                                                )}
                                                onClick={() => {
                                                    setActiveCountry(country)
                                                    setIsMobileCountryOpen(false)
                                                }}
                                            >
                                                {country.flag.startsWith('/') ? (
                                                    <img src={country.flag} alt={country.name} className="w-8 h-6 object-cover rounded-sm" />
                                                ) : (
                                                    <span className="text-xl">{country.flag}</span>
                                                )}
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-900">{country.name}</div>
                                                    <div className="text-xs text-gray-500">{country.communityCount || 0} members</div>
                                                </div>
                                                {getCountryCode() === country.code && (
                                                    <div className="w-2 h-2 rounded-full bg-accent" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 3. Bottom Navigation Bar */}
                <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-gray-200 pb-safe">
                    <div className="flex items-end justify-between px-2 py-2">
                        {/* Home */}
                        <Link
                            to="/"
                            className={cn(
                                "flex flex-col items-center gap-1 p-2 w-16 transition-colors",
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
                                "flex flex-col items-center gap-1 p-2 w-16 transition-colors",
                                location.pathname === "/events" ? "text-primary" : "text-gray-500"
                            )}
                        >
                            <Calendar className="h-6 w-6" />
                            <span className="text-[10px] font-medium">Events</span>
                        </Link>

                        {/* Accommodation */}
                        <Link
                            to="/resources/accommodation"
                            className={cn(
                                "flex flex-col items-center gap-1 p-2 w-16 transition-colors",
                                location.pathname === "/resources/accommodation" ? "text-primary" : "text-gray-500"
                            )}
                        >
                            <HomeIcon className="h-6 w-6" />
                            <span className="text-[10px] font-medium">Housing</span>
                        </Link>

                        {/* Profile (Center Logo) - Dynamic Auth Link */}
                        <Link
                            to={isAuthenticated ? "/account" : "/signin"}
                            className="flex flex-col items-center gap-1 -mt-8"
                        >
                            <div className="w-14 h-14 rounded-full bg-white shadow-lg border-2 border-primary/20 p-0.5 overflow-hidden">
                                <img
                                    src="/logo.jpeg"
                                    alt="Profile"
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>
                            <span className={cn(
                                "text-[10px] font-medium",
                                (location.pathname === "/account" || location.pathname === "/signin") ? "text-primary" : "text-gray-500"
                            )}>
                                {isAuthenticated ? "Profile" : "Sign In"}
                            </span>
                        </Link>

                        {/* Buy/Sell */}
                        <Link
                            to="/marketplace"
                            className={cn(
                                "flex flex-col items-center gap-1 p-2 w-16 transition-colors",
                                location.pathname === "/marketplace" ? "text-primary" : "text-gray-500"
                            )}
                        >
                            <ShoppingBag className="h-6 w-6" />
                            <span className="text-[10px] font-medium">Buy/Sell</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}