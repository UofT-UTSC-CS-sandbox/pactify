#!/bin/sh

# Increase the wait time to ensure the service is up and running
sleep 60

# Check if the service is listening 
netstat -tuln

# Check if the service is up
curl -f http://localhost:5000 || {
  echo "Service is not running or not accessible"
  exit 1
}

echo "Container is running and accessible"