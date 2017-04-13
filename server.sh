#!/bin/bash

if [ "$1" == "start" ]; then
	
	# Start app in docker
	
	docker stop @@NAME_app
	docker rm @@NAME_app
	docker run --name @@NAME_app -d --restart always -v @@CERTS_PATH:/data/certs -v @@LOGS_PATH:/data/logs -v @@CONFIG:/data/config.js @@DOCKER_CONFIG -it @@NAME_app
	
elif [ "$1" == "stop" ]; then
	
	# Stop app in Docker
	
	docker stop @@NAME_app
	docker rm @@NAME_app
	
elif [ "$1" == "restart" ]; then
	
	# Stop app in Docker
	
	docker stop @@NAME_app
	docker rm @@NAME_app
	
	# Start app in docker
	
	docker stop @@NAME_app
	docker rm @@NAME_app
	docker run --name @@NAME_app -d --restart always -v @@CERTS_PATH:/data/certs -v @@LOGS_PATH:/data/logs -v @@CONFIG:/data/config.js @@DOCKER_CONFIG -it @@NAME_app
	
else

	echo "Commands are start, stop and restart"
	
fi