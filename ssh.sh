#!/bin/bash
# Container ssh

source ./scripts/functions.sh

if [ -n $1 ]; then
    docker exec -it "microservice-$1" /bin/sh
    printf "${RED}"

    echo "-----------------------------------"
    echo "---- Connected to container $1 ----"
    echo "-----------------------------------"
    printf "${NC}\n"

    exit
fi

printf "${RED}[Error] - Either container not exists or the container is not running${NC}\n\n"