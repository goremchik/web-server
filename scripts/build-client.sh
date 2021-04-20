#!/bin/bash

cd ..
if [ -f .env ]; then
    export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
fi

cd client
npm i
npm run build -- --configuration=$ENV_CONFIGURATION

cd dist
zip -r client-app.zip *
