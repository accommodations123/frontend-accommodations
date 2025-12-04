import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { ImageGallery } from "@/components/features/ImageGallery"
import { BookingWidget } from "@/components/features/BookingWidget"
import { AmenitiesGrid } from "@/components/features/AmenitiesGrid"
import { Star, Shield, MapPin, User, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LISTINGS } from "@/lib/mock-data"
import { useParams } from "react-router-dom"

export default function RoomPage() {
    const { id } = useParams();
    const listing = LISTINGS.find(l => l.id === parseInt(id))

    if (!listing) {
        return <div className="min-h-screen pt-20 text-center text-white">Listing not found</div>
    }

    return (
        <main className="min-h-screen bg-background pt-20">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-white mb-2">{listing.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                        <div className="flex items-center gap-1 font-bold text-white">
                            <Star className="h-4 w-4 fill-accent text-accent" />
                            {listing.rating}
                        </div>
                        <span className="underline">{listing.reviews} reviews</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                            <Shield className="h-4 w-4 text-accent" />
                            Superhost
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1 underline font-medium text-gray-200">
                            <MapPin className="h-4 w-4" />
                            {listing.location}
                        </div>
                    </div>
                </div>

                {/* Gallery */}
                <div className="mb-12">
                    <ImageGallery images={listing.images || [listing.image]} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-12">
                        {/* Host Info */}
                        <div className="flex justify-between items-center border-b pb-8">
                            <div>
                                <h2 className="text-xl font-bold mb-1 text-white">Hosted by {listing.hostName || "Sarah"}</h2>
                                <p className="text-gray-400">Superhost • 5 years hosting</p>
                            </div>
                            <div className="h-14 w-14 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                                {listing.hostAvatar ? (
                                    <img src={listing.hostAvatar} alt={listing.hostName} className="w-full h-full object-cover" />
                                ) : (
                                    <User className="h-8 w-8 text-gray-400" />
                                )}
                            </div>
                        </div>

                        {/* Accommodation Details */}
                        <div className="border-b pb-8 grid grid-cols-2 gap-4">
                            <div className="bg-white/5 p-4 rounded-xl">
                                <p className="text-gray-400 text-sm mb-1">Type</p>
                                <p className="text-white font-semibold">{listing.type || "Apartment"}</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl">
                                <p className="text-gray-400 text-sm mb-1">Area</p>
                                <p className="text-white font-semibold">{listing.area || "N/A"}</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="border-b pb-8">
                            <p className="text-gray-300 leading-relaxed">
                                Enjoy a stylish experience at this centrally-located place. This modern loft features high ceilings, large windows, and an open-concept living area. Perfect for couples or business travelers looking for a comfortable and convenient stay in the heart of the city.
                                <br /><br />
                                The apartment is fully equipped with a modern kitchen, fast Wi-Fi, and a dedicated workspace.
                            </p>
                            <Button variant="link" className="px-0 text-accent font-bold mt-2">
                                Show more
                            </Button>
                        </div>

                        {/* Community & Safety (New for Phase 1) */}
                        <div className="border-b pb-8">
                            <h2 className="text-xl font-bold mb-6 text-white">Community & Safety</h2>
                            <div className="bg-white/5 rounded-xl p-6 space-y-6">
                                <div>
                                    <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                                        <Users className="h-4 w-4 text-accent" />
                                        Indian Community
                                    </h3>
                                    <p className="text-gray-300 text-sm">
                                        High Indian population in this area (approx. 25%). You'll find many students and families from India living in this neighborhood.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                                        <Shield className="h-4 w-4 text-accent" />
                                        Safety Note
                                    </h3>
                                    <p className="text-gray-300 text-sm">
                                        This is a family-friendly residential area with well-lit streets. Safe for walking at night. 24/7 building security is available.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                                        <div className="h-4 w-4 flex items-center justify-center text-accent font-bold text-xs">Zz</div>
                                        Quiet Hours
                                    </h3>
                                    <p className="text-gray-300 text-sm">
                                        10:00 PM to 7:00 AM. This ensures a peaceful environment for students and working professionals.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Video Tour */}
                        {listing.video && (
                            <div className="border-b pb-8">
                                <h2 className="text-xl font-bold mb-6 text-white">Video Tour</h2>
                                <div className="aspect-video bg-black rounded-xl overflow-hidden relative group">
                                    <video
                                        controls
                                        className="w-full h-full object-cover"
                                        poster={listing.image}
                                    >
                                        <source src={listing.video} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </div>
                        )}

                        {/* Amenities */}
                        <div className="border-b pb-8">
                            <h2 className="text-xl font-bold mb-6 text-white">What this place offers</h2>
                            <AmenitiesGrid />
                            <Button variant="outline" className="mt-8 rounded-lg border-white text-white hover:bg-white/10 hover:text-white">
                                Show all 32 amenities
                            </Button>
                        </div>

                        {/* Location Map Placeholder */}
                        <div className="border-b pb-8">
                            <h2 className="text-xl font-bold mb-6 text-white">Where you'll be</h2>
                            <div className="h-[400px] bg-gray-200 rounded-xl flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 opacity-50"
                                    style={{
                                        backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center"
                                    }}
                                />
                                <p className="z-10 font-bold text-gray-500">Map View Placeholder</p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="sticky top-24 h-fit">
                        <BookingWidget price={listing.price} rating={listing.rating} reviews={listing.reviews} />

                        {/* Schedule Visit Widget */}
                        <div className="mt-8 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                            <h3 className="text-lg font-bold mb-4 text-gray-900">Schedule a Visit</h3>
                            <p className="text-sm text-gray-500 mb-4">Tour the property in person or via video call.</p>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Date</label>
                                    <input type="date" className="w-full p-2 border rounded-lg text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Time</label>
                                    <input type="time" className="w-full p-2 border rounded-lg text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Type</label>
                                    <select className="w-full p-2 border rounded-lg text-sm">
                                        <option>In-Person Visit</option>
                                        <option>Video Call</option>
                                    </select>
                                </div>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                    Request Visit
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
