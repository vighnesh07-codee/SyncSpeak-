import http from 'http';

const BASE_URL = 'http://localhost:3000/api/auth/test';

async function makeRequest(i) {
    return new Promise((resolve) => {
        const url = new URL(BASE_URL);
        const options = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname,
            method: 'GET'
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (res.statusCode === 429) {
                        console.log(`❌ Request ${i}: BLOCKED - Status 429 - ${json.message}`);
                    } else if (res.statusCode === 200) {
                        console.log(`✅ Request ${i}: SUCCESS - Status 200 - ${json.message}`);
                    } else {
                        console.log(`⚠️  Request ${i}: Status ${res.statusCode} - ${JSON.stringify(json)}`);
                    }
                } catch (e) {
                    console.log(`❌ Request ${i}: Parse error - ${e.message}`);
                }
                resolve();
            });
        });

        req.on('error', (error) => {
            console.log(`❌ Request ${i}: ERROR - ${error.message}`);
            resolve();
        });

        req.end();
    });
}

async function testRateLimit() {
    console.log('🚀 Starting rate limit test...\n');
    console.log('Making 6 rapid requests (limit is 5 per 60 seconds)\n');
    
    for (let i = 1; i <= 6; i++) {
        await makeRequest(i);
        await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    console.log('\n✅ Test complete!');
    console.log('Expected: Requests 1-5 succeed (200), Request 6 blocked (429)');
    console.log('Wait 60 seconds for rate limit to reset.');
}

testRateLimit();
