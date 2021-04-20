#!/bin/bash

# $DATA_PATH $FINE_NAME
cd $1

backup=$(ls . | grep .backup | tail -1)

if [[ -z "$backup" ]]; then
    echo "No backup file found"
    exit 2
fi

yes | cp -rf $backup $2
