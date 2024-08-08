# Pactify CI/CD Pipeline

## Overview

This project sets up a CI/CD pipeline for our application using Docker, Docker Compose, and GitLab CI/CD.

## Files and Directories

- **Dockerfile**: Defines the steps to build the Docker image for the application.
- **docker-compose.yml**: Defines the services required for the application.
- **.gitlab-ci.yml**: Definess the CI/CD pipeline stages and jobs.
- **/reports**: Contains all the system design and workflow implementation docs.

## How to Run

1. First ensure Docker and Docker Compose are installed.
2. Then clone the repository.
3. Then you want to navigate to the project directory.
4. Then just run `docker-compose up` to start the services.
5. Finally, access the application at `http://localhost:5001`. I can't use port 5000 since Control Center in macOS Monterey listens on it... refer to: [Port 5000 used by Control Center in macOS Control Center](https://nono.ma/port-5000-used-by-control-center-in-macos-controlce).

## CI/CD Pipeline

The CI/CD pipeline is defined in `.gitlab-ci.yml` and includes the following stages:
- **Build**: Builds the Docker image for the application.
- **Deploy**: Deploys the application using Docker Compose.
- **Test**: Verifies the application is running correctly.
