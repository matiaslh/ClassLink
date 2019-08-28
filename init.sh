#!/bin/bash

#build frontend
cd frontend
npm run build

#build clojure functions and move into build folder
cd scheduler
lein cljsbuild once min
cp resources/public/js/compiled/scheduler.js ../build/static/js
cd ..

#move build to auth container
rm -rf ../auth/build_client
mv build ../auth/build_client

#start containers
docker-compose up --build -d
