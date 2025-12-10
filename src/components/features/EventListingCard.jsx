import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin } from "lucide-react"

export function EventListingCard({ title, image, date, location, price }) {
    return (
        <Card className="border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer rounded-xl overflow-hidden h-full flex flex-col min-w-[280px] max-w-[280px]">
            {/* Image Section */}
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                    src={image}
                    alt={title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
            </div>

            <CardContent className="p-4 flex flex-col flex-1">
                {/* Title */}
                <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {title}
                </h3>

                {/* Date & Location */}
                <div className="space-y-1.5 text-sm text-gray-500 mb-4 flex-1">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-accent/70" />
                        <span className="font-medium">{date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-accent/70" />
                        <span className="line-clamp-1">{location}</span>
                    </div>
                </div>

                {/* Price Badge */}
                <div className="mt-auto pt-3 border-t border-gray-50 flex justify-end">
                    <span className="text-accent font-bold text-sm bg-accent/5 px-3 py-1 rounded-full">
                        {price}
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}
