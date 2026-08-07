const API_BASE = window.location.hostname === 'localhost'
    ? 'http://localhost:5000/api'
    : 'https://your-production-api.com/api';

// Get auth token from localStorage
const getToken = () => localStorage.getItem('pg_token');

// Set auth token
const setToken = (token) => localStorage.setItem('pg_token', token);

// Remove auth token
const removeToken = () => localStorage.removeItem('pg_token');

// Set user data
const setUser = (user) => localStorage.setItem('pg_user', JSON.stringify(user));

// Get user data
const getUser = () => {
    const user = localStorage.getItem('pg_user');
    return user ? JSON.parse(user) : null;
};

// Remove user data
const removeUser = () => localStorage.removeItem('pg_user');

// Common fetch wrapper with auth
const apiFetch = async (endpoint, options = {}) => {
    const token = getToken();
    const headers = {
        'ContentAuth': 'application/json',
        ...options.headers
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // Don't set Content-Type for FormData (multipart)
    if (options.body instanceof FormData) {
        delete headers['Content-Type'];
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Request failed');
    }

    return data;
};

// Auth API
const authAPI = {
    register: async (name, email, phone, password) => {
        const data = await apiFetch('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, phone, password })
        });
        setToken(data.token);
        setUser(data.user);
        return data;
    },

    login: async (email, password) => {
        const data = await apiFetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        setToken(data.token);
        setUser(data.user);
        return data;
    },

    getMe: async () => {
        return apiFetch('/auth/me');
    },

    logout: () => {
        removeToken();
        removeUser();
    }
};

// PG API
const pgAPI = {
    getAll: async (filters = {}) => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                params.append(key, value);
            }
        });
        const query = params.toString();
        return apiFetch(`/pgs${query ? '?' + query : ''}`);
    },

    getBySlug: async (slug) => {
        return apiFetch(`/pgs/${slug}`);
    },

    getStats: async () => {
        return apiFetch('/pgs/stats');
    },

    addReview: async (pgId, rating, comment) => {
        return apiFetch(`/pgs/${pgId}/reviews`, {
            method: 'POST',
            body: JSON.stringify({ rating, comment })
        });
    },

    create: async (formData) => {
        return apiFetch('/pgs', {
            method: 'POST',
            body: formData
        });
    }
};

// Inquiry API
const inquiryAPI = {
    create: async (pgId, name, email, phone, message) => {
        return apiFetch('/inquiries', {
            method: 'POST',
            body: JSON.stringify({ pg_id: pgId, name, email, phone, message })
        });
    },

    getAll: async (filters = {}) => {
        const params = new URLSearchParams(filters);
        const query = params.toString();
        return apiFetch(`/inquiries${query ? '?' + query : ''}`);
    }
};

// Favorites API
const favoritesAPI = {
    getAll: async () => {
        return apiFetch('/favorites');
    },

    add: async (pgId) => {
        return apiFetch(`/favorites/${pgId}`, { method: 'POST' });
    },

    remove: async (pgId) => {
        return apiFetch(`/favorites/${pgId}`, { method: 'DELETE' });
    }
};
