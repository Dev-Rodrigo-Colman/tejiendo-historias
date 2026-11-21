<?php
// api/middleware/CorsMiddleware.php - Manejo de cabeceras HTTP y CORS
declare(strict_types=1);

class CorsMiddleware {
    public static function handle(): void {
        if (!headers_sent()) {
            header("Access-Control-Allow-Origin: *");
            header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
            header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
            header("Content-Type: application/json; charset=utf-8");
        }

        // Manejar solicitud preflight OPTIONS
        if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit;
        }
    }
}
