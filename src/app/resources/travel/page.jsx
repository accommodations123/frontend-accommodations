import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Calendar,
  Plane,
  Phone,
  Mail,
  MessageCircle,
  Globe,
  Clock,
  X,
  User,
  Search,
  Filter,
  Star,
  Shield,
  ChevronRight,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

/* ===================== INITIAL DATA ===================== */
const INITIAL_PLANS = [
  {
    id: 1,
    user: {
      fullName: "Rahul Sharma",
      age: 28,
      gender: "Male",
      country: "India",
      state: "Delhi",
      city: "New Delhi",
      languages: ["Hindi", "English"],
      phone: "+919876543210",
      email: "rahul.sharma@gmail.com",
      whatsapp: "+919876543210",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    },
    destination: "Paris, France",
    date: "2025-02-20",
    time: "01:30 AM",
    flight: {
      airline: "Air France",
      flightName: "AF 226",
      flightNumber: "AF226",
      from: "Delhi (DEL)",
      to: "Paris (CDG)",
    },
  },
];

/* ===================== POST TRIP MODAL ===================== */
function PostTripModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    fullName: "",
    age: "",
    gender: "",
    country: "",
    state: "",
    city: "",
    languages: "",
    airline: "",
    flightName: "",
    flightNumber: "",
    origin: "",
    destination: "",
    departureDate: "",
    departureTime: "",
    arrivalDate: "",
    arrivalTime: "",
    stops: [], // Array of {location: "", arrivalTime: "", departureTime: ""}
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addStop = () => {
    setForm({
      ...form,
      stops: [...form.stops, { location: "", arrivalTime: "", departureTime: "" }]
    });
  };

  const updateStop = (index, field, value) => {
    const updatedStops = [...form.stops];
    updatedStops[index][field] = value;
    setForm({ ...form, stops: updatedStops });
  };

  const removeStop = (index) => {
    setForm({
      ...form,
      stops: form.stops.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = () => {
    // Basic validation
    if (!form.fullName || !form.age || !form.gender || !form.country || !form.state || !form.city || !form.languages || !form.airline || !form.origin || !form.destination || !form.departureDate || !form.departureTime) {
      alert("Please fill all required fields");
      return;
    }

    // Validate stops
    for (let i = 0; i < form.stops.length; i++) {
      if (!form.stops[i].location || !form.stops[i].arrivalTime || !form.stops[i].departureTime) {
        alert(`Please fill all details for stop ${i + 1}`);
        return;
      }
    }

    onAdd({
      id: Date.now(),
      user: {
        fullName: form.fullName,
        age: Number(form.age),
        gender: form.gender,
        country: form.country,
        state: form.state,
        city: form.city,
        languages: form.languages.split(",").map((l) => l.trim()),
        phone: "",
        email: "",
        whatsapp: "",
        image:
          "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=200&q=80",
      },
      destination: `${form.destination}`,
      date: form.departureDate,
      time: form.departureTime,
      flight: {
        airline: form.airline,
        flightName: form.flightName,
        flightNumber: form.flightNumber,
        from: form.origin,
        to: form.destination,
        stops: form.stops,
        departureDate: form.departureDate,
        departureTime: form.departureTime,
        arrivalDate: form.arrivalDate,
        arrivalTime: form.arrivalTime,
      },
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden"
        >
          <div className="bg-linear-to-r from-[#07182A] to-[#0a2540] p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Plane size={18} /> Post Travel Plan
              </h2>
              <motion.button
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
                className="text-white"
                onClick={onClose}
              >
                <X className="cursor-pointer" />
              </motion.button>
            </div>
          </div>

          {/* BODY */}
          <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            {/* Person Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-5"
            >
              <h3 className="text-lg font-semibold text-[#07182A] border-b pb-2 flex items-center gap-2">
                <User size={18} /> Person Details
              </h3>

              <div className="grid grid-cols-1 text-gray-950 sm:grid-cols-2 gap-5">
                <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }}>
                  <input
                    name="fullName"
                    placeholder="Full Name"
                    className="form-input"
                    onChange={handleChange}
                    value={form.fullName}
                  />
                </motion.div>

                <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }}>
                  <input
                    name="age"
                    type="number"
                    placeholder="Age"
                    className="form-input"
                    onChange={handleChange}
                    value={form.age}
                  />
                </motion.div>

                {/* GENDER FIELD */}
                <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }}>
                  <select
                    name="gender"
                    className="form-input"
                    onChange={handleChange}
                    value={form.gender}
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </motion.div>

                <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }}>
                  <input
                    name="country"
                    placeholder="Country"
                    className="form-input"
                    onChange={handleChange}
                    value={form.country}
                  />
                </motion.div>

                <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }}>
                  <input
                    name="state"
                    placeholder="State"
                    className="form-input"
                    onChange={handleChange}
                    value={form.state}
                  />
                </motion.div>

                <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }}>
                  <input
                    name="city"
                    placeholder="City"
                    className="form-input"
                    onChange={handleChange}
                    value={form.city}
                  />
                </motion.div>

                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="sm:col-span-2"
                >
                  <input
                    name="languages"
                    placeholder="Languages (English, Hindi)"
                    className="form-input"
                    onChange={handleChange}
                    value={form.languages}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Trip Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-5"
            >
              <h3 className="text-lg font-semibold text-[#07182A] border-b pb-2 flex items-center gap-2">
                <Plane size={18} /> Trip Details
              </h3>

              <div className="grid grid-cols-1 text-gray-950 sm:grid-cols-2 gap-5">
                <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }}>
                  <input
                    name="airline"
                    placeholder="Airline Name"
                    className="form-input"
                    onChange={handleChange}
                    value={form.airline}
                  />
                </motion.div>
                <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }}>
                  <input
                    name="flightName"
                    placeholder="Flight Name"
                    className="form-input"
                    onChange={handleChange}
                    value={form.flightName}
                  />
                </motion.div>
                <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }}>
                  <input
                    name="flightNumber"
                    placeholder="Flight Number"
                    className="form-input"
                    onChange={handleChange}
                    value={form.flightNumber}
                  />
                </motion.div>
              </div>

              {/* Origin and Destination */}
              <div className="space-y-4">
                <h4 className="text-md font-medium text-primary flex items-center gap-2">
                  <MapPin size={16} className="text-accent" /> Route
                </h4>
                <div className="grid grid-cols-1  text-[#07182A] sm:grid-cols-2 gap-4">
                  <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }}>
                    <label className="block text-sm font-medium text-primary mb-1 flex items-center gap-1">
                      <span className="w-2 h-2 bg-accent rounded-full"></span>
                      From (Origin)
                    </label>
                    <input
                      name="origin"
                      placeholder="e.g., New Delhi (DEL)"
                      className="form-input border-accent focus:border-accent focus:ring-accent"
                      onChange={handleChange}
                      value={form.origin}
                    />
                  </motion.div>
                  <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }}>
                    <label className="block text-sm font-medium text-primary mb-1 flex items-center gap-1">
                      <span className="w-2 h-2 text-[#07182A] bg-accent rounded-full"></span>
                      To (Destination)
                    </label>
                    <input
                      name="destination"
                      placeholder="e.g., Paris (CDG)"
                      className="form-input border-accent focus:border-accent focus:ring-accent"
                      onChange={handleChange}
                      value={form.destination}
                    />
                  </motion.div>
                </div>
              </div>

              {/* Departure Details */}
              <div className="space-y-4">
                <h4 className="text-md font-medium text-primary flex items-center gap-2">
                  <Clock size={16} className="text-accent" /> Departure
                </h4>
                <div className="grid grid-cols-1 text-[#07182A] sm:grid-cols-2 gap-4">
                  <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }}>
                    <label className="block text-sm font-medium text-primary mb-1 flex items-center gap-1">
                      <span className="w-2 h-2 bg-accent  rounded-full"></span>
                      Departure Date
                    </label>
                    <input
                      name="departureDate"
                      type="date"
                      className="form-input"
                      onChange={handleChange}
                      value={form.departureDate}
                    />
                  </motion.div>
                  <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }}>
                    <label className="block text-sm font-medium text-primary mb-1 flex items-center gap-1">
                      <span className="w-2 h-2 bg-accent rounded-full"></span>
                      Departure Time
                    </label>
                    <input
                      name="departureTime"
                      type="time"
                      className="form-input"
                      onChange={handleChange}
                      value={form.departureTime}
                    />
                  </motion.div>
                </div>
              </div>

              {/* Arrival Details */}
              <div className="space-y-4">
                <h4 className="text-md font-medium text-primary flex items-center gap-2">
                  <Clock size={16} className="text-accent" /> Arrival
                </h4>
                <div className="grid grid-cols-1 text-[#07182A] sm:grid-cols-2 gap-4">
                  <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }}>
                    <label className="block text-sm font-medium text-primary mb-1 flex items-center gap-1">
                      <span className="w-2 h-2 bg-accent rounded-full"></span>
                      Arrival Date
                    </label>
                    <input
                      name="arrivalDate"
                      type="date"
                      className="form-input"
                      onChange={handleChange}
                      value={form.arrivalDate}
                    />
                  </motion.div>
                  <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }}>
                    <label className="block text-sm font-medium text-primary mb-1 flex items-center gap-1">
                      <span className="w-2 h-2 bg-accent rounded-full"></span>
                      Arrival Time
                    </label>
                    <input
                      name="arrivalTime"
                      type="time"
                      className="form-input"
                      onChange={handleChange}
                      value={form.arrivalTime}
                    />
                  </motion.div>
                </div>
              </div>

              {/* Layover Stops */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-md font-medium text-primary flex items-center gap-2">
                    <MapPin size={16} className="text-accent" /> Layover Stops
                  </h4>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addStop}
                    className="bg-primary text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-accent transition-colors"
                  >
                    + Add Stop
                  </motion.button>
                </div>

                {form.stops.map((stop, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="border border-accent/20 rounded-lg p-4 bg-gray-50"
                  >
                    <div className="flex items-center  justify-between mb-3">
                      <h5 className="font-medium text-primary flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent rounded-full"></span>
                        Stop {index + 1}
                      </h5>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeStop(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                      </motion.button>
                    </div>
                    <div className="grid grid-cols-1 text-[#07182A] sm:grid-cols-3 gap-3">
                      <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }}>
                        <label className="block text-sm font-medium text-primary mb-1">Location</label>
                        <input
                          type="text"
                          placeholder="e.g., Dubai (DXB)"
                          className="form-input border-accent focus:border-accent focus:ring-accent"
                          value={stop.location}
                          onChange={(e) => updateStop(index, 'location', e.target.value)}
                        />
                      </motion.div>
                      <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }}>
                        <label className="block text-sm font-medium text-primary mb-1">Arrival Time</label>
                        <input
                          type="time"
                          className="form-input border-accent focus:border-accent focus:ring-accent"
                          value={stop.arrivalTime}
                          onChange={(e) => updateStop(index, 'arrivalTime', e.target.value)}
                        />
                      </motion.div>
                      <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }}>
                        <label className="block text-sm font-medium text-primary mb-1">Departure Time</label>
                        <input
                          type="time"
                          className="form-input border-accent focus:border-accent focus:ring-accent"
                          value={stop.departureTime}
                          onChange={(e) => updateStop(index, 'departureTime', e.target.value)}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}

                {form.stops.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <MapPin size={32} className="mx-auto mb-2 opacity-50 text-accent" />
                    <p>No layover stops added yet</p>
                    <p className="text-sm">Click "Add Stop" to include layover locations</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          <div className="flex justify-end gap-3 text-accent p-6 border-t bg-gray-50">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-6 py-2 border border-gray-800 rounded-lg font-medium"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              className="bg-linear-to-r from-[#07182A] to-[#0a2540] text-white px-6 py-2 rounded-lg font-medium shadow-lg"
            >
              Post Trip
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ===================== PAGE ===================== */
export default function TravelPage() {
  const [plans, setPlans] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedPlans = localStorage.getItem("travelPlans");
    if (storedPlans) {
      setPlans(JSON.parse(storedPlans));
    } else {
      // If no data in localStorage, use initial plans
      setPlans(INITIAL_PLANS);
      localStorage.setItem("travelPlans", JSON.stringify(INITIAL_PLANS));
    }
  }, []);

  // Save plans to localStorage whenever they change
  useEffect(() => {
    if (plans.length > 0) {
      localStorage.setItem("travelPlans", JSON.stringify(plans));
    }
  }, [plans]);

  // Filter plans based on search term
  const filteredPlans = plans.filter((plan) => {
    const matchesSearch =
      plan.user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.flight.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.flight.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (plan.flight.stops && plan.flight.stops.some(stop =>
        stop.location.toLowerCase().includes(searchTerm.toLowerCase())
      ));

    return matchesSearch;
  });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* ================= HERO SECTION ================= */}
      <section
        className="relative min-h-[80vh] flex items-center bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-black/80 to-black/40"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-[#C93A30]/20 rounded-full filter blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Find Your <span className="text-[#C93A30]">Travel Buddy</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-lg text-gray-200 mb-8"
            >
              Share flight details, connect with travelers, and explore the
              world together with confidence.
            </motion.p>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowModal(true)}
              className="bg-[#C93A30] hover:bg-[#a82f26] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-xl"
            >
              <Plane size={18} /> Post a Trip
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronRight className="rotate-90" size={24} />
        </motion.div>
      </section>

      {/* ================= SEARCH AND FILTER SECTION ================= */}
      <section className="sticky top-0 z-40 bg-white text-gray-900 shadow-md py-4 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800" size={20} />
              <input
                type="text"
                placeholder="Search by destination, name, or airports..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07182A]/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 items-center">
              <Filter size={20} className="text-gray-600" />
              <div className="flex gap-2">
                {["all", "upcoming", "past"].map((option) => (
                  <motion.button
                    key={option}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter(option)}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      filter === option
                        ? "bg-[#07182A] text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="px-4 py-10" id="travel-cards">
        <div className="container mx-auto">
          {filteredPlans.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Plane size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No travel plans found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or post a new travel plan</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowModal(true)}
                className="bg-[#C93A30] hover:bg-[#a82f26] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto"
              >
                <Plane size={18} /> Post a Trip
              </motion.button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  {/* Card Header with Image */}
                  <div className="relative h-48 bg-linear-to-br from-[#07182A] to-[#0a2540]">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white">{plan.destination}</h3>
                      <p className="text-gray-200 text-sm">{plan.flight.from} → {plan.flight.to}</p>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <Star className="text-yellow-400" size={18} />
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="p-6">
                    <div className="flex items-center text-career-primary gap-4 mb-4">
                      <img 
                        src={plan.user.image} 
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-200" 
                        alt={plan.user.fullName}
                      />
                      <div>
                        <h3 className="font-bold text-lg">{plan.user.fullName}</h3>
                        <p className="text-sm text-gray-600">
                          {plan.user.age} years, {plan.user.gender}
                        </p>
                        <p className="text-sm text-gray-600">
                          {plan.user.city}, {plan.user.state}
                        </p>
                      </div>
                    </div>

                    {/* Trip Details */}
                    <div className="space-y-3 text-gray-900 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-[#C93A30]" />
                        <span>Departure: {plan.flight.departureDate || plan.date} at {plan.flight.departureTime || plan.time}</span>
                      </div>
                      {plan.flight.arrivalDate && plan.flight.arrivalTime && (
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-[#C93A30]" />
                          <span>Arrival: {plan.flight.arrivalDate} at {plan.flight.arrivalTime}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Plane size={16} className="text-[#C93A30]" />
                        <span>{plan.flight.airline} ({plan.flight.flightNumber})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-[#C93A30]" />
                        <span>{plan.flight.from} → {plan.flight.to}</span>
                      </div>

                      {/* Display Stops */}
                      {plan.flight.stops && plan.flight.stops.length > 0 && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin size={14} className="text-[#C93A30]" />
                            <span className="font-medium text-xs text-gray-700">LAYOVER STOPS ({plan.flight.stops.length})</span>
                          </div>
                          <div className="space-y-1">
                            {plan.flight.stops.map((stop, idx) => (
                              <div key={idx} className="text-xs text-gray-600 flex items-center justify-between">
                                <span className="font-medium">{stop.location}</span>
                                <span>Arr: {stop.arrivalTime} | Dep: {stop.departureTime}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <Globe size={16} className="text-[#C93A30]" />
                        <span>{plan.user.languages.join(", ")}</span>
                      </div>
                    </div>

                    {/* Contact Buttons */}
                    <div className="flex justify-between mt-6 pt-4 border-t">
                      <motion.a
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        href={`https://wa.me/${plan.user.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600"
                      >
                        <FaWhatsapp size={22} />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        href={`tel:${plan.user.phone}`}
                        className="text-blue-600"
                      >
                        <Phone size={22} />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        href={`mailto:${plan.user.email}`}
                        className="text-red-600"
                      >
                        <Mail size={22} />
                      </motion.a>
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-purple-600"
                      >
                        <MessageCircle size={22} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {showModal && (
          <PostTripModal
            onClose={() => setShowModal(false)}
            onAdd={(trip) => setPlans((prev) => [...prev, trip])}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

/* ===================== TAILWIND HELPER ===================== */
/*
.form-input {
  @apply w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm
         focus:border-[#07182A] focus:ring-2 focus:ring-[#07182A]/30
         outline-none transition-all;
}
*/