const request = require('supertest');
const server = require('../Server/index');

describe('Server Test', () => {
    afterAll((done) => {
        server.close(done);
    });

    test('GET / should return "Hello, this is your Node.js server!"', async() => {
        const response = await request(server).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello, this is your Node.js server!');
    });

    // Add more tests for your routes and server functionality as needed
});