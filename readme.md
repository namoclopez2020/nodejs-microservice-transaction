# CodeChallenge
### Challenge using the following technologies:
- Typescript
- NodeJs
- Kafka
- Postgres
- Docker
- CQRS

## Initial Setup

1. Root directory contains a `docker-compose.yml` file. Run `docker-compose up` to create docker containers.
2. Enter to directory `ms-antifraud` and run `yarn install` to install dependencies.
3. Enter to directory `ms-antifraud` and run `yarn start:dev` to start the server.
4. Enter to directory `ms-transaction` and run `yarn install` to install dependencies.
5. Enter to directory `ms-transaction` and run `yarn start:dev` to start the server.
6. Create a `.env` file in each project and set environment variables. You can guide from `.env.example` file located in each root directory project.

* For test go to root directory in each projects and run `yarn run test`.

# API Documentation

## Transaction

### Create transaction
```
POST /transactions
```
```
{
  "transactionExternalId": "f4650e37-0f2d-4a53-ae71-3871404fb3c2",
  "accountExternalIdDebit": "f549b5ea-c956-453a-b78f-550948753925",
  "accountExternalIdCredit": "f549b5ea-c956-453a-b78f-550948753925",
  "tranferTypeId": 1,
  "value": 500
}
```


### Get transaction
```
GET /transactions/f4650e37-0f2d-4a53-ae71-3871404fb3c2
```
```
{
    "transactionExternalId": "f4650e37-0f2d-4a53-ae71-3871404fb3c2",
    "transactionType": {
        "name": 1
    },
    "transactionStatus": {
        "name": "APPROVED"
    },
    "value": 500,
    "createdAt": "2022-12-28T23:05:10.097Z"
}
```
