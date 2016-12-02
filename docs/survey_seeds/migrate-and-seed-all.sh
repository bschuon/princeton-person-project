#!/bin/bash
node server/db/migrate.js

echo "users"
node server/db/seeds/users/users.js

echo "body-consciousness-scale"
node server/db/seeds/surveys/body-consciousness-scale.js

echo "demographics"
node server/db/seeds/surveys/demographics.js

echo  "feedback"
node server/db/seeds/surveys/feedback.js

echo "mos-social-support"
node server/db/seeds/surveys/mos-social-support.js

echo "real-world-sharing"
node server/db/seeds/surveys/real-world-sharing.js

echo "extraversion"
node server/db/seeds/surveys/extraversion.js

echo "loneliness"
node server/db/seeds/surveys/loneliness.js

echo "depression"
node server/db/seeds/surveys/depression.js

echo "perceived-stress-survey"
node server/db/seeds/surveys/perceived-stress-survey.js

echo "berkeley-expressivity-questionnaire"
node server/db/seeds/surveys/berkeley-expressivity-questionnaire.js

