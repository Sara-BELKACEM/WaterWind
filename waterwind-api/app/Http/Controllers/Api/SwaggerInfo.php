<?php

namespace App\Http\Controllers\Api;

use OpenApi\Attributes as OA;

#[OA\Info(
    title: 'WaterWind API',
    version: '1.0.0',
    description: 'WaterWind – Smart Water Recommendation Platform REST API. Authenticate via Sanctum Bearer tokens.'
)]
#[OA\SecurityScheme(
    securityScheme: 'sanctum',
    type: 'http',
    scheme: 'bearer',
    description: 'Enter your Sanctum token as: Bearer {token}'
)]
#[OA\Server(
    url: 'http://localhost:8000',
    description: 'Local Development Server'
)]
class SwaggerInfo
{
}
