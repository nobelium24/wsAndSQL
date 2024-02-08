#!/bin/bash

# Load environment variables
source .env

# Get the ID of the running PostgreSQL container
CONTAINER_ID=$(docker ps -q --filter name=wsAndSQL)

# Connect to PostgreSQL and create the database if it doesn't exist
docker exec -it $CONTAINER_ID bash -c "PGPASSWORD=$DB_PASSWORD psql -h localhost -U $DB_USERNAME -tc \"SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'\" | grep -q 1 || PGPASSWORD=$DB_PASSWORD psql -h localhost -U $DB_USERNAME -c \"CREATE DATABASE $DB_NAME\""

# Start your application with nodemon
nodemon dist/index.js