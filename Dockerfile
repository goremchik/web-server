ARG BASE_NODE_IMAGE_TAG="node:14.17.1-alpine"

FROM $BASE_NODE_IMAGE_TAG AS BUILD_IMAGE

# Create app directory
ARG WORK_PATH="/usr/src/app"
WORKDIR $WORK_PATH

# Couchbase sdk requirements
RUN apk update && apk add python curl bash g++ make && rm -rf /var/cache/apk/*

# install node-prune (https://github.com/tj/node-prune)
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

# Copy package.json, package-lock.json and source files
COPY package*.json ./
COPY webpack.config.js .
COPY tsconfig.json .
COPY src/ ./src

# Install app dependencies and build app
RUN npm install
RUN npm run server:build

# Remove development dependencies
RUN npm prune --production

# Removing unnecessary files from the node_modules
ARG PATH_TO_REMOVE="node_modules/aws-sdk/apis"
ARG FILE_TO_SAVE="metadata.json"
RUN /usr/local/bin/node-prune
RUN mv ./$PATH_TO_REMOVE/$FILE_TO_SAVE ./$FILE_TO_SAVE
RUN rm -rf $PATH_TO_REMOVE/*
RUN mv ./$FILE_TO_SAVE ./$PATH_TO_REMOVE/$FILE_TO_SAVE


FROM $BASE_NODE_IMAGE_TAG

# Create app directory
ARG WORK_PATH="/usr/src/app"
WORKDIR $WORK_PATH

# Copy all build artifacts and env variables
COPY --from=BUILD_IMAGE $WORK_PATH/dist/index.js .
COPY --from=BUILD_IMAGE $WORK_PATH/node_modules/ ./node_modules
COPY ./.env .

EXPOSE 3000

CMD [ "node", "index.js" ]