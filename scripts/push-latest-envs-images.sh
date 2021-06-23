#!/bin/bash

IMAGES_REGISTRY="490647521811.dkr.ecr.eu-central-1.amazonaws.com"
IMAGES_REPOSITORY="back-end"
IMAGE=$(aws ecr list-images --repository-name $IMAGES_REPOSITORY --max-items 1 --filter tagStatus=TAGGED | grep imageTag | xargs | awk -F ': ' '{print $2}')

docker pull $IMAGES_REGISTRY/$IMAGES_REPOSITORY:$IMAGE

declare -a ENVIROMENTS=("qa" "test" "production")

for ENV in "${ENVIROMENTS[@]}"
do  
    ENV_IMAGE=$ENV-latest
    docker image tag $IMAGES_REGISTRY/$IMAGES_REPOSITORY:$IMAGE $IMAGES_REPOSITORY:$ENV_IMAGE
    docker image tag $IMAGES_REPOSITORY:$ENV_IMAGE $IMAGES_REGISTRY/$IMAGES_REPOSITORY:$ENV_IMAGE 
    docker push $IMAGES_REGISTRY/$IMAGES_REPOSITORY:$ENV_IMAGE
done
