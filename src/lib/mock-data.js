import { Home, Briefcase, GraduationCap, Users, Backpack, Building, Star, Heart, Tent, Plane, Coffee, ShoppingBag, Map } from "lucide-react"

export const CATEGORIES = [
    { name: "Student", icon: GraduationCap, slug: "student" },
    { name: "Family", icon: Users, slug: "family" },
    { name: "Traveller", icon: Plane, slug: "traveller" },
    // { name: "Business", icon: Briefcase, slug: "business" },
    { name: "Backpacker", icon: Backpack, slug: "backpacker" },
    { name: "Long-term", icon: Building, slug: "long-term" },
    { name: "Short-term", icon: Home, slug: "short-term" },
    { name: "Sharing", icon: Heart, slug: "sharing" },
    // { name: "General", icon: Home, slug: "general" },
    // { name: "Luxury", icon: Star, slug: "luxury" },
    // { name: "Camping", icon: Tent, slug: "camping" },
]

export const COUNTRIES = [
    { name: "United States", code: "US", flag: "/flags/united-states-of-america-flag-png-large.png", phoneCode: "+1", currency: "USD" },
    { name: "United Kingdom", code: "UK", flag: "/flags/united-kingdom-flag-png-large.png", phoneCode: "+44", currency: "GBP" },
    { name: "Canada", code: "CA", flag: "/flags/canada-flag-png-large.png", phoneCode: "+1", currency: "CAD" },
    { name: "Australia", code: "AU", flag: "/flags/flag-jpg-xl-9-2048x1024.jpg", phoneCode: "+61", currency: "AUD" },
    { name: "France", code: "FR", flag: "/flags/france-flag-png-large.png", phoneCode: "+33", currency: "EUR" },
    { name: "Germany", code: "DE", flag: "/flags/germany-flag-png-large.png", phoneCode: "+49", currency: "EUR" },
    { name: "Japan", code: "JP", flag: "/flags/japan-flag-png-large.png", phoneCode: "+81", currency: "JPY" },
    { name: "India", code: "IN", flag: "/flags/india-flag-png-large.png", phoneCode: "+91", currency: "INR" },
    { name: "Brazil", code: "BR", flag: "/flags/brazil-flag-png-large.png", phoneCode: "+55", currency: "BRL" },
    // { name: "United Arab Emirates", code: "AE", flag: "🇦🇪", phoneCode: "+971", currency: "AED" },
]

