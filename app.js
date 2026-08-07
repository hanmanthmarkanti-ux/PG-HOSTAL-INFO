var userLocation = null;
var favorites = JSON.parse(localStorage.getItem('pgFavorites') || '[]');
var compareList = JSON.parse(localStorage.getItem('pgCompare') || '[]');
var allPGHostels = {};
var apiBase = window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : '/api';

// Auth helpers
function getToken() { return localStorage.getItem('pg_token'); }
function setToken(t) { localStorage.setItem('pg_token', t); }
function removeToken() { localStorage.removeItem('pg_token'); localStorage.removeItem('pg_user'); }
function getUser() { var u = localStorage.getItem('pg_user'); return u ? JSON.parse(u) : null; }
function setUser(u) { localStorage.setItem('pg_user', JSON.stringify(u)); }

// API fetch helper
async function apiFetch(endpoint, opts) {
    opts = opts || {};
    var headers = { 'Content-Type': 'application/json' };
    var token = getToken();
    if (token) headers['Authorization'] = 'Bearer ' + token;
    if (opts.headers) Object.assign(headers, opts.headers);
    if (opts.body instanceof FormData) delete headers['Content-Type'];
    var resp = await fetch(apiBase + endpoint, Object.assign({}, opts, { headers: headers }));
    var data = await resp.json();
    if (!resp.ok) throw new Error(data.error || 'Request failed');
    return data;
}

// Scroll Progress Bar
var scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.prepend(scrollProgress);

window.addEventListener('scroll', function() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = progress + '%';
});

// Ripple Effect
document.addEventListener('click', function(e) {
    var btn = e.target.closest('.btn-primary, .btn-location, .btn-submit');
    if (!btn) return;
    var ripple = document.createElement('span');
    ripple.className = 'ripple';
    var rect = btn.getBoundingClientRect();
    var size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
    btn.appendChild(ripple);
    setTimeout(function() { ripple.remove(); }, 600);
});

// Scroll reveal
function reveal() {
    document.querySelectorAll('.reveal').forEach(function(el) {
        if (el.getBoundingClientRect().top < window.innerHeight - 120) el.classList.add('active');
    });
}

// Navbar scroll
function handleNavScroll() {
    document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 50);
}

// Animate counters
function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(function(counter) {
        var target = parseInt(counter.getAttribute('data-count'));
        var current = 0;
        var increment = target / 50;
        var timer = setInterval(function() {
            current += increment;
            if (current >= target) { counter.textContent = target; clearInterval(timer); }
            else counter.textContent = Math.floor(current);
        }, 30);
    });
}

// Card animation
function animateCards() {
    document.querySelectorAll('.pg-card').forEach(function(card, i) {
        card.style.opacity = '0'; card.style.transform = 'translateY(30px)';
        setTimeout(function() {
            card.style.transition = 'all 0.5s cubic-bezier(0.25,0.46,0.45,0.94)';
            card.style.opacity = '1'; card.style.transform = 'translateY(0)';
        }, i * 60);
    });
}

