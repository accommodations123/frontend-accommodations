import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CountryProvider } from "@/context/CountryContext";
import ScrollToTop from "@/components/layout/ScrollToTop";
import RootLayout from "@/app/layout";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

// Lazy load pages
const Home = lazy(() => import("@/app/page"));
const BookConfirmation = lazy(() => import("@/app/book/confirmation/page"));
const Career = lazy(() => import("@/app/career/page"));
const Contact = lazy(() => import("@/app/contact/page"));
const Dashboard = lazy(() => import("@/app/dashboard/page"));
const EventsPage = lazy(() => import("@/app/events/page"));
const HostEventPage = lazy(() => import("@/app/events/host/page"));
const Groups = lazy(() => import("@/app/groups/page"));
const HostOnboarding = lazy(() => import("@/app/host/onboarding/page"));
const RoomDetails = lazy(() => import("@/app/rooms/[id]/page"));
const Search = lazy(() => import("@/app/search/page"));
const HostYourHouse = lazy(() => import("@/app/host/guidelines/page"));
const HostVerificationPage = lazy(() => import("@/app/host/verify/page"));
const TrustPage = lazy(() => import("@/app/trust/page"));
const OnboardingPage = lazy(() => import("@/app/onboarding/page"));
const AccommodationPage = lazy(() => import("@/app/resources/accommodation/page"));
const TravelPage = lazy(() => import("@/app/resources/travel/page"));
const CommunityPage = lazy(() => import("@/app/resources/community/page"));
const LegalPage = lazy(() => import("@/app/resources/legal/page"));
const Signup = lazy(() => import("@/app/signup/page"));
const Signin = lazy(() => import("@/app/signin/page"));
const SupportPage = lazy(() => import("./components/mentorship/page"));

export default function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <CountryProvider>
                <RootLayout>
                    <Suspense fallback={<LoadingSpinner />}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/book/confirmation" element={<BookConfirmation />} />
                            <Route path="/career" element={<Career />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/account" element={<Dashboard />} />
                            <Route path="/events" element={<EventsPage />} />
                            <Route path="/events/host" element={<HostEventPage />} />
                            <Route path="/groups" element={<Groups />} />
                            <Route path="/support" element={<SupportPage />} />
                            <Route path="/host/onboarding" element={<HostOnboarding />} />
                            <Route path="/rooms" element={<Navigate to="/search" replace />} />
                            <Route path="/rooms/:id" element={<RoomDetails />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/host/guidelines" element={<HostYourHouse />} />
                            <Route path="/host/verify" element={<HostVerificationPage />} />
                            <Route path="/trust" element={<TrustPage />} />
                            <Route path="/onboarding" element={<OnboardingPage />} />
                            <Route path="/resources/accommodation" element={<AccommodationPage />} />
                            <Route path="/resources/jobs" element={<Navigate to="/resources/mentorship" replace />} />
                            <Route path="/resources/travel" element={<TravelPage />} />
                            <Route path="/resources/community" element={<CommunityPage />} />
                            <Route path="/resources/legal" element={<LegalPage />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/signin" element={<Signin />} />
                        </Routes>
                    </Suspense>
                </RootLayout>
            </CountryProvider>
        </BrowserRouter>
    );
}
