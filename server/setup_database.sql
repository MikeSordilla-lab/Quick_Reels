-- Quick Reels Database Setup Script
-- Run this in MySQL Workbench to create the database

-- Create the database
CREATE DATABASE IF NOT EXISTS quickreals;

-- Use the database
USE quickreals;

-- Show confirmation
SELECT 'Database "quickreals" created successfully!' AS Status;

-- The tables (users, videos, comments) will be created automatically
-- by Sequelize when you start the Node.js server with: npm run dev
