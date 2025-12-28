// Product Data
const products = [
  {
    id: "rog-strix-g16",
    name: "ROG Strix G16",
    category: "gaming",
    price: 149317,
    originalPrice: 165917,
    specs: {
      processor: "Intel Core i9-13980HX",
      ram: "32GB DDR5",
      storage: "1TB NVMe SSD",
      display: '16" QHD 240Hz',
      graphics: "NVIDIA RTX 4070",
    },
    description:
      "Dominate the competition with the ROG Strix G16, featuring the latest Intel processor and NVIDIA graphics for ultimate gaming performance.",
    images: [
      "../images/rog-strix-g16.png",
      "../images/zenbook-pro-16x.png",
      "../images/rog-strix-g16.png",
      "../images/zenbook-pro-16x.png",
      "../images/rog-strix-g16.png",
      "../images/zenbook-pro-16x.png",
    ],
    inStock: true,
    rating: 4.8,
    reviewCount: 234,
    featured: true,
  },
  {
    id: "zenbook-pro-16x",
    name: "ZenBook Pro 16X OLED",
    category: "creator",
    price: 207417,
    specs: {
      processor: "Intel Core i9-13900H",
      ram: "32GB LPDDR5",
      storage: "2TB NVMe SSD",
      display: '16" 4K OLED Touch',
      graphics: "NVIDIA RTX 4060",
    },
    description:
      "Create without limits on the stunning 4K OLED display. Perfect for professionals who demand color accuracy and performance.",
    images: ["../images/zenbook-pro-16x.png"],
    inStock: true,
    rating: 4.9,
    reviewCount: 156,
    featured: true,
  },
  {
    id: "expertbook-b9",
    name: "ExpertBook B9 OLED",
    category: "business",
    price: 157617,
    specs: {
      processor: "Intel Core i7-1355U",
      ram: "32GB LPDDR5",
      storage: "1TB NVMe SSD",
      display: '14" FHD OLED',
      graphics: "Intel Iris Xe",
    },
    description:
      "The world's lightest 14-inch business laptop. Built for executives who value mobility without compromise.",
    images: ["../images/expertbook-b9.png"],
    inStock: true,
    rating: 4.7,
    reviewCount: 89,
    featured: true,
  },
  {
    id: "vivobook-s15",
    name: "VivoBook S15 OLED",
    category: "student",
    price: 74617,
    originalPrice: 82917,
    specs: {
      processor: "AMD Ryzen 7 7730U",
      ram: "16GB DDR4",
      storage: "512GB NVMe SSD",
      display: '15.6" FHD OLED',
      graphics: "AMD Radeon",
    },
    description:
      "Vibrant OLED display meets everyday performance. The perfect companion for students and young professionals.",
    images: ["../images/vivobook-s15.png"],
    inStock: true,
    rating: 4.6,
    reviewCount: 312,
    featured: true,
  },
  {
    id: "rog-zephyrus-g14",
    name: "ROG Zephyrus G14",
    category: "gaming",
    price: 132717,
    specs: {
      processor: "AMD Ryzen 9 7940HS",
      ram: "16GB DDR5",
      storage: "1TB NVMe SSD",
      display: '14" QHD 165Hz',
      graphics: "NVIDIA RTX 4060",
    },
    description:
      "Compact powerhouse for gamers on the go. Premium performance in an ultraportable form factor.",
    images: ["../images/rog-zephyrus-g14.png"],
    inStock: true,
    rating: 4.8,
    reviewCount: 445,
  },
  {
    id: "proart-studiobook-16",
    name: "ProArt Studiobook 16",
    category: "creator",
    price: 273817,
    specs: {
      processor: "Intel Core i9-13980HX",
      ram: "64GB DDR5",
      storage: "2TB NVMe SSD",
      display: '16" 4K OLED HDR',
      graphics: "NVIDIA RTX 4070",
    },
    description:
      "Professional-grade workstation laptop with ASUS Dial and color-accurate display for creative professionals.",
    images: ["../images/proart-studiobook-16.png"],
    inStock: false,
    rating: 4.9,
    reviewCount: 67,
  },
  {
    id: "zenbook-14",
    name: "ZenBook 14 OLED",
    category: "business",
    price: 91217,
    specs: {
      processor: "Intel Core Ultra 7 155H",
      ram: "16GB LPDDR5X",
      storage: "512GB NVMe SSD",
      display: '14" 2.8K OLED',
      graphics: "Intel Arc",
    },
    description:
      "Ultra-slim design with AI-powered performance. The modern professional's essential tool.",
    images: ["../images/zenbook-14.png"],
    inStock: true,
    rating: 4.7,
    reviewCount: 198,
  },
  {
    id: "vivobook-go-15",
    name: "VivoBook Go 15",
    category: "student",
    price: 45567,
    specs: {
      processor: "AMD Ryzen 5 7520U",
      ram: "8GB DDR5",
      storage: "256GB NVMe SSD",
      display: '15.6" FHD IPS',
      graphics: "AMD Radeon",
    },
    description:
      "Affordable everyday computing with modern design. Great for students on a budget.",
    images: ["../images/vivobook-go-15.png"],
    inStock: true,
    rating: 4.4,
    reviewCount: 523,
  },
  {
    id: "rog-strix-scar-18",
    name: "ROG Strix SCAR 18",
    category: "gaming",
    price: 248917,
    specs: {
      processor: "Intel Core i9-13980HX",
      ram: "32GB DDR5",
      storage: "2TB NVMe SSD",
      display: '18" QHD 240Hz',
      graphics: "NVIDIA RTX 4090",
    },
    description:
      "The ultimate gaming machine. No compromises, just raw power for competitive esports.",
    images: ["../images/rog-strix-scar-18.png"],
    inStock: true,
    rating: 4.9,
    reviewCount: 178,
  },
  {
    id: "zenbook-duo",
    name: "ZenBook Duo 14",
    category: "creator",
    price: 165917,
    specs: {
      processor: "Intel Core i7-1360P",
      ram: "16GB LPDDR5",
      storage: "1TB NVMe SSD",
      display: '14" 2.8K OLED + ScreenPad',
      graphics: "Intel Iris Xe",
    },
    description:
      "Dual-screen innovation for enhanced productivity. Two displays, infinite possibilities.",
    images: ["../images/zenbook-duo.png"],
    inStock: true,
    rating: 4.6,
    reviewCount: 134,
  },
  {
    id: "chromebook-plus",
    name: "Chromebook Plus CX34",
    category: "student",
    price: 37267,
    specs: {
      processor: "Intel Core i3-1215U",
      ram: "8GB LPDDR4X",
      storage: "128GB eMMC",
      display: '14" FHD IPS',
      graphics: "Intel UHD",
    },
    description:
      "Fast, secure, and ready for anything. Chrome OS at its finest with Google AI built-in.",
    images: ["../images/chromebook-plus.png"],
    inStock: true,
    rating: 4.5,
    reviewCount: 267,
  },
  {
    id: "tuf-gaming-a16",
    name: "TUF Gaming A16",
    category: "gaming",
    price: 107817,
    specs: {
      processor: "AMD Ryzen 7 7735HS",
      ram: "16GB DDR5",
      storage: "512GB NVMe SSD",
      display: '16" FHD 165Hz',
      graphics: "NVIDIA RTX 4060",
    },
    description:
      "Military-grade durability meets gaming performance. Built tough for serious gamers.",
    images: ["../images/tuf-gaming-a16.webp"],
    inStock: true,
    rating: 4.7,
    reviewCount: 389,
  },
];

