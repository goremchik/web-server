#!/bin/bash

cd ..
npm i
npm run server:build

zip -r server-app.zip dist/ index.js package.json package-lock.json .env tsconfig.json
