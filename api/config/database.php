<?php
// api/config/database.php - Capa de Conexión y Abstracción de Datos (PDO)
declare(strict_types=1);

require_once __DIR__ . '/config.php';

class Database {
    private static ?PDO $instance = null;

    public static function getConnection(): PDO {
        if (self::$instance === null) {
            try {
                if (DB_DRIVER === 'sqlite') {
                    if (!file_exists(DB_SQLITE_PATH)) {
                        throw new RuntimeException("El archivo de base de datos SQLite no existe en: " . DB_SQLITE_PATH);
                    }
                    self::$instance = new PDO("sqlite:" . DB_SQLITE_PATH);
                    self::$instance->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    self::$instance->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
                    self::$instance->exec("PRAGMA foreign_keys = ON;");
                } elseif (DB_DRIVER === 'mysql') {
                    $dsn = sprintf("mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4", DB_HOST, DB_PORT, DB_NAME);
                    self::$instance = new PDO($dsn, DB_USER, DB_PASS, [
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                        PDO::ATTR_EMULATE_PREPARES => false,
                    ]);
                } else {
                    throw new InvalidArgumentException("Driver de base de datos no soportado: " . DB_DRIVER);
                }
            } catch (PDOException $e) {
                // Registrar log de error de forma segura sin exponer detalles en el frontend
                error_log("Database Connection Error: " . $e->getMessage());
                http_response_code(500);
                echo json_encode([
                    'error' => true,
                    'mensaje' => 'Error de conexión con la base de datos'
                ], JSON_UNESCAPED_UNICODE);
                exit;
            }
        }
        return self::$instance;
    }
}