export const LISTINGS = [
    {
        id: 1,
        title: "Modern Loft in Downtown",
        location: "New York, USA",
        price: 150,
        rating: 4.8,
        reviews: 128,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop",
        category: "Luxury",
        type: "Entire Loft",
        area: "1200 sq ft",
        hostName: "Sarah Jenkins",
        hostAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        images: [
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1505693416388-b0346efee535?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=2076&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?q=80&w=2071&auto=format&fit=crop",
        ],
        purpose: "Working Professional",
        badges: ["Near Metro", "Indian Roommates"],
        communityFeatures: ["Vegetarian Friendly", "Quiet Area"]
    },
    {
        id: 2,
        title: "Cozy Mountain Cabin",
        location: "Aspen, USA",
        price: 250,
        rating: 4.9,
        reviews: 85,
        image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1965&auto=format&fit=crop",
        category: "Family",
        type: "Entire Cabin",
        area: "1500 sq ft",
        hostName: "Michael Chen",
        hostAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        images: [
            "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1965&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1449156493391-d2cfa28e468b?q=80&w=2074&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
        ],
        purpose: "Family",
        badges: ["Family Friendly", "Safe Area"],
        communityFeatures: ["Near Park", "Indian Grocery Nearby"]
    },
    {
        id: 3,
        title: "Beachfront Villa",
        location: "Bali, Indonesia",
        price: 350,
        rating: 4.95,
        reviews: 210,
        image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop",
        category: "Luxury",
        type: "Entire Villa",
        area: "3000 sq ft",
        hostName: "Ayu Kartini",
        hostAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop",
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        images: [
            "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1974&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop",
        ],
        purpose: "Traveller",
        badges: ["Ocean View", "Private Pool"],
        communityFeatures: ["Tourist Friendly"]
    },
    {
        id: 4,
        title: "Historic Canal House",
        location: "Amsterdam, Netherlands",
        price: 180,
        rating: 4.7,
        reviews: 92,
        image: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=2084&auto=format&fit=crop",
        category: "Traveller",
        type: "Entire House",
        area: "900 sq ft",
        hostName: "Lars Van Der Berg",
        hostAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop",
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        images: [
            "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=2084&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1585543805890-6051f7829f98?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?q=80&w=1974&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1522771753035-1a5b6562f3ba?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=2070&auto=format&fit=crop",
        ],
        purpose: "Traveller",
        badges: ["Central Location", "Historic"],
        communityFeatures: ["Near Public Transport"]
    },
    {
        id: 5,
        title: "Minimalist Studio",
        location: "Tokyo, Japan",
        price: 120,
        rating: 4.6,
        reviews: 156,
        image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070&auto=format&fit=crop",
        category: "Business",
        type: "Studio Apartment",
        area: "400 sq ft",
        hostName: "Kenji Tanaka",
        hostAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop",
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        images: [
            "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1593696140826-c58b0958b8ba?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?q=80&w=2071&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=2076&auto=format&fit=crop",
        ],
        purpose: "Student",
        badges: ["Students", "Budget Friendly"],
        communityFeatures: ["Near University", "Quiet Area"]
    },
    {
        id: 6,
        title: "Secluded Treehouse",
        location: "Costa Rica",
        price: 200,
        rating: 4.9,
        reviews: 340,
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
        category: "Backpacker",
        type: "Treehouse",
        area: "600 sq ft",
        hostName: "Elena Rodriguez",
        hostAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        images: [
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1974&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=1974&auto=format&fit=crop",
        ],
        purpose: "Traveller",
        badges: ["Nature", "Unique Stay"],
        communityFeatures: ["Eco Friendly"]
    },
    {
        id: 7,
        title: "Luxury Penthouse",
        location: "Dubai, UAE",
        price: 500,
        rating: 5.0,
        reviews: 50,
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
        category: "Luxury",
        type: "Penthouse",
        area: "4500 sq ft",
        hostName: "Omar Al-Fayed",
        hostAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop",
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        images: [
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?q=80&w=2073&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?q=80&w=2071&auto=format&fit=crop",
        ],
        purpose: "Business",
        badges: ["Premium", "City Views"],
        communityFeatures: ["Near Business District", "Indian Community Nearby"]
    },
    {
        id: 8,
        title: "Charming Cottage",
        location: "Cotswolds, UK",
        price: 160,
        rating: 4.8,
        reviews: 112,
        image: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=2074&auto=format&fit=crop",
        category: "Family",
        type: "Entire Cottage",
        area: "1100 sq ft",
        hostName: "Eleanor Rigby",
        hostAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop",
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        images: [
            "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=2074&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1974&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=1974&auto=format&fit=crop",
        ],
        purpose: "Family",
        badges: ["Countryside", "Peaceful"],
        communityFeatures: ["Family Friendly"]
    },
]



export const EVENTS = {
    popular: [
        {
            id: 1,
            title: "Diwali Night 2025",
            date: "Nov 12",
            location: "City Square",
            price: "Free Entry",
            image: "https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: 2,
            title: "New Student Arrival Meetup",
            date: "Aug 25",
            location: "University Hall",
            price: "Free",
            image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: 3,
            title: "Bollywood Music Festival",
            date: "Dec 15",
            location: "Grand Arena",
            price: "From $50",
            image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1974&auto=format&fit=crop"
        },
        {
            id: 4,
            title: "Indian Food Carnival",
            date: "Sep 10",
            location: "Riverfront Park",
            price: "$10 Entry",
            image: "https://images.unsplash.com/photo-1567337710282-00832b415979?q=80&w=2088&auto=format&fit=crop"
        }
    ],
    restaurants: [
        {
            id: 5,
            title: "Spice Route",
            type: "North Indian",
            rating: 4.9,
            price: "$$$",
            image: "https://images.unsplash.com/photo-1585937421612-70a008356f36?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: 6,
            title: "Dosa Plaza",
            type: "South Indian",
            rating: 4.8,
            price: "$$",
            image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: 7,
            title: "Chaat Corner",
            type: "Street Food",
            rating: 4.7,
            price: "$",
            image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: 8,
            title: "Biryani House",
            type: "Hyderabadi",
            rating: 4.6,
            price: "$$",
            image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=2070&auto=format&fit=crop"
        }
    ],
    streetFood: [
        {
            id: 9,
            title: "Desi Night Market",
            location: "Little India",
            open: "6 PM - 12 AM",
            image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop"
        },
        {
            id: 10,
            title: "Momo Station",
            location: "Downtown Corner",
            open: "11 AM - 9 PM",
            image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: 11,
            title: "Chai Point",
            location: "University Ave",
            open: "7 AM - 10 PM",
            image: "https://images.unsplash.com/photo-1576398289164-c4816db6e74e?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: 12,
            title: "Sweet Treats",
            location: "Market Street",
            open: "10 AM - 8 PM",
            image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=2157&auto=format&fit=crop"
        }
    ]
}

