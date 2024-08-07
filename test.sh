#!/bin/sh

# Wait for the container to be fully up and running
sleep 20

# Perform a simple curl test to check if the service is up
curl -f http://localhost:5000 || exit 1

echo "Container is running and accessible"