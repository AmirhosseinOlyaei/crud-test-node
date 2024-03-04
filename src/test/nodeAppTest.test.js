const axios = require('axios');
const { spawn } = require('child_process');

let serverProcess;

beforeAll(async () => {
    // Start your Node.js server here
    // Adjust the command according to how you start your server, e.g., 'node', 'npm start', etc.
    serverProcess = spawn('node', ['path/to/your/server.js']);
    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for the server to start
});

afterAll(async () => {
    // Stop your Node.js server here
    serverProcess.kill();
});

describe('Node.js Application', () => {
    test('default 404 response', async () => {
        const random = Math.floor(Math.random() * 100000);
        try {
            await axios.get(`http://localhost:8080/arbitrary${random}`);
        } catch (error) {
            expect(error.response.status).toBe(404);
            expect(error.response.data).toHaveProperty('timestamp');
            expect(error.response.data).toHaveProperty('status');
            expect(error.response.data).toHaveProperty('error');
            expect(error.response.data).toHaveProperty('path');
        }
    });

    // Add more tests for your endpoints here
});
