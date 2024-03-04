const axios = require('axios');
const { spawn } = require('child_process');

let serverProcess;

beforeAll(async () => {
    // Start your Node.js server here
    serverProcess = spawn('node', ['path/to/your/server.js']);
    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for the server to start
});

afterAll(async () => {
    // Stop your Node.js server here
    serverProcess.kill();
});

describe('Update Message', () => {
    test('update message successful', async () => {
        const messageData = { message_text: 'text changed' };
        const response = await axios.patch('http://localhost:8080/messages/9999', messageData);
        expect(response.status).toBe(200);
        expect(response.data).toBe(1); // Assuming the response body is the number of rows modified
    });

    test('update message - message not found', async () => {
        const messageData = { message_text: 'text changed' };
        try {
            await axios.patch('http://localhost:8080/messages/5050', messageData);
        } catch (error) {
            expect(error.response.status).toBe(400);
        }
    });

    test('update message - message string empty', async () => {
        const messageData = { message_text: '' };
        try {
            await axios.patch('http://localhost:8080/messages/9999', messageData);
        } catch (error) {
            expect(error.response.status).toBe(400);
        }
    });

    test('update message - message too long', async () => {
        const longMessage = 'a'.repeat(256);
        const messageData = { message_text: longMessage };
        try {
            await axios.patch('http://localhost:8080/messages/9999', messageData);
        } catch (error) {
            expect(error.response.status).toBe(400);
        }
    });
});
