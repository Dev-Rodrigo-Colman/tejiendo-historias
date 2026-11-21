<?php
// api/controllers/AuthController.php
declare(strict_types=1);

require_once __DIR__ . '/../models/Usuario.php';
require_once __DIR__ . '/../middleware/AuthMiddleware.php';

class AuthController {
    public static function login(): void {
        $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';

        if (empty($email) || empty($password)) {
            http_response_code(400);
            echo json_encode(['error' => true, 'mensaje' => 'Email y contraseña requeridos.'], JSON_UNESCAPED_UNICODE);
            return;
        }

        $user = Usuario::authenticate($email, $password);
        if (!$user) {
            http_response_code(401);
            echo json_encode(['error' => true, 'mensaje' => 'Credenciales inválidas o usuario inactivo.'], JSON_UNESCAPED_UNICODE);
            return;
        }

        AuthMiddleware::startSession();
        $_SESSION['th_user'] = $user;

        // Generar token ligero en base64 con expiración a 7 días
        $payload = [
            'id' => $user['id'],
            'email' => $user['email'],
            'rol' => $user['rol'],
            'exp' => time() + (86400 * 7)
        ];
        $token = base64_encode(json_encode($payload));

        echo json_encode([
            'success' => true,
            'mensaje' => 'Autenticación exitosa',
            'token' => $token,
            'user' => $user
        ], JSON_UNESCAPED_UNICODE);
    }

    public static function me(): void {
        $user = AuthMiddleware::getCurrentUser();
        if (!$user) {
            echo json_encode(['authenticated' => false], JSON_UNESCAPED_UNICODE);
            return;
        }
        echo json_encode(['authenticated' => true, 'user' => $user], JSON_UNESCAPED_UNICODE);
    }

    public static function logout(): void {
        AuthMiddleware::startSession();
        $_SESSION = [];
        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"],
                $params["secure"], $params["httponly"]
            );
        }
        session_destroy();
        echo json_encode(['success' => true, 'mensaje' => 'Sesión cerrada correctamente.'], JSON_UNESCAPED_UNICODE);
    }
}
