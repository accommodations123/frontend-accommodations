const API_URL = "http://3.147.226.49:5000"; // Updated based on user logs

const getHeaders = (isMultipart = false) => {
    const token = localStorage.getItem("token");
    const headers = {};
    if (token) {
        headers["Authorization"] = `Bearer ${token}`; // Authorization with Bearer
    }
    if (!isMultipart) {
        headers["Content-Type"] = "application/json";
    }
    return headers;
};

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }
    return await response.json();
};

export const hostService = {
    // === AUTH & OTP ===
    sendOtp: async (data) => {
        const res = await fetch(`${API_URL}/otp/send-otp`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(res);
    },

    verifyOtp: async (data) => {
        const res = await fetch(`${API_URL}/otp/verify-otp`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(res);
    },

    // Step 2: Host Details
    saveHost: async (data) => {
        const res = await fetch(`${API_URL}/host/save`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(res);
    },

    // Get Host Profile (New Method)
    getHostProfile: async () => {
        const res = await fetch(`${API_URL}/host/get`, {
            method: "GET",
            headers: getHeaders()
        });
        return handleResponse(res);
    },

    // === PROPERTY FLOW ===

    // Upload files (Images/Docs)
    uploadFile: async (formData) => {
        const res = await fetch(`${API_URL}/property/upload`, {
            method: "POST",
            headers: getHeaders(true), // true for multipart/form-data
            body: formData,
        });
        return handleResponse(res);
    },

    createPropertyDraft: async (data) => {
        const res = await fetch(`${API_URL}/property/create-draft`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(res);
    },

    updatePropertyBasic: async (id, data) => {
        const res = await fetch(`${API_URL}/property/basic-info/${id}`, {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(res);
    },

    updatePropertyAddress: async (id, data) => {
        const res = await fetch(`${API_URL}/property/address/${id}`, {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(res);
    },

    updatePropertyPricing: async (id, data) => {
        const res = await fetch(`${API_URL}/property/pricing/${id}`, {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(res);
    },

    updatePropertyAmenities: async (id, amenities) => {
        const res = await fetch(`${API_URL}/property/amenities/${id}`, {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify({ amenities }),
        });
        return handleResponse(res);
    },

    updatePropertyRules: async (id, rules) => {
        const res = await fetch(`${API_URL}/property/rules/${id}`, {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify({ rules }),
        });
        return handleResponse(res);
    },

    updatePropertyMedia: async (id, formData) => {
        const res = await fetch(`${API_URL}/property/media/${id}`, {
            method: "PUT",
            headers: getHeaders(true),
            body: formData,
        });
        return handleResponse(res);
    },

    updatePropertyVideo: async (id, formData) => {
        const res = await fetch(`${API_URL}/property/media/video/${id}`, {
            method: "PUT",
            headers: getHeaders(true),
            body: formData,
        });
        return handleResponse(res);
    },

    updatePropertyLegal: async (id, formData) => {
        const res = await fetch(`${API_URL}/property/legal/${id}`, {
            method: "PUT",
            headers: getHeaders(true),
            body: formData,
        });
        return handleResponse(res);
    },

    // Get Single Property Details (Public)
    getPropertyDetails: async (id) => {
        const res = await fetch(`${API_URL}/property/${id}`, {
            method: "GET",
            headers: getHeaders()
        });
        return handleResponse(res);
    },

    submitProperty: async (id) => {
        const res = await fetch(`${API_URL}/property/submit/${id}`, {
            method: "PUT",
            headers: getHeaders(),
        });
        return handleResponse(res);
    }
};
