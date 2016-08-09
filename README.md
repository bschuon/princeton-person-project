## Set Up

```
npm install knex -g
npm install nodemon -g
npm install bower -g
npm install gulp -g
createdb princeton-development
cp .env{.example,}
npm install
nodemon
```

The application requires a facebook client id, client secret and callback url to work properly.  If you prefer to get the application up and running without the facebook credentials, you may add the `SKIP_FACEBOOK_STRATEGY` environment variable.  There is an example in the `.env.example` file.

### Dev build

To build the code for development, open a terminal window and type:

```
gulp dev
```
Allow the gulp script to continue to run.  In a separate tab, run:

```
nodemon
```


## Databases

The app requires two databases, so most Knex commands won't _just work_.  To that end, there are custom database migration scripts:

### Running Migrations

To migrate to the latest version, run:

```
node server/db/migrate.js
```

To rollback, run:

```
node server/db/migrate.js rollback
```

### Creating Migrations

__TODO:__ fix ```make-migrations.js``` for single database.

To create new migrations for the **users** database, run:

```
node server/db/make-migration.js users migration-name
```

To create new migrations for the **surveys** database, run:

```
node server/db/make-migration.js surveys migration-name
```

### Creating and Seeding the Database:

```
./server/db/reset-database.sh
```

## Running tests

The test suite uses Mocha, Chai and Supertest.

To prepare the test database, run:

```
node server/db/prepare.js
```

To run server tests, run:

```
npm test
```

To run integration tests, first run the server:

```
gulp dev
nodemon
```

Then run protractor:

```
npm run protractor
```
