#!/bin/bash

read -p "Enter user name: " -r

if [[ -z "$(grep "$REPLY," $1)" ]]; then
    echo "User not found"
    exit 1
fi

grep "$REPLY," $1