export const TESTIMONIALS = [
    {
        id: 1,
        name: "Sarah Jenkins",
        role: "Senior Engineer",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
        quote: "The autonomy and trust here is unlike anywhere else. I get to solve complex problems every day.",
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Product Manager",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
        quote: "Seeing our work directly impact the lives of travelers and hosts is incredibly rewarding.",
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
        id: 3,
        name: "Elena Rodriguez",
        role: "Designer",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
        quote: "We're not just building a product; we're crafting an experience. Design has a seat at the table.",
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
    }
]

export const FAQS = [
    {
        question: "What is the interview process like?",
        answer: "Our process typically involves an initial recruiter screen, a hiring manager interview, a technical or practical assessment, and a final culture fit round. We aim to complete the process within 2-3 weeks."
    },
    {
        question: "Do you offer remote work?",
        answer: "Yes! We are a remote-first company. You can work from anywhere in the world, as long as you have a reliable internet connection and can overlap with your team's core hours."
    },
    {
        question: "What benefits do you offer?",
        answer: "We offer comprehensive health insurance, a generous wellness stipend, an annual learning budget, unlimited PTO, and equity in the company."
    },
    {
        question: "How do you support career growth?",
        answer: "We have a structured career ladder, regular performance reviews, and a mentorship program. We also provide a budget for conferences and courses."
    }
]

export const JOBS = [
    {
        id: 1,
        title: "Senior Frontend Engineer",
        location: "Remote (US)",
        type: "Full-time",
        department: "Engineering",
        description: "We are looking for an experienced Frontend Engineer to lead our web platform development.",
        postedAt: "2025-12-01",
        salary: "$140k - $180k",
        applicants: 45,
        tags: ["React", "Next.js", "Tailwind"],
        experienceLevel: "Senior",
        responsibilities: [
            "Architect and build scalable frontend applications",
            "Mentor junior developers and conduct code reviews",
            "Collaborate with design and product teams"
        ],
        skills: ["React", "TypeScript", "Performance Optimization"],
        benefits: ["Health Insurance", "Stock Options", "Remote Work"]
    },
    {
        id: 2,
        title: "Product Designer",
        location: "New York, NY",
        type: "Full-time",
        department: "Design",
        description: "Join our design team to craft beautiful and intuitive experiences for our users.",
        postedAt: "2025-11-28",
        salary: "$110k - $150k",
        applicants: 32,
        tags: ["Figma", "UI/UX", "Prototyping"],
        experienceLevel: "Mid-Level",
        responsibilities: [
            "Create user flows, wireframes, and high-fidelity prototypes",
            "Conduct user research and usability testing",
            "Maintain and evolve our design system"
        ],
        skills: ["Figma", "Prototyping", "User Research"],
        benefits: ["Wellness Stipend", "Learning Budget", "Flexible Hours"]
    },
    {
        id: 3,
        title: "Customer Success Manager",
        location: "San Francisco, CA",
        type: "Full-time",
        department: "Operations",
        description: "Help our hosts and guests have the best possible experience on Haven.",
        postedAt: "2025-11-25",
        salary: "$80k - $110k",
        applicants: 128,
        tags: ["Support", "Communication", "CRM"],
        experienceLevel: "Mid-Level",
        responsibilities: [
            "Onboard new hosts and ensure their success",
            "Resolve complex customer issues",
            "Gather feedback to improve our product"
        ],
        skills: ["Communication", "Problem Solving", "CRM Tools"],
        benefits: ["Health Insurance", "Team Retreats", "Commuter Benefits"]
    },
    {
        id: 4,
        title: "Marketing Specialist",
        location: "Remote (US)",
        type: "Contract",
        department: "Marketing",
        description: "Drive growth and brand awareness through creative marketing campaigns.",
        postedAt: "2025-12-02",
        salary: "$60k - $90k",
        applicants: 18,
        tags: ["Social Media", "SEO", "Content"],
        experienceLevel: "Junior",
        responsibilities: [
            "Manage social media channels",
            "Create engaging content for our blog and newsletter",
            "Assist with SEO optimization"
        ],
        skills: ["Social Media Marketing", "Copywriting", "SEO"],
        benefits: ["Flexible Schedule", "Remote Work", "Networking"]
    },
    {
        id: 5,
        title: "Backend Developer",
        location: "Remote (EU)",
        type: "Full-time",
        department: "Engineering",
        description: "Build scalable APIs and services to power our global platform.",
        postedAt: "2025-12-03",
        salary: "$130k - $170k",
        applicants: 12,
        tags: ["Node.js", "PostgreSQL", "Redis"],
        experienceLevel: "Mid-Level",
        responsibilities: [
            "Design and implement RESTful APIs",
            "Optimize database performance",
            "Ensure system reliability and security"
        ],
        skills: ["Node.js", "SQL", "System Design"],
        benefits: ["Health Insurance", "Stock Options", "Learning Budget"]
    }
]

