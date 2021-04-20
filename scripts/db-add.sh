#!/bin/bash

function read_user_data {
    while true; do
        read -p "Enter user $1 (latin letters only): " -r
        if echo "$REPLY" | grep -i -q '^[a-zA-Z]*$'; then
            echo $REPLY
            return 0
        fi
    done
}

USER_NAME="$(read_user_data name)"
USER_ROLE="$(read_user_data role)"

echo "$USER_NAME, $USER_ROLE" >> $1
