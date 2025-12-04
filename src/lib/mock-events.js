export const EVENT_CATEGORIES = [
    { id: "trending", title: "Trending Now" },
    { id: "music", title: "Music & Nightlife" },
    { id: "workshops", title: "Workshops & Classes" },
    { id: "community", title: "Community Meetups" },
    { id: "food", title: "Food & Drink" },
    { id: "sports", title: "Sports & Wellness" },
    { id: "online", title: "Online Events" }
]

export const MOCK_EVENTS = {
    trending: [
        { id: 1, title: "Global Tech Summit 2025", date: "Dec 15, 2025", location: "San Francisco, CA", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000", price: "$299" },
        { id: 2, title: "Neon Lights Festival", date: "Jan 20, 2026", location: "Tokyo, Japan", image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=1000", price: "$150" },
        { id: 3, title: "Startup Weekend", date: "Feb 10, 2026", location: "London, UK", image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1000", price: "Free" },
        { id: 4, title: "Art Basel Miami", date: "Dec 05, 2025", location: "Miami, FL", image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=1000", price: "$50" },
    ],
    music: [
        { id: 5, title: "Jazz in the Park", date: "Dec 12, 2025", location: "New York, NY", image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=1000", price: "$30" },
        { id: 6, title: "Underground Techno", date: "Dec 18, 2025", location: "Berlin, Germany", image: "https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&q=80&w=1000", price: "$20" },
        { id: 7, title: "Symphony Night", date: "Jan 05, 2026", location: "Vienna, Austria", image: "https://images.unsplash.com/photo-1465847899078-b413929f7120?auto=format&fit=crop&q=80&w=1000", price: "$80" },
    ],
    workshops: [
        { id: 8, title: "Pottery Masterclass", date: "Dec 14, 2025", location: "Portland, OR", image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=1000", price: "$45" },
        { id: 9, title: "Digital Marketing 101", date: "Jan 12, 2026", location: "Remote", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000", price: "$100" },
    ],
    community: [
        { id: 10, title: "Beach Cleanup", date: "Dec 20, 2025", location: "Sydney, Australia", image: "https://images.unsplash.com/photo-1618477461853-5f8dd68aa395?auto=format&fit=crop&q=80&w=1000", price: "Free" },
        { id: 11, title: "Book Club Meetup", date: "Jan 08, 2026", location: "Seattle, WA", image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1000", price: "Free" },
    ],
    food: [
        { id: 12, title: "Street Food Festival", date: "Dec 22, 2025", location: "Bangkok, Thailand", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1000", price: "Free Entry" },
        { id: 13, title: "Wine Tasting", date: "Jan 15, 2026", location: "Napa Valley, CA", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1000", price: "$60" },
    ],
    sports: [
        { id: 14, title: "City Marathon", date: "Jan 25, 2026", location: "Boston, MA", image: "https://images.unsplash.com/photo-1552674605-469523254d5d?auto=format&fit=crop&q=80&w=1000", price: "$80" },
        { id: 15, title: "Yoga in the Park", date: "Dec 10, 2025", location: "Austin, TX", image: "https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&q=80&w=1000", price: "$15" },
    ],
    online: [
        { id: 16, title: "Web3 Conference", date: "Feb 02, 2026", location: "Online", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1000", price: "$50" },
        { id: 17, title: "Virtual Cooking Class", date: "Dec 30, 2025", location: "Online", image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=1000", price: "$25" },
    ]
}

export const EVENT_RULES = {
    US: {
        rules: [
            "Must adhere to local noise ordinances.",
            "Alcohol permit required for serving drinks.",
            "Liability insurance mandatory for events > 50 people."
        ],
        documents: ["State ID / Driver's License", "Event Permit", "Venue Contract"]
    },
    UK: {
        rules: [
            "Temporary Event Notice (TEN) required for alcohol/entertainment.",
            "Health & Safety risk assessment mandatory.",
            "Noise levels must be monitored."
        ],
        documents: ["Passport / ID", "TEN Approval", "Risk Assessment Form"]
    },
    IN: {
        rules: [
            "Police permission required for public gatherings.",
            "Loudspeaker permit mandatory after 10 PM.",
            "Fire safety clearance for indoor venues."
        ],
        documents: ["Aadhar Card / PAN", "Police NOC", "Fire Safety Certificate"]
    },
    default: {
        rules: [
            "Adhere to local laws and regulations.",
            "Ensure safety of all attendees.",
            "Respect venue capacity limits."
        ],
        documents: ["Government ID", "Venue Booking Proof"]
    }
}
