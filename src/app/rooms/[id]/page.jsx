import React, { useState } from 'react';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useParams } from "react-router-dom";
import { PropertyHero } from "@/components/property/PropertyHero";
import { PropertyHighlights } from "@/components/property/PropertyHighlights";
import { OwnerCard } from "@/components/property/OwnerCard";
import { ReviewsSection } from "@/components/property/ReviewsSection";
import { BottomActionBar } from "@/components/property/BottomActionBar";
import { ContactModal } from "@/components/contact/ContactModal";
import { MapPin } from "lucide-react";
import { useGetPropertyByIdQuery } from '@/store/api/hostApi';

export default function RoomPage() {
    const { id } = useParams();
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [contactType, setContactType] = useState('call');

    const { data, isLoading, isError } = useGetPropertyByIdQuery(id, { skip: !id });

    // -----------------------------
    // 🔥 FIXED VERIFICATION & SHAPE LOGIC (with property-approved fallback)
    // -----------------------------
    const listing = React.useMemo(() => {
        if (!data) return null;
        const p = data.property ?? data;
        if (!p || typeof p !== 'object') return null;

        // Defensive: user and host extraction
        const user = p.User ?? p.user ?? null;
        const hostCandidates = [
            p.User?.Host,
            p.User?.host,
            p.Host,
            p.host,
            (user && user.Host) || null,
            (user && user.host) || null,
        ];
        const hostObj = hostCandidates.find(h => h && typeof h === 'object') ?? {};

        // photos normalization (API sometimes sends null)
        const photosArray = Array.isArray(p.photos) ? p.photos : [];

        const toNum = (v) => {
            const n = Number(v);
            return Number.isFinite(n) ? n : null;
        };

        // Normalize values
        const normalize = (val) => {
            if (val == null) return null;
            if (typeof val === 'boolean') return val;
            if (typeof val === 'number') return String(val);
            return String(val).toLowerCase();
        };

        // Host status raw -> normalized
        const hostStatusRaw =
            hostObj.status ??
            hostObj.verification_status ??
            hostObj.verified ??
            hostObj.is_verified ??
            hostObj.status_code ??
            null;
        const hostStatus = normalize(hostStatusRaw);

        // Property status
        const propStatusRaw = p.status ?? p.property_status ?? null;
        const propStatus = normalize(propStatusRaw);

        // property is approved?
        const propertyIsApproved = propStatus === 'approved' || propStatus === 'verified' || propStatus === 'true' || propStatus === '1';

        // host considered verified if host status explicitly indicates approval
        // OR fallback: property is approved AND there is an identifiable host/user
        const hostExplicitlyApproved =
            hostStatus === true ||
            hostStatus === 'true' ||
            hostStatus === '1' ||
            hostStatus === 'approved' ||
            hostStatus === 'verified' ||
            hostStatus === 'active';

        const hostHasIdentity = !!(hostObj && (hostObj.id || hostObj._id || hostObj.full_name || user?.email));

        const hostIsVerified = hostExplicitlyApproved || (propertyIsApproved && hostHasIdentity);

        // host label shows context — if fallback used show note
        const hostVerificationLabel = hostExplicitlyApproved
            ? 'Host Verified'
            : (propertyIsApproved && hostHasIdentity ? 'Host Unverified — Property Verified' : (hostStatusRaw ? `Host: ${hostStatusRaw}` : 'Host Unverified'));

        // property verification label
        const isVerified = propertyIsApproved;
        const verificationLabel = isVerified ? 'Verified' : (propStatusRaw || 'Unverified');

        return {
            id: p.id ?? p._id ?? null,
            title: (p.title && String(p.title).trim()) || `Property #${p.id ?? p._id ?? 'N/A'}`,
            location: {
                city: p.city ?? '',
                country: p.country ?? '',
                address: p.address ?? ''
            },
            price: toNum(p.price_per_month) || toNum(p.price_per_night) || toNum(p.price_per_hour) || 0,
            pricing: {
                perHour: toNum(p.price_per_hour),
                perNight: toNum(p.price_per_night),
                perMonth: toNum(p.price_per_month),
                currency: p.currency ?? 'INR'
            },
            features: Array.isArray(p.amenities) ? p.amenities : [],
            rules: Array.isArray(p.rules) ? p.rules : [],
            images: photosArray,
            image: photosArray.length > 0 ? photosArray[0] : null,
            video: p.video ?? null,

            // Host Info
            hostName: hostObj.full_name || hostObj.name || user?.email || 'Host',
            hostAvatar: hostObj.selfie_photo || hostObj.avatar || hostObj.profile_photo || null,
            hostId: hostObj.id ?? hostObj._id ?? hostObj.user_id ?? user?.id ?? null,
            hostRaw: hostObj,

            description: p.description ?? '',
            type: p.property_type ?? p.category_id ?? 'Property',
            category: p.category_id ?? null,
            rating: p.rating ?? 4.5,
            reviews: p.reviews ?? 0,
            area: p.area ?? null,
            guests: p.guests ?? null,
            bedrooms: p.bedrooms ?? null,
            bathrooms: p.bathrooms ?? null,

            // verification flags and labels
            isVerified,
            verificationLabel,

            hostIsVerified,
            hostVerificationLabel,
            hostStatusRaw,
            propertyIsApproved
        };
    }, [data]);

    // -----------------------------
    // Loading & Error States
    // -----------------------------
    if (isLoading) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center text-white bg-[#1a0b2e]">
                Loading...
            </div>
        );
    }

    if (isError || !listing) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center text-white bg-[#1a0b2e]">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Listing Not Found</h2>
                    <p className="text-gray-400">The property you are looking for does not exist or has been removed.</p>
                </div>
            </div>
        );
    }

    const handleContact = (type) => {
        setContactType(type);
        setIsContactOpen(true);
    };

    const images =
        listing.images?.length > 0
            ? listing.images
            : [listing.image || "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop"];

    const formatCurrency = (value, currency) => {
        if (value == null) return "Price on Request";
        const symbol = currency === 'USD' ? '$' : (currency === 'INR' ? '₹' : '');
        return `${symbol}${Number(value).toLocaleString()}`;
    };

    const displayPrice = listing.price
        ? formatCurrency(listing.price, listing.pricing?.currency)
        : (listing.pricing?.perMonth
            ? `${formatCurrency(listing.pricing.perMonth, listing.pricing.currency)}/mo`
            : "Price on Request");

    const displayLocation = (() => {
        const city = listing.location.city || "";
        const country = typeof listing.location.country === "object"
            ? (listing.location.country.name || "")
            : (listing.location.country || "");
        return city || country ? `${city}${city && country ? ", " : ""}${country}` : "Unknown Location";
    })();

    const displayTitle = listing.title || "Untitled Property";

    // -----------------------------------------------------
    // UI STARTS
    // -----------------------------------------------------
    return (
        <main className="min-h-screen bg-gradient-to-br from-[#2a1b4e] via-[#1a0b2e] to-[#0a0510] pb-20 md:pb-0">
            <div className="hidden md:block">
                <Navbar />
            </div>

            <div className="container mx-auto px-4 md:px-8 pt-20 pb-8">
                {/* HERO */}
                <div className="mb-6 md:mb-8">
                    <PropertyHero
                        images={images}
                        price={displayPrice}
                        title={displayTitle}
                        location={displayLocation}
                        type={listing.type}
                        isVerified={listing.isVerified}
                        verificationLabel={listing.verificationLabel}
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* LEFT */}
                    <div className="w-full md:w-[65%] space-y-6 md:space-y-10">

                        {/* Title + Verification */}
                        <div className="hidden md:block">
                            <div className="flex items-center gap-4">
                                <h1 className="text-3xl font-bold text-white">{displayTitle}</h1>

                                {listing.isVerified ? (
                                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                        ✓ {listing.verificationLabel}
                                    </span>
                                ) : (
                                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                                        ✕ {listing.verificationLabel}
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-2 text-gray-300 mt-2">
                                <MapPin className="w-4 h-4 text-[#7B2CBF]" />
                                <span>{displayLocation}</span>
                            </div>
                        </div>

                        <PropertyHighlights features={listing.features} />

                        {/* PROPERTY DETAILS */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm">
                            <h3 className="font-bold text-lg text-gray-900 mb-6">Property Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                                <Detail label="Type:" value={listing.type} />
                                <Detail label="Bedrooms:" value={listing.bedrooms ?? 1} />
                                <Detail label="Bathrooms:" value={listing.bathrooms ?? 1} />
                                <Detail label="Guests:" value={listing.guests ?? 2} />
                                <Detail label="Area:" value={`${listing.area ?? "N/A"} sq.ft.`} />
                            </div>
                        </div>

                        {/* ABOUT */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm">
                            <h3 className="font-bold text-lg text-gray-900 mb-4">About Property</h3>
                            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                                {listing.description || "No description provided."}
                            </p>
                        </div>

                        <ReviewsSection rating={listing.rating} reviews={listing.reviews} />

                        {/* MOBILE HOST CARD */}
                        <div className="md:hidden bg-white rounded-2xl p-4 shadow-sm">
                            <OwnerCard ownerName={listing.hostName} ownerImage={listing.hostAvatar} />
                            <div className="mt-3">
                                {listing.hostIsVerified ? (
                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">Host Verified</span>
                                ) : (
                                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">Host Unverified</span>
                                )}
                                {/* show if property approved but host unverified */}
                                {!listing.hostIsVerified && listing.propertyIsApproved && (
                                    <div className="mt-2 text-xs text-gray-500">Property approved but host unverified</div>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* RIGHT SIDEBAR */}
                    <div className="hidden md:block w-full md:w-[35%]">
                        <div className="sticky top-24 space-y-6">

                            {/* PRICE CARD */}
                            <div className="bg-white rounded-2xl p-6 shadow-xl">
                                <div className="flex justify-between items-end mb-4">
                                    <div>
                                        <p className="text-gray-500 text-xs uppercase font-bold">Total Price</p>
                                        <h2 className="text-3xl font-bold text-[#7B2CBF]">{displayPrice}</h2>
                                    </div>

                                    {listing.isVerified ? (
                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">Verified</span>
                                    ) : (
                                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">Unverified</span>
                                    )}
                                </div>

                                <button
                                    onClick={() => handleContact('call')}
                                    className="w-full bg-accent text-white font-bold py-3 rounded-xl"
                                >
                                    Contact Host
                                </button>
                            </div>

                            {/* HOST CARD */}
                            <div className="bg-white rounded-2xl p-4 shadow-sm">
                                <OwnerCard ownerName={listing.hostName} ownerImage={listing.hostAvatar} />

                                <div className="mt-3 flex items-center gap-2">
                                    {listing.hostIsVerified ? (
                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">Host Verified</span>
                                    ) : (
                                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">Host Unverified</span>
                                    )}

                                    {listing.hostRaw?.status && (
                                        <span className="text-xs text-gray-400">
                                            ({listing.hostRaw.status})
                                        </span>
                                    )}
                                </div>

                                {/* If property is approved but host unverified, show helpful text */}
                                {!listing.hostIsVerified && listing.propertyIsApproved && (
                                    <div className="mt-2 text-sm text-gray-600">
                                        This property is approved but the host is not verified yet.
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <BottomActionBar onContact={handleContact} price={displayPrice} />

            <div className="hidden md:block mt-20">
                <Footer />
            </div>

            <ContactModal
                isOpen={isContactOpen}
                onClose={() => setIsContactOpen(false)}
                listing={listing}
                type={contactType}
            />
        </main>
    );
}

function Detail({ label, value }) {
    return (
        <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500">{label}</span>
            <span className="font-semibold text-gray-900">{value}</span>
        </div>
    );
}
