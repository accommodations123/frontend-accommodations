import React, { useState, useEffect, memo } from "react"
import { Link } from "react-router-dom"
import { Star, EyeOff, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { reviewService } from "../services/eventApi"
import { useAuth } from "../hooks/useAuth"

export const ReviewsTab = memo(({ event, visibleSections }) => {
    const [reviews, setReviews] = useState([])
    const [rating, setRating] = useState({ rating: 0, count: 0 })
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [userRating, setUserRating] = useState(0)
    const [reviewText, setReviewText] = useState('')
    const [hasReviewed, setHasReviewed] = useState(false)
    const [userReviewId, setUserReviewId] = useState(null)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const { user } = useAuth()

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true)
                const [reviewsData, ratingData] = await Promise.all([
                    reviewService.getEventReviews(event.id),
                    reviewService.getEventRating(event.id)
                ])

                setReviews(reviewsData)
                setRating({
                    rating: typeof ratingData?.rating === 'number' ? ratingData.rating : 0,
                    count: reviewsData.length || 0
                })

                if (user && reviewsData.length > 0) {
                    const userReview = reviewsData.find(review => review.user_id === user.id)
                    if (userReview) {
                        setHasReviewed(true)
                        setUserReviewId(userReview.id)
                        setUserRating(userReview.rating || 0)
                        setReviewText(userReview.comment || '')
                    }
                }
            } catch (error) {
                console.error('Error fetching reviews:', error)
                setErrorMessage('Failed to load reviews. Please try again later.')
                setReviews([])
                setRating({ rating: 0, count: 0 })
            } finally {
                setLoading(false)
            }
        }

        if (event?.id) {
            fetchReviews()
        }
    }, [event?.id, user])

    const handleSubmitReview = async () => {
        if (!user) {
            setErrorMessage('You must be logged in to submit a review.')
            return
        }

        if (userRating === 0) {
            setErrorMessage('Please select a rating.')
            return
        }

        try {
            setSubmitting(true)
            setErrorMessage('')

            const reviewData = {
                rating: userRating,
                comment: reviewText
            }

            await reviewService.submitReview(event.id, reviewData)

            const [reviewsData, ratingData] = await Promise.all([
                reviewService.getEventReviews(event.id),
                reviewService.getEventRating(event.id)
            ])

            setReviews(reviewsData)
            setRating({
                rating: typeof ratingData?.rating === 'number' ? ratingData.rating : 0,
                count: reviewsData.length || 0
            })
            setHasReviewed(true)
            setShowSuccessMessage(true)

            const newUserReview = reviewsData.find(review => review.user_id === user.id)
            if (newUserReview) {
                setUserReviewId(newUserReview.id)
            }

            setTimeout(() => setShowSuccessMessage(false), 3000)
        } catch (error) {
            console.error('Error submitting review:', error)
            setErrorMessage('Failed to submit review. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }

    const handleHideReview = async () => {
        if (!userReviewId) return

        try {
            await reviewService.hideReview(userReviewId)
            const updatedReviews = reviews.filter(review => review.id !== userReviewId)
            setReviews(updatedReviews)
            setHasReviewed(false)
            setUserReviewId(null)
            setUserRating(0)
            setReviewText('')

            const ratingData = await reviewService.getEventRating(event.id)
            setRating({
                rating: typeof ratingData?.rating === 'number' ? ratingData.rating : 0,
                count: updatedReviews.length || 0
            })
        } catch (error) {
            console.error('Error hiding review:', error)
            setErrorMessage('Failed to hide review. Please try again.')
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffTime = Math.abs(now - date)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays === 1) return '1 day ago'
        if (diffDays < 7) return `${diffDays} days ago`
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`
        return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? 's' : ''} ago`
    }

    const displayRating = typeof rating.rating === 'number' ? rating.rating : 0
    const displayCount = reviews.length || 0

    return (
        <div id="reviews" className="space-y-6 md:space-y-8">
            <section
                className={`bg-gradient-to-b from-white to-gray-50 rounded-3xl shadow-xl p-6 md:p-8 animate-section transition-all duration-700 ${visibleSections.has('reviews') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
            >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center shadow-lg">
                        <Star className="h-8 w-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Reviews</h2>
                        <p className="text-gray-500 text-sm mt-1">See what our attendees are saying</p>
                    </div>
                </div>

                {errorMessage && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
                        {errorMessage}
                    </div>
                )}

                {showSuccessMessage && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6">
                        Your review has been submitted successfully!
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-b from-yellow-50 to-yellow-100 rounded-2xl p-6 border border-yellow-200 text-center">
                        <div className="flex justify-center gap-1 mb-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className={`h-8 w-8 ${star <= Math.round(displayRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                            ))}
                        </div>
                        <p className="text-4xl font-bold text-gray-900">{displayRating.toFixed(1)}</p>
                        <p className="text-gray-600">Based on {displayCount} reviews</p>
                    </div>
                    <div className="bg-accent/10 rounded-2xl p-6 border border-accent/20 text-center">
                        <p className="text-4xl font-bold text-gray-900">{event.attendeesCount || 0}</p>
                        <p className="text-gray-600">Total Attendees</p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-8">
                        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {reviews.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                No reviews yet. Be the first to review this event!
                            </div>
                        ) : (
                            reviews.map((review) => (
                                <div key={review.id} className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 hover:bg-white transition-all duration-300 hover:shadow-xl border border-gray-100">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform">
                                                {review.user_avatar || (
                                                    <span>{review.user_name?.charAt(0)?.toUpperCase() || 'U'}</span>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{review.user_name || 'Anonymous User'}</p>
                                                <p className="text-sm text-gray-500">{review.user_role || 'Attendee'}</p>
                                                <div className="flex items-center gap-1 mt-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`h-4 w-4 ${i < (review.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm text-gray-500">{formatDate(review.created_at)}</p>
                                            {user && review.user_id === user.id && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={handleHideReview}
                                                    className="text-gray-500 hover:text-red-500"
                                                >
                                                    <EyeOff className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </section>

            {!hasReviewed && (
                <section
                    className={`bg-gradient-to-b from-white to-gray-50 rounded-3xl shadow-xl p-6 md:p-8 animate-section transition-all duration-700 delay-100 ${visibleSections.has('review-form') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                    id="review-form"
                >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center shadow-lg">
                            <MessageCircle className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Leave a Review</h2>
                            <p className="text-gray-500 text-sm mt-1">Share your experience with others</p>
                        </div>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
                        {!user ? (
                            <div className="text-center py-8">
                                <p className="text-gray-600 mb-4">You must be logged in to leave a review.</p>
                                <Link to="/login">
                                    <Button className="bg-accent text-white hover:bg-accent/90 transition-all duration-300 transform hover:scale-105 shadow-xl rounded-2xl">
                                        Login to Review
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">Your Rating</label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button key={star} className="p-1" onClick={() => setUserRating(star)}>
                                                <Star className={`h-8 w-8 ${star <= userRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 hover:text-yellow-400 hover:fill-yellow-400'} transition-colors`} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">Your Review</label>
                                    <textarea
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                                        rows="4"
                                        placeholder="Share your experience with this event..."
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                    ></textarea>
                                </div>
                                <Button
                                    onClick={handleSubmitReview}
                                    disabled={submitting || userRating === 0}
                                    className="bg-accent text-white hover:bg-accent/90 transition-all duration-300 transform hover:scale-105 shadow-xl rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {submitting ? 'Submitting...' : 'Submit Review'}
                                </Button>
                            </>
                        )}
                    </div>
                </section>
            )}
        </div>
    )
})
ReviewsTab.displayName = "ReviewsTab"
