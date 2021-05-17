#!/bin/bash

echo "
Available commands:
    - add - adds a new line to the data file;
    - backup - creates a new backup file, named %date%-%file%.backup which is a copy of current data file;
    - restore - restore last backup file;
    - find - prints username and role if such exists in data file;
    - list [inverse] - prints contents of data file in format: <line-number>. username, role.
"