<?php
// api/models/Usuario.php - Modelo de Usuarios y Autenticación Segura
declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';

class Usuario {
    public static function authenticate(string $email, string $password): ?array {
        $db = Database::getConnection();
        $stmt = $db->prepare("
            SELECT u.*, r.nombre AS rol
            FROM usuarios u
            JOIN roles r ON u.rol_id = r.id
            WHERE u.email = :email AND u.estado = 'activo'
            LIMIT 1
        ");
        $stmt->execute([':email' => strtolower(trim($email))]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password_hash'])) {
            // Actualizar último acceso
            $update = $db->prepare("UPDATE usuarios SET ultimo_acceso = CURRENT_TIMESTAMP WHERE id = :id");
            $update->execute([':id' => $user['id']]);

            unset($user['password_hash']);
            return $user;
        }

        return null;
    }

    public static function getById(int $id): ?array {
        $db = Database::getConnection();
        $stmt = $db->prepare("
            SELECT u.id, u.nombre_completo, u.email, u.rol_id, r.nombre AS rol, u.estado, u.ultimo_acceso
            FROM usuarios u
            JOIN roles r ON u.rol_id = r.id
            WHERE u.id = :id
            LIMIT 1
        ");
        $stmt->execute([':id' => $id]);
        $user = $stmt->fetch();
        return $user ?: null;
    }

    public static function getAll(): array {
        $db = Database::getConnection();
        $stmt = $db->query("
            SELECT u.id, u.nombre_completo, u.email, u.rol_id, r.nombre AS rol, u.estado, u.ultimo_acceso
            FROM usuarios u
            JOIN roles r ON u.rol_id = r.id
            ORDER BY u.id ASC
        ");
        return $stmt->fetchAll();
    }
}
