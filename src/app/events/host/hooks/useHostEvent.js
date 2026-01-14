import { useState, useCallback } from "react"
import { hostEventService, compressImage } from "../services/hostEventService"

export const useHostEvent = () => {
    const [step, setStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [eventId, setEventId] = useState(null)
    const [error, setError] = useState(null)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [previewImages, setPreviewImages] = useState({ banner: null, gallery: [] })

    const [formData, setFormData] = useState({
        title: "",
        date: "",
        end_date: "",
        time: "",
        end_time: "",
        location: "",
        description: "",
        country: "US",
        state: "",
        city: "",
        zip_code: "",
        landmark: "",
        venue_name: "",
        venue_description: "",
        parking_info: "",
        accessibility_info: "",
        price: "",
        event_type: "meetup",
        event_mode: "offline",
        event_url: "",
        online_instructions: "",
        documents: {},
        schedule: [],
        bannerImage: null,
        galleryImages: [],
        what_is_included: "",
        what_is_not_included: ""
    })

    const handleInputChange = useCallback((field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }, [])

    const handleFileChange = useCallback((docName, file) => {
        setFormData(prev => ({
            ...prev,
            documents: { ...prev.documents, [docName]: file }
        }))
    }, [])

    const validateFile = (file) => {
        const MAX_FILE_SIZE = 5 * 1024 * 1024
        if (!file.type.match('image.*')) return { valid: false, error: "Please upload an image file" }
        if (file.size > MAX_FILE_SIZE) return { valid: false, error: "File is too large (max 5MB)" }
        return { valid: true }
    }

    const handleBannerImageChange = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        const validation = validateFile(file)
        if (!validation.valid) {
            setError(validation.error)
            return
        }

        try {
            setError(null)
            const compressedFile = await compressImage(file)
            const reader = new FileReader()
            reader.onload = () => setPreviewImages(prev => ({ ...prev, banner: reader.result }))
            reader.readAsDataURL(compressedFile)
            setFormData(prev => ({ ...prev, bannerImage: compressedFile }))
        } catch (err) {
            setError("Failed to process image")
        }
    }

    const handleGalleryImagesChange = async (e) => {
        const files = Array.from(e.target.files)
        if (!files.length) return

        setError(null)
        const validFiles = []
        const previews = []

        for (const file of files) {
            const validation = validateFile(file)
            if (!validation.valid) {
                setError(validation.error)
                return
            }

            try {
                const compressedFile = await compressImage(file)
                validFiles.push(compressedFile)
                const reader = new FileReader()
                reader.onload = () => {
                    previews.push(reader.result)
                    if (previews.length === validFiles.length) {
                        setPreviewImages(prev => ({
                            ...prev,
                            gallery: [...prev.gallery, ...previews]
                        }))
                    }
                }
                reader.readAsDataURL(compressedFile)
            } catch (err) {
                setError("Failed to process images")
                return
            }
        }

        setFormData(prev => ({
            ...prev,
            galleryImages: [...prev.galleryImages, ...validFiles]
        }))
    }

    const removeGalleryImage = (index) => {
        setFormData(prev => ({
            ...prev,
            galleryImages: prev.galleryImages.filter((_, i) => i !== index)
        }))
        setPreviewImages(prev => ({
            ...prev,
            gallery: prev.gallery.filter((_, i) => i !== index)
        }))
    }

    const createOrUpdateEvent = async () => {
        setIsSubmitting(true)
        setError(null)

        try {
            let currentId = eventId

            if (!currentId) {
                const draftResponse = await hostEventService.createDraft({
                    title: formData.title,
                    start_date: formData.date,
                    start_time: formData.time,
                    event_type: formData.event_type,
                    event_mode: formData.event_mode
                })
                currentId = draftResponse?.eventId || draftResponse?.id || draftResponse?._id || draftResponse?.event?.id || draftResponse?.event?._id || draftResponse?.data?.id || draftResponse?.data?._id
                if (!currentId) throw new Error("Failed to create event draft")
                setEventId(currentId)
            }

            await hostEventService.updateBasicInfo(currentId, {
                title: formData.title,
                description: formData.description,
                event_type: formData.event_type,
                event_mode: formData.event_mode,
                start_date: formData.date,
                end_date: formData.end_date,
                start_time: formData.time,
                end_time: formData.end_time,
                event_url: formData.event_url,
                online_instructions: formData.online_instructions
            })

            if (formData.event_mode !== 'online') {
                await hostEventService.updateLocation(currentId, {
                    country: formData.country,
                    state: formData.state,
                    city: formData.city,
                    zip_code: formData.zip_code,
                    street_address: formData.location,
                    landmark: formData.landmark
                })
                await hostEventService.updateVenue(currentId, {
                    venue_name: formData.venue_name,
                    venue_description: formData.venue_description,
                    parking_info: formData.parking_info,
                    accessibility_info: formData.accessibility_info,
                    what_is_included: formData.what_is_included,
                    what_is_not_included: formData.what_is_not_included
                })
            }

            return currentId
        } catch (err) {
            setError(err.message)
            throw err
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleNextStep = async () => {
        if (!formData.title || !formData.date || !formData.time) {
            setError("Title, Date and Time are required")
            return
        }

        try {
            await createOrUpdateEvent()
            setStep(2)
        } catch (err) {
            // Error handled in createOrUpdateEvent
        }
    }

    const handleSubmit = async (e) => {
        if (e) e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        try {
            const currentId = eventId || await createOrUpdateEvent()

            if (formData.bannerImage || formData.galleryImages.length > 0) {
                await hostEventService.uploadMedia(
                    currentId,
                    formData.bannerImage,
                    formData.galleryImages,
                    (progress) => setUploadProgress(progress)
                )
            }

            await hostEventService.updatePricing(currentId, formData.price)
            await hostEventService.submitEvent(currentId)
            setIsSuccess(true)
        } catch (err) {
            setError(err.message)
        } finally {
            setIsSubmitting(false)
            setUploadProgress(0)
        }
    }

    return {
        step,
        setStep,
        isSubmitting,
        isSuccess,
        eventId,
        error,
        setError,
        uploadProgress,
        previewImages,
        formData,
        handleInputChange,
        handleFileChange,
        handleBannerImageChange,
        handleGalleryImagesChange,
        removeGalleryImage,
        handleNextStep,
        handleSubmit
    }
}
