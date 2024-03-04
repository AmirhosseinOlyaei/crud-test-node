const axios = require('axios');
const { spawn } = require('child_process');

let serverProcess;

beforeAll(async () => {
    // Start your server here
    serverProcess = spawn('node', ['path/to/your/server.js']);
    await new Promise(resolve => setTimeout(resolve, 500)); // Wait for the server to start
});

afterAll(async () => {
    // Stop your server here
    serverProcess.kill();
    await new Promise(resolve => setTimeout(resolve, 500)); // Wait for the server to stop
});

describe('User Registration', () => {
    test('register user successfully', async () => {
        const userData = {
            username: 'user',
            password: 'password'
        };

        const response = await axios.post('http://localhost:8080/register', userData);
        expect(response.status).toBe(200);
    });

    test('register user with duplicate username', async () => {
        const userData = {
            username: 'user',
            password: 'password'
        };

        const response1 = await axios.post('http://localhost:8080/register', userData);
        expect(response1.status).toBe(200);

        try {
            await axios.post('http://localhost:8080/register', userData);
        } catch (error) {
            expect(error.response.status).toBe(409);
        }
    });
});
