## Description

Highly opinionated REST backend based on NestJS and Prisma.

## Features

- Language: [Typescript](https://www.typescriptlang.org/)
- Linter: [ESLint](https://eslint.org/)
- Formatter: [Prettier](https://prettier.io/)
- Framework: [NestJS](https://nestjs.com/)
- ORM: [Prisma](https://www.prisma.io/)
- Test: [Jest](https://jestjs.io/) (end2end, unit + coverage report)
- API documentation: [Swagger and OpenAPI](https://docs.nestjs.com/openapi/introduction) spec automatically generated
- API versioning: [NestJs versioning](https://docs.nestjs.com/techniques/versioning)
- Request validation: [NestJS validation](https://docs.nestjs.com/techniques/validation)
- Logging: [Pino](https://github.com/pinojs/pino) with [correlation ID](https://github.com/eropple/nestjs-correlation-id), and pretty print in dev mode
- Error handling: [ts-results](https://github.com/vultix/ts-results)
- Security: [Helmet](https://docs.nestjs.com/security/helmet)

### Infrastructure (optional)

Automatically deploy REST API service and a postgres database with this [Railway](https://railway.app/) template in a couple of minutes.

### Deploy
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/PogKgU?referralCode=v3wYSJ)

### Setup database
Install the [Railway CLI](https://docs.railway.app/develop/cli). To initialize the database, run the following command:

```bash
# Link project
$ railway link

# Set up table in database
$ railway run npm run db:migrate:dev --name init
```

### Test deployment
1. [Expose your app](https://docs.railway.app/deploy/exposing-your-app)
1. Test your API by visiting `{YOUR_DOMAIN_FROM_STEP_1}/api`

## Installation

```bash
$ npm i
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# all tests
$ npm run test

# unit tests
$ npm run test:unit

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Database

```bash
# generate typescript types from database model
$ npm run db:generate

# migrate status
$ npm run db:migrate:status

# migrate dev
$ npm run db:migrate:dev

# migrate prod
$ npm run db:migrate:prod
```

## API documentation

While the application is running, open your browser and navigate to `http://localhost:3000/api`. You should see the Swagger UI. To generate and download a Swagger JSON file, navigate to `http://localhost:3000/api-json`.