function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function haversineDistance(lat1, lon1, lat2, lon2) {
    var R = 6371, dLat = (lat2-lat1)*Math.PI/180, dLon = (lon2-lon1)*Math.PI/180;
    var a = Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)*Math.sin(dLon/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

async function loadPGs() {
    try {
        var data = await apiFetch('/pgs');
        allPGHostels = {};
        data.pgs.forEach(function(pg) {
            allPGHostels[pg.slug] = pg;
        });
    } catch (e) {
        console.log('Backend not available, using local data');
    }
}

function getFilteredPGs() {
    var query = document.getElementById('searchInput').value.toLowerCase().trim();
    var maxDist = parseInt(document.getElementById('distanceFilter').value);
    var cityFilter = document.getElementById('cityFilter').value;
    var sortBy = document.getElementById('sortFilter').value;
    var minPrice = parseInt(document.getElementById('priceMin').value);
    var maxPrice = parseInt(document.getElementById('priceMax').value);
    var genderFilter = document.getElementById('genderFilter').value;
    var availFilter = document.getElementById('availabilityFilter').value;
    var checkedAmenities = [];
    document.querySelectorAll('.amenity-check:checked').forEach(function(cb) { checkedAmenities.push(cb.value); });

    var allPGs = [];
    for (var slug in allPGHostels) {
        if (!allPGHostels.hasOwnProperty(slug)) continue;
        var pg = allPGHostels[slug];
        var avail = pg.availability || pg.is_available ? 'available' : 'available';
        var obj = {
            slug: slug, name: pg.name, area: pg.area, city: pg.city, phone: pg.phone,
            price: pg.price || ('₹' + (pg.priceMin || pg.price_min || 0).toLocaleString() + ' - ₹' + (pg.priceMax || pg.price_max || 0).toLocaleString()),
            priceMin: pg.priceMin || pg.price_min || 0, priceMax: pg.priceMax || pg.price_max || 10000,
            gender: pg.gender, rating: pg.rating || 0, totalReviews: pg.totalReviews || pg.total_reviews || 0,
            availability: pg.availability || 'available', image: pg.image || (pg.photos && pg.photos[0] && pg.photos[0].photo_url) || '',
            amenities: pg.amenities || [], lat: pg.lat, lng: pg.lng
        };
        if (userLocation) obj.distance = haversineDistance(userLocation.lat, userLocation.lng, pg.lat, pg.lng);
        allPGs.push(obj);
    }

    // Search
    if (query) {
        var q = query.replace(/\s+/g, '');
        allPGs = allPGs.filter(function(p) {
            return p.name.toLowerCase().replace(/\s+/g,'').indexOf(q) !== -1 ||
                p.area.toLowerCase().replace(/\s+/g,'').indexOf(q) !== -1 ||
                p.city.toLowerCase().replace(/\s+/g,'').indexOf(q) !== -1;
        });
    }

    // City
    if (cityFilter !== 'all') allPGs = allPGs.filter(function(p) { return p.city === cityFilter; });

    // Gender
    if (genderFilter !== 'all') allPGs = allPGs.filter(function(p) { return p.gender === genderFilter; });

    // Availability
    if (availFilter !== 'all') allPGs = allPGs.filter(function(p) { return p.availability === availFilter; });

    // Price range
    allPGs = allPGs.filter(function(p) { return p.priceMax >= minPrice && p.priceMin <= maxPrice; });

    // Amenities
    if (checkedAmenities.length > 0) {
        allPGs = allPGs.filter(function(p) {
            return checkedAmenities.every(function(a) { return p.amenities.indexOf(a) !== -1; });
        });
    }

    // Distance
    if (userLocation) {
        allPGs = allPGs.filter(function(p) { return p.distance <= maxDist; });
    }

    // Sort
    if (sortBy === 'price-low') allPGs.sort(function(a,b) { return a.priceMin - b.priceMin; });
    else if (sortBy === 'price-high') allPGs.sort(function(a,b) { return b.priceMax - a.priceMax; });
    else if (sortBy === 'rating') allPGs.sort(function(a,b) { return b.rating - a.rating; });
    else if (sortBy === 'distance' && userLocation) allPGs.sort(function(a,b) { return a.distance - b.distance; });

    return allPGs;
}

function renderCards(results) {
    var grid = document.getElementById('pgGrid');
    var count = document.getElementById('resultCount');
    if (results.length === 0) {
        grid.innerHTML = '<div class="no-results"><i class="fas fa-search" style="font-size:3rem;margin-bottom:16px;display:block;color:#cbd5e1;"></i>No PG hostels found.</div>';
        count.textContent = 'No results'; return;
    }
    count.textContent = 'Showing ' + results.length + ' PG hostels';
    var html = '';
    results.forEach(function(pg) {
        var isFav = favorites.indexOf(pg.slug) !== -1;
        var isCompare = compareList.indexOf(pg.slug) !== -1;
        var availClass = pg.availability === 'available' ? 'avail-available' : pg.availability === 'limited' ? 'avail-limited' : 'avail-waitlist';
        var availText = pg.availability === 'available' ? 'Available' : pg.availability === 'limited' ? 'Limited' : 'Waitlist';
        var genderBadge = pg.gender === 'Male' ? '<span class="badge badge-male">Boys</span>' : pg.gender === 'Female' ? '<span class="badge badge-female">Girls</span>' : '<span class="badge badge-unisex">Unisex</span>';
        var stars = ''; var r = Math.round(pg.rating);
        for (var i = 0; i < 5; i++) stars += i < r ? '★' : '☆';
        var distText = pg.distance !== undefined ? '<span class="distance"><i class="fas fa-location-dot"></i> ' + pg.distance.toFixed(1) + ' km</span>' : '';
        var amenityTags = '';
        if (pg.amenities) pg.amenities.slice(0,4).forEach(function(a) { amenityTags += '<span class="amenity-tag">' + a + '</span>'; });

        html += '<div class="pg-card" data-slug="' + pg.slug + '" onclick="window.location.href=\'detail.html?slug=' + pg.slug + '\'">' +
            '<div class="pg-card-image">' +
            '<img src="' + pg.image + '" alt="' + pg.name + '" loading="lazy" onerror="this.style.display=\'none\'">' +
            genderBadge +
            '<div class="availability-badge ' + availClass + '">' + availText + '</div>' +
            '<div class="card-actions">' +
            '<button class="action-btn fav-btn ' + (isFav ? 'active' : '') + '" onclick="event.stopPropagation();toggleFavorite(\'' + pg.slug + '\')" title="Save"><i class="fas fa-heart"></i></button>' +
            '<button class="action-btn compare-btn ' + (isCompare ? 'active' : '') + '" onclick="event.stopPropagation();toggleCompare(\'' + pg.slug + '\')" title="Compare"><i class="fas fa-scale-balanced"></i></button>' +
            '</div>' +
            '</div>' +
            '<div class="pg-card-body">' +
            '<h3 class="pg-card-title">' + pg.name + '</h3>' +
            '<p class="pg-card-location"><i class="fas fa-map-marker-alt"></i> ' + pg.area + ', ' + pg.city + '</p>' +
            '<div class="pg-card-rating">' +
            '<span class="stars">' + stars + '</span>' +
            '<span class="rating-num">' + pg.rating.toFixed(1) + '</span>' +
            '<span class="review-count">(' + pg.totalReviews + ')</span>' +
            distText +
            '</div>' +
            '<p class="pg-card-price">₹' + pg.priceMin.toLocaleString() + ' - ₹' + pg.priceMax.toLocaleString() + ' <span>/month</span></p>' +
            '<div class="pg-card-amenities">' + amenityTags + '</div>' +
            '</div></div>';
    });
    grid.innerHTML = html;
    setTimeout(animateCards, 50);
}

function searchAndRender() { renderCards(getFilteredPGs()); }

// Favorites
async function toggleFavorite(slug) {
    var idx = favorites.indexOf(slug);
    if (idx === -1) {
        favorites.push(slug);
        if (getToken()) { try { await apiFetch('/favorites/' + allPGHostels[slug].id, { method: 'POST' }); } catch(e) {} }
    } else {
        favorites.splice(idx, 1);
        if (getToken()) { try { await apiFetch('/favorites/' + allPGHostels[slug].id, { method: 'DELETE' }); } catch(e) {} }
    }
    localStorage.setItem('pgFavorites', JSON.stringify(favorites));
    searchAndRender();
}

function showFavorites() {
    var modal = document.getElementById('favoritesModal');
    var content = document.getElementById('favoritesContent');
    if (favorites.length === 0) { content.innerHTML = '<p class="empty-state"><i class="fas fa-heart-broken"></i><br>No saved PGs yet.</p>'; modal.style.display = 'flex'; return; }
    var html = '<div class="favorites-grid">';
    favorites.forEach(function(slug) {
        var pg = allPGHostels[slug]; if (!pg) return;
        var img = pg.image || (pg.photos && pg.photos[0] && pg.photos[0].photo_url) || '';
        html += '<div class="fav-card" onclick="window.location.href=\'detail.html?slug=' + slug + '\'">' +
            '<img src="' + img + '" alt="' + pg.name + '">' +
            '<div class="fav-info"><h4>' + pg.name + '</h4><p>' + pg.area + ', ' + pg.city + '</p>' +
            '<p class="fav-price">' + (pg.price || '₹' + (pg.priceMin || 0) + ' - ₹' + (pg.priceMax || 0)) + '</p></div>' +
            '<button class="remove-fav" onclick="event.stopPropagation();toggleFavorite(\'' + slug + '\');showFavorites();"><i class="fas fa-trash"></i></button>' +
            '</div>';
    });
    html += '</div>';
    content.innerHTML = html;
    modal.style.display = 'flex';
}

function closeFavorites() { document.getElementById('favoritesModal').style.display = 'none'; }

// Compare
function toggleCompare(slug) {
    var idx = compareList.indexOf(slug);
    if (idx === -1) { if (compareList.length >= 3) { alert('You can compare up to 3 PGs only.'); return; } compareList.push(slug); }
    else compareList.splice(idx, 1);
    localStorage.setItem('pgCompare', JSON.stringify(compareList));
    searchAndRender();
}

function showCompare() {
    var modal = document.getElementById('compareModal');
    var content = document.getElementById('compareContent');
    if (compareList.length === 0) { content.innerHTML = '<p class="empty-state"><i class="fas fa-scale-balanced"></i><br>Select PGs to compare by clicking the compare button.</p>'; modal.style.display = 'flex'; return; }
    var html = '<div class="compare-grid">';
    compareList.forEach(function(slug) {
        var pg = allPGHostels[slug]; if (!pg) return;
        var img = pg.image || (pg.photos && pg.photos[0] && pg.photos[0].photo_url) || '';
        html += '<div class="compare-card">' +
            '<img src="' + img + '" alt="' + pg.name + '">' +
            '<h3>' + pg.name + '</h3>' +
            '<p class="compare-location">' + pg.area + ', ' + pg.city + '</p>' +
            '<table class="compare-table">' +
            '<tr><td>Price</td><td>' + (pg.price || '₹' + (pg.priceMin || 0) + ' - ₹' + (pg.priceMax || 0)) + '</td></tr>' +
            '<tr><td>Rating</td><td>' + (pg.rating || 0).toFixed(1) + ' ★</td></tr>' +
            '<tr><td>Gender</td><td>' + pg.gender + '</td></tr>' +
            '<tr><td>WiFi</td><td>' + (pg.wifiSpeed || pg.wifi_speed || 'Yes') + '</td></tr>' +
            '<tr><td>Food</td><td>' + (pg.foodType || pg.food_type || 'Included') + '</td></tr>' +
            '<tr><td>Deposit</td><td>' + (pg.deposit || 'N/A') + '</td></tr>' +
            '</table>' +
            '<a href="detail.html?slug=' + slug + '" class="compare-view-btn">View Details</a>' +
            '</div>';
    });
    html += '</div>';
    content.innerHTML = html;
    modal.style.display = 'flex';
}

function closeCompare() { document.getElementById('compareModal').style.display = 'none'; }

// Location
var locateBtn = document.getElementById('locateBtn');
locateBtn.addEventListener('click', function() {
    if (!navigator.geolocation) { alert('Geolocation not supported.'); return; }
    locateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Locating...</span>';
    navigator.geolocation.getCurrentPosition(function(pos) {
        userLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        locateBtn.innerHTML = '<i class="fas fa-location-crosshairs"></i><span>Location Set!</span>';
        setTimeout(function() { locateBtn.innerHTML = '<i class="fas fa-location-crosshairs"></i><span>Use My Location</span>'; }, 2000);
        searchAndRender();
    }, function() {
        locateBtn.innerHTML = '<i class="fas fa-location-crosshairs"></i><span>Use My Location</span>';
        alert('Unable to get location.');
    });
});

// Price range labels
document.getElementById('priceMin').addEventListener('input', function() {
    document.getElementById('priceMinLabel').textContent = '₹' + parseInt(this.value).toLocaleString();
    searchAndRender();
});
document.getElementById('priceMax').addEventListener('input', function() {
    document.getElementById('priceMaxLabel').textContent = '₹' + parseInt(this.value).toLocaleString();
    searchAndRender();
});

// Auth Modal
function showAuthModal(type) {
    var modal = document.getElementById('authModal');
    var loginForm = document.getElementById('loginForm');
    var registerForm = document.getElementById('registerForm');
    if (type === 'login') { loginForm.style.display = 'block'; registerForm.style.display = 'none'; }
    else { loginForm.style.display = 'none'; registerForm.style.display = 'block'; }
    modal.style.display = 'flex';
}

function closeAuthModal() { document.getElementById('authModal').style.display = 'none'; }

async function handleLogin(e) {
    e.preventDefault();
    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPass').value;
    try {
        var data = await apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ email: email, password: password }) });
        setToken(data.token); setUser(data.user);
        closeAuthModal(); updateUserUI();
        alert('Welcome back, ' + data.user.name + '!');
    } catch (err) { alert(err.message); }
}

