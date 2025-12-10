"use client"

import * as React from "react"
import { Menu, Globe, User, ChevronDown, X, Search, Users, Briefcase, Phone, Home, Plane, BookOpen, Scale, ShoppingBag } from "lucide-react"
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
    }, [location.pathname])

    // Click Outside Refs
    const countryRef = useClickOutside(() => setIsCountryOpen(false))
    const profileRef = useClickOutside(() => setIsProfileOpen(false))
    const mobileCountryRef = useClickOutside(() => setIsMobileCountryOpen(false))

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
                        {["Home", "Events", "Groups", "Resources", "Rooms", "Career", "Support"].map((item) => (
                            <div key={item} className="relative group">
                                {item === "Resources" ? (
                                    <button
                                        type="button"
                                        className="text-white/90 hover:text-accent font-medium transition-colors flex items-center gap-1 py-4 cursor-default"
                                    >
                                        {item}
                                        <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                                    </button>
                                ) : (
                                    <Link
                                        to={item === "Home" ? "/" : item === "Rooms" ? "/search" : `/${item.toLowerCase()}`}
                                        className="text-white/90 hover:text-accent font-medium transition-colors flex items-center gap-1 py-4"
                                    >
                                        {item}
                                        {item === "Resources" && <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />}
                                    </Link>
                                )}

                                {/* Mega Menu for Resources */}
                                {item === "Resources" && (
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white rounded-xl shadow-xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-40">
                                        <div className="grid grid-cols-2 gap-4">
                                            {[
                                                { name: "Accommodation Assistance", path: "/resources/accommodation", icon: Home, desc: "Housing help & verified listings" },
                                                { name: "Travel Partners", path: "/resources/travel", icon: Plane, desc: "Find travel buddies" },
                                                { name: "Community & Daily Life", path: "/resources/community", icon: Users, desc: "Local groups & living guides" },
                                                { name: "Legal & Documentation", path: "/resources/legal", icon: Scale, desc: "Visa guides & legal aid" },
                                                { name: "Buy/Sell Marketplace", path: "/marketplace", icon: ShoppingBag, desc: "Buy & sell items" },
                                            ].map((resource) => (
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
                                        {activeCountry.flag.startsWith('/') ? (
                                            <img src={activeCountry.flag} alt={activeCountry.name} className="w-6 h-4 object-cover rounded-sm" />
                                        ) : (
                                            <span className="text-lg">{activeCountry.flag}</span>
                                        )}
                                        <span className="text-sm font-medium">{activeCountry.code}</span>
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
                                                activeCountry.code === country.code ? "text-accent font-bold" : "text-gray-700"
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
                                            {activeCountry.code === country.code && <div className="h-1.5 w-1.5 rounded-full bg-accent" />}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => navigate("/host/create")}
                            className="bg-accent hover:bg-accent/90 text-white cursor-pointer rounded-full px-6 py-2 font-medium transition-colors"
                        >
                            Host Your Space
                        </button>

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




                {/* 3. Bottom Navigation Bar */}
                <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-gray-200 pb-safe">
                    <div className="flex items-end justify-between px-2 py-2">
                        {/* Explore */}
                        <Link
                            to="/"
                            className={cn(
                                "flex flex-col items-center gap-1 p-2 w-16 transition-colors",
                                isExploreActive ? "text-primary" : "text-gray-500"
                            )}
                        >
                            <Search className="h-6 w-6" />
                            <span className="text-[10px] font-medium">Explore</span>
                        </Link>

                        {/* Groups */}
                        <Link
                            to="/groups"
                            className={cn(
                                "flex flex-col items-center gap-1 p-2 w-16 transition-colors",
                                location.pathname === "/groups" ? "text-primary" : "text-gray-500"
                            )}
                        >
                            <Users className="h-6 w-6" />
                            <span className="text-[10px] font-medium">Groups</span>
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

                        {/* Career */}
                        <Link
                            to="/career"
                            className={cn(
                                "flex flex-col items-center gap-1 p-2 w-16 transition-colors",
                                location.pathname === "/career" ? "text-primary" : "text-gray-500"
                            )}
                        >
                            <Briefcase className="h-6 w-6" />
                            <span className="text-[10px] font-medium">Career</span>
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