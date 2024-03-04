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

describe('Retrieve All Messages for User', () => {
    test('get all messages from user - messages exist', async () => {
        const response = await axios.get('http://localhost:8080/accounts/9999/messages');
        expect(response.status).toBe(200);

        const expectedResult = [
            { id: 9999, posted_by: 9999, message_text: 'test message 1', time_posted_epoch: 1669947792 }
        ];
        expect(response.data).toEqual(expectedResult);
    });

    test('get all messages from user - no messages found', async () => {
        const response = await axios.get('http://localhost:8080/accounts/9998/messages');
        expect(response.status).toBe(200);
        expect(response.data).toEqual([]); // Assuming the response body is an empty array
    });
});
