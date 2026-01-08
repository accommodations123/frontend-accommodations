import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export function RestaurantListingCard({ title, image, type, rating, price }) {
    return (
        <Card className="border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer rounded-xl overflow-hidden h-full flex flex-col min-w-[280px] max-w-[280px]">
            {/* Image Section */}
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                    src={image}
                    alt={title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-black px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 shadow-sm">
                    <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                    {rating}
                </div>
            </div>

            <CardContent className="p-4 flex flex-col flex-1">
                {/* Title */}
                <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-1">
                    {title}
                </h3>

                {/* Cuisine Type */}
                <p className="text-sm text-gray-500 font-medium mb-3">{type}</p>

                {/* Price Range */}
                <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-50">
                    <span className="text-primary font-bold tracking-widest text-sm bg-primary/5 px-2 py-0.5 rounded">
                        {price}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">Average Cost</span>
                </div>
            </CardContent>
        </Card>
    )
}
