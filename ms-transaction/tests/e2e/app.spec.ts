import request from 'supertest';
import { appInstance } from '../../src/app'

describe('Pruebas de integración para el servidor Express', () => {
  it('Debería responder con un mensaje de saludo', async (done) => {
    const app = await appInstance;

    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(response.text).toBe("[]");

    done(); // Importante llamar a done() cuando la prueba asíncrona ha terminado
  });
});
