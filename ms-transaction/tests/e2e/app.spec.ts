import request from 'supertest';
import { appInstance } from '../../src/app'

describe('Pruebas de integración para el servidor Express', () => {
  it('Debería responder con un mensaje de saludo', async (done) => {
    const app = await appInstance;

    const response = await request(app)
      .post('/transactions')
      .send({
        "transactionExternalId": "f4650e37-0f2d-4a53-ae71-3871404fb3c1",
        "accountExternalIdDebit": "f4650e37-0f2d-4a53-ae71-3871404fb3c0",
        "accountExternalIdCredit": "c5656fb7-ea22-4612-9fdf-14267fd9884e",
        "tranferTypeId": 1,
        "value": 12000
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      "message": "Transaction created successfully"
    });

    done();
  });
});
