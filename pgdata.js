// All PG Hostel data with detailed information
var allPGHostels = {
    // HYDERABAD - HITEC CITY / MADHAPUR
    "zolo-quest-pg": {
        name: "Zolo Quest PG",
        area: "Hitec City",
        city: "Hyderabad",
        lat: 17.4486, lng: 78.3764,
        phone: "+91 98765 40001",
        price: "₹6,320 - ₹14,000",
        priceMin: 6320,
        priceMax: 14000,
        gender: "Unisex",
        occupancy: "Single, Double, Triple, Quad, Penta",
        rating: 4.2,
        totalReviews: 128,
        availability: "available",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
        photos: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop"
        ],
        amenities: ["WiFi", "AC", "Meals", "CCTV", "Power Backup", "Housekeeping", "Laundry", "Gym"],
        roomPrices: {
            single: "₹14,000",
            double: "₹9,500",
            triple: "₹6,320",
            quad: "₹5,200",
            penta: "₹4,500"
        },
        deposit: "₹5,000",
        lockIn: "1 Month",
        noticePeriod: "15 Days",
        foodType: "Veg & Non-Veg",
        wifiSpeed: "50 Mbps",
        contact: {
            phone: "+91 98765 40001",
            whatsapp: "+91 98765 40001",
            email: "info@zolo.in",
            bookingUrl: "https://zolo.in"
        },
        reviews: [
            { name: "Rahul S.", rating: 5, date: "2025-12-15", comment: "Excellent food and clean rooms. WiFi speed is great for work from home." },
            { name: "Priya M.", rating: 4, date: "2025-11-20", comment: "Good location near metro. Staff is friendly. AC works well." },
            { name: "Amit K.", rating: 4, date: "2025-10-05", comment: "Value for money. Gym is well maintained. Parking available." }
        ],
        foodMenu: {
            breakfast: ["Idli", "Dosa", "Poha", "Upma", "Bread Butter", "Egg Bhurji"],
            lunch: ["Rice", "Sambar", "Rasam", "Vegetable Curry", "Curd", "Papad"],
            dinner: ["Rice", "Roti", "Paneer Curry", "Dal", "Salad", "Sweet"],
            tiffin: ["Tea/Coffee", "Biscuits", "Evening Snacks"]
        },
        rules: ["No smoking", "No alcohol", "Visitor timings: 8AM-8PM", "Gate closes at 11PM"],
        nearby: ["HITEC City Metro", "Cyber Towers", "Inorbit Mall"]
    },
    "zolo-preston-pg": {
        name: "Zolo Preston PG",
        area: "Madhapur",
        city: "Hyderabad",
        lat: 17.4510, lng: 78.3745,
        phone: "+91 98765 40003",
        price: "₹7,000 - ₹15,000",
        gender: "Unisex",
        occupancy: "Single, Double, Triple",
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
        amenities: ["WiFi", "AC", "Meals", "CCTV", "Power Backup", "Housekeeping", "Recreation Room"],
        roomPrices: {
            single: "₹15,000",
            double: "₹10,500",
            triple: "₹7,000"
        },
        deposit: "₹5,000",
        lockIn: "1 Month",
        noticePeriod: "15 Days",
        foodType: "Veg & Non-Veg",
        wifiSpeed: "40 Mbps",
        contact: {
            phone: "+91 98765 40003",
            whatsapp: "+91 98765 40003",
            email: "madhapur@zolo.in",
            bookingUrl: "https://zolo.in"
        },
        foodMenu: {
            breakfast: ["Dosa", "Idli", "Pongal", "Vada", "Tea", "Coffee"],
            lunch: ["Rice", "Sambar", "Rasam", "Chicken Curry", "Raita", "Pickle"],
            dinner: ["Roti", "Rice", "Egg Curry", "Dal Fry", "Vegetable", "Payasam"],
            tiffin: ["Tea/Coffee", "Samosa", "Biscuits"]
        },
        rules: ["No smoking", "Quiet hours after 10PM", "ID proof required"],
        nearby: ["Madhapur Metro", "Mindspace", "Shilparamam"]
    },
    "stanza-living-winnipeg-house": {
        name: "Stanza Living Winnipeg House",
        area: "Hitec City",
        city: "Hyderabad",
        lat: 17.4492, lng: 78.3770,
        phone: "+91 98765 40008",
        price: "₹11,999 - ₹18,000",
        gender: "Unisex",
        occupancy: "Double, Triple",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
        amenities: ["WiFi", "AC", "Meals", "CCTV", "Biometric Entry", "Housekeeping", "Laundry", "Gym", "TV Room"],
        roomPrices: {
            double: "₹14,999",
            triple: "₹11,999"
        },
        deposit: "₹10,000",
        lockIn: "3 Months",
        noticePeriod: "30 Days",
        foodType: "Veg & Non-Veg",
        wifiSpeed: "100 Mbps",
        contact: {
            phone: "+91 98765 40008",
            whatsapp: "+91 98765 40008",
            email: "hiteccity@stanzaLiving.com",
            bookingUrl: "https://stanzaLiving.com"
        },
        foodMenu: {
            breakfast: ["Poha", "Upma", "Masala Dosa", "Bread Omelette", "Cornflakes", "Tea"],
            lunch: ["Rice", "Sambar", "Kadai Paneer", "Jeera Rice", "Butter Naan", "Raita"],
            dinner: ["Rice", "Roti", "Butter Chicken", "Dal Tadka", "Mixed Veg", "Gulab Jamun"],
            tiffin: ["Tea/Coffee", "Pakora", "Biscuits", "Fruit"]
        },
        rules: ["No smoking", "No alcohol", "Biometric access only", "No overnight guests"],
        nearby: ["HITEC City", "Gachibowli", "Financial District"]
    },
    // HYDERABAD - GACHIBOWLI
    "zolo-cyberwiz-pg": {
        name: "Zolo Cyberwiz PG",
        area: "Gachibowli",
        city: "Hyderabad",
        lat: 17.4400, lng: 78.3489,
        phone: "+91 98765 40028",
        price: "₹6,191 - ₹13,000",
        gender: "Unisex",
        occupancy: "Single, Double, Triple",
        rating: 4.1,
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop",
        amenities: ["WiFi", "AC", "Meals", "CCTV", "Power Backup", "Housekeeping"],
        roomPrices: {
            single: "₹13,000",
            double: "₹8,500",
            triple: "₹6,191"
        },
        deposit: "₹4,000",
        lockIn: "1 Month",
        noticePeriod: "15 Days",
        foodType: "Veg & Non-Veg",
        wifiSpeed: "30 Mbps",
        contact: {
            phone: "+91 98765 40028",
            whatsapp: "+91 98765 40028",
            email: "gachibowli@zolo.in",
            bookingUrl: "https://zolo.in"
        },
        foodMenu: {
            breakfast: ["Idli", "Wada", "Dosa", "Paratha", "Tea", "Milk"],
            lunch: ["Rice", "Sambar", "Rasam", "Bhindi Fry", "Curd", "Papad"],
            dinner: ["Roti", "Rice", "Chicken Masala", "Paneer Butter Masala", "Dal", "Kheer"],
            tiffin: ["Tea/Coffee", "Bread Pakora", "Cookies"]
        },
        rules: ["No smoking", "Visitors allowed till 9PM", "Parking available"],
        nearby: ["Gachibowli Flyover", "DLF Cyber City", "ISB"]
    },
    "hello-world-armaan-pg": {
        name: "HelloWorld Armaan PG",
        area: "Gachibowli",
        city: "Hyderabad",
        lat: 17.4370, lng: 78.3460,
        phone: "+91 98765 40033",
        price: "₹8,000 - ₹25,000",
        gender: "Unisex",
        occupancy: "Single, Double, Triple",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=600&h=400&fit=crop",
        amenities: ["WiFi", "AC", "Meals", "CCTV", "Biometric Entry", "Housekeeping", "Laundry", "Gym", "Community Lounge", "Workstation"],
        roomPrices: {
            single: "₹25,000",
            double: "₹15,000",
            triple: "₹8,000"
        },
        deposit: "₹15,000",
        lockIn: "3 Months",
        noticePeriod: "30 Days",
        foodType: "Veg & Non-Veg",
        wifiSpeed: "200 Mbps",
        contact: {
            phone: "+91 98765 40033",
            whatsapp: "+91 98765 40033",
            email: "gachibowli@helloworld.in",
            bookingUrl: "https://helloworld.in"
        },
        foodMenu: {
            breakfast: ["Pongal", "Bread Toast", "Omelette", "Aloo Paratha", "CORNFLAKES", "Tea/Coffee"],
            lunch: ["Jeera Rice", "Sambar", "Rasam", "Palak Paneer", "Chapati", "Salad"],
            dinner: ["Rice", "Butter Naan", "Chicken Tikka", "Dal Makhani", "Veg Biryani", "Ice Cream"],
            tiffin: ["Tea/Coffee", "Samosa", "Nachos", "Fresh Fruit"]
        },
        rules: ["No smoking on premises", "Biometric entry", "No pets", "Guest policy applies"],
        nearby: ["HCU", "IIIT Hyderabad", "Q City"]
    },
    // HYDERABAD - KONDAPUR
    "zolo-green-valley-pg": {
        name: "Zolo Green Valley PG",
        area: "Kondapur",
        city: "Hyderabad",
        lat: 17.4600, lng: 78.3700,
        phone: "+91 98765 40065",
        price: "₹5,500 - ₹12,000",
        gender: "Unisex",
        occupancy: "Double, Triple, Quad",
        rating: 4.0,
        image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&h=400&fit=crop",
        amenities: ["WiFi", "AC", "Meals", "CCTV", "Power Backup"],
        foodMenu: {
            breakfast: ["Idli", "Dosa", "Upma", "Bread", "Tea"],
            lunch: ["Rice", "Sambar", "Rasam", "Curd", "Pickle"],
            dinner: ["Rice", "Roti", "Dal", "Egg Curry", "Vegetable"],
            tiffin: ["Tea", "Biscuits"]
        },
        rules: ["No smoking", "Gate timing: 11PM", "ID proof required"],
        nearby: ["Kondapur Bus Stop", "Botanical Garden", "HITEC City"]
    },
    "helloworld-falak-pg": {
        name: "HelloWorld Falak PG",
        area: "Kondapur",
        city: "Hyderabad",
        lat: 17.4550, lng: 78.3750,
        phone: "+91 98765 40066",
        price: "₹7,500 - ₹16,000",
        gender: "Unisex",
        occupancy: "Single, Double, Triple",
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop",
        amenities: ["WiFi", "AC", "Meals", "CCTV", "Biometric Entry", "Housekeeping", "Laundry", "TV Lounge"],
        foodMenu: {
            breakfast: ["Masala Dosa", "Idli Vada", "Paratha", "Cornflakes", "Tea/Coffee"],
            lunch: ["Rice", "Sambar", "Rasam", "Chicken Curry", "Paneer", "Raita"],
            dinner: ["Roti", "Rice", "Fish Fry", "Dal", "Veg Curry", "Sweet"],
            tiffin: ["Tea/Coffee", "Pakora", "Sandwich"]
        },
        rules: ["No smoking", "No alcohol", "Quiet hours 10PM-7AM"],
        nearby: ["Kondapur", "Madhapur", "Gachibowli"]
    },
    // HYDERABAD - KUKATPALLY
    "zolo-sierra-pg": {
        name: "Zolo Sierra PG",
        area: "KPHB",
        city: "Hyderabad",
        lat: 17.4978, lng: 78.3247,
        phone: "+91 98765 40082",
        price: "₹5,925 - ₹11,000",
        gender: "Unisex",
        occupancy: "Double, Triple",
        rating: 4.0,
        image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
        amenities: ["WiFi", "AC", "Meals", "CCTV", "Indoor Games", "Fridge"],
        foodMenu: {
            breakfast: ["Poha", "Idli", "Dosa", "Bread", "Tea"],
            lunch: ["Rice", "Sambar", "Rasam", "Vegetable", "Curd"],
            dinner: ["Rice", "Roti", "Chicken", "Dal", "Salad"],
            tiffin: ["Tea", "Biscuits", "Snacks"]
        },
        rules: ["No smoking", "Visitor hours: 9AM-8PM"],
        nearby: ["JNTU", "KPHB Metro", "Nizampet"]
    },
    // HYDERABAD - AMEERPET
    "stanza-belgrade-house": {
        name: "Stanza Living Belgrade House",
        area: "Ameerpet",
        city: "Hyderabad",
        lat: 17.4325, lng: 78.4071,
        phone: "+91 98765 40090",
        price: "₹9,799 - ₹15,499",
        gender: "Unisex",
        occupancy: "Double, Triple",
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&h=400&fit=crop",
        amenities: ["WiFi", "AC", "Meals", "CCTV", "Biometric Entry", "Gaming Zone", "TV", "Balcony"],
        foodMenu: {
            breakfast: ["Poha", "Upma", "Masala Omelette", "Bread Toast", "Tea/Coffee"],
            lunch: ["Rice", "Sambar", "Rasam", "Butter Chicken", "Paneer Tikka", "Raita"],
            dinner: ["Roti", "Rice", "Tandoori Chicken", "Dal Makhani", "Veg Biryani", "Gulab Jamun"],
            tiffin: ["Tea/Coffee", "Samosa", "Sandwich", "Fruit"]
        },
        rules: ["No smoking", "No alcohol", "Biometric access", "No overnight guests"],
        nearby: ["Ameerpet Metro", "SR Nagar", "Begumpet"]
    },
    // HYDERABAD - BANJARA HILLS
    "helloworld-banjara-pg": {
        name: "HelloWorld Banjara PG",
        area: "Banjara Hills",
        city: "Hyderabad",
        lat: 17.4156, lng: 78.4347,
        phone: "+91 98765 40095",
        price: "₹11,000 - ₹20,000",
        gender: "Unisex",
        occupancy: "Single, Double",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
        amenities: ["WiFi", "AC", "Meals", "CCTV", "Biometric Entry", "Housekeeping", "Laundry", "Lift", "Fridge"],
        foodMenu: {
            breakfast: ["Masala Dosa", "Pongal", "Bread Omelette", "Pancakes", "Tea/Coffee"],
            lunch: ["Rice", "Sambar", "Rasam", "Butter Naan", "Chicken Tikka Masala", "Salad"],
            dinner: ["Roti", "Rice", "Mutton Curry", "Dal Tadka", "Veg Manchurian", "Kulfi"],
            tiffin: ["Tea/Coffee", "Spring Roll", "Momos", "Fresh Juice"]
        },
        rules: ["No smoking", "No alcohol", "Formal dress in common areas"],
        nearby: ["Banjara Hills Road No.1", "Jubilee Hills", "LV Prasad Eye Hospital"]
    },
    // HYDERABAD - POCHARAM / GHATKESAR
    "saibaba-pg-hostel": {
        name: "Saibaba PG Hostel",
        area: "Pocharam",
        city: "Hyderabad",
        lat: 17.3500, lng: 78.5800,
        phone: "+91 98765 40321",
        price: "₹5,000 - ₹8,000",
        gender: "Unisex",
        occupancy: "Triple, Quad",
        rating: 3.8,
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=400&fit=crop",
        amenities: ["WiFi", "Meals", "CCTV", "Power Backup"],
        foodMenu: {
            breakfast: ["Idli", "Dosa", "Poha", "Tea"],
            lunch: ["Rice", "Sambar", "Rasam", "Vegetable", "Curd"],
            dinner: ["Rice", "Roti", "Egg Curry", "Dal", "Vegetable"],
            tiffin: ["Tea", "Biscuits"]
        },
        rules: ["No smoking", "Gate closes at 10:30PM"],
        nearby: ["Pocharam", "Ghatkesar", "Warangal Highway"]
    },
    "sri-sai-durga-boys-hostel": {
        name: "Sri Sai Durga Boys Hostel",
        area: "Ghatkesar",
        city: "Hyderabad",
        lat: 17.3580, lng: 78.5950,
        phone: "+91 98765 40324",
        price: "₹5,000 - ₹6,500",
        gender: "Male",
        occupancy: "Triple",
        rating: 3.7,
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&h=400&fit=crop",
        amenities: ["WiFi", "Meals", "CCTV"],
        foodMenu: {
            breakfast: ["Idli", "Dosa", "Vada", "Tea"],
            lunch: ["Rice", "Sambar", "Rasam", "Vegetable", "Buttermilk"],
            dinner: ["Rice", "Roti", "Chicken", "Dal", "Pickle"],
            tiffin: ["Tea", "Biscuits"]
        },
        rules: ["Boys only", "No smoking", "ID proof required"],
        nearby: ["Ghatkesar", "PN Colony", "Warangal Highway"]
    },
    // HYDERABAD - MAISAMMAGUDA
    "prathap-reddy-boys-hostel": {
        name: "Prathap Reddy Deluxe Boys Hostel",
        area: "Maisammaguda",
        city: "Hyderabad",
        lat: 17.5100, lng: 78.3900,
        phone: "+91 98765 40198",
        price: "₹4,500 - ₹7,000",
        gender: "Male",
        occupancy: "Triple, Quad",
        rating: 3.9,
        image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=600&h=400&fit=crop",
        amenities: ["WiFi", "Meals", "CCTV", "Power Backup", "Parking"],
        foodMenu: {
            breakfast: ["Idli", "Dosa", "Pongal", "Bread", "Tea"],
            lunch: ["Rice", "Sambar", "Rasam", "Chicken Curry", "Curd", "Papad"],
            dinner: ["Rice", "Roti", "Egg Curry", "Dal", "Vegetable Curry", "Sweet"],
            tiffin: ["Tea/Coffee", "Biscuits", "Samosa"]
        },
        rules: ["Boys only", "No smoking", "No alcohol", "Gate closes at 11PM"],
        nearby: ["Malla Reddy College", "Maisammaguda", "Dulapally"]
    },
    "sr-reddy-boys-hostel": {
        name: "S.R. Reddy Boys Hostel",
        area: "Maisammaguda",
        city: "Hyderabad",
        lat: 17.5110, lng: 78.3910,
        phone: "+91 98765 40199",
        price: "₹4,000 - ₹6,500",
        gender: "Male",
        occupancy: "Triple, Quad",
        rating: 3.8,
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop",
        amenities: ["WiFi", "Meals", "CCTV", "Power Backup"],
        foodMenu: {
            breakfast: ["Idli", "Dosa", "Upma", "Tea"],
            lunch: ["Rice", "Sambar", "Rasam", "Vegetable", "Curd"],
            dinner: ["Rice", "Roti", "Chicken", "Dal", "Vegetable"],
            tiffin: ["Tea", "Biscuits"]
        },
        rules: ["Boys only", "No smoking", "Visitor hours: 9AM-8PM"],
        nearby: ["Maisammaguda", "Malla Reddy College", "Dulapally"]
    },
    "m-k-girls-hostel": {
        name: "M K Girls Hostel",
        area: "Maisammaguda",
        city: "Hyderabad",
        lat: 17.5115, lng: 78.3915,
        phone: "+91 98765 40203",
        price: "₹3,500 - ₹5,000",
        gender: "Female",
        occupancy: "Triple, Quad",
        rating: 3.9,
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
        amenities: ["WiFi", "Meals", "CCTV", "24/7 Security"],
        foodMenu: {
            breakfast: ["Idli", "Dosa", "Poha", "Tea"],
            lunch: ["Rice", "Sambar", "Rasam", "Vegetable", "Curd"],
            dinner: ["Rice", "Roti", "Dal", "Vegetable Curry", "Pickle"],
            tiffin: ["Tea", "Biscuits"]
        },
        rules: ["Girls only", "No male visitors", "Gate closes at 9PM"],
        nearby: ["Maisammaguda", "Hanuman Temple", "Dulapally"]
    },
    "sri-manikanta-girls-hostel": {
        name: "Sri Manikanta Girls Hostel",
        area: "Maisammaguda",
        city: "Hyderabad",
        lat: 17.5090, lng: 78.3890,
        phone: "+91 98765 40204",
        price: "₹3,500 - ₹5,500",
        gender: "Female",
        occupancy: "Triple, Quad",
        rating: 4.0,
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop",
        amenities: ["WiFi", "Meals", "CCTV", "Power Backup", "24/7 Security"],
        foodMenu: {
            breakfast: ["Idli", "Dosa", "Pongal", "Bread Butter", "Tea"],
            lunch: ["Rice", "Sambar", "Rasam", "Paneer Curry", "Curd", "Papad"],
            dinner: ["Rice", "Roti", "Egg Curry", "Dal", "Vegetable", "Sweet"],
            tiffin: ["Tea/Coffee", "Samosa", "Biscuits"]
        },
        rules: ["Girls only", "No male visitors", "Gate closes at 9:30PM"],
        nearby: ["Maisammaguda", "Malla Reddy College", "Dundigal"]
    },
    // GANDI MAISAMMA
    "stanza-lagos-house": {
        name: "Stanza Living Lagos House",
        area: "Gandi Maisamma",
        city: "Hyderabad",
        lat: 17.5020, lng: 78.3820,
        phone: "+91 98765 40223",
        price: "₹9,799 - ₹14,000",
        gender: "Female",
        occupancy: "Triple, Quad",
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
        amenities: ["WiFi", "AC", "Meals", "CCTV", "Biometric Entry", "Housekeeping", "Laundry"],
        foodMenu: {
            breakfast: ["Poha", "Upma", "Masala Dosa", "Bread Toast", "Tea/Coffee"],
            lunch: ["Rice", "Sambar", "Rasam", "Butter Paneer", "Raita", "Papad"],
            dinner: ["Roti", "Rice", "Chicken Curry", "Dal Tadka", "Veg Biryani", "Gulab Jamun"],
            tiffin: ["Tea/Coffee", "Pakora", "Sandwich"]
        },
        rules: ["Girls only", "Biometric entry", "No overnight guests"],
        nearby: ["Gandi Maisamma", "Medchal", "Kompally"]
    },
    "stanza-syracuse-house": {
        name: "Stanza Living Syracuse House",
        area: "Gandi Maisamma",
        city: "Hyderabad",
        lat: 17.5030, lng: 78.3830,
        phone: "+91 98765 40224",
        price: "₹10,099 - ₹15,000",
        gender: "Male",
        occupancy: "Single, Double, Triple",
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=600&h=400&fit=crop",
        amenities: ["WiFi", "AC", "Meals", "CCTV", "Biometric Entry", "Housekeeping", "Gym"],
        foodMenu: {
            breakfast: ["Pongal", "Bread Omelette", "Aloo Paratha", "Cornflakes", "Tea/Coffee"],
            lunch: ["Jeera Rice", "Sambar", "Rasam", "Chicken Tikka", "Chapati", "Salad"],
            dinner: ["Rice", "Butter Naan", "Butter Chicken", "Dal Makhani", "Veg Biryani", "Ice Cream"],
            tiffin: ["Tea/Coffee", "Samosa", "Momos", "Fresh Fruit"]
        },
        rules: ["Boys only", "Biometric entry", "No smoking"],
        nearby: ["Gandi Maisamma", "Medchal X Road", "Bowenpally"]
    },
    "sri-sai-residency-pg": {
        name: "Sri Sai Residency PG",
        area: "Gandi Maisamma",
        city: "Hyderabad",
        lat: 17.5018, lng: 78.3818,
        phone: "+91 98765 40501",
        price: "₹5,000 - ₹8,000",
        gender: "Unisex",
        occupancy: "Double, Triple",
        rating: 4.0,
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
        amenities: ["WiFi", "Meals", "CCTV", "Power Backup", "Parking"],
        roomPrices: {
            double: "₹6,500",
            triple: "₹5,000"
        },
        deposit: "₹3,000",
        lockIn: "1 Month",
        noticePeriod: "7 Days",
        foodType: "Veg & Non-Veg",
        wifiSpeed: "20 Mbps",
        contact: {
            phone: "+91 98765 40501",
            whatsapp: "+91 98765 40501",
            email: "info@srisairesidency.com",
            bookingUrl: ""
        },
        foodMenu: {
            breakfast: ["Idli", "Dosa", "Poha", "Bread", "Tea"],
            lunch: ["Rice", "Sambar", "Rasam", "Chicken Curry", "Curd", "Papad"],
            dinner: ["Rice", "Roti", "Egg Curry", "Dal", "Vegetable", "Sweet"],
            tiffin: ["Tea/Coffee", "Samosa", "Biscuits"]
        },
        rules: ["No smoking", "No alcohol", "Gate closes at 11PM"],
        nearby: ["Gandi Maisamma", "Medchal", "Dulapally"]
    },
    "balaji-mens-pg": {
        name: "Balaji Mens PG",
        area: "Gandi Maisamma",
        city: "Hyderabad",
        lat: 17.5022, lng: 78.3822,
        phone: "+91 98765 40502",
        price: "₹4,500 - ₹7,000",
        gender: "Male",
        occupancy: "Triple, Quad",
        rating: 3.9,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
        amenities: ["WiFi", "Meals", "CCTV", "Power Backup"],
        foodMenu: {
            breakfast: ["Idli", "Dosa", "Upma", "Tea"],
            lunch: ["Rice", "Sambar", "Rasam", "Vegetable", "Curd"],
            dinner: ["Rice", "Roti", "Chicken", "Dal", "Vegetable"],
            tiffin: ["Tea", "Biscuits"]
        },
        rules: ["Boys only", "No smoking", "Visitor hours: 9AM-8PM"],
        nearby: ["Gandi Maisamma", "Kompally", "Jeedimetla"]
    },
    "lakshmi-narasimha-ladies-pg": {
        name: "Lakshmi Narasimha Ladies PG",
        area: "Gandi Maisamma",
        city: "Hyderabad",
        lat: 17.5028, lng: 78.3828,
        phone: "+91 98765 40503",
        price: "₹4,000 - ₹6,500",
        gender: "Female",
        occupancy: "Double, Triple",
        rating: 4.1,
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop",
        amenities: ["WiFi", "Meals", "CCTV", "24/7 Security", "Power Backup"],
        foodMenu: {
            breakfast: ["Idli", "Dosa", "Pongal", "Bread Butter", "Tea"],
            lunch: ["Rice", "Sambar", "Rasam", "Paneer Curry", "Curd", "Papad"],
            dinner: ["Rice", "Roti", "Dal", "Vegetable Curry", "Pickle", "Sweet"],
            tiffin: ["Tea/Coffee", "Biscuits", "Samosa"]
        },
        rules: ["Girls only", "No male visitors", "Gate closes at 9:30PM"],
        nearby: ["Gandi Maisamma", "Medchal", "Bowenpally"]
    },
    "vinayaka-boys-hostel": {
        name: "Vinayaka Boys Hostel",
        area: "Gandi Maisamma",
        city: "Hyderabad",
        lat: 17.5012, lng: 78.3812,
        phone: "+91 98765 40504",
        price: "₹4,000 - ₹6,000",
        gender: "Male",
        occupancy: "Triple, Quad",
        rating: 3.8,
        image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
        amenities: ["WiFi", "Meals", "CCTV"],
        foodMenu: {
            breakfast: ["Idli", "Dosa", "Poha", "Tea"],
            lunch: ["Rice", "Sambar", "Rasam", "Vegetable", "Curd"],
            dinner: ["Rice", "Roti", "Egg Curry", "Dal", "Vegetable"],
            tiffin: ["Tea", "Biscuits"]
        },
        rules: ["Boys only", "No smoking", "Gate closes at 10:30PM"],
        nearby: ["Gandi Maisamma", "Maisammaguda", "Dulapally"]
    },
    "sri-venkateswara-pg": {
        name: "Sri Venkateswara PG",
        area: "Gandi Maisamma",
        city: "Hyderabad",
        lat: 17.5032, lng: 78.3832,
        phone: "+91 98765 40505",
        price: "₹5,500 - ₹9,000",
        gender: "Unisex",
        occupancy: "Single, Double, Triple",
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
        amenities: ["WiFi", "AC", "Meals", "CCTV", "Power Backup", "Housekeeping"],
        foodMenu: {
            breakfast: ["Masala Dosa", "Idli Vada", "Paratha", "Tea/Coffee"],
            lunch: ["Rice", "Sambar", "Rasam", "Chicken Curry", "Raita", "Papad"],
            dinner: ["Roti", "Rice", "Paneer Butter Masala", "Dal", "Vegetable", "Gulab Jamun"],
            tiffin: ["Tea/Coffee", "Pakora", "Biscuits"]
        },
        rules: ["No smoking", "No alcohol", "ID proof required"],
        nearby: ["Gandi Maisamma", "Kompally", "Jeedimetla"]
    },
    "padmavathi-womens-hostel": {
        name: "Padmavathi Womens Hostel",
        area: "Gandi Maisamma",
        city: "Hyderabad",
        lat: 17.5008, lng: 78.3808,
        phone: "+91 98765 40506",
        price: "₹3,500 - ₹5,500",
        gender: "Female",
        occupancy: "Triple, Quad",
        rating: 3.9,
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=400&fit=crop",
        amenities: ["WiFi", "Meals", "CCTV", "24/7 Security"],
        foodMenu: {
            breakfast: ["Idli", "Dosa", "Poha", "Tea"],
            lunch: ["Rice", "Sambar", "Rasam", "Vegetable", "Curd"],
            dinner: ["Rice", "Roti", "Dal", "Vegetable", "Pickle"],
            tiffin: ["Tea", "Biscuits"]
        },
        rules: ["Girls only", "No male visitors", "Gate closes at 9PM"],
        nearby: ["Gandi Maisamma", "Medchal", "Shamirpet"]
    },
    "rama-rao-mens-pg": {
        name: "Rama Rao Mens PG",
        area: "Gandi Maisamma",
        city: "Hyderabad",
        lat: 17.5038, lng: 78.3838,
        phone: "+91 98765 40507",
        price: "₹4,500 - ₹7,500",
        gender: "Male",
        occupancy: "Double, Triple",
        rating: 4.0,
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&h=400&fit=crop",
        amenities: ["WiFi", "Meals", "CCTV", "Power Backup", "Parking"],
        foodMenu: {
            breakfast: ["Idli", "Dosa", "Pongal", "Bread", "Tea"],
            lunch: ["Rice", "Sambar", "Rasam", "Chicken Curry", "Curd", "Papad"],
            dinner: ["Rice", "Roti", "Egg Curry", "Dal", "Vegetable Curry", "Sweet"],
            tiffin: ["Tea/Coffee", "Samosa", "Biscuits"]
        },
        rules: ["Boys only", "No smoking", "No alcohol"],
        nearby: ["Gandi Maisamma", "Kompally", "Dulapally"]
    },
    "sri-durga-girls-hostel": {
        name: "Sri Durga Girls Hostel",
        area: "Gandi Maisamma",
        city: "Hyderabad",
        lat: 17.5005, lng: 78.3805,
        phone: "+91 98765 40508",
        price: "₹3,800 - ₹6,000",
        gender: "Female",
        occupancy: "Triple, Quad",
        rating: 3.8,
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop",
        amenities: ["WiFi", "Meals", "CCTV", "24/7 Security", "Power Backup"],
        foodMenu: {
            breakfast: ["Idli", "Dosa", "Upma", "Tea"],
            lunch: ["Rice", "Sambar", "Rasam", "Paneer", "Curd"],
            dinner: ["Rice", "Roti", "Dal", "Vegetable", "Pickle"],
            tiffin: ["Tea", "Biscuits"]
        },
        rules: ["Girls only", "No male visitors", "Gate closes at 9PM"],
        nearby: ["Gandi Maisamma", "Medchal", "Bowenpally"]
    },
    "kumar-pg-accommodation": {
        name: "Kumar PG Accommodation",
        area: "Gandi Maisamma",
        city: "Hyderabad",
        lat: 17.5042, lng: 78.3842,
        phone: "+91 98765 40509",
        price: "₹5,000 - ₹8,500",
        gender: "Unisex",
        occupancy: "Double, Triple",
        rating: 4.1,
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop",
        amenities: ["WiFi", "Meals", "CCTV", "Power Backup", "Housekeeping"],
        foodMenu: {
            breakfast: ["Masala Dosa", "Idli", "Paratha", "Tea/Coffee"],
            lunch: ["Rice", "Sambar", "Rasam", "Chicken Curry", "Raita"],
            dinner: ["Roti", "Rice", "Paneer Curry", "Dal", "Vegetable", "Sweet"],
            tiffin: ["Tea/Coffee", "Pakora", "Biscuits"]
        },
        rules: ["No smoking", "ID proof required", "Gate closes at 11PM"],
        nearby: ["Gandi Maisamma", "Kompally", "Jeedimetla"]
    },
    "sai-baba-mens-hostel": {
        name: "Sai Baba Mens Hostel",
        area: "Gandi Maisamma",
        city: "Hyderabad",
        lat: 17.5002, lng: 78.3802,
        phone: "+91 98765 40510",
        price: "₹4,000 - ₹6,500",
        gender: "Male",
        occupancy: "Triple, Quad",
        rating: 3.7,
        image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=600&h=400&fit=crop",
        amenities: ["WiFi", "Meals", "CCTV"],
        foodMenu: {
            breakfast: ["Idli", "Dosa", "Poha", "Tea"],
            lunch: ["Rice", "Sambar", "Rasam", "Vegetable", "Curd"],
            dinner: ["Rice", "Roti", "Egg Curry", "Dal", "Vegetable"],
            tiffin: ["Tea", "Biscuits"]
        },
        rules: ["Boys only", "No smoking", "Visitor hours: 9AM-8PM"],
        nearby: ["Gandi Maisamma", "Maisammaguda", "Dulapally"]
    },
    "annapurna-ladies-pg": {
        name: "Annapurna Ladies PG",
        area: "Gandi Maisamma",
        city: "Hyderabad",
        lat: 17.5045, lng: 78.3845,
        phone: "+91 98765 40511",
        price: "₹4,200 - ₹7,000",
        gender: "Female",
        occupancy: "Double, Triple",
        rating: 4.0,
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
        amenities: ["WiFi", "Meals", "CCTV", "24/7 Security", "Power Backup"],
        foodMenu: {
            breakfast: ["Idli", "Dosa", "Pongal", "Bread Butter", "Tea"],
            lunch: ["Rice", "Sambar", "Rasam", "Paneer Curry", "Curd", "Papad"],
            dinner: ["Rice", "Roti", "Dal", "Vegetable Curry", "Sweet"],
            tiffin: ["Tea/Coffee", "Samosa", "Biscuits"]
        },
        rules: ["Girls only", "No male visitors", "Gate closes at 9:30PM"],
        nearby: ["Gandi Maisamma", "Medchal", "Kompally"]
    },
    "venkataramana-boys-pg": {
        name: "Venkataramana Boys PG",
        area: "Gandi Maisamma",
        city: "Hyderabad",
        lat: 17.5015, lng: 78.3815,
        phone: "+91 98765 40512",
        price: "₹4,500 - ₹7,000",
        gender: "Male",
        occupancy: "Double, Triple",
        rating: 3.9,
        image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
        amenities: ["WiFi", "Meals", "CCTV", "Power Backup"],
        foodMenu: {
            breakfast: ["Idli", "Dosa", "Upma", "Bread", "Tea"],
            lunch: ["Rice", "Sambar", "Rasam", "Chicken", "Curd"],
            dinner: ["Rice", "Roti", "Dal", "Egg Curry", "Vegetable"],
            tiffin: ["Tea", "Biscuits", "Snacks"]
        },
        rules: ["Boys only", "No smoking", "Gate closes at 10:30PM"],
        nearby: ["Gandi Maisamma", "Maisammaguda", "Bowenpally"]
    },
    // WARANGAL
    "bc-hostel-warangal": {
        name: "B.C Hostel",
        area: "Warangal",
        city: "Warangal",
        lat: 17.9784, lng: 79.5941,
        phone: "+91 98765 40347",
        price: "₹3,000 - ₹5,000",
        gender: "Male",
        occupancy: "Triple, Quad",
        rating: 3.7,
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=400&fit=crop",
        amenities: ["WiFi", "Meals", "CCTV", "Library"],
        foodMenu: {
            breakfast: ["Idli", "Dosa", "Poha", "Tea"],
            lunch: ["Rice", "Sambar", "Rasam", "Vegetable", "Curd"],
            dinner: ["Rice", "Roti", "Egg Curry", "Dal", "Pickle"],
            tiffin: ["Tea", "Biscuits"]
        },
        rules: ["Boys only", "No smoking", "Study hours: 8PM-10PM"],
        nearby: ["Warangal Bus Stand", "Kakatiya University", "NIT Warangal"]
    },
    "geetha-boys-hostel": {
        name: "Geetha Boys Hostel",
        area: "Warangal",
        city: "Warangal",
        lat: 17.9800, lng: 79.5960,
        phone: "+91 98765 40348",
        price: "₹3,500 - ₹5,500",
        gender: "Male",
        occupancy: "Double, Triple",
        rating: 3.8,
        image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
        amenities: ["WiFi", "Meals", "CCTV", "Power Backup"],
        foodMenu: {
            breakfast: ["Idli", "Dosa", "Wada", "Tea"],
            lunch: ["Rice", "Sambar", "Rasam", "Chicken", "Curd"],
            dinner: ["Rice", "Roti", "Dal", "Vegetable", "Pickle"],
            tiffin: ["Tea", "Biscuits", "Snacks"]
        },
        rules: ["Boys only", "Gate closes at 10:30PM"],
        nearby: ["Warangal", "Hanamkonda", "Kazipet"]
    },
    "bharati-womens-hostel": {
        name: "Bharati Women's Hostel",
        area: "Hanamkonda",
        city: "Warangal",
        lat: 17.9750, lng: 79.5600,
        phone: "+91 98765 40355",
        price: "₹3,000 - ₹5,000",
        gender: "Female",
        occupancy: "Triple, Quad",
        rating: 3.9,
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop",
        amenities: ["WiFi", "Meals", "CCTV", "24/7 Security"],
        foodMenu: {
            breakfast: ["Idli", "Dosa", "Pongal", "Tea"],
            lunch: ["Rice", "Sambar", "Rasam", "Paneer", "Curd"],
            dinner: ["Rice", "Roti", "Dal", "Vegetable", "Sweet"],
            tiffin: ["Tea", "Biscuits"]
        },
        rules: ["Girls only", "No male visitors", "Gate closes at 9PM"],
        nearby: ["Hanamkonda", "Warangal", "Kakatiya University"]
    },
    // KARIMNAGAR
    "girls-hostel-karimnagar": {
        name: "Girls Hostel Karimnagar",
        area: "Karimnagar",
        city: "Karimnagar",
        lat: 18.4386, lng: 79.1288,
        phone: "+91 98765 40358",
        price: "₹3,500 - ₹6,000",
        gender: "Female",
        occupancy: "Double, Triple",
        rating: 3.8,
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
        amenities: ["WiFi", "Meals", "CCTV", "Power Backup", "Library"],
        foodMenu: {
            breakfast: ["Idli", "Dosa", "Poha", "Bread", "Tea"],
            lunch: ["Rice", "Sambar", "Rasam", "Vegetable", "Curd", "Papad"],
            dinner: ["Rice", "Roti", "Dal", "Egg Curry", "Vegetable"],
            tiffin: ["Tea", "Biscuits", "Samosa"]
        },
        rules: ["Girls only", "No male visitors", "Gate closes at 9:30PM"],
        nearby: ["Karimnagar Bus Stand", "JNTU Karimnagar", "Elgandal Fort"]
    },
    "laxmi-priya-girls-hostel": {
        name: "Laxmi Priya Girls Hostel",
        area: "Karimnagar",
        city: "Karimnagar",
        lat: 18.4400, lng: 79.1300,
        phone: "+91 98765 40359",
        price: "₹3,000 - ₹5,000",
        gender: "Female",
        occupancy: "Triple, Quad",
        rating: 3.7,
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop",
        amenities: ["WiFi", "Meals", "CCTV"],
        foodMenu: {
            breakfast: ["Idli", "Dosa", "Poha", "Tea"],
            lunch: ["Rice", "Sambar", "Rasam", "Vegetable", "Curd"],
            dinner: ["Rice", "Roti", "Dal", "Vegetable", "Pickle"],
            tiffin: ["Tea", "Biscuits"]
        },
        rules: ["Girls only", "Visitor hours: 9AM-7PM"],
        nearby: ["Karimnagar", "Deer Park", "Lower Manair Dam"]
    },
    // NIZAMABAD
    "annapurna-girls-hostel": {
        name: "Annapurna Girls Hostel",
        area: "Nizamabad",
        city: "Nizamabad",
        lat: 18.6725, lng: 78.0940,
        phone: "+91 98765 40368",
        price: "₹2,500 - ₹4,500",
        gender: "Female",
        occupancy: "Triple, Quad",
        rating: 3.6,
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&h=400&fit=crop",
        amenities: ["WiFi", "Meals", "CCTV", "24/7 Security"],
        foodMenu: {
            breakfast: ["Idli", "Dosa", "Poha", "Tea"],
            lunch: ["Rice", "Sambar", "Rasam", "Vegetable", "Curd"],
            dinner: ["Rice", "Roti", "Dal", "Vegetable", "Pickle"],
            tiffin: ["Tea", "Biscuits"]
        },
        rules: ["Girls only", "Gate closes at 9PM"],
        nearby: ["Nizamabad Bus Stand", "Nizamabad Railway Station", "Nizam Fort"]
    },
    "himalaya-luxury-pg": {
        name: "Himalaya Luxury Boys Hostel & PG",
        area: "Nizamabad",
        city: "Nizamabad",
        lat: 18.6712, lng: 78.0932,
        phone: "+91 98765 40380",
        price: "₹4,000 - ₹7,000",
        gender: "Male",
        occupancy: "Double, Triple",
        rating: 4.0,
        image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=600&h=400&fit=crop",
        amenities: ["WiFi", "AC", "Meals", "CCTV", "Study Room", "Recreation Room"],
        foodMenu: {
            breakfast: ["Idli", "Dosa", "Pongal", "Bread Omelette", "Tea"],
            lunch: ["Rice", "Sambar", "Rasam", "Chicken Curry", "Curd", "Papad"],
            dinner: ["Rice", "Roti", "Egg Curry", "Dal", "Vegetable", "Sweet"],
            tiffin: ["Tea/Coffee", "Samosa", "Biscuits"]
        },
        rules: ["Boys only", "No smoking", "Study hours maintained"],
        nearby: ["Nizamabad", "Polytechnic", "Nizamabad Railway Station"]
    },
    // KHAMMAM
    "rayudugarillu-pg": {
        name: "Rayudugarillu PG",
        area: "Khammam",
        city: "Khammam",
        lat: 17.2473, lng: 80.1514,
        phone: "+91 98765 40389",
        price: "₹3,000 - ₹5,000",
        gender: "Male",
        occupancy: "Double, Triple",
        rating: 3.7,
        image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
        amenities: ["WiFi", "Meals", "CCTV", "Power Backup"],
        foodMenu: {
            breakfast: ["Idli", "Dosa", "Poha", "Tea"],
            lunch: ["Rice", "Sambar", "Rasam", "Chicken", "Curd"],
            dinner: ["Rice", "Roti", "Dal", "Egg Curry", "Vegetable"],
            tiffin: ["Tea", "Biscuits"]
        },
        rules: ["Boys only", "No smoking", "Gate closes at 10:30PM"],
        nearby: ["Khammam Bus Stand", "Khammam Railway Station", "Nelakondapalli"]
    },
    "sri-sai-dormitory": {
        name: "Sri Sai Dormitory",
        area: "Khammam",
        city: "Khammam",
        lat: 17.2480, lng: 80.1520,
        phone: "+91 98765 40390",
        price: "₹2,500 - ₹4,000",
        gender: "Male",
        occupancy: "Quad, Dorm",
        rating: 3.5,
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=400&fit=crop",
        amenities: ["WiFi", "Meals", "CCTV"],
        foodMenu: {
            breakfast: ["Idli", "Dosa", "Poha", "Tea"],
            lunch: ["Rice", "Sambar", "Rasam", "Vegetable", "Curd"],
            dinner: ["Rice", "Roti", "Dal", "Vegetable", "Pickle"],
            tiffin: ["Tea", "Biscuits"]
        },
        rules: ["Boys only", "Quiet hours after 10PM"],
        nearby: ["Khammam", "Wyra Road", "SVK Residency"]
    },
    // NALGONDA
    "ashareddy-boys-hostel": {
        name: "Ashareddy Boys Hostel",
        area: "Nalgonda",
        city: "Nalgonda",
        lat: 17.0575, lng: 79.2670,
        phone: "+91 98765 40402",
        price: "₹2,500 - ₹4,500",
        gender: "Male",
        occupancy: "Triple, Quad",
        rating: 3.6,
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&h=400&fit=crop",
        amenities: ["WiFi", "Meals", "CCTV"],
        foodMenu: {
            breakfast: ["Idli", "Dosa", "Poha", "Tea"],
            lunch: ["Rice", "Sambar", "Rasam", "Vegetable", "Curd"],
            dinner: ["Rice", "Roti", "Dal", "Vegetable", "Pickle"],
            tiffin: ["Tea", "Biscuits"]
        },
        rules: ["Boys only", "No smoking"],
        nearby: ["Nalgonda Bus Stand", "Mahatma Gandhi University", "Nalgonda Fort"]
    }
};

