ARG BASE_NODE_IMAGE="node:14.17.1-alpine"
ARG BASE_NGINX_IMAGE="nginx"

FROM $BASE_NODE_IMAGE AS BUILD_IMAGE

# Create app directory
ARG WORKPATH="/usr/src/app"
WORKDIR $WORKPATH

# Copy package.json, package-lock.json and source files
ARG CLIENT_PATH="./client"
COPY $CLIENT_PATH/package*.json ./
COPY $CLIENT_PATH/angular.json ./
COPY $CLIENT_PATH/tsconfig*.json ./
COPY $CLIENT_PATH/src/ ./src

# Install app dependencies and build app
RUN npm install
RUN npm run build


FROM nginx

# Create app directory
ARG WORKPATH="/usr/src/app"
WORKDIR $WORKPATH

# Copy all build artifacts
ARG NGINX_PATH="./nginx"
COPY --from=BUILD_IMAGE $WORKPATH/dist ./
COPY $NGINX_PATH/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
