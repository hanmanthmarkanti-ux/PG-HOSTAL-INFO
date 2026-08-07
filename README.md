# 🏠 PG Hostel Finder - Telangana

A full-stack premium website to find Paying Guest (PG) hostels across Telangana with user authentication, real-time data, interactive maps, and an admin panel.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

## 🌟 Features

### 🔍 Search & Filters
- **Search** by PG name, area, or city (space-insensitive)
- **City Filter** — Hyderabad, Warangal, Karimnagar, Nizamabad, Khammam, Nalgonda, Mahbubnagar
- **Distance Filter** — 5km, 10km, 25km, 50km, 100km, All Telangana
- **Price Range Slider** — Min/Max budget filter (₹1,000–₹30,000)
- **Amenities Filter** — WiFi, AC, Meals, Gym, Laundry (checkboxes)
- **Gender Filter** — Boys, Girls, Unisex
- **Sort Options** — Price (Low/High), Rating, Distance
- **Availability Filter** — Available, Limited

### 📱 Premium UI
- **Animated Gradient Hero Section** with floating particles
- **Glass Morphism Navbar** with blur effect on scroll
- **3D Card Hover Effects** with tilt animation
- **Scroll Progress Bar** at the top
- **Button Ripple Effects** (Material Design)
- **Smooth Page Transitions** and animations
- **20+ CSS Animations** — pulse, glow, float, shimmer, heartbeat, bounce, etc.
- **Responsive Design** for all devices (mobile, tablet, desktop)

### 👤 Authentication System
- **User Registration** — Name, email, phone, password
- **User Login** — JWT token-based authentication
- **Session Persistence** — Tokens stored in localStorage
- **Protected Routes** — Admin-only actions require admin role

### 💾 Backend Features
- **REST API** — Full CRUD for PGs, users, reviews, inquiries
- **SQLite Database** — Embedded, zero-configuration database
- **JWT Authentication** — Secure token-based auth
- **Photo Uploads** — Multer-based file upload support
- **Data Seeding** — 250+ PGs auto-seeded from pgdata.js
- **CORS Enabled** — Cross-origin requests supported

### 💖 User Features
- **Save/Favorites** — Bookmark PGs (synced to backend for logged-in users)
- **Compare Feature** — Compare up to 3 PGs side by side
- **Availability Status** — Green/Yellow/Red badges with pulse animation
- **Send Inquiries** — Contact form saved to database

### 📄 Detailed PG Pages
- **Photo Gallery** — Multiple photos grid layout
- **Interactive Map** — Leaflet map with exact location marker
- **Room Prices** — Single, Double, Triple, Quad, 5 Sharing breakdown
- **Food Menu** — Breakfast, Lunch, Dinner, Tiffin items
- **Amenities List** — All facilities with icons
- **Reviews & Ratings** — User reviews with star ratings
- **House Rules** — Important guidelines
- **Nearby Places** — Metro, malls, landmarks
- **Contact Info** — Call, WhatsApp, Email buttons
- **Inquiry Form** — Send booking request directly to backend

### 🔧 Admin Panel
- **Dashboard** — Stats overview (total PGs, cities, reviews)
- **PG Management** — View, add, delete PG hostels
- **Inquiry Management** — View, filter, update status (pending/contacted/resolved)
- **Add PG Form** — Full form with all fields (name, area, prices, amenities, photos)
- **Settings** — Admin configuration page

## 📊 Data Coverage

| City | Areas | PG Hostels |
|------|-------|------------|
| Hyderabad | 15+ | 200+ |
| Warangal | 5+ | 15+ |
| Karimnagar | 3+ | 12+ |
| Nizamabad | 3+ | 15+ |
| Khammam | 3+ | 10+ |
| Nalgonda | 2+ | 8+ |
| Mahbubnagar | 1+ | 2+ |
| **Total** | **30+** | **260+** |

## 🚀 Quick Start

### Option 1: Frontend Only (No Backend)
```bash
git clone https://github.com/hanmanthmarkanti-ux/PG-HOSTAL-INFO.git
cd PG-HOSTAL-INFO
start index.html
```
Opens directly in browser. All features work except login/register/admin.

### Option 2: Full Stack with Backend
```bash
git clone https://github.com/hanmanthmarkanti-ux/PG-HOSTAL-INFO.git
cd PG-HOSTAL-INFO/server
npm install
npm run seed    # Seeds 250+ PGs into SQLite database
npm start       # Starts server on http://localhost:5000
```

Then open `http://localhost:5000` in your browser.

