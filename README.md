### Web Server ###
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
