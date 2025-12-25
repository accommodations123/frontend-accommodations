import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCountry } from '@/context/CountryContext';
import { hostService } from '@/services/hostService';
import { getTermsFor } from '@/lib/host-terms-data';

export const STEPS = [
    { title: "Choose Contribution", description: "Select how you want to contribute" },
    { title: "Identity", description: "Verify who you are" },
    { title: "Basics", description: "Title, type & capacity" },
    { title: "Location", description: "Address & Country" },
    { title: "Details", description: "Preferences & description" },
    { title: "Media", description: "Photos & proofs" },
    { title: "Amenities", description: "Features & rules" },
    { title: "Review", description: "Final check" }
];

// Different form structures for different contribution types
const getFormDataStructure = (type = 'property') => {
    const baseStructure = {
        // Step 1: Identity
        fullName: "",
        email: "",
        phone: "",
        hostAddress: "",
        hostCity: "",
        hostCountry: "India",
        idType: "Aadhaar",
        profilePhoto: null,
        idProof: null,
        idNumber: "",

        // Step 2: Basics
        title: "",
        category: "student",
        type: "",
        privacyType: "entire place",
        petsAllowed: "",
        sqft: "",
        capacity: "",
        bedrooms: "",
        bathrooms: "",
        description: "",

        // Step 3: Location
        address: "",
        city: "",
        pincode: "",
        country: "",

        // Step 5: Media & Proofs
        images: [],
        video: null,
        propertyProof: null,

        // Step 6: Amenities & Rules
        amenities: [],
        customAmenities: [],
        rules: []
    };

    switch (type) {
        case 'property':
            return {
                ...baseStructure,
                // Pricing details for properties
                currency: "INR",
                pricePerHour: "",
                priceNight: "",
                priceMonth: "",
                hostPreference: "cultural_exchange", // 'cultural_exchange', 'community_stay', 'long_term'
                maxGuests: "",
                sharedSpaces: []
            };
        
        case 'event':
            return {
                ...baseStructure,
                // Event-specific fields
                eventType: "cultural", // 'cultural', 'festival', 'workshop', 'networking'
                startDate: "",
                endDate: "",
                startTime: "",
                endTime: "",
                maxAttendees: "",
                eventCategory: "community", // 'community', 'cultural', 'educational'
                eventPrice: "free", // 'free', 'donation', 'fixed_price'
                priceAmount: "",
                requirements: []
            };
        
        case 'group':
            return {
                ...baseStructure,
                // Group-specific fields
                groupType: "community", // 'community', 'professional', 'cultural', 'hobby'
                groupSize: "",
                meetingFrequency: "", // 'weekly', 'biweekly', 'monthly'
                membershipType: "open", // 'open', 'closed', 'invite_only'
                groupRules: [],
                topics: []
            };
        
        case 'local_guide':
            return {
                ...baseStructure,
                // Local guide fields
                languages: ["English", "Hindi"],
                areas: [],
                experience: "",
                guideType: "city", // 'city', 'cultural', 'food', 'historical'
                availability: "",
                preferredGroupSize: ""
            };
        
        case 'travel_companion':
            return {
                ...baseStructure,
                // Travel companion fields
                destinationCountry: "",
                destinationCity: "",
                travelDates: "",
                budgetPreference: "shared", // 'shared', 'separate'
                travelStyle: "cultural", // 'cultural', 'adventure', 'relaxation'
                languages: ["English", "Hindi"],
                maxCompanions: ""
            };
        
        case 'workshop':
            return {
                ...baseStructure,
                // Workshop fields
                workshopType: "cultural", // 'cultural', 'skill', 'art', 'cooking'
                duration: "",
                skillLevel: "beginner", // 'beginner', 'intermediate', 'advanced'
                materialsProvided: false,
                maxParticipants: "",
                prerequisites: []
            };
        
        default:
            return baseStructure;
    }
};

