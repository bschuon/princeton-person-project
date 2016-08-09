#!/bin/bash
dropdb princeton-development
createdb princeton-development

node server/db/migrate.js
node server/db/seeds/users/users.js
./server/db/seeds/surveys/migrate-and-seed-all.sh
