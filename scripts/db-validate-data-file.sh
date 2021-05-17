#!/bin/bash

if [ -f $1 ]; then
    exit 0
fi

read -p "File: $1 doesn't exists. Should it be created? (yes|no): " -r
if [[ $REPLY =~ ^(Y|y|YES|yes)$ ]]; then
    touch $1
    exit 0
fi

exit 2
