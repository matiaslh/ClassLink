#!/bin/bash

docker-compose up --build -d

#build frontend
cd frontend
npm run build

#move build to auth container
mkdir ../auth/build_client
mv build ../auth/build_client