async function handleRegister(e) {
    e.preventDefault();
    var name = document.getElementById('regName').value;
    var email = document.getElementById('regEmail').value;
    var phone = document.getElementById('regPhone').value;
    var password = document.getElementById('regPass').value;
    try {
        var data = await apiFetch('/auth/register', { method: 'POST', body: JSON.stringify({ name: name, email: email, phone: phone, password: password }) });
        setToken(data.token); setUser(data.user);
        closeAuthModal(); updateUserUI();
        alert('Account created! Welcome, ' + data.user.name + '!');
    } catch (err) { alert(err.message); }
}

function logout() {
    removeToken();
    updateUserUI();
    alert('Logged out successfully');
}

function updateUserUI() {
    var user = getUser();
    var authBtns = document.getElementById('authBtns');
    var userMenu = document.getElementById('userMenu');
    if (user) {
        authBtns.style.display = 'none';
        userMenu.style.display = 'flex';
        document.getElementById('userName').textContent = user.name;
    } else {
        authBtns.style.display = 'flex';
        userMenu.style.display = 'none';
    }
}

// Event listeners
document.getElementById('searchBtn').addEventListener('click', searchAndRender);
document.getElementById('searchInput').addEventListener('keyup', function(e) { if (e.key === 'Enter') searchAndRender(); });
document.getElementById('searchInput').addEventListener('input', searchAndRender);
document.getElementById('distanceFilter').addEventListener('change', searchAndRender);
document.getElementById('cityFilter').addEventListener('change', searchAndRender);
document.getElementById('sortFilter').addEventListener('change', searchAndRender);
document.getElementById('genderFilter').addEventListener('change', searchAndRender);
document.getElementById('availabilityFilter').addEventListener('change', searchAndRender);
document.querySelectorAll('.amenity-check').forEach(function(cb) { cb.addEventListener('change', searchAndRender); });

window.addEventListener('scroll', function() { reveal(); handleNavScroll(); });
window.addEventListener('load', async function() { reveal(); animateCounters(); await loadPGs(); searchAndRender(); updateUserUI(); });

// Close modals on outside click
document.querySelectorAll('.modal').forEach(function(modal) {
    modal.addEventListener('click', function(e) { if (e.target === modal) modal.style.display = 'none'; });
});
