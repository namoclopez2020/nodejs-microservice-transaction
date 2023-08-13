import request from 'supertest';
import { appInstance, serverInstance } from '../../src/app'
import myDataSource from '../../src/Infrastructure/Repositories/dataSources/data-source';
import express from 'express';
import { KafkaService } from '../../src/Infrastructure/Brokers/kafka.service';

let app: express.Application;
let kafkaService: KafkaService;

beforeAll(done => {
  kafkaService = new KafkaService()
  done()
})

describe('e2e tests for transaction api', () => {
  it('should save a transaction', async (done) => {
    app = await appInstance;

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

afterAll(async done => {
  if (serverInstance) {
    await serverInstance.closeApp();
  }

  if (kafkaService) {
    await kafkaService.closeConnection();
  }

  myDataSource.destroy()
  done()
})
