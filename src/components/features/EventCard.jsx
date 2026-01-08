import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Star, Clock } from "lucide-react"

export function EventCard({ title, image, date, location, price, rating, type, open }) {
    return (
        <Card className="border-none shadow-md overflow-hidden group cursor-pointer h-full flex flex-col min-w-[280px] max-w-[280px]">
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {price && (
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold">
                        {price}
                    </div>
                )}
                {rating && (
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-black px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        {rating}
                    </div>
                )}
            </div>

            <CardContent className="p-4 flex-1">
                {type && <p className="text-xs text-accent font-bold uppercase mb-1">{type}</p>}
                <h3 className="font-bold text-lg leading-tight mb-2 group-hover:text-accent text-blue-500 transition-colors line-clamp-2">
                    {title}
                </h3>

                <div className="space-y-1 text-sm text-gray-500">
                    {date && (
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>{date}</span>
                        </div>
                    )}
                    {location && (
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="line-clamp-1">{location}</span>
                        </div>
                    )}
                    {open && (
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span>{open}</span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