// Category Data

const categories = [
  {
    id: "gaming",
    name: "Gaming",
    description: "High-performance laptops for competitive gaming",
    icon: "gamepad",
  },
  {
    id: "business",
    name: "Business",
    description: "Professional laptops for productivity",
    icon: "briefcase",
  },
  {
    id: "creator",
    name: "Creator",
    description: "Powerful machines for creative professionals",
    icon: "palette",
  },
  {
    id: "student",
    name: "Student",
    description: "Affordable laptops for education",
    icon: "graduation-cap",
  },
];

// Trust Indicators

const trustIndicators = [
  {
    icon: "truck",
    title: "Free Shipping",
    description: "On orders over ₹82,917",
  },
  {
    icon: "shield",
    title: "2-Year Warranty",
    description: "Full coverage included",
  },
  {
    icon: "headphones",
    title: "24/7 Support",
    description: "Expert assistance",
  },
];

// Icon SVG Paths

const iconPaths = {
  gamepad:
    '<path d="M6 11h4"></path><path d="M14 13h4"></path><rect x="6" y="7" width="12" height="10" rx="2"></rect>',
  briefcase:
    '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>',
  palette:
    '<circle cx="13.5" cy="6.5" r=".5"></circle><circle cx="17.5" cy="10.5" r=".5"></circle><circle cx="8.5" cy="7.5" r=".5"></circle><circle cx="6.5" cy="12.5" r=".5"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>',
  "graduation-cap":
    '<path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path>',
  truck:
    '<rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>',
  headphones:
    '<path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>',
  laptop:
    '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>',
};

// Helper Functions

function getIconSVG(iconName) {
  const path = iconPaths[iconName] || iconPaths.laptop;
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${path}</svg>`;
}

function getCategoryIcon(categoryId) {
  const iconMap = {
    gaming: "gamepad",
    business: "briefcase",
    creator: "palette",
    student: "graduation-cap",
  };
  return iconMap[categoryId] || "laptop";
}

function getTrustIcon(iconName) {
  return iconPaths[iconName] || iconPaths.laptop;
}
