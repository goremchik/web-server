#!/bin/bash

if [ "$2" = "inverse" ]; then
    awk '{print NR  ". " $s}' $1 | sort -r -n
else
    awk '{print NR  ". " $s}' $1
fi
