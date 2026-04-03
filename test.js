const http = require('http');

const BASE_URL = 'http://localhost:3000';

// Helper function to make requests
function makeRequest(method, path, data) {
    return new Promise((resolve, reject) => {
        const url = new URL(path, BASE_URL);
        const options = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                resolve({
                    status: res.statusCode,
                    body: JSON.parse(body)
                });
            });
        });

        req.on('error', reject);
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
}

// Test function
async function runTests() {
    try {
        console.log('🧪 Testing Auth API...\n');

        // Test 1: Sign up
        console.log('1️⃣  Testing SIGNUP...');
        const signupRes = await makeRequest('POST', '/signup', {
            username: 'testuser',
            password: 'password123'
        });
        console.log('Status:', signupRes.status);
        console.log('Response:', signupRes.body);
        console.log('');

        // Test 2: Sign up another user
        console.log('2️⃣  Testing SIGNUP (Another user)...');
        const signup2Res = await makeRequest('POST', '/signup', {
            username: 'john',
            password: 'john123'
        });
        console.log('Status:', signup2Res.status);
        console.log('Response:', signup2Res.body);
        console.log('');

        // Test 3: Sign in
        console.log('3️⃣  Testing SIGNIN...');
        const signinRes = await makeRequest('POST', '/signin', {
            username: 'testuser',
            password: 'password123'
        });
        console.log('Status:', signinRes.status);
        console.log('Response:', signinRes.body);
        const token = signinRes.body.token;
        console.log('');

        // Test 4: Get user info with token
        console.log('4️⃣  Testing GET /me (with token)...');
        const meRes = await new Promise((resolve, reject) => {
            const url = new URL('/me', BASE_URL);
            const options = {
                hostname: url.hostname,
                port: url.port,
                path: url.pathname,
                method: 'GET',
                headers: {
                    'Authorization': token
                }
            };

            const req = http.request(options, (res) => {
                let body = '';
                res.on('data', chunk => body += chunk);
                res.on('end', () => {
                    resolve({
                        status: res.statusCode,
                        body: JSON.parse(body)
                    });
                });
            });

            req.on('error', reject);
            req.end();
        });
        console.log('Status:', meRes.status);
        console.log('Response:', meRes.body);
        console.log('');

        // Test 5: Wrong password
        console.log('5️⃣  Testing SIGNIN (Wrong password)...');
        const wrongRes = await makeRequest('POST', '/signin', {
            username: 'testuser',
            password: 'wrongpassword'
        });
        console.log('Status:', wrongRes.status);
        console.log('Response:', wrongRes.body);
        console.log('');

        // Test 6: Get user info without token
        console.log('6️⃣  Testing GET /me (without token)...');
        const noTokenRes = await new Promise((resolve, reject) => {
            const url = new URL('/me', BASE_URL);
            const options = {
                hostname: url.hostname,
                port: url.port,
                path: url.pathname,
                method: 'GET',
                headers: {
                    'Authorization': 'invalid-token'
                }
            };

            const req = http.request(options, (res) => {
                let body = '';
                res.on('data', chunk => body += chunk);
                res.on('end', () => {
                    resolve({
                        status: res.statusCode,
                        body: JSON.parse(body)
                    });
                });
            });

            req.on('error', reject);
            req.end();
        });
        console.log('Status:', noTokenRes.status);
        console.log('Response:', noTokenRes.body);
        console.log('');

        console.log('✅ All tests completed!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

// Wait a bit for server to start, then run tests
setTimeout(runTests, 1000);