### Option 3: Deploy to Render.com (Free, No Terminal)
1. Go to [render.com](https://render.com) → Sign up with GitHub
2. Click **New +** → **Web Service**
3. Connect repo `hanmanthmarkanti-ux/PG-HOSTAL-INFO`
4. Configure:
   - **Name:** `pg-hostel-api`
   - **Runtime:** Node
   - **Build Command:** `cd server && npm install`
   - **Start Command:** `cd server && node seed.js && node server.js`
5. Add Environment Variable:
   - **Key:** `JWT_SECRET`
   - **Value:** `pg_hostel_secret_key_2026_hanmanth`
6. Click **Create Web Service**
7. Wait 3-4 minutes for build

### Option 4: GitHub Pages (Static Only)
1. Go to repository **Settings** → **Pages**
2. Source: Deploy from branch → `main`
3. Live at: `https://hanmanthmarkanti-ux.github.io/PG-HOSTAL-INFO/`

## 📁 Project Structure

```
PG-HOSTAL-INFO/
├── index.html              # Main page — search, filters, PG cards grid
├── detail.html             # PG detail page — gallery, map, reviews, inquiry
├── admin.html              # Admin panel — dashboard, PGs, inquiries, add PG
├── style.css               # Premium CSS — 20+ animations, glass effects, gradients
├── app.js                  # Frontend logic — filters, auth, favorites, API calls
├── detail.js               # Detail page logic — gallery, map, reviews, form
├── api.js                  # API helper functions for frontend
├── pgdata.js               # 250+ PG hostel data (used by frontend & seed script)
├── render.yaml             # Render.com deployment config
├── README.md               # This file
├── server/
│   ├── server.js           # Express server entry point
│   ├── package.json        # Backend dependencies
│   ├── .env                # Environment variables (JWT_SECRET, PORT)
│   ├── seed.js             # Seeds pgdata.js into SQLite database
│   ├── config/
│   │   ├── db.js           # SQLite database initialization (sql.js)
│   │   ├── schema.js       # Database table creation (users, pgs, reviews, etc.)
│   │   └── query.js        # Query helper functions (run, queryAll, queryOne)
│   ├── middleware/
│   │   └── auth.js         # JWT authentication middleware (auth, requireAuth, requireAdmin)
│   ├── models/
│   │   ├── User.js         # User model — register, login, favorites
│   │   ├── PG.js           # PG model — CRUD, amenities, photos, reviews
│   │   └── Inquiry.js      # Inquiry model — create, list, update status
│   ├── routes/
│   │   ├── auth.js         # POST /register, /login, GET /me
│   │   ├── pgs.js          # GET/POST/PUT/DELETE /pgs, reviews
│   │   ├── favorites.js    # GET/POST/DELETE /favorites
│   │   └── inquiries.js    # POST /inquiries, GET (admin), PUT status
│   └── uploads/            # Photo uploads directory
```

## 🛠 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login user |
| GET | `/api/auth/me` | Yes | Get current user |
| GET | `/api/pgs` | No | List all PGs (supports filters) |
| GET | `/api/pgs/stats` | No | Get total PGs, cities, reviews |
| GET | `/api/pgs/:slug` | No | Get PG detail with reviews, photos, menu |
| POST | `/api/pgs` | Admin | Create new PG |
| PUT | `/api/pgs/:id` | Admin | Update PG |
| DELETE | `/api/pgs/:id` | Admin | Delete PG |
| POST | `/api/pgs/:id/reviews` | Yes | Add review to PG |
| GET | `/api/favorites` | Yes | Get user favorites |
| POST | `/api/favorites/:pgId` | Yes | Add to favorites |
| DELETE | `/api/favorites/:pgId` | Yes | Remove from favorites |
| POST | `/api/inquiries` | No | Submit inquiry |
| GET | `/api/inquiries` | Admin | List all inquiries |
| PUT | `/api/inquiries/:id/status` | Admin | Update inquiry status |

## 🎨 Tech Stack

### Frontend
- **HTML5, CSS3, JavaScript (ES6+)**
- **Leaflet.js** — Interactive maps with OpenStreetMap
- **Font Awesome 6.4** — Icons
- **Google Fonts** — Inter (300–800)
- **localStorage** — Favorites, compare, auth tokens

### Backend
- **Node.js** — Server runtime
- **Express.js** — Web framework
- **SQLite (sql.js)** — Embedded database (pure JS, no native deps)
- **JWT (jsonwebtoken)** — Authentication tokens
- **bcryptjs** — Password hashing
- **Multer** — File upload handling
- **express-validator** — Input validation
- **CORS** — Cross-origin support

### Deployment
- **GitHub Pages** — Static frontend hosting
- **Render.com** — Full-stack backend hosting (free tier)

## 🎯 Key Highlights

- ✅ **260+ PG Hostels** across 7 cities in Telangana
- ✅ **Real Photos** for each listing
- ✅ **Interactive Maps** with exact locations
- ✅ **Price Comparison** for all sharing types (Single to 5-sharing)
- ✅ **User Reviews** with star ratings
- ✅ **Instant Inquiry** form with database storage
- ✅ **Save & Compare** functionality
- ✅ **User Authentication** (register/login)
- ✅ **Admin Panel** for managing PGs and inquiries
- ✅ **Premium Animations** — 20+ CSS animations and effects
- ✅ **Fully Responsive** design
- ✅ **Backend API** with full CRUD operations

## 🌐 Live Demo

- **Frontend:** [https://hanmanthmarkanti-ux.github.io/PG-HOSTAL-INFO/](https://hanmanthmarkanti-ux.github.io/PG-HOSTAL-INFO/)
- **Backend API:** Deploy to Render.com (see Quick Start Option 3)

## 👨‍💻 Author

**HANMANTH**
- GitHub: [@hanmanthmarkanti-ux](https://github.com/hanmanthmarkanti-ux)

## 📝 License

This project is open source and available for educational purposes.

---

Made with ❤️ by **HANMANTH**
