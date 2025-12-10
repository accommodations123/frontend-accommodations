import { Star, Heart, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useCountry } from "@/context/CountryContext"

export function ListingCard({ id, title, location, price, rating, image, category, badges }) {
    const { currency } = useCountry()

    // Simple mock conversion (in real app, use an API)
    const getPrice = (price, currency) => {
        const rates = { "USD": 1, "GBP": 0.79, "CAD": 1.36, "AED": 3.67, "EUR": 0.92, "AUD": 1.52, "INR": 83.50 }
        const rate = rates[currency] || 1
        return Math.round(price * rate)
    }

    const displayPrice = getPrice(price, currency)

    return (
        <Link to={`/rooms/${id}`}>
            <Card className="border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer rounded-xl overflow-hidden h-full flex flex-col">
                {/* Image Section */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <img
                        src={image}
                        alt={title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Favorite Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-3 right-3 text-white hover:bg-white/20 hover:text-white rounded-full h-8 w-8 backdrop-blur-sm"
                        onClick={(e) => {
                            e.preventDefault()
                            // Add favorite logic here
                        }}
                    >
                        <Heart className="h-5 w-5" />
                    </Button>

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                        <div className="bg-white/95 backdrop-blur-sm text-indigo-600 px-2.5 py-1 rounded-md text-xs font-bold shadow-sm border border-white/20">
                            {category}
                        </div>
                    </div>
                </div>

                <CardContent className="p-4 flex flex-col flex-1">
                    {/* Title & Rating Row */}
                    <div className="flex justify-between items-start gap-2 mb-1">
                        <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                            {title}
                        </h3>
                        <div className="flex items-center gap-1 bg-gray-50 px-1.5 py-0.5 rounded-md border border-gray-100 shrink-0">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            <span className="text-xs font-bold text-gray-700">{rating}</span>
                        </div>
                    </div>

                    {/* Location */}
                    <p className="text-gray-500 text-sm mb-3 font-medium flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {location}
                    </p>

                    {/* Badges Row */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {badges && badges.slice(0, 3).map((badge, index) => (
                            <div key={index} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-[10px] font-semibold border border-blue-100">
                                {badge}
                            </div>
                        ))}
                    </div>

                    {/* Price Section */}
                    <div className="mt-auto pt-3 border-t border-gray-50 flex items-end justify-between">
                        <div className="flex flex-col">
                            <div className="flex items-baseline gap-1">
                                <span className="font-bold text-gray-900 text-xl">
                                    {currency === "USD" && "$"}
                                    {currency === "EUR" && "€"}
                                    {currency === "GBP" && "£"}
                                    {currency === "CAD" && "C$"}
                                    {currency === "AUD" && "A$"}
                                    {currency === "AED" && "AED"}
                                    {currency === "INR" && "₹"}
                                    {displayPrice}
                                </span>
                                <span className="text-gray-500 text-sm font-medium">/ night</span>
                            </div>

                            {/* Secondary Currency Display */}
                            {currency !== "INR" ? (
                                <span className="text-xs text-gray-400 font-medium">
                                    approx. ₹{getPrice(price, "INR").toLocaleString("en-IN")}
                                </span>
                            ) : (
                                <span className="text-xs text-gray-400 font-medium">
                                    approx. ${getPrice(price, "USD").toLocaleString("en-US")}
                                </span>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
