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

describe('User Login', () => {
    test('login successful', async () => {
        const userData = {
            account_id: 0,
            username: 'testuser1',
            password: 'password'
        };

        const response = await axios.post('http://localhost:8080/login', userData);
        expect(response.status).toBe(200);

        const expectedResult = { account_id: 9999, username: 'testuser1', password: 'password' };
        expect(response.data).toEqual(expectedResult);
    });

    test('login invalid username', async () => {
        const userData = {
            account_id: 9999,
            username: 'testuser404',
            password: 'password'
        };

        try {
            await axios.post('http://localhost:8080/login', userData);
        } catch (error) {
            expect(error.response.status).toBe(401);
        }
    });

    test('login invalid password', async () => {
        const userData = {
            account_id: 9999,
            username: 'testuser1',
            password: 'pass404'
        };

        try {
            await axios.post('http://localhost:8080/login', userData);
        } catch (error) {
            expect(error.response.status).toBe(401);
        }
    });
});
