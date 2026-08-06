function getSlugFromURL() {
    var params = new URLSearchParams(window.location.search);
    return params.get('slug');
}

function renderDetail(pg) {
    var container = document.getElementById('pgDetail');

    // Stars
    var stars = ''; var rating = Math.round(pg.rating);
    for (var i = 0; i < 5; i++) stars += i < rating ? '★' : '☆';

    // Gender badge
    var genderBadge = pg.gender === 'Male' ? '<span class="badge badge-male">Boys Only</span>' : pg.gender === 'Female' ? '<span class="badge badge-female">Girls Only</span>' : '<span class="badge badge-unisex">Unisex</span>';

    // Availability
    var avail = pg.availability || 'available';
    var availClass = avail === 'available' ? 'avail-available' : avail === 'limited' ? 'avail-limited' : 'avail-waitlist';
    var availText = avail === 'available' ? '<i class="fas fa-check-circle"></i> Rooms Available' : avail === 'limited' ? '<i class="fas fa-exclamation-triangle"></i> Limited Availability' : '<i class="fas fa-clock"></i> Waitlist Only';

    // Photo gallery
    var photos = pg.photos || [pg.image];
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
    if (pg.amenities) pg.amenities.forEach(function(a) { amenitiesHTML += '<span class="amenity-tag-lg"><i class="fas fa-check-circle"></i> ' + a + '</span>'; });

    // Room Prices
    var roomPricesHTML = '';
    if (pg.roomPrices) {
        roomPricesHTML = '<div class="detail-section pricing-section"><h2><i class="fas fa-tag"></i> Room Prices (Per Month)</h2><div class="pricing-grid">';
        var sharingTypes = [
            { key: 'single', label: 'Single', note: 'Private Room', icon: 'fa-bed' },
            { key: 'double', label: 'Double Sharing', note: '2 People', icon: 'fa-bed' },
            { key: 'triple', label: 'Triple Sharing', note: '3 People', icon: 'fa-bed' },
            { key: 'quad', label: 'Quad Sharing', note: '4 People', icon: 'fa-bed' },
            { key: 'penta', label: '5 Sharing', note: '5 People', icon: 'fa-bed' }
        ];
        sharingTypes.forEach(function(s) {
            if (pg.roomPrices[s.key]) {
                var isFeatured = s.key === 'double' || s.key === 'triple';
                roomPricesHTML += '<div class="pricing-card' + (isFeatured ? ' featured' : '') + '">' +
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
    if (pg.deposit || pg.lockIn || pg.noticePeriod || pg.foodType || pg.wifiSpeed) {
        additionalHTML = '<div class="detail-section"><h2><i class="fas fa-info-circle"></i> Additional Info</h2><div class="detail-grid">';
        if (pg.deposit) additionalHTML += '<div><strong>Security Deposit:</strong> ' + pg.deposit + '</div>';
        if (pg.lockIn) additionalHTML += '<div><strong>Lock-in Period:</strong> ' + pg.lockIn + '</div>';
        if (pg.noticePeriod) additionalHTML += '<div><strong>Notice Period:</strong> ' + pg.noticePeriod + '</div>';
        if (pg.foodType) additionalHTML += '<div><strong>Food Type:</strong> ' + pg.foodType + '</div>';
        if (pg.wifiSpeed) additionalHTML += '<div><strong>WiFi Speed:</strong> ' + pg.wifiSpeed + '</div>';
        additionalHTML += '</div></div>';
    }

    // Food
    var foodHTML = '';
    if (pg.foodMenu) {
        foodHTML = '<div class="food-section"><h2><i class="fas fa-utensils"></i> Food Menu</h2><div class="food-grid">';
        var meals = [
            { key: 'breakfast', label: 'Breakfast', icon: 'fa-sun' },
            { key: 'lunch', label: 'Lunch', icon: 'fa-cloud-sun' },
            { key: 'dinner', label: 'Dinner', icon: 'fa-moon' },
            { key: 'tiffin', label: 'Tiffin / Snacks', icon: 'fa-mug-hot' }
        ];
        meals.forEach(function(m) {
            if (pg.foodMenu[m.key]) {
                foodHTML += '<div class="food-card"><h3><i class="fas ' + m.icon + '"></i> ' + m.label + '</h3><ul>' +
                    pg.foodMenu[m.key].map(function(i) { return '<li>' + i + '</li>'; }).join('') + '</ul></div>';
            }
        });
        foodHTML += '</div></div>';
    }

    // Reviews
    var reviews = pg.reviews || [];
    var avgRating = pg.rating;
    var totalReviews = pg.totalReviews || reviews.length;
    var reviewsHTML = '<div class="detail-section"><h2><i class="fas fa-star"></i> Reviews & Ratings</h2>' +
        '<div class="reviews-summary"><div class="reviews-avg"><div class="big-rating">' + avgRating.toFixed(1) + '</div><div class="stars">' + stars + '</div><div class="total">' + totalReviews + ' reviews</div></div></div>';
    reviews.forEach(function(r) {
        var rStars = ''; for (var k = 0; k < 5; k++) rStars += k < r.rating ? '★' : '☆';
        reviewsHTML += '<div class="review-card"><div class="review-header"><span class="review-name">' + r.name + '</span><span class="review-date">' + r.date + '</span></div><div class="review-stars">' + rStars + '</div><div class="review-comment">' + r.comment + '</div></div>';
    });
    reviewsHTML += '</div>';

    // Map
    var mapHTML = '<div class="detail-section"><h2><i class="fas fa-map"></i> Location</h2><div id="detailMap"></div></div>';

    // Rules
    var rulesHTML = '';
    if (pg.rules) {
        rulesHTML = '<div class="detail-section"><h2><i class="fas fa-list-check"></i> House Rules</h2><ul class="rules-list">';
        pg.rules.forEach(function(r) { rulesHTML += '<li>' + r + '</li>'; });
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
    var contactHTML = '';
    if (pg.contact) {
        contactHTML = '<div class="detail-section contact-section"><h2><i class="fas fa-phone-alt"></i> Contact & Booking</h2><div class="contact-grid">';
        if (pg.contact.phone) contactHTML += '<a href="tel:' + pg.contact.phone + '" class="contact-card phone"><i class="fas fa-phone"></i><span>Call Now</span><small>' + pg.contact.phone + '</small></a>';
        if (pg.contact.whatsapp) contactHTML += '<a href="https://wa.me/' + pg.contact.whatsapp.replace(/[^0-9]/g, '') + '" target="_blank" class="contact-card whatsapp"><i class="fab fa-whatsapp"></i><span>WhatsApp</span><small>' + pg.contact.whatsapp + '</small></a>';
        if (pg.contact.email) contactHTML += '<a href="mailto:' + pg.contact.email + '" class="contact-card email"><i class="fas fa-envelope"></i><span>Email</span><small>' + pg.contact.email + '</small></a>';
        if (pg.contact.bookingUrl) contactHTML += '<a href="' + pg.contact.bookingUrl + '" target="_blank" class="contact-card booking"><i class="fas fa-calendar-check"></i><span>Book Online</span><small>Visit Website</small></a>';
        contactHTML += '</div></div>';
    }

    // Inquiry Form
    var inquiryHTML = '<div class="detail-section"><h2><i class="fas fa-paper-plane"></i> Send Inquiry</h2>' +
        '<div class="form-success" id="formSuccess"><i class="fas fa-check-circle"></i> Inquiry sent successfully! We will contact you soon.</div>' +
        '<form class="inquiry-form" onsubmit="submitInquiry(event, \'' + pg.name + '\')">' +
        '<div class="form-row"><div class="form-group"><label>Full Name *</label><input type="text" id="inqName" required placeholder="Your name"></div>' +
        '<div class="form-group"><label>Phone Number *</label><input type="tel" id="inqPhone" required placeholder="+91 XXXXX XXXXX"></div></div>' +
        '<div class="form-row"><div class="form-group"><label>Email</label><input type="email" id="inqEmail" placeholder="your@email.com"></div>' +
        '<div class="form-group"><label>Room Type *</label><select id="inqRoom" required><option value="">Select</option><option>Single</option><option>Double Sharing</option><option>Triple Sharing</option><option>Quad Sharing</option><option>5 Sharing</option></select></div></div>' +
        '<div class="form-group"><label>Move-in Date</label><input type="date" id="inqDate"></div>' +
        '<div class="form-group"><label>Message</label><textarea id="inqMessage" placeholder="Any specific requirements..."></textarea></div>' +
        '<button type="submit" class="btn-submit"><i class="fas fa-paper-plane"></i> Send Inquiry</button></form></div>';

    var html = galleryHTML +
        '<div class="detail-content">' +
        '<div class="avail-badge-detail ' + availClass + '">' + availText + '</div>' +
        '<div class="detail-header"><div><h1>' + pg.name + '</h1>' +
        '<p class="detail-location"><i class="fas fa-map-marker-alt"></i> ' + pg.area + ', ' + pg.city + '</p></div>' + genderBadge + '</div>' +
        '<div class="detail-meta"><div class="meta-item"><span class="stars-lg">' + stars + '</span><span class="rating-lg">' + pg.rating.toFixed(1) + ' (' + totalReviews + ')</span></div>' +
        '<div class="meta-item price-lg">' + pg.price + ' <span>/month</span></div></div>' +
        roomPricesHTML + additionalHTML +
        '<div class="detail-section"><h2><i class="fas fa-info-circle"></i> Property Details</h2><div class="detail-grid">' +
        '<div><strong>Occupancy:</strong> ' + (pg.occupancy || 'Double, Triple') + '</div>' +
        '<div><strong>Gender:</strong> ' + pg.gender + '</div></div></div>' +
        '<div class="detail-section"><h2><i class="fas fa-concierge-bell"></i> Amenities</h2><div class="amenities-list">' + amenitiesHTML + '</div></div>' +
        foodHTML + reviewsHTML + mapHTML + rulesHTML + nearbyHTML + contactHTML + inquiryHTML +
        '<a href="index.html" class="back-link"><i class="fas fa-arrow-left"></i> Back to All PGs</a></div>';

    container.innerHTML = html;
    document.title = pg.name + ' - PG Hostel Details';

    // Initialize map
    if (pg.lat && pg.lng) {
        setTimeout(function() {
            var map = L.map('detailMap').setView([pg.lat, pg.lng], 15);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap' }).addTo(map);
            L.marker([pg.lat, pg.lng]).addTo(map).bindPopup('<b>' + pg.name + '</b><br>' + pg.area + ', ' + pg.city).openPopup();
        }, 100);
    }
}

// Inquiry form submit
function submitInquiry(e, pgName) {
    e.preventDefault();
    var name = document.getElementById('inqName').value;
    var phone = document.getElementById('inqPhone').value;
    var room = document.getElementById('inqRoom').value;
    document.getElementById('formSuccess').style.display = 'block';
    document.querySelector('.inquiry-form').reset();
    setTimeout(function() { document.getElementById('formSuccess').style.display = 'none'; }, 5000);
}

var slug = getSlugFromURL();
if (slug && allPGHostels[slug]) {
    renderDetail(allPGHostels[slug]);
} else if (slug) {
    document.getElementById('pgDetail').innerHTML = '<div class="not-found"><h2><i class="fas fa-exclamation-triangle"></i> PG Hostel Not Found</h2><p>The requested PG hostel could not be found.</p><a href="index.html"><i class="fas fa-arrow-left"></i> Browse All PGs</a></div>';
} else {
    document.getElementById('pgDetail').innerHTML = '<div class="not-found"><h2><i class="fas fa-home"></i> No PG Selected</h2><p>Please select a PG hostel from the list.</p><a href="index.html"><i class="fas fa-arrow-left"></i> Browse All PGs</a></div>';
}