// Helper function to generate slug from name
function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// Generate missing PG entries from the simple list
var simplePGs = [
    { name: "Zolo Sterling PG", area: "Hitec City", city: "Hyderabad", lat: 17.4498, lng: 78.3782, phone: "+91 98765 40002" },
    { name: "Zolo Berry PG", area: "Hitec City", city: "Hyderabad", lat: 17.4475, lng: 78.3801, phone: "+91 98765 40004" },
    { name: "HelloWorld Hitex PG", area: "Hitex", city: "Hyderabad", lat: 17.4520, lng: 78.3810, phone: "+91 98765 40005" },
    { name: "HelloWorld Wazeer PG", area: "Hitec City", city: "Hyderabad", lat: 17.4460, lng: 78.3755, phone: "+91 98765 40006" },
    { name: "HelloWorld Khushnuma PG", area: "Madhapur", city: "Hyderabad", lat: 17.4530, lng: 78.3820, phone: "+91 98765 40007" },
    { name: "R3 Lexus CoLive PG", area: "Hitec City", city: "Hyderabad", lat: 17.4505, lng: 78.3790, phone: "+91 98765 40009" },
    { name: "Sri Sharavana Bhava Mens PG", area: "Madhapur", city: "Hyderabad", lat: 17.4515, lng: 78.3815, phone: "+91 98765 40010" },
    { name: "R3 CoHESIA PG", area: "Madhapur", city: "Hyderabad", lat: 17.4500, lng: 78.3805, phone: "+91 98765 40011" },
    { name: "Estay Executive Mens PG", area: "Hitec City", city: "Hyderabad", lat: 17.4490, lng: 78.3775, phone: "+91 98765 40012" },
    { name: "Pink Pride Living Womens PG", area: "Hitec City", city: "Hyderabad", lat: 17.4485, lng: 78.3768, phone: "+91 98765 40013" },
    { name: "As Grand PG Mens Hostel", area: "Madhapur", city: "Hyderabad", lat: 17.4508, lng: 78.3798, phone: "+91 98765 40014" },
    { name: "Breeze Coliving Mens PG", area: "Madhapur", city: "Hyderabad", lat: 17.4512, lng: 78.3808, phone: "+91 98765 40015" },
    { name: "Blue Buzz Coliving PG", area: "Madhapur", city: "Hyderabad", lat: 17.4518, lng: 78.3812, phone: "+91 98765 40016" },
    { name: "Rockline Mens PG & Coliving", area: "Madhapur", city: "Hyderabad", lat: 17.4522, lng: 78.3818, phone: "+91 98765 40017" },
    { name: "Ample Suites PG", area: "Hitec City", city: "Hyderabad", lat: 17.4495, lng: 78.3785, phone: "+91 98765 40018" },
    { name: "Zolo Bourbon PG", area: "Gachibowli", city: "Hyderabad", lat: 17.4405, lng: 78.3495, phone: "+91 98765 40029" },
    { name: "Zolo Rurban PG", area: "Gachibowli", city: "Hyderabad", lat: 17.4395, lng: 78.3485, phone: "+91 98765 40030" },
    { name: "Zolo Atticus PG", area: "Gachibowli", city: "Hyderabad", lat: 17.4388, lng: 78.3478, phone: "+91 98765 40031" },
    { name: "HelloWorld Inayat PG", area: "Gachibowli", city: "Hyderabad", lat: 17.4375, lng: 78.3465, phone: "+91 98765 40032" },
    { name: "HelloWorld Zeenat PG", area: "Gachibowli", city: "Hyderabad", lat: 17.4378, lng: 78.3468, phone: "+91 98765 40034" },
    { name: "HelloWorld Naayaab PG", area: "Gachibowli", city: "Hyderabad", lat: 17.4382, lng: 78.3472, phone: "+91 98765 40035" },
    { name: "HelloWorld Taj PG", area: "Gachibowli", city: "Hyderabad", lat: 17.4368, lng: 78.3458, phone: "+91 98765 40036" },
    { name: "Stanza Living Marianna House", area: "Gachibowli", city: "Hyderabad", lat: 17.4392, lng: 78.3482, phone: "+91 98765 40037" },
    { name: "Stanza Living Conroe House", area: "Gachibowli", city: "Hyderabad", lat: 17.4408, lng: 78.3502, phone: "+91 98765 40038" },
    { name: "Stanza Living Kassel House", area: "Gachibowli", city: "Hyderabad", lat: 17.4385, lng: 78.3475, phone: "+91 98765 40039" },
    { name: "Stanza Living Mendoza House", area: "Gachibowli", city: "Hyderabad", lat: 17.4402, lng: 78.3498, phone: "+91 98765 40040" },
    { name: "Stanza Living Munich House", area: "Gachibowli", city: "Hyderabad", lat: 17.4412, lng: 78.3508, phone: "+91 98765 40041" },
    { name: "Stanza Living Bremen House", area: "Gachibowli", city: "Hyderabad", lat: 17.4378, lng: 78.3462, phone: "+91 98765 40042" },
    { name: "Stanza Living Limoges House", area: "Gachibowli", city: "Hyderabad", lat: 17.4372, lng: 78.3455, phone: "+91 98765 40043" },
    { name: "Stanza Living Sunderland House", area: "Gachibowli", city: "Hyderabad", lat: 17.4418, lng: 78.3515, phone: "+91 98765 40044" },
    { name: "Stanza Living Rabat House", area: "Gachibowli", city: "Hyderabad", lat: 17.4388, lng: 78.3478, phone: "+91 98765 40045" },
    { name: "Stanza Living Vigo House", area: "Gachibowli", city: "Hyderabad", lat: 17.4395, lng: 78.3488, phone: "+91 98765 40046" },
    { name: "Manjula Womens PG", area: "Gachibowli", city: "Hyderabad", lat: 17.4370, lng: 78.3450, phone: "+91 98765 40047" },
    { name: "YS Luxury Coliving PG", area: "Gachibowli", city: "Hyderabad", lat: 17.4365, lng: 78.3445, phone: "+91 98765 40048" },
    { name: "SV VIHANG Co Living PG", area: "Gachibowli", city: "Hyderabad", lat: 17.4425, lng: 78.3525, phone: "+91 98765 40049" },
    { name: "BSR Executive Mens PG", area: "Gachibowli", city: "Hyderabad", lat: 17.4405, lng: 78.3500, phone: "+91 98765 40050" },
    { name: "Sasya Elite Co-Living PG", area: "Gachibowli", city: "Hyderabad", lat: 17.4398, lng: 78.3490, phone: "+91 98765 40051" },
    { name: "Smart Homes For Girls PG", area: "Gachibowli", city: "Hyderabad", lat: 17.4380, lng: 78.3470, phone: "+91 98765 40052" },
    { name: "Yuvanshika Womens PG", area: "Gachibowli", city: "Hyderabad", lat: 17.4375, lng: 78.3460, phone: "+91 98765 40053" },
    { name: "Dhana Lakshmi Mens PG", area: "Gachibowli", city: "Hyderabad", lat: 17.4415, lng: 78.3512, phone: "+91 98765 40054" },
    { name: "Kiran Mens and Womens Hostel", area: "Gachibowli", city: "Hyderabad", lat: 17.4360, lng: 78.3440, phone: "+91 98765 40055" },
    { name: "HelloWorld Sukoon PG", area: "Kondapur", city: "Hyderabad", lat: 17.4650, lng: 78.3650, phone: "+91 98765 40067" },
    { name: "HelloWorld Kohinoor PG", area: "Kondapur", city: "Hyderabad", lat: 17.4580, lng: 78.3720, phone: "+91 98765 40068" },
    { name: "HelloWorld Inarah PG", area: "Kondapur", city: "Hyderabad", lat: 17.4590, lng: 78.3730, phone: "+91 98765 40069" },
    { name: "HelloWorld Justajoo PG", area: "Kondapur", city: "Hyderabad", lat: 17.4570, lng: 78.3710, phone: "+91 98765 40070" },
    { name: "SVS Comforts Co-Living PG", area: "Kondapur", city: "Hyderabad", lat: 17.4605, lng: 78.3745, phone: "+91 98765 40071" },
    { name: "Tranquil Stay PG", area: "Kondapur", city: "Hyderabad", lat: 17.4505, lng: 78.3655, phone: "+91 98765 40072" },
    { name: "LIVE WELL PREMIUM CO-LIVE", area: "Kondapur", city: "Hyderabad", lat: 17.4585, lng: 78.3725, phone: "+91 98765 40073" },
    { name: "NeoCon Stay PG", area: "Kondapur", city: "Hyderabad", lat: 17.4575, lng: 78.3735, phone: "+91 98765 40074" },
    { name: "NEXORA COLIVING PG", area: "Kondapur", city: "Hyderabad", lat: 17.4595, lng: 78.3755, phone: "+91 98765 40075" },
    { name: "Vibehaus Coliving PG", area: "Kondapur", city: "Hyderabad", lat: 17.4615, lng: 78.3725, phone: "+91 98765 40076" },
    { name: "Stanza Living Canberra House", area: "Kondapur", city: "Hyderabad", lat: 17.4565, lng: 78.3695, phone: "+91 98765 40077" },
    { name: "Zolo Silverstone PG", area: "Miyapur", city: "Hyderabad", lat: 17.5024, lng: 78.3012, phone: "+91 98765 40083" },
    { name: "Zolo Midway PG", area: "KPHB", city: "Hyderabad", lat: 17.4875, lng: 78.3200, phone: "+91 98765 40084" },
    { name: "HelloWorld Pacific PG", area: "KPHB", city: "Hyderabad", lat: 17.4900, lng: 78.3180, phone: "+91 98765 40085" },
    { name: "HelloWorld Firdaus PG", area: "Kukatpally", city: "Hyderabad", lat: 17.4920, lng: 78.3210, phone: "+91 98765 40086" },
    { name: "Stanza Living Bagan House", area: "Kukatpally", city: "Hyderabad", lat: 17.4880, lng: 78.3190, phone: "+91 98765 40087" },
    { name: "GVK PG Hostels", area: "Kukatpally", city: "Hyderabad", lat: 17.4850, lng: 78.3250, phone: "+91 98765 40088" },
    { name: "HelloWorld Lifestyle PG", area: "Begumpet", city: "Hyderabad", lat: 17.4434, lng: 78.4687, phone: "+91 98765 40091" },
    { name: "Surya Teja Deluxe Mens Hostel", area: "Ameerpet", city: "Hyderabad", lat: 17.4320, lng: 78.4100, phone: "+91 98765 40092" },
    { name: "Heritage Paying Guest", area: "Punjagutta", city: "Hyderabad", lat: 17.4200, lng: 78.4300, phone: "+91 98765 40093" },
    { name: "HelloWorld Jumeirah PG", area: "Banjara Hills", city: "Hyderabad", lat: 17.4180, lng: 78.4380, phone: "+91 98765 40096" },
    { name: "SR Premium PG for Boys", area: "Banjara Hills", city: "Hyderabad", lat: 17.4160, lng: 78.4330, phone: "+91 98765 40097" },
    { name: "Elite Vista Luxury Living", area: "Banjara Hills", city: "Hyderabad", lat: 17.4170, lng: 78.4360, phone: "+91 98765 40099" },
    { name: "Zolo Autumn PG", area: "Manikonda", city: "Hyderabad", lat: 17.4200, lng: 78.3500, phone: "+91 98765 40103" },
    { name: "SV PG For Men", area: "Tarnaka", city: "Hyderabad", lat: 17.3900, lng: 78.5100, phone: "+91 98765 40107" },
    { name: "SHINE Executive Boys Hostel", area: "LB Nagar", city: "Hyderabad", lat: 17.3600, lng: 78.5400, phone: "+91 98765 40115" },
    { name: "Care Paying Guest Home", area: "Mehdipatnam", city: "Hyderabad", lat: 17.3700, lng: 78.4600, phone: "+91 98765 40113" },
    { name: "Sri Sai Balaji Boys PG Hostel", area: "Maisammaguda", city: "Hyderabad", lat: 17.5078, lng: 78.3878, phone: "+91 98765 40209" },
    { name: "Ritz Mens Hostel", area: "Maisammaguda", city: "Hyderabad", lat: 17.5088, lng: 78.3888, phone: "+91 98765 40210" },
    { name: "My Guest PG", area: "Maisammaguda", city: "Hyderabad", lat: 17.5092, lng: 78.3892, phone: "+91 98765 40211" },
    { name: "Sai Vaibhav PG For Ladies", area: "Maisammaguda", city: "Hyderabad", lat: 17.5102, lng: 78.3902, phone: "+91 98765 40212" },
    { name: "Lakshmi Narasimha Boys PG", area: "Maisammaguda", city: "Hyderabad", lat: 17.5108, lng: 78.3908, phone: "+91 98765 40213" },
    { name: "Sai Amrutha Ladies PG", area: "Maisammaguda", city: "Hyderabad", lat: 17.5112, lng: 78.3912, phone: "+91 98765 40214" },
    { name: "Mounika Boys PG & Hostel", area: "Maisammaguda", city: "Hyderabad", lat: 17.5118, lng: 78.3918, phone: "+91 98765 40215" },
    { name: "Sai Ram PG Ladies", area: "Maisammaguda", city: "Hyderabad", lat: 17.5122, lng: 78.3922, phone: "+91 98765 40216" },
    { name: "Friends PG For Women", area: "Maisammaguda", city: "Hyderabad", lat: 17.5128, lng: 78.3928, phone: "+91 98765 40217" },
    { name: "Sai Hanuman Luxury PG", area: "Maisammaguda", city: "Hyderabad", lat: 17.5132, lng: 78.3932, phone: "+91 98765 40218" },
    { name: "Akhil PG for Mens", area: "Maisammaguda", city: "Hyderabad", lat: 17.5138, lng: 78.3938, phone: "+91 98765 40219" },
    { name: "Stanza Living Zenica House", area: "Gandi Maisamma", city: "Hyderabad", lat: 17.5015, lng: 78.3815, phone: "+91 98765 40225" },
    { name: "Stanza Living Tuzla House", area: "Gandi Maisamma", city: "Hyderabad", lat: 17.5025, lng: 78.3825, phone: "+91 98765 40226" },
    { name: "Stanza Living Meknes House", area: "Gandi Maisamma", city: "Hyderabad", lat: 17.5010, lng: 78.3810, phone: "+91 98765 40227" },
    { name: "Stanza Living Gateshead House", area: "Gandi Maisamma", city: "Hyderabad", lat: 17.5035, lng: 78.3835, phone: "+91 98765 40228" },
    { name: "LAXMI Boys Hostel & PG", area: "Warangal", city: "Warangal", lat: 17.9790, lng: 79.5930, phone: "+91 98765 40350" },
    { name: "Venkata Sai Boys Hostel", area: "Warangal", city: "Warangal", lat: 17.9860, lng: 79.5910, phone: "+91 98765 40352" },
    { name: "PG Junior Doctors Hostel", area: "Warangal", city: "Warangal", lat: 17.9840, lng: 79.5890, phone: "+91 98765 40354" },
    { name: "Vasundara Ladies Hostel", area: "Hanamkonda", city: "Warangal", lat: 17.9740, lng: 79.5580, phone: "+91 98765 40356" },
    { name: "Ananya Girls Hostel", area: "Hanamkonda", city: "Warangal", lat: 17.9760, lng: 79.5620, phone: "+91 98765 40357" },
    { name: "Likhitha Deluxe Girls Hostel", area: "Karimnagar", city: "Karimnagar", lat: 18.4370, lng: 79.1270, phone: "+91 98765 40360" },
    { name: "Padmanayaka Womens Hostel", area: "Karimnagar", city: "Karimnagar", lat: 18.4390, lng: 79.1290, phone: "+91 98765 40361" },
    { name: "Sri Balaji Boys & Mens Hostel", area: "Karimnagar", city: "Karimnagar", lat: 18.4410, lng: 79.1310, phone: "+91 98765 40363" },
    { name: "Vanitha Girls Hostel", area: "Karimnagar", city: "Karimnagar", lat: 18.4375, lng: 79.1275, phone: "+91 98765 40366" },
    { name: "Kaveri Girls Hostel", area: "Nizamabad", city: "Nizamabad", lat: 18.6710, lng: 78.0930, phone: "+91 98765 40370" },
    { name: "Shiva Kiran Boys Hostel", area: "Nizamabad", city: "Nizamabad", lat: 18.6700, lng: 78.0920, phone: "+91 98765 40374" },
    { name: "Sri Purna Hostel", area: "Nizamabad", city: "Nizamabad", lat: 18.6750, lng: 78.0970, phone: "+91 98765 40377" },
    { name: "Sharada Dormitory", area: "Khammam", city: "Khammam", lat: 17.2460, lng: 80.1500, phone: "+91 98765 40391" },
    { name: "PR Mens Deluxe Hostel", area: "Khammam", city: "Khammam", lat: 17.2478, lng: 80.1518, phone: "+91 98765 40394" },
    { name: "Kasturi Boys PG", area: "Khammam", city: "Khammam", lat: 17.2475, lng: 80.1515, phone: "+91 98765 40398" },
    { name: "PG Office Nalgonda", area: "Nalgonda", city: "Nalgonda", lat: 17.0580, lng: 79.2675, phone: "+91 98765 40403" },
    { name: "Srija Girls Hostel", area: "Nalgonda", city: "Nalgonda", lat: 17.0585, lng: 79.2680, phone: "+91 98765 40406" },
    { name: "Kanha Shanti Vanam Dorms", area: "Mahbubnagar", city: "Mahbubnagar", lat: 16.7488, lng: 77.9853, phone: "+91 98765 40197" },
    // GANDI MAISAMMA - Additional PGs
    { name: "Sri Sai Residency PG", area: "Gandi Maisamma", city: "Hyderabad", lat: 17.5018, lng: 78.3818, phone: "+91 98765 40501" },
    { name: "Balaji Mens PG", area: "Gandi Maisamma", city: "Hyderabad", lat: 17.5022, lng: 78.3822, phone: "+91 98765 40502" },
    { name: "Lakshmi Narasimha Ladies PG", area: "Gandi Maisamma", city: "Hyderabad", lat: 17.5028, lng: 78.3828, phone: "+91 98765 40503" },
    { name: "Vinayaka Boys Hostel", area: "Gandi Maisamma", city: "Hyderabad", lat: 17.5012, lng: 78.3812, phone: "+91 98765 40504" },
    { name: "Sri Venkateswara PG", area: "Gandi Maisamma", city: "Hyderabad", lat: 17.5032, lng: 78.3832, phone: "+91 98765 40505" },
    { name: "Padmavathi Womens Hostel", area: "Gandi Maisamma", city: "Hyderabad", lat: 17.5008, lng: 78.3808, phone: "+91 98765 40506" },
    { name: "Rama Rao Mens PG", area: "Gandi Maisamma", city: "Hyderabad", lat: 17.5038, lng: 78.3838, phone: "+91 98765 40507" },
    { name: "Sri Durga Girls Hostel", area: "Gandi Maisamma", city: "Hyderabad", lat: 17.5005, lng: 78.3805, phone: "+91 98765 40508" },
    { name: "Kumar PG Accommodation", area: "Gandi Maisamma", city: "Hyderabad", lat: 17.5042, lng: 78.3842, phone: "+91 98765 40509" },
    { name: "Sai Baba Mens Hostel", area: "Gandi Maisamma", city: "Hyderabad", lat: 17.5002, lng: 78.3802, phone: "+91 98765 40510" },
    { name: "Annapurna Ladies PG", area: "Gandi Maisamma", city: "Hyderabad", lat: 17.5045, lng: 78.3845, phone: "+91 98765 40511" },
    { name: "Venkataramana Boys PG", area: "Gandi Maisamma", city: "Hyderabad", lat: 17.5015, lng: 78.3815, phone: "+91 98765 40512" }
];

