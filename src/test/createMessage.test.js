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

describe('Create Message', () => {
    test('create message successful', async () => {
        const messageData = {
            posted_by: 9999,
            message_text: 'hello message',
            time_posted_epoch: 1669947792
        };

        const response = await axios.post('http://localhost:8080/messages', messageData);
        expect(response.status).toBe(200);

        const expectedResult = { id: 1, posted_by: 9999, message_text: 'hello message', time_posted_epoch: 1669947792 };
        expect(response.data).toEqual(expectedResult);
    });

    test('create message with empty message text', async () => {
        const messageData = {
            posted_by: 9999,
            message_text: '',
            time_posted_epoch: 1669947792
        };

        try {
            await axios.post('http://localhost:8080/messages', messageData);
        } catch (error) {
            expect(error.response.status).toBe(400);
        }
    });

    test('create message with message text greater than 254 characters', async () => {
        const longMessage = 'a'.repeat(255);
        const messageData = {
            posted_by: 9999,
            message_text: longMessage,
            time_posted_epoch: 1669947792
        };

        try {
            await axios.post('http://localhost:8080/messages', messageData);
        } catch (error) {
            expect(error.response.status).toBe(400);
        }
    });

    test('create message with non-existent user id', async () => {
        const messageData = {
            posted_by: 5050,
            message_text: 'hello message',
            time_posted_epoch: 1669947792
        };

        try {
            await axios.post('http://localhost:8080/messages', messageData);
        } catch (error) {
            expect(error.response.status).toBe(400);
        }
    });
});
