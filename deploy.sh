#!/bin/bash
set -e

echo "🚀 Starting deployment of City Island Clicker..."

# 1. Pull latest code from GitHub
git pull origin main

# 2. Install PHP dependencies
composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

# 3. Install JS dependencies & Build production frontend assets
npm ci || npm install
npm run build

# 4. Run database migrations & seeders
php artisan migrate --force --seed

# 5. Clear and optimize Laravel caches
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# 6. Set correct permissions for Nginx and PHP-FPM
sudo chown -R www-data:www-data .
sudo chmod -R 775 storage bootstrap/cache

echo "✅ Deployment completed successfully! Live on https://cityislandclicker.com"
