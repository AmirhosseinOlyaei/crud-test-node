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

describe('Delete Message by Message ID', () => {
    test('delete message given message ID - message found', async () => {
        const response = await axios.delete('http://localhost:8080/messages/9999');
        expect(response.status).toBe(200);
        expect(response.data).toBe(1); // Assuming the response body is the number of rows modified
    });

    test('delete message given message ID - message not found', async () => {
        const response = await axios.delete('http://localhost:8080/messages/100');
        expect(response.status).toBe(200);
        expect(response.data).toBe(0); // Assuming the response body is the number of rows modified
    });
});
