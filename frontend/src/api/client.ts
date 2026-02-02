import axios from 'axios';

const client = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Add a request interceptor to include the auth token
client.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        console.log('Requesting:', config.url, 'Token Present:', !!token);
        if (token && token !== 'undefined' && token !== 'null') {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            // Clean up bad token if found
            if (token) localStorage.removeItem('auth_token');
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle auth errors
client.interceptors.response.use(
    (response) => response,
    (error) => {
        // console.error('API Error Interceptor:', error.response?.status, error.response?.data);
        if (error.response?.status === 401) {
            // console.log('401 detected, clearing token...');
            localStorage.removeItem('auth_token');
            // Redirect to login
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default client;