export function useHostCreation() {
    const navigate = useNavigate();
    const { activeCountry } = useCountry();

    // Auth State
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);

    const [currentStep, setCurrentStep] = useState(1);
    const [direction, setDirection] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [contributionType, setContributionType] = useState('');

    // Form State - Initialize with property type as default
    const [formData, setFormData] = useState(() => getFormDataStructure('property'));

    const [customAmenityInput, setCustomAmenityInput] = useState("");
    const [customRuleInput, setCustomRuleInput] = useState("");

    // Terms State
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [displayedTerms, setDisplayedTerms] = useState([]);

    // Update form structure when contribution type changes
    useEffect(() => {
        if (contributionType) {
            setFormData(getFormDataStructure(contributionType));
        }
    }, [contributionType]);

    // Update Country in Form
    useEffect(() => {
        if (activeCountry) {
            setFormData(prev => ({
                ...prev,
                country: activeCountry,
                hostCountry: activeCountry.name
            }));
        }
    }, [activeCountry]);

    // Update Terms
    useEffect(() => {
        const terms = getTermsFor(formData.country?.code || "DEFAULT", formData.category);
        setDisplayedTerms(terms);
        setTermsAccepted(false);
    }, [formData.country, formData.category, contributionType]);

    // AUTO-LOGIN CHECK
    useEffect(() => {
        const checkSession = async () => {
            const token = localStorage.getItem("token");
            const userStr = localStorage.getItem("user");

            if (token && userStr) {
                try {
                    const user = JSON.parse(userStr);
                    setIsEmailVerified(true);

                    setFormData(prev => ({
                        ...prev,
                        email: user.email || prev.email,
                        phone: user.phone || prev.phone,
                        fullName: user.full_name || user.name || prev.fullName
                    }));

                    try {
                        const hostProfile = await hostService.getHostProfile();
                        if (hostProfile && (hostProfile.id || hostProfile._id)) {
                            setFormData(prev => ({
                                ...prev,
                                hostAddress: hostProfile.address,
                                hostCity: hostProfile.city,
                                hostCountry: hostProfile.country,
                                idType: hostProfile.id_type,
                                idNumber: hostProfile.id_number,
                            }));
                            if (contributionType) {
                                setCurrentStep(2); // Skip selection if type already chosen
                            }
                        }
                    } catch (hostErr) {
                        console.warn("User is logged in but not a host yet:", hostErr.message);
                    }
                } catch (err) {
                    console.error("Failed to parse stored user:", err);
                }
            }
        };
        checkSession();
    }, [contributionType]);

    // Handlers
    const handleSendOtp = async (e) => {
        if (e) e.preventDefault();
        if (!formData.email) {
            alert("Please enter a valid email address.");
            return;
        }
        try {
            await hostService.sendOtp({ email: formData.email, phone: formData.phone || "0000000000" });
            setShowOtpModal(true);
            alert("OTP sent to your email!");
        } catch (error) {
            console.error("Failed to send OTP:", error);
            alert("Failed to send OTP. Please try again.");
        }
    };

    const handleVerifyOtp = async (otpCode) => {
        try {
            const response = await hostService.verifyOtp({ email: formData.email, phone: formData.phone || "0000000000", otp: otpCode });
            const { token } = response;

            if (token) {
                localStorage.setItem("token", token);
                if (response.user || response.data?.user) {
                    const userData = response.user || response.data?.user;
                    const safeUser = { ...userData, id: userData.id || userData._id };
                    localStorage.setItem("user", JSON.stringify(safeUser));
                }
                alert("Verification Successful! You are logged in.");
                setIsEmailVerified(true);
                setShowOtpModal(false);
            } else {
                if (response.message === "Email verified successfully" || response.success) {
                    alert("Email verified.");
                    setIsEmailVerified(true);
                    setShowOtpModal(false);
                } else {
                    alert(`Verification failed: ${response.message}`);
                }
            }
        } catch (error) {
            console.error("Failed to verify OTP:", error);
            alert("Invalid OTP. Please try again.");
        }
    };

    const handleFileChange = (e, field, multiple = false) => {
        const files = Array.from(e.target.files);
        if (multiple) {
            const newImages = files.map(file => ({
                file,
                url: URL.createObjectURL(file)
            }));
            setFormData(prev => ({ ...prev, [field]: [...prev[field], ...newImages] }));
        } else {
            setFormData(prev => ({ ...prev, [field]: files[0] }));
        }
    };

    const removeArrayItem = (field, index) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    const toggleAmenity = (amenity) => {
        setFormData(prev => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity]
        }));
    };

    const addCustomAmenity = () => {
        if (!customAmenityInput.trim()) return;
        setFormData(prev => ({
            ...prev,
            customAmenities: [...prev.customAmenities, customAmenityInput.trim()]
        }));
        setCustomAmenityInput("");
    };

    const addRule = () => {
        if (!customRuleInput.trim()) return;
        setFormData(prev => ({
            ...prev,
            rules: [...prev.rules, customRuleInput.trim()]
        }));
        setCustomRuleInput("");
    };

    // Updated validation for different contribution types
    const validateStep = (step) => {
        switch (step) {
            case 1: // Selection step
                return !!contributionType;
            
            case 2: // Identity
                if (!isEmailVerified) return false;
                return formData.fullName && formData.email && formData.phone && 
                       formData.hostAddress && formData.hostCity && formData.hostCountry && 
                       formData.idType && formData.idProof && formData.idNumber;
            
            case 3: // Basics
                const basicChecks = formData.title && formData.category && formData.description;
                
                // Type-specific checks
                switch (contributionType) {
                    case 'property':
                        return basicChecks && formData.type && formData.sqft && formData.capacity;
                    case 'event':
                        return basicChecks && formData.eventType && formData.startDate && 
                               formData.endDate && formData.maxAttendees;
                    case 'group':
                        return basicChecks && formData.groupType && formData.groupSize;
                    case 'local_guide':
                        return basicChecks && formData.guideType && formData.languages.length > 0;
                    case 'travel_companion':
                        return basicChecks && formData.destinationCity && formData.travelDates;
                    case 'workshop':
                        return basicChecks && formData.workshopType && formData.duration;
                    default:
                        return basicChecks;
                }
            
            case 4: // Location
                return formData.address && formData.city && formData.pincode;
            
            case 5: // Details (type-specific)
                switch (contributionType) {
                    case 'property':
                        return formData.hostPreference; // At least host preference is set
                    case 'event':
                        return formData.eventPrice; // Price type is set
                    case 'group':
                        return formData.meetingFrequency;
                    default:
                        return true;
                }
            
            case 6: // Media
                switch (contributionType) {
                    case 'property':
                        return formData.images.length >= 1 && formData.propertyProof && 
                               formData.profilePhoto && formData.idProof;
                    default:
                        return formData.profilePhoto && formData.idProof;
                }
            
            case 7: // Amenities
                return (formData.amenities.length + formData.customAmenities.length) > 0;
            
            case 8: // Review
                return true;
            
            default:
                return false;
        }
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setDirection(1);
            setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
        } else {
            alert("Please fill in all required fields for this step.");
        }
    };

    const prevStep = () => {
        setDirection(-1);
        setCurrentStep(prev => {
            if (prev === 2 && !contributionType) {
                return 1; // Go back to selection
            }
            return Math.max(prev - 1, 1);
        });
    };

    // Type-specific submission handlers
    const handleSubmitProperty = async (propertyId) => {
        // Your existing property submission logic
        await hostService.updatePropertyPricing(propertyId, {
            pricePerHour: Number(formData.pricePerHour) || 0,
            pricePerNight: Number(formData.priceNight) || 0,
            pricePerMonth: Number(formData.priceMonth) || 0,
            currency: formData.currency || 'INR'
        });

        const combinedAmenities = [...formData.amenities, ...formData.customAmenities];
        if (combinedAmenities.length > 0) {
            await hostService.updatePropertyAmenities(propertyId, combinedAmenities);
        }

        if (formData.rules.length > 0) {
            await hostService.updatePropertyRules(propertyId, formData.rules);
        }

        if (formData.images.length > 0) {
            const photoFd = new FormData();
            formData.images.forEach(img => {
                if (img.file) photoFd.append('photo', img.file);
            });
            await hostService.updatePropertyMedia(propertyId, photoFd);
        }

        if (formData.video) {
            const videoFd = new FormData();
            videoFd.append('video', formData.video);
            await hostService.updatePropertyVideo(propertyId, videoFd);
        }

        if (formData.propertyProof) {
            const docFd = new FormData();
            docFd.append('legalDocs', formData.propertyProof);
            await hostService.updatePropertyLegal(propertyId, docFd);
        }
    };

    const handleSubmitEvent = async () => {
        // Event submission logic
        const eventPayload = {
            title: formData.title,
            description: formData.description,
            eventType: formData.eventType,
            category: formData.eventCategory,
            startDate: formData.startDate,
            endDate: formData.endDate,
            startTime: formData.startTime,
            endTime: formData.endTime,
            location: `${formData.address}, ${formData.city}`,
            maxAttendees: formData.maxAttendees,
            priceType: formData.eventPrice,
            priceAmount: formData.priceAmount || 0,
            requirements: formData.requirements,
            images: formData.images.map(img => img.url),
            hostId: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null
        };

        await hostService.createEvent(eventPayload);
    };

    const handleSubmitGroup = async () => {
        // Group submission logic
        const groupPayload = {
            name: formData.title,
            description: formData.description,
            type: formData.groupType,
            category: formData.category,
            location: `${formData.city}, ${formData.country?.name || 'Unknown'}`,
            size: formData.groupSize,
            meetingFrequency: formData.meetingFrequency,
            membershipType: formData.membershipType,
            rules: formData.groupRules,
            topics: formData.topics,
            adminId: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null
        };

        await hostService.createGroup(groupPayload);
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        if (!termsAccepted) {
            alert("Please accept the terms to continue.");
            return;
        }

        setIsLoading(true);

        try {
            const userStr = localStorage.getItem("user");
            if (!userStr) throw new Error("User not authenticated. Please verify email again.");

            let userId;
            try {
                const user = JSON.parse(userStr);
                userId = user.id || user._id;
            } catch (err) {
                console.error("User parse error:", err);
                throw new Error("Invalid user session. Please log in again.");
            }

            if (!userId) throw new Error("User ID missing. Authentication failed.");
            userId = String(userId);

            let idPhotoUrl = "";
            let selfiePhotoUrl = "";

            if (formData.idProof) {
                const fd = new FormData();
                fd.append('images', formData.idProof);
                const res = await hostService.uploadFile(fd);
                if (res.urls && res.urls.length > 0) idPhotoUrl = res.urls[0];
            }
            if (formData.profilePhoto) {
                const fd = new FormData();
                fd.append('images', formData.profilePhoto);
                const res = await hostService.uploadFile(fd);
                if (res.urls && res.urls.length > 0) selfiePhotoUrl = res.urls[0];
            }

            const hostPayload = {
                user_id: Number(userId) || userId,
                full_name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                country: formData.hostCountry,
                city: formData.hostCity,
                address: formData.hostAddress,
                id_type: formData.idType,
                id_number: formData.idNumber,
                id_photo: idPhotoUrl,
                selfie_photo: selfiePhotoUrl,
                userId: userId,
                fullName: formData.fullName,
                idType: formData.idType,
                idNumber: formData.idNumber,
                idPhoto: idPhotoUrl,
                selfiePhoto: selfiePhotoUrl,
                contribution_type: contributionType // Add contribution type to host profile
            };

            try {
                await hostService.saveHost(hostPayload);
            } catch (err) {
                console.warn("Host creation warning (might already exist):", err);
            }

            // Handle different contribution types
            switch (contributionType) {
                case 'property':
                    const draftPayload = {
                        categoryId: formData.category,
                        propertyType: (formData.type || '').toLowerCase(),
                        privacyType: formData.privacyType
                    };
                    const draftRes = await hostService.createPropertyDraft(draftPayload);
                    const propertyId = draftRes.propertyId || (draftRes.data && draftRes.data.id);
                    if (!propertyId) throw new Error("Failed to create property draft ID.");

                    await hostService.updatePropertyBasic(propertyId, {
                        guests: Number(formData.capacity) || 0,
                        bedrooms: Number(formData.bedrooms) || 0,
                        bathrooms: Number(formData.bathrooms) || 0,
                        petsAllowed: Number(formData.petsAllowed) || 0,
                        area: Number(formData.sqft) || 0
                    });

                    await hostService.updatePropertyAddress(propertyId, {
                        country: formData.country?.name || 'India',
                        city: formData.city,
                        address: formData.address
                    });

                    await handleSubmitProperty(propertyId);
                    await hostService.submitProperty(propertyId);
                    break;

                case 'event':
                    await handleSubmitEvent();
                    break;

                case 'group':
                    await handleSubmitGroup();
                    break;

                case 'local_guide':
                case 'travel_companion':
                case 'workshop':
                    // For other types, save as community contribution
                    const contributionPayload = {
                        type: contributionType,
                        title: formData.title,
                        description: formData.description,
                        location: `${formData.city}, ${formData.country?.name || 'Unknown'}`,
                        userId: userId,
                        details: formData // Store all form data as details
                    };
                    await hostService.createCommunityContribution(contributionPayload);
                    break;

                default:
                    throw new Error("Invalid contribution type");
            }

            alert(`${getContributionTypeLabel(contributionType)} Submitted Successfully!`);
            navigate("/");

        } catch (error) {
            console.error("❌ Submission Workflow Error:", error);
            const msg = error.message || "Unknown error occurred.";
            alert(`Submission Failed: ${msg}`);
        } finally {
            setIsLoading(false);
        }
    };

    const getContributionTypeLabel = (type) => {
        const labels = {
            property: 'Space Sharing',
            event: 'Event',
            group: 'Community Group',
            local_guide: 'Local Guide Profile',
            travel_companion: 'Travel Companion Offer',
            workshop: 'Workshop'
        };
        return labels[type] || 'Contribution';
    };

    return {
        // State
        activeCountry,
        showOtpModal,
        setShowOtpModal,
        isEmailVerified,
        currentStep,
        direction,
        isLoading,
        formData,
        setFormData,
        customAmenityInput,
        setCustomAmenityInput,
        customRuleInput,
        setCustomRuleInput,
        termsAccepted,
        setTermsAccepted,
        displayedTerms,
        contributionType,
        setContributionType,

        // Actions
        handleSendOtp,
        handleVerifyOtp,
        handleFileChange,
        removeArrayItem,
        toggleAmenity,
        addCustomAmenity,
        addRule,
        nextStep,
        prevStep,
        handleSubmit
    };
}