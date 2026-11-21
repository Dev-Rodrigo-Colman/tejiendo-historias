<?php
// api/middleware/AuthMiddleware.php - Control de Acceso y Roles (RBAC)
declare(strict_types=1);

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/database.php';

class AuthMiddleware {
    /**
     * Inicia o resume la sesión de forma segura
     */
    public static function startSession(): void {
        if (session_status() === PHP_SESSION_NONE) {
            session_start([
                'cookie_lifetime' => 86400 * 7, // 7 días
                'cookie_httponly' => true,
                'cookie_samesite' => 'Lax',
            ]);
        }
    }

    /**
     * Obtiene el usuario autenticado actual desde la sesión o cabecera Bearer Token
     */
    public static function getCurrentUser(): ?array {
        self::startSession();

        // 1. Verificar si hay usuario en sesión PHP
        if (!empty($_SESSION['th_user'])) {
            return $_SESSION['th_user'];
        }

        // 2. Verificar si viene cabecera Authorization: Bearer <token_base64>
        $headers = function_exists('getallheaders') ? getallheaders() : [];
        $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? ($_SERVER['HTTP_AUTHORIZATION'] ?? '');

        if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            $token = $matches[1];
            $decoded = json_decode(base64_decode($token), true);
            if (is_array($decoded) && !empty($decoded['id']) && !empty($decoded['exp'])) {
                if ($decoded['exp'] > time()) {
                    // Cargar usuario fresco de la base de datos
                    $db = Database::getConnection();
                    $stmt = $db->prepare("
                        SELECT u.id, u.nombre_completo, u.email, u.rol_id, r.nombre AS rol, u.estado 
                        FROM usuarios u 
                        JOIN roles r ON u.rol_id = r.id 
                        WHERE u.id = :id AND u.estado = 'activo'
                    ");
                    $stmt->execute([':id' => $decoded['id']]);
                    $user = $stmt->fetch();
                    if ($user) {
                        return $user;
                    }
                }
            }
        }

        return null;
    }

    /**
     * Exige que el usuario esté autenticado
     */
    public static function requireAuth(): array {
        $user = self::getCurrentUser();
        if (!$user) {
            http_response_code(401);
            echo json_encode([
                'error' => true,
                'mensaje' => 'No autorizado. Se requiere iniciar sesión.'
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }
        return $user;
    }

    /**
     * Exige roles específicos (ej: ['Administrador', 'Editor'])
     */
    public static function requireRoles(array $allowedRoles): array {
        $user = self::requireAuth();
        $userRole = strtolower($user['rol'] ?? '');

        $allowedLower = array_map('strtolower', $allowedRoles);

        if (!in_array($userRole, $allowedLower, true) && $userRole !== 'administrador') {
            http_response_code(403);
            echo json_encode([
                'error' => true,
                'mensaje' => 'Acceso denegado. Permisos insuficientes para esta operación.'
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }

        return $user;
    }
}
