#!/usr/bin/env bash

set -e

echo "Updating package lists..."
sudo apt-get update

echo "Installing MariaDB server and client..."
sudo apt-get install -y mariadb-server mariadb-client

echo "Starting MariaDB..."
sudo service mariadb start || true

echo "Waiting for MariaDB to initialize..."
sleep 5

echo "Creating database and table..."
sudo mariadb <<'SQL'
CREATE DATABASE IF NOT EXISTS cs208demo;
USE cs208demo;

CREATE TABLE IF NOT EXISTS comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  comment VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
SQL

echo "Database setup complete."

