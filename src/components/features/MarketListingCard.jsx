import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock } from "lucide-react"

export function MarketListingCard({ title, image, location, open }) {
    return (
        <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer rounded-xl overflow-hidden h-full min-w-[300px] max-w-[300px]">
            <div className="flex h-full">
                {/* Image Section - Left Side */}
                <div className="w-1/3 relative overflow-hidden bg-gray-100">
                    <img
                        src={image}
                        alt={title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                </div>

                {/* Content Section - Right Side */}
                <CardContent className="w-2/3 p-4 flex flex-col justify-center">
                    <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-1">
                        {title}
                    </h3>

                    <div className="space-y-2 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                            <span className="line-clamp-1 text-xs">{location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-3.5 w-3.5 text-accent shrink-0" />
                            <span className="text-xs font-medium text-gray-700">{open}</span>
                        </div>
                    </div>
                </CardContent>
            </div>
        </Card>
    )
}
