#!/bin/bash

# Client build and deploy
dist_path="/home/sshuser/web-server"
client_path="$dist_path/client"
client_dist="../client/dist"
client_zip="client-app.zip"

./build-client.sh

ssh my-ec2 "rm -rf $client_path/*"
scp $client_dist/$client_zip my-ec2:$client_path
ssh my-ec2 "unzip $client_path/$client_zip -d $client_path"

# Server build and deploy
server_path="$dist_path/server"
server_zip="server-app.zip"

./build-server.sh

ssh my-ec2 "cd $server_path && npm run server:stop && rm -rf ./*"
scp ../$server_zip my-ec2:$server_path
ssh my-ec2 "cd $server_path && unzip ./$server_zip -d ./ && npm i && npm run server:start"
