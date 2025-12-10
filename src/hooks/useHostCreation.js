import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCountry } from '@/context/CountryContext';
import { hostService } from '@/services/hostService';
import { getTermsFor } from '@/lib/host-terms-data';

export const STEPS = [
    { title: "Identity", description: "Verify who you are" },
    { title: "Basics", description: "Title, type & capacity" },
    { title: "Location", description: "Address & Country" },
    { title: "Details", description: "Pricing & description" },
    { title: "Media", description: "Photos & proofs" },
    { title: "Amenities", description: "Features & rules" },
    { title: "Review", description: "Final check" }
];

export function useHostCreation() {
    const navigate = useNavigate();
    const { activeCountry } = useCountry();

    // Auth State
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);

    const [currentStep, setCurrentStep] = useState(1);
    const [direction, setDirection] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        // Step 1: Identity
        fullName: "",
        email: "",
        phone: "",
        hostAddress: "",
        hostCity: "",
        hostCountry: activeCountry?.name || "India",
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
        country: activeCountry,

        // Step 4: Pricing
        currency: "INR",
        pricePerHour: "",
        priceNight: "",
        priceMonth: "",

        // Step 5: Media & Proofs
        images: [],
        video: null,
        propertyProof: null,

        // Step 6: Amenities & Rules
        amenities: [],
        customAmenities: [],
        rules: []
    });

    const [customAmenityInput, setCustomAmenityInput] = useState("");
    const [customRuleInput, setCustomRuleInput] = useState("");

    // Terms State
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [displayedTerms, setDisplayedTerms] = useState([]);

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
    }, [formData.country, formData.category]);

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
                            setCurrentStep(2);
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
    }, []);

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

    const validateStep = (step) => {
        switch (step) {
            case 1:
                if (!isEmailVerified) return false;
                return formData.fullName && formData.email && formData.phone && formData.hostAddress && formData.hostCity && formData.hostCountry && formData.idType && formData.idProof && formData.idNumber;
            case 2:
                // Note: removed privacyType check if it wasn't there, but it was in initial state "entire place"
                return formData.title && formData.type && formData.sqft && formData.capacity;
            case 3:
                return formData.address && formData.city && formData.pincode;
            case 4:
                return formData.priceMonth || formData.priceNight;
            case 5:
                return formData.images.length >= 1 && formData.propertyProof && formData.profilePhoto && formData.idProof;
            case 6:
                return (formData.amenities.length + formData.customAmenities.length) > 0;
            case 7:
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
        setCurrentStep(prev => Math.max(prev - 1, 1));
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
                selfiePhoto: selfiePhotoUrl
            };

            try {
                await hostService.saveHost(hostPayload);
            } catch (err) {
                console.warn("Host creation warning (might already exist):", err);
            }

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

            await hostService.submitProperty(propertyId);

            alert("Listing Submitted Successfully!");
            navigate("/");

        } catch (error) {
            console.error("❌ Submission Workflow Error:", error);
            const msg = error.message || "Unknown error occurred.";
            alert(`Submission Failed: ${msg}`);
        } finally {
            setIsLoading(false);
        }
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
