#!/bin/bash

cd ..

TIMESTAMP=$(date "+%Y-%m-d-%H-%M-%S")
TAG=back-end:latest-$TIMESTAMP
AWS_DOCKERHUB_URL=490647521811.dkr.ecr.eu-central-1.amazonaws.com

docker build -t $TAG .
docker tag $TAG $AWS_DOCKERHUB_URL/$TAG
docker push $AWS_DOCKERHUB_URL/$TAG
