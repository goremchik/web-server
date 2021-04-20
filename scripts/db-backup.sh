#!/bin/bash

cd $1
cp $2 "$(date +'%m-%d-%Y')-$2.backup"
