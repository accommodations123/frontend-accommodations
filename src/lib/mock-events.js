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
        {
            id: 1,
            title: "Global Tech Summit 2025",
            date: "Dec 15, 2025",
            time: "09:00 AM",
            location: "San Francisco, CA",
            country: "US",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000",
            price: "$299",
            description: "Join industry leaders and innovators for a day of insightful talks and networking. Explore the latest trends in AI, blockchain, and sustainable tech.",
            membersGoing: 1240,
            guestsCount: 500,
            type: "Conference"
        },
        {
            id: 2,
            title: "Neon Lights Festival",
            date: "Jan 20, 2026",
            time: "06:00 PM",
            location: "Tokyo, Japan",
            country: "JP",
            image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=1000",
            price: "$150",
            description: "Experience a night of vibrant lights, electronic music, and immersive art installations in the heart of Tokyo.",
            membersGoing: 850,
            guestsCount: 200,
            type: "Festival"
        },
        {
            id: 3,
            title: "Startup Weekend",
            date: "Feb 10, 2026",
            time: "10:00 AM",
            location: "London, UK",
            country: "UK",
            image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1000",
            price: "Free",
            description: "Pitch your idea, form a team, and launch a startup in 54 hours. Mentors and investors will be present.",
            membersGoing: 300,
            guestsCount: 50,
            type: "Workshop"
        },
        {
            id: 4,
            title: "Art Basel Miami",
            date: "Dec 05, 2025",
            time: "11:00 AM",
            location: "Miami, FL",
            country: "US",
            image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=1000",
            price: "$50",
            description: "A premier art show of the Americas, featuring modern and contemporary art from the world's leading galleries.",
            membersGoing: 2100,
            guestsCount: 800,
            type: "Exhibition"
        },
    ],
    music: [
        {
            id: 5,
            title: "Jazz in the Park",
            date: "Dec 12, 2025",
            time: "05:00 PM",
            location: "New York, NY",
            country: "US",
            image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=1000",
            price: "$30",
            description: "Relax with soulful jazz melodies under the stars. Bring a blanket and enjoy the evening.",
            membersGoing: 450,
            guestsCount: 120,
            type: "Concert"
        },
        {
            id: 6,
            title: "Underground Techno",
            date: "Dec 18, 2025",
            time: "11:00 PM",
            location: "Berlin, Germany",
            country: "DE",
            image: "https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&q=80&w=1000",
            price: "$20",
            description: "Deep bass and hypnotic rhythms in an abandoned warehouse location. Strictly 18+.",
            membersGoing: 600,
            guestsCount: 150,
            type: "Party"
        },
        {
            id: 7,
            title: "Symphony Night",
            date: "Jan 05, 2026",
            time: "07:30 PM",
            location: "Vienna, Austria",
            country: "AT",
            image: "https://images.unsplash.com/photo-1465847899078-b413929f7120?auto=format&fit=crop&q=80&w=1000",
            price: "$80",
            description: "A classical evening featuring masterpieces by Mozart and Beethoven performed by the Vienna Philharmonic.",
            membersGoing: 800,
            guestsCount: 300,
            type: "Concert"
        },
    ],
    workshops: [
        {
            id: 8,
            title: "Pottery Masterclass",
            date: "Dec 14, 2025",
            time: "02:00 PM",
            location: "Portland, OR",
            country: "US",
            image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=1000",
            price: "$45",
            description: "Learn the art of wheel throwing and hand-building. All materials provided.",
            membersGoing: 20,
            guestsCount: 5,
            type: "Workshop"
        },
        {
            id: 9,
            title: "Digital Marketing 101",
            date: "Jan 12, 2026",
            time: "10:00 AM",
            location: "Remote",
            country: "Online",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000",
            price: "$100",
            description: "Master the basics of SEO, social media, and content marketing in this intensive webinar.",
            membersGoing: 150,
            guestsCount: 0,
            type: "Webinar"
        },
    ],
    community: [
        {
            id: 10,
            title: "Beach Cleanup",
            date: "Dec 20, 2025",
            time: "08:00 AM",
            location: "Sydney, Australia",
            country: "AU",
            image: "https://images.unsplash.com/photo-1618477461853-5f8dd68aa395?auto=format&fit=crop&q=80&w=1000",
            price: "Free",
            description: "Help us keep our beaches clean! Gloves and bags provided. Refreshments afterwards.",
            membersGoing: 80,
            guestsCount: 20,
            type: "Volunteering"
        },
        {
            id: 11,
            title: "Book Club Meetup",
            date: "Jan 08, 2026",
            time: "06:30 PM",
            location: "Seattle, WA",
            country: "US",
            image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1000",
            price: "Free",
            description: "Discussing 'The Midnight Library' by Matt Haig. New members welcome!",
            membersGoing: 15,
            guestsCount: 2,
            type: "Meetup"
        },
    ],
    food: [
        {
            id: 12,
            title: "Street Food Festival",
            date: "Dec 22, 2025",
            time: "12:00 PM",
            location: "Bangkok, Thailand",
            country: "TH",
            image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1000",
            price: "Free Entry",
            description: "Taste the best street food Bangkok has to offer. Live music and cooking demos.",
            membersGoing: 2000,
            guestsCount: 1000,
            type: "Festival"
        },
        {
            id: 13,
            title: "Wine Tasting",
            date: "Jan 15, 2026",
            time: "04:00 PM",
            location: "Napa Valley, CA",
            country: "US",
            image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1000",
            price: "$60",
            description: "Sample a selection of premium wines from local vineyards. Cheese pairing included.",
            membersGoing: 50,
            guestsCount: 10,
            type: "Tasting"
        },
    ],
    sports: [
        {
            id: 14,
            title: "City Marathon",
            date: "Jan 25, 2026",
            time: "06:00 AM",
            location: "Boston, MA",
            country: "US",
            image: "https://images.unsplash.com/photo-1552674605-469523254d5d?auto=format&fit=crop&q=80&w=1000",
            price: "$80",
            description: "Run through the historic streets of Boston. Qualifiers only for the main race.",
            membersGoing: 5000,
            guestsCount: 10000,
            type: "Race"
        },
        {
            id: 15,
            title: "Yoga in the Park",
            date: "Dec 10, 2025",
            time: "07:00 AM",
            location: "Austin, TX",
            country: "US",
            image: "https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&q=80&w=1000",
            price: "$15",
            description: "Morning flow yoga suitable for all levels. Bring your own mat.",
            membersGoing: 40,
            guestsCount: 5,
            type: "Class"
        },
    ],
    online: [
        {
            id: 16,
            title: "Web3 Conference",
            date: "Feb 02, 2026",
            time: "09:00 AM",
            location: "Online",
            country: "Online",
            image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1000",
            price: "$50",
            description: "The future of the internet. Talks on DeFi, NFTs, and DAOs.",
            membersGoing: 3000,
            guestsCount: 0,
            type: "Conference"
        },
        {
            id: 17,
            title: "Virtual Cooking Class",
            date: "Dec 30, 2025",
            time: "05:00 PM",
            location: "Online",
            country: "Online",
            image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=1000",
            price: "$25",
            description: "Learn to make authentic Italian pasta from the comfort of your home.",
            membersGoing: 60,
            guestsCount: 0,
            type: "Class"
        },
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
