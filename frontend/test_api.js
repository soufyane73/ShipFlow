const axios = require('axios');

async function testApi() {
    try {
        console.log('1. Attempting Login...');
        const loginRes = await axios.post('http://127.0.0.1:8000/api/auth/login', {
            email: 'admin@example.com',
            password: 'password'
        });

        console.log('Login Response Data:', loginRes.data);
        const token = loginRes.data.access_token || loginRes.data.token || loginRes.data.authorization?.token;

        if (!token) {
            throw new Error('No token found in response');
        }

        console.log('Login Successful! Token received (first 20 chars):', token.substring(0, 20));

        console.log('\n2. Attempting to Fetch Products...');
        const productRes = await axios.get('http://127.0.0.1:8000/api/produits', {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log('Products Fetched Successfully!');
        console.log('Count:', productRes.data.data.length);

    } catch (error) {
        console.error('Test Failed!');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else {
            console.error(error.message);
        }
    }
}

testApi();
