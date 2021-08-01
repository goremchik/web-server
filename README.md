### Web Server ###
[![codecov](https://codecov.io/gh/goremchik/web-server/branch/master/graph/badge.svg?token=MO8MYLIF13)](https://codecov.io/gh/goremchik/web-server)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage)](https://codeclimate.com/github/codeclimate/codeclimate/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/codeclimate/codeclimate/maintainability)

DB connection variables are defined in .env file. 

## Server ##
# Run #

`npm run server:start` - start builded server app
# Build #
`npm run server:build` - build server code

# Watch #
`npm start`
`npm run server:watch` - start server and reload on file changes

# Deploy to EC2#
`cd scripts`
`./deploy-to-ec2.sh`

## Other ##
# Prettier #
`npm run format` - run prettier auto fix
`npm run eslint` - run linter check

## AWS ##
# Lambda #
 Configure serverless CLI with your AWS credentials. This is necessary for deployment:
`serverless config credentials --provider aws --key <your_access_key_id> --secret <your_access_key_secret>`

`npm run notifications:deploy` - deploy notification lambda
