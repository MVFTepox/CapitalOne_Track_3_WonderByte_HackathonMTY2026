const request = require('supertest');

const app = require('../server');
describe('Servidor', () => {

    test('GET / 200', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        //expect(response.body.message).toBe('Banco API funcionando');
    });

});