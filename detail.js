var apiBase = window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : '/api';

function getToken() { return localStorage.getItem('pg_token'); }

async function apiFetch(endpoint, opts) {
    opts = opts || {};
    var headers = { 'Content-Type': 'application/json' };
    var token = getToken();
    if (token) headers['Authorization'] = 'Bearer ' + token;
    var resp = await fetch(apiBase + endpoint, Object.assign({}, opts, { headers: headers }));
    var data = await resp.json();
    if (!resp.ok) throw new Error(data.error || 'Request failed');
    return data;
}

function getSlugFromURL() {
    var params = new URLSearchParams(window.location.search);
    return params.get('slug');
}

function renderDetail(pg) {
    var container = document.getElementById('pgDetail');

    var stars = ''; var rating = Math.round(pg.rating || 0);
    for (var i = 0; i < 5; i++) stars += i < rating ? '★' : '☆';

    var genderBadge = pg.gender === 'Male' ? '<span class="badge badge-male">Boys Only</span>' : pg.gender === 'Female' ? '<span class="badge badge-female">Girls Only</span>' : '<span class="badge badge-unisex">Unisex</span>';

    var avail = pg.availability || 'available';
    var availClass = avail === 'available' ? 'avail-available' : avail === 'limited' ? 'avail-limited' : 'avail-waitlist';
    var availText = avail === 'available' ? '<i class="fas fa-check-circle"></i> Rooms Available' : avail === 'limited' ? '<i class="fas fa-exclamation-triangle"></i> Limited Availability' : '<i class="fas fa-clock"></i> Waitlist Only';

    // Photos - handle both local DB format and pgdata format
    var photos = [];
    if (pg.photos && pg.photos.length) {
        if (typeof pg.photos[0] === 'string') {
            photos = pg.photos;
        } else {
            photos = pg.photos.map(function(p) { return p.photo_url || p; });
        }
    }
    if (photos.length === 0 && pg.image) photos = [pg.image];
    if (photos.length === 0) photos = ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop'];

    var galleryHTML = '<div class="photo-gallery">' +
        '<div class="photo-main"><img src="' + photos[0] + '" alt="' + pg.name + '" onerror="this.style.background=\'linear-gradient(135deg,#6366f1,#8b5cf6)\';this.style.display=\'block\'">' +
        (photos.length > 1 ? '<div class="photo-count"><i class="fas fa-camera"></i> ' + photos.length + ' Photos</div>' : '') +
        '</div><div class="photo-side">';
    for (var j = 1; j < Math.min(3, photos.length); j++) {
        galleryHTML += '<div class="photo-side-item"><img src="' + photos[j] + '" alt="Photo ' + (j+1) + '"></div>';
    }
    if (photos.length < 3) {
        galleryHTML += '<div class="photo-side-item" style="background:linear-gradient(135deg,#e0e7ff,#f3e8ff);display:flex;align-items:center;justify-content:center;color:var(--primary);font-weight:700;font-size:1.1rem;">' + pg.name.charAt(0) + '</div>';
    }
    galleryHTML += '</div></div>';

    // Amenities
    var amenitiesHTML = '';
    if (pg.amenities) {
        var amens = typeof pg.amenities[0] === 'object' ? pg.amenities.map(function(a) { return a.amenity; }) : pg.amenities;
        amens.forEach(function(a) { amenitiesHTML += '<span class="amenity-tag-lg"><i class="fas fa-check-circle"></i> ' + a + '</span>'; });
    }

    // Room Prices - handle both formats
    var roomPricesHTML = '';
    var rp = pg.roomPrices || [];
    if (rp.length > 0 && typeof rp[0] === 'object') {
        roomPricesHTML = '<div class="detail-section pricing-section"><h2><i class="fas fa-tag"></i> Room Prices (Per Month)</h2><div class="pricing-grid">';
        var sharingTypes = [
            { key: 'single', label: 'Single', note: 'Private Room', icon: 'fa-bed' },
            { key: 'double', label: 'Double Sharing', note: '2 People', icon: 'fa-bed' },
            { key: 'triple', label: 'Triple Sharing', note: '3 People', icon: 'fa-bed' },
            { key: 'quad', label: 'Quad Sharing', note: '4 People', icon: 'fa-bed' },
            { key: 'penta', label: '5 Sharing', note: '5 People', icon: 'fa-bed' }
        ];
        sharingTypes.forEach(function(s) {
            var match = rp.find(function(r) { return r.room_type === s.key; });
            if (match) {
                roomPricesHTML += '<div class="pricing-card">' +
                    '<div class="pricing-icon"><i class="fas ' + s.icon + '"></i></div>' +
                    '<h3>' + s.label + '</h3>' +
                    '<p class="price-amount">₹' + match.price.toLocaleString() + '</p>' +
                    '<p class="price-note">' + s.note + '</p></div>';
            }
        });
        roomPricesHTML += '</div></div>';
    } else if (pg.roomPrices && typeof pg.roomPrices === 'object') {
        roomPricesHTML = '<div class="detail-section pricing-section"><h2><i class="fas fa-tag"></i> Room Prices (Per Month)</h2><div class="pricing-grid">';
        var sharingTypes2 = [
            { key: 'single', label: 'Single', note: 'Private Room', icon: 'fa-bed' },
            { key: 'double', label: 'Double Sharing', note: '2 People', icon: 'fa-bed' },
            { key: 'triple', label: 'Triple Sharing', note: '3 People', icon: 'fa-bed' },
            { key: 'quad', label: 'Quad Sharing', note: '4 People', icon: 'fa-bed' },
            { key: 'penta', label: '5 Sharing', note: '5 People', icon: 'fa-bed' }
        ];
        sharingTypes2.forEach(function(s) {
            if (pg.roomPrices[s.key]) {
                roomPricesHTML += '<div class="pricing-card">' +
                    '<div class="pricing-icon"><i class="fas ' + s.icon + '"></i></div>' +
                    '<h3>' + s.label + '</h3>' +
                    '<p class="price-amount">' + pg.roomPrices[s.key] + '</p>' +
                    '<p class="price-note">' + s.note + '</p></div>';
            }
        });
        roomPricesHTML += '</div></div>';
    }

    // Additional Info
    var additionalHTML = '';
    if (pg.deposit || pg.lockIn || pg.lock_in || pg.noticePeriod || pg.notice_period || pg.foodType || pg.food_type || pg.wifiSpeed || pg.wifi_speed) {
        additionalHTML = '<div class="detail-section"><h2><i class="fas fa-info-circle"></i> Additional Info</h2><div class="detail-grid">';
        if (pg.deposit) additionalHTML += '<div><strong>Security Deposit:</strong> ' + pg.deposit + '</div>';
        if (pg.lockIn || pg.lock_in) additionalHTML += '<div><strong>Lock-in Period:</strong> ' + (pg.lockIn || pg.lock_in) + '</div>';
        if (pg.noticePeriod || pg.notice_period) additionalHTML += '<div><strong>Notice Period:</strong> ' + (pg.noticePeriod || pg.notice_period) + '</div>';
        if (pg.foodType || pg.food_type) additionalHTML += '<div><strong>Food Type:</strong> ' + (pg.foodType || pg.food_type) + '</div>';
        if (pg.wifiSpeed || pg.wifi_speed) additionalHTML += '<div><strong>WiFi Speed:</strong> ' + (pg.wifiSpeed || pg.wifi_speed) + '</div>';
        additionalHTML += '</div></div>';
    }

    // Food Menu
    var foodHTML = '';
    var fm = pg.foodMenu || [];
    if (fm.length > 0) {
        foodHTML = '<div class="food-section"><h2><i class="fas fa-utensils"></i> Food Menu</h2><div class="food-grid">';
        var mealTypes = { breakfast: { label: 'Breakfast', icon: 'fa-sun' }, lunch: { label: 'Lunch', icon: 'fa-cloud-sun' }, dinner: { label: 'Dinner', icon: 'fa-moon' }, snacks: { label: 'Snacks', icon: 'fa-mug-hot' }, tiffin: { label: 'Tiffin / Snacks', icon: 'fa-mug-hot' } };
        if (typeof fm[0] === 'object') {
            fm.forEach(function(m) {
                var mt = mealTypes[m.meal_type] || { label: m.meal_type, icon: 'fa-utensils' };
                foodHTML += '<div class="food-card"><h3><i class="fas ' + mt.icon + '"></i> ' + mt.label + '</h3><p>' + m.items + '</p>' +
                    (m.timing ? '<small>' + m.timing + '</small>' : '') + '</div>';
            });
        } else {
            for (var mk in fm) {
                var mt2 = mealTypes[mk] || { label: mk, icon: 'fa-utensils' };
                foodHTML += '<div class="food-card"><h3><i class="fas ' + mt2.icon + '"></i> ' + mt2.label + '</h3><ul>' +
                    fm[mk].map(function(i) { return '<li>' + i + '</li>'; }).join('') + '</ul></div>';
            }
        }
        foodHTML += '</div></div>';
    }

    // Reviews
    var reviews = pg.reviews || [];
    var avgRating = pg.rating || 0;
    var totalReviews = pg.totalReviews || pg.total_reviews || reviews.length;
    var reviewsHTML = '<div class="detail-section"><h2><i class="fas fa-star"></i> Reviews & Ratings</h2>' +
        '<div class="reviews-summary"><div class="reviews-avg"><div class="big-rating">' + avgRating.toFixed(1) + '</div><div class="stars">' + stars + '</div><div class="total">' + totalReviews + ' reviews</div></div></div>';
    reviews.forEach(function(r) {
        var rStars = ''; for (var k = 0; k < 5; k++) rStars += k < r.rating ? '★' : '☆';
        reviewsHTML += '<div class="review-card"><div class="review-header"><span class="review-name">' + (r.name || r.reviewer_name) + '</span><span class="review-date">' + (r.date || '') + '</span></div><div class="review-stars">' + rStars + '</div><div class="review-comment">' + r.comment + '</div></div>';
    });
    reviewsHTML += '</div>';

    // Map
    var mapHTML = '<div class="detail-section"><h2><i class="fas fa-map"></i> Location</h2><div id="detailMap"></div></div>';

    // Rules
    var rules = pg.rules || pg.house_rules || [];
    var rulesHTML = '';
    if (rules.length) {
        rulesHTML = '<div class="detail-section"><h2><i class="fas fa-list-check"></i> House Rules</h2><ul class="rules-list">';
        rules.forEach(function(r) { rulesHTML += '<li>' + (typeof r === 'string' ? r : r.rule) + '</li>'; });
        rulesHTML += '</ul></div>';
    }

    // Nearby
    var nearbyHTML = '';
    if (pg.nearby) {
        nearbyHTML = '<div class="detail-section"><h2><i class="fas fa-map-location-dot"></i> Nearby Places</h2><div class="nearby-list">';
        pg.nearby.forEach(function(n) { nearbyHTML += '<span class="nearby-tag"><i class="fas fa-map-marker-alt"></i> ' + n + '</span>'; });
        nearbyHTML += '</div></div>';
    }

    // Contact
    var contact = pg.contact || {};
    var contactHTML = '';
    var phone = contact.phone || pg.phone || '';
    var whatsapp = contact.whatsapp || pg.whatsapp || phone;
    var email = contact.email || pg.email || '';
    if (phone || whatsapp || email) {
        contactHTML = '<div class="detail-section contact-section"><h2><i class="fas fa-phone-alt"></i> Contact & Booking</h2><div class="contact-grid">';
        if (phone) contactHTML += '<a href="tel:' + phone + '" class="contact-card phone"><i class="fas fa-phone"></i><span>Call Now</span><small>' + phone + '</small></a>';
        if (whatsapp) contactHTML += '<a href="https://wa.me/' + whatsapp.replace(/[^0-9]/g, '') + '" target="_blank" class="contact-card whatsapp"><i class="fab fa-whatsapp"></i><span>WhatsApp</span><small>' + whatsapp + '</small></a>';
        if (email) contactHTML += '<a href="mailto:' + email + '" class="contact-card email"><i class="fas fa-envelope"></i><span>Email</span><small>' + email + '</small></a>';
        if (contact.bookingUrl) contactHTML += '<a href="' + contact.bookingUrl + '" target="_blank" class="contact-card booking"><i class="fas fa-calendar-check"></i><span>Book Online</span><small>Visit Website</small></a>';
        contactHTML += '</div></div>';
    }

    // Inquiry Form
    var inquiryHTML = '<div class="detail-section"><h2><i class="fas fa-paper-plane"></i> Send Inquiry</h2>' +
        '<div class="form-success" id="formSuccess"><i class="fas fa-check-circle"></i> Inquiry sent successfully! We will contact you soon.</div>' +
        '<form class="inquiry-form" id="inquiryForm">' +
        '<div class="form-row"><div class="form-group"><label>Full Name *</label><input type="text" id="inqName" required placeholder="Your name"></div>' +
        '<div class="form-group"><label>Phone Number *</label><input type="tel" id="inqPhone" required placeholder="+91 XXXXX XXXXX"></div></div>' +
        '<div class="form-row"><div class="form-group"><label>Email</label><input type="email" id="inqEmail" placeholder="your@email.com"></div>' +
        '<div class="form-group"><label>Room Type *</label><select id="inqRoom" required><option value="">Select</option><option>Single</option><option>Double Sharing</option><option>Triple Sharing</option><option>Quad Sharing</option><option>5 Sharing</option></select></div></div>' +
        '<div class="form-group"><label>Message</label><textarea id="inqMessage" placeholder="Any specific requirements..."></textarea></div>' +
        '<button type="submit" class="btn-submit"><i class="fas fa-paper-plane"></i> Send Inquiry</button></form></div>';

    var priceText = pg.price || ('₹' + (pg.priceMin || pg.price_min || 0).toLocaleString() + ' - ₹' + (pg.priceMax || pg.price_max || 0).toLocaleString());

    var html = galleryHTML +
        '<div class="detail-content">' +
        '<div class="avail-badge-detail ' + availClass + '">' + availText + '</div>' +
        '<div class="detail-header"><div><h1>' + pg.name + '</h1>' +
        '<p class="detail-location"><i class="fas fa-map-marker-alt"></i> ' + pg.area + ', ' + pg.city + '</p></div>' + genderBadge + '</div>' +
        '<div class="detail-meta"><div class="meta-item"><span class="stars-lg">' + stars + '</span><span class="rating-lg">' + avgRating.toFixed(1) + ' (' + totalReviews + ')</span></div>' +
        '<div class="meta-item price-lg">' + priceText + ' <span>/month</span></div></div>' +
        roomPricesHTML + additionalHTML +
        '<div class="detail-section"><h2><i class="fas fa-info-circle"></i> Property Details</h2><div class="detail-grid">' +
        '<div><strong>Occupancy:</strong> ' + (pg.occupancy || 'Double, Triple') + '</div>' +
        '<div><strong>Gender:</strong> ' + pg.gender + '</div></div></div>' +
        '<div class="detail-section"><h2><i class="fas fa-concierge-bell"></i> Amenities</h2><div class="amenities-list">' + amenitiesHTML + '</div></div>' +
        foodHTML + reviewsHTML + mapHTML + rulesHTML + nearbyHTML + contactHTML + inquiryHTML +
        '<a href="index.html" class="back-link"><i class="fas fa-arrow-left"></i> Back to All PGs</a></div>';

    container.innerHTML = html;
    document.title = pg.name + ' - PG Hostel Details';

    // Init map
    if (pg.lat && pg.lng) {
        setTimeout(function() {
            var map = L.map('detailMap').setView([pg.lat, pg.lng], 15);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap' }).addTo(map);
            L.marker([pg.lat, pg.lng]).addTo(map).bindPopup('<b>' + pg.name + '</b><br>' + pg.area + ', ' + pg.city).openPopup();
        }, 100);
    }

    // Inquiry form submit
    document.getElementById('inquiryForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        try {
            await apiFetch('/inquiries', {
                method: 'POST',
                body: JSON.stringify({
                    pg_id: pg.id,
                    name: document.getElementById('inqName').value,
                    email: document.getElementById('inqEmail').value || 'no-email@test.com',
                    phone: document.getElementById('inqPhone').value,
                    message: document.getElementById('inqMessage').value
                })
            });
        } catch (err) {}
        document.getElementById('formSuccess').style.display = 'block';
        document.getElementById('inquiryForm').reset();
        setTimeout(function() { document.getElementById('formSuccess').style.display = 'none'; }, 5000);
    });
}

var slug = getSlugFromURL();
if (slug) {
    (async function() {
        try {
            var pg = await apiFetch('/pgs/' + slug);
            renderDetail(pg);
        } catch (e) {
            document.getElementById('pgDetail').innerHTML = '<div class="not-found"><h2><i class="fas fa-exclamation-triangle"></i> PG Hostel Not Found</h2><p>The requested PG hostel could not be found.</p><a href="index.html"><i class="fas fa-arrow-left"></i> Browse All PGs</a></div>';
        }
    })();
} else {
    document.getElementById('pgDetail').innerHTML = '<div class="not-found"><h2><i class="fas fa-home"></i> No PG Selected</h2><p>Please select a PG hostel from the list.</p><a href="index.html"><i class="fas fa-arrow-left"></i> Browse All PGs</a></div>';
}
