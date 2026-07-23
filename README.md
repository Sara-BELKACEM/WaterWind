# WaterWind REST API

## Overview

WaterWind is a Laravel 12 REST API for an AgriTech platform that recommends the best water solution for crops based on crop type, soil type, humidity, wind speed, and surface area. The system also manages WaterWind products and provides an admin dashboard.

## Features

* User Authentication (Laravel Sanctum)
* Product Management (CRUD)
* Crop Management (CRUD + Crop/Soil Compatibility)
* Soil Management (CRUD)
* Smart Water Analysis & Recommendations
* Mineral Recommendations
* Analysis History
* Dashboard Statistics
* Contact Form API
* Swagger API Documentation
* Database Seeders

## Tech Stack

* Laravel 12
* PHP 8.3+
* MySQL
* Laravel Sanctum
* L5 Swagger (OpenAPI)

## Installation

```bash
git clone <repository-url>
cd waterwind-api

composer install

cp .env.example .env

php artisan key:generate

php artisan migrate --seed

php artisan serve
```

## API Documentation

Swagger:

```
/api/documentation
```

## Default Features

* Authentication with Sanctum
* Standard JSON API Responses
* Form Request Validation
* Smart Recommendation Service
* Crop & Soil Compatibility
* Mineral Recommendations
* Dashboard & Statistics
* Swagger Documentation

## Project Structure

```
app/
 ├── Http/
 ├── Models/
 ├── Services/
 ├── Traits/
 ├── Http/Resources/
 ├── Http/Requests/

database/
 ├── migrations/
 ├── seeders/

routes/
 └── api.php
```

## Run Tests

```bash
php artisan test
```

## License

MIT License.
