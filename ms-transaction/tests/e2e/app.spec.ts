import request from 'supertest';
import app from '../../src/app';

describe('Pruebas de integración para el servidor Express', () => {
  it('Debería responder con un mensaje de saludo', async () => {
    const response = await request(app).get('/greetings');

    expect(response.status).toBe(200);
    expect(response.text).toBe('Hola, bienvenido a mi servidor Express!');
  });
});
