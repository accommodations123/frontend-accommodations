import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { hostService } from "@/services/hostService";

export function useHostVerification() {
    const navigate = useNavigate();
    const [isHost, setIsHost] = useState(false);
    const [hostProfile, setHostProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    // Check host status
    const checkHostStatus = useCallback(async () => {
        const user = localStorage.getItem("user");
        if (!user) {
            setIsHost(false);
            setHostProfile(null);
            setIsLoading(false);
            return;
        }

        try {
            const profile = await hostService.getHostProfile();

            // Additional check: ensure profile has an ID
            if (profile && (profile.id || profile._id)) {
                setIsHost(true);
                setHostProfile(profile);
            } else {
                setIsHost(false);
                setHostProfile(null);
            }
        } catch (error) {
            console.warn("Host check failed (user likely not a host):", error);
            setIsHost(false);
            setHostProfile(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        checkHostStatus();
        window.addEventListener("auth-change", checkHostStatus);
        return () => window.removeEventListener("auth-change", checkHostStatus);
    }, [checkHostStatus]);

    const verifyAndNavigate = (targetFlow) => {
        const user = localStorage.getItem("user");
        if (!user) {
            navigate("/signin");
            return;
        }

        if (isHost) {
            // Authorized - Navigate to target
            // SPECIAL CHECK: For events, require admin approval
            if (targetFlow === 'host-event') {
                // Assuming the backend sends something like 'is_approved' or 'status'
                // Based on user request "events without approved the adimin they cant"
                // Checking for common approval flags. If strict logic is needed, we need to know the exact field.
                // For now, let's assume 'status' === 'approved' or 'is_verified' === true
                const isApproved = hostProfile?.status === 'approved' || hostProfile?.is_approved === true || hostProfile?.isVerified === true;

                if (!isApproved) {
                    // Alert user if not approved
                    alert("You host account is pending admin approval. You cannot host events yet.");
                    return;
                }
                navigate("/events/host");
                return;
            }

            switch (targetFlow) {
                case "share-space":
                    navigate("/host/create");
                    break;
                case "create-group":
                    navigate("/groups");
                    break;
                default:
                    break;
            }
        } else {
            // Not a host - Show popup
            let message = "You need to create a host account to proceed.";
            switch (targetFlow) {
                case "share-space":
                    message = "You need to create a host account to share your space.";
                    break;
                case "host-event":
                    message = "You need a host account to host an event.";
                    break;
                case "create-group":
                    message = "Create a host account to start a group.";
                    break;
            }
            setPopupMessage(message);
            setShowPopup(true);
        }
    };

    const handleContinue = () => {
        setShowPopup(false);
        navigate("/hosts");
    };

    const handleCheckAlreadyHost = async () => {
        // Re-check status on demand
        setIsLoading(true);
        const user = localStorage.getItem("user");
        if (!user) {
            alert("Please sign in first.");
            setIsLoading(false);
            return;
        }

        try {
            const profile = await hostService.getHostProfile();
            if (profile && (profile.id || profile._id)) {
                // Found host account!
                setIsHost(true);
                setHostProfile(profile);
                setShowPopup(false);
                alert("Host account verified! Please try your action again.");
            } else {
                // Still not found
                alert("We could not find a host account for you. Please submit the host fields.");
            }
        } catch (error) {
            alert("We could not find a host account for you. Please submit the host fields.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return {
        isHost,
        isLoading,
        showPopup,
        popupMessage,
        verifyAndNavigate,
        handleContinue,
        handleCheckAlreadyHost,
        handleClosePopup,
        checkHostStatus
    };
}
