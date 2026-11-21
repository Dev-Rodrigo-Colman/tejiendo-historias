<?php
// api/controllers/RadiosController.php
declare(strict_types=1);

require_once __DIR__ . '/../models/Radio.php';
require_once __DIR__ . '/../middleware/AuthMiddleware.php';

class RadiosController {
    public static function index(): void {
        $onlyActive = !isset($_GET['all']);
        $radios = Radio::getAll($onlyActive);
        echo json_encode(['success' => true, 'data' => $radios], JSON_UNESCAPED_UNICODE);
    }

    public static function show(int $id): void {
        $radio = Radio::getById($id);
        if (!$radio) {
            http_response_code(404);
            echo json_encode(['error' => true, 'mensaje' => 'Emisora no encontrada.'], JSON_UNESCAPED_UNICODE);
            return;
        }
        echo json_encode(['success' => true, 'data' => $radio], JSON_UNESCAPED_UNICODE);
    }

    public static function store(): void {
        AuthMiddleware::requireRoles(['Administrador', 'Editor']);
        $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
        if (empty($input['nombre']) || empty($input['frecuencia']) || empty($input['stream_url'])) {
            http_response_code(400);
            echo json_encode(['error' => true, 'mensaje' => 'Nombre, frecuencia y URL de streaming son campos requeridos.'], JSON_UNESCAPED_UNICODE);
            return;
        }

        $id = Radio::create($input);
        echo json_encode(['success' => true, 'mensaje' => 'Emisora registrada con éxito.', 'id' => $id], JSON_UNESCAPED_UNICODE);
    }

    public static function update(int $id): void {
        AuthMiddleware::requireRoles(['Administrador', 'Editor']);
        $input = json_decode(file_get_contents('php://input'), true) ?? [];
        $ok = Radio::update($id, $input);
        echo json_encode(['success' => $ok, 'mensaje' => $ok ? 'Emisora actualizada.' : 'Sin cambios.'], JSON_UNESCAPED_UNICODE);
    }

    public static function destroy(int $id): void {
        AuthMiddleware::requireRoles(['Administrador']);
        $ok = Radio::delete($id);
        echo json_encode(['success' => $ok, 'mensaje' => $ok ? 'Emisora eliminada.' : 'No se pudo eliminar.'], JSON_UNESCAPED_UNICODE);
    }

    public static function testStream(): void {
        $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
        $url = $input['stream_url'] ?? '';
        $result = Radio::testStreamUrl($url);
        echo json_encode($result, JSON_UNESCAPED_UNICODE);
    }
}
