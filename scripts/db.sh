#!/bin/bash

WRONG_COMAND_TEXT="
Wrong command was entered.
Please use db.sh or db.sh help to read detailed documentation.
"

set -e
DATA_PATH=../data
FINE_NAME=users.db

if [[ $1 =~ ^(add|backup|restore|find|list)$ ]]; then
    ./db-validate-data-file.sh $DATA_PATH/$FINE_NAME
fi

case $1 in
    "" | help) ./db-help.sh;;
    add) ./db-add.sh $DATA_PATH/$FINE_NAME;;
    backup) ./db-backup.sh $DATA_PATH $FINE_NAME;;
    restore) ./db-restore.sh $DATA_PATH $FINE_NAME;;
    find) ./db-find.sh $DATA_PATH/$FINE_NAME;;
    list) ./db-list.sh $DATA_PATH/$FINE_NAME $2;;
    *) echo $WRONG_COMAND_TEXT;;
esac