// Auto-generate detail pages for simple PGs
simplePGs.forEach(function(pg) {
    var slug = slugify(pg.name);
    if (!allPGHostels[slug]) {
        var isGirls = pg.name.toLowerCase().includes('women') || pg.name.toLowerCase().includes('ladies') || pg.name.toLowerCase().includes('girls');
        var isBoys = pg.name.toLowerCase().includes('mens') || pg.name.toLowerCase().includes('boys');
        var basePrice = 3000 + Math.floor(Math.random() * 3000);
        var reviewNames = ["Rahul S.", "Priya M.", "Amit K.", "Sneha R.", "Vikram P.", "Deepa N.", "Karthik L.", "Anitha T."];
        var reviewComments = [
            "Good location and clean rooms. Staff is cooperative.",
            "Food quality is decent. WiFi works well.",
            "Value for money. Recommended for students.",
            "Nice place with good security. Near to bus stop.",
            "AC rooms are comfortable. Power backup is available.",
            "Affordable price with good amenities.",
            "Quiet area, good for studying. Gate timing is strict.",
            "Rooms are spacious. Food menu is varied."
        ];
        var numReviews = 2 + Math.floor(Math.random() * 4);
        var reviews = [];
        for (var i = 0; i < numReviews; i++) {
            reviews.push({
                name: reviewNames[Math.floor(Math.random() * reviewNames.length)],
                rating: 3 + Math.floor(Math.random() * 3),
                date: "2025-" + String(Math.floor(Math.random() * 12) + 1).padStart(2, '0') + "-" + String(Math.floor(Math.random() * 28) + 1).padStart(2, '0'),
                comment: reviewComments[Math.floor(Math.random() * reviewComments.length)]
            });
        }
        var availabilityOptions = ["available", "available", "available", "limited", "waitlist"];
        allPGHostels[slug] = {
            name: pg.name,
            area: pg.area,
            city: pg.city,
            lat: pg.lat,
            lng: pg.lng,
            phone: pg.phone,
            price: "₹" + basePrice.toLocaleString() + " - ₹" + (basePrice + 3000).toLocaleString(),
            priceMin: basePrice,
            priceMax: basePrice + 3000,
            gender: isGirls ? "Female" : isBoys ? "Male" : "Unisex",
            occupancy: "Single, Double, Triple, Quad, Penta",
            rating: 3.5 + Math.random() * 1.5,
            totalReviews: 10 + Math.floor(Math.random() * 90),
            availability: availabilityOptions[Math.floor(Math.random() * availabilityOptions.length)],
            image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
            photos: [
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"
            ],
            amenities: ["WiFi", "Meals", "CCTV", "Power Backup"],
            roomPrices: {
                single: "₹" + (basePrice + 4000).toLocaleString(),
                double: "₹" + (basePrice + 2000).toLocaleString(),
                triple: "₹" + basePrice.toLocaleString(),
                quad: "₹" + (basePrice - 500).toLocaleString(),
                penta: "₹" + (basePrice - 1000).toLocaleString()
            },
            deposit: "₹" + (basePrice).toLocaleString(),
            lockIn: "1 Month",
            noticePeriod: "7 Days",
            foodType: "Veg & Non-Veg",
            wifiSpeed: "15-30 Mbps",
            contact: {
                phone: pg.phone,
                whatsapp: pg.phone,
                email: pg.name.toLowerCase().replace(/\s+/g, '') + "@pg.com",
                bookingUrl: ""
            },
            reviews: reviews,
            foodMenu: {
                breakfast: ["Idli", "Dosa", "Poha", "Bread", "Tea"],
                lunch: ["Rice", "Sambar", "Rasam", "Vegetable", "Curd"],
                dinner: ["Rice", "Roti", "Dal", "Egg Curry", "Vegetable"],
                tiffin: ["Tea", "Biscuits"]
            },
            rules: ["No smoking", "ID proof required", "Gate closes at 10:30PM"],
            nearby: [pg.area, pg.city]
        };
    }
});
