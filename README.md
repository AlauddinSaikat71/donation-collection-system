## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## DB Setup

1. First install the software 'pgAdmin' in your local machine. You can download from here : https://www.pgadmin.org/download/
2. Create a user in 'pgAdmin'.
3. Create a database & name the database as your wish.

## .env file

1. create '.env' file in root directory.
2. Copy the code from 'sample.env' file.
3. Paste the code in '.env' file.
4. Now fille up these variable :
   POSTGRES_USER=
   POSTGRES_PASSWORD=
   POSTGRES_DATABASE=
   You can set other variable as your wish.

## Installation

To Install all packages used in this project run the following command.

```bash
$ npm install
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
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
