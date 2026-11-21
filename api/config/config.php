<?php
// api/config/config.php - Configuración general de la plataforma
declare(strict_types=1);

// Evitar exposición de errores en producción, detallar en desarrollo
error_reporting(E_ALL);
ini_set('display_errors', '0');

define('APP_NAME', 'Tejiendo Historias');
define('APP_SLOGAN', 'Las historias de nuestra ciudad, tejidas entre todos');
define('APP_LOCATION', 'Itauguá, Paraguay');
define('APP_ENV', getenv('APP_ENV') ?: 'development');
define('APP_SECRET_KEY', getenv('APP_SECRET_KEY') ?: 'tejiendo_historias_itaugua_secret_key_2026_ñanduti');

// Configuración de Base de Datos
// Soporta 'sqlite' (predeterminado y portátil) y 'mysql' (para XAMPP / producción)
define('DB_DRIVER', getenv('DB_DRIVER') ?: 'sqlite');
define('DB_SQLITE_PATH', __DIR__ . '/../../database/database.sqlite');

define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_PORT', getenv('DB_PORT') ?: '3306');
define('DB_NAME', getenv('DB_NAME') ?: 'tejiendo_historias');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') ?: '');

// Configuración de Carga de Archivos
define('UPLOAD_DIR', __DIR__ . '/../uploads/');
define('MAX_UPLOAD_SIZE', 5 * 1024 * 1024); // 5 MB
define('ALLOWED_MIME_TYPES', [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/svg+xml'
]);

