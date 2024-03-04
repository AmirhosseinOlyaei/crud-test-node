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

describe('Retrieve Message by Message ID', () => {
    test('get message given message ID - message found', async () => {
        const response = await axios.get('http://localhost:8080/messages/9999');
        expect(response.status).toBe(200);

        const expectedResult = { id: 9999, posted_by: 9999, message_text: 'test message 1', time_posted_epoch: 1669947792 };
        expect(response.data).toEqual(expectedResult);
    });

    test('get message given message ID - message not found', async () => {
        try {
            await axios.get('http://localhost:8080/messages/100');
        } catch (error) {
            expect(error.response.status).toBe(200);
            expect(error.response.data).toEqual({}); // Assuming the response body is an empty object
        }
    });
});