export const GROUPS = {
    countries: [
        { id: 1, name: "Indians in USA", flag: "🇺🇸", members: "45k" },
        { id: 2, name: "Indians in Canada", flag: "🇨🇦", members: "32k" },
        { id: 3, name: "Indians in UK", flag: "🇬🇧", members: "28k" },
        { id: 4, name: "Indians in Australia", flag: "🇦🇺", members: "18k" },
        { id: 5, name: "Indians in Germany", flag: "🇩🇪", members: "12k" },
    ],
    cities: [
        {
            id: 1,
            title: "Indians in Dallas",
            description: "Connect with the vibrant Indian community in Dallas-Fort Worth.",
            image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop",
            members: "12.5k"
        },
        {
            id: 2,
            title: "Telugu in London",
            description: "A community for Telugu speakers living in London.",
            image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop",
            members: "8.2k"
        },
        {
            id: 3,
            title: "Malayalis in Toronto",
            description: "Welcome to the Malayali community in Greater Toronto Area.",
            image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=1965&auto=format&fit=crop",
            members: "9.1k"
        },
        {
            id: 4,
            title: "Students in Berlin",
            description: "Support group for Indian students in Berlin.",
            image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=2070&auto=format&fit=crop",
            members: "5.4k"
        }
    ],
    purpose: [
        { id: 1, title: "Accommodation Help", icon: Home, members: "45k", description: "Find rooms, flatmates, and housing tips." },
        { id: 2, title: "Jobs & Careers", icon: Briefcase, members: "32k", description: "Job postings, career advice, and networking." },
        { id: 3, title: "Visa & Immigration", icon: Plane, members: "28k", description: "Visa help, immigration news, and support." },
        { id: 4, title: "Buy & Sell", icon: ShoppingBag, members: "18k", description: "Marketplace for furniture, books, and more." },
        { id: 5, title: "Women-Only", icon: Heart, members: "12k", description: "Safe space for women to connect and share." },
        { id: 6, title: "Travel & Exploration", icon: Map, members: "25k", description: "Travel buddies, trip planning, and tips." },
    ],
    trending: [
        {
            id: 1,
            name: "Tech Workers in Bay Area",
            image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop",
            activePosts: 156
        },
        {
            id: 2,
            name: "Newcomers in Dubai",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
            activePosts: 92
        },
        {
            id: 3,
            name: "Indian Students in Melbourne",
            image: "https://images.unsplash.com/photo-1514395465013-2dc0bebb3639?q=80&w=2070&auto=format&fit=crop",
            activePosts: 230
        }
    ],
    recommended: [
        {
            id: 1,
            title: "Based on your destination",
            groupName: "New Arrivals in New Jersey",
            members: "3.5k"
        },
        {
            id: 2,
            title: "For students like you",
            groupName: "MS Students Fall 2025",
            members: "10.2k"
        }
    ]
}

export const GROUP_FEED = [
    {
        id: 1,
        author: "Sarah Jenkins",
        avatar: "SJ",
        time: "2 hours ago",
        content: "Hey everyone! I just moved to Sydney and I'm looking for recommendations for good coffee spots in Surry Hills. Any tips?",
        likes: 24,
        comments: 5
    },
    {
        id: 2,
        author: "Raj Patel",
        avatar: "RP",
        time: "5 hours ago",
        content: "Does anyone know the process for extending a student visa? I'm a bit confused about the new requirements.",
        likes: 45,
        comments: 12
    },
    {
        id: 3,
        author: "Maria Garcia",
        avatar: "MG",
        time: "1 day ago",
        content: "Just wanted to share that there's a networking event for tech workers this Friday at the CBD. Who's going?",
        likes: 89,
        comments: 34
    }
]

