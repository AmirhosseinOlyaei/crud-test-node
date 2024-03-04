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

describe('Retrieve All Messages', () => {
    test('get all messages - messages available', async () => {
        const response = await axios.get('http://localhost:8080/messages');
        expect(response.status).toBe(200);

        const expectedResult = [
            { id: 9996, posted_by: 9996, message_text: 'test message 3', time_posted_epoch: 1669947792 },
            { id: 9997, posted_by: 9997, message_text: 'test message 2', time_posted_epoch: 1669947792 },
            { id: 9999, posted_by: 9999, message_text: 'test message 1', time_posted_epoch: 1669947792 }
        ];
        expect(response.data).toEqual(expectedResult);
    });
});
