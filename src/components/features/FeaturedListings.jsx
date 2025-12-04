import { ListingCard } from "./ListingCard"
import { LISTINGS } from "@/lib/mock-data"

export function FeaturedListings() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-primary mb-2">Popular for Indians in New Jersey</h2>
                        <p className="text-gray-500">Curated accommodations with Indian roommates and amenities.</p>
                    </div>
                    <a href="/search" className="text-accent font-medium hover:underline">View all</a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {LISTINGS.map((listing) => (
                        <ListingCard
                            key={listing.id}
                            {...listing}
                            badges={["Indian roommates", "Close to Desi stores"]}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
