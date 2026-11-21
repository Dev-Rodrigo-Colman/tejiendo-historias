<?php
// api/controllers/EventosController.php
declare(strict_types=1);

require_once __DIR__ . '/../models/Evento.php';
require_once __DIR__ . '/../middleware/AuthMiddleware.php';

class EventosController {
    public static function index(): void {
        $upcomingOnly = isset($_GET['proximos']);
        $eventos = Evento::getAll($upcomingOnly);
        echo json_encode(['success' => true, 'data' => $eventos], JSON_UNESCAPED_UNICODE);
    }

    public static function categorias(): void {
        $cats = Evento::getCategorias();
        echo json_encode(['success' => true, 'data' => $cats], JSON_UNESCAPED_UNICODE);
    }

    public static function show(int $id): void {
        $ev = Evento::getById($id);
        if (!$ev) {
            http_response_code(404);
            echo json_encode(['error' => true, 'mensaje' => 'Evento no encontrado.'], JSON_UNESCAPED_UNICODE);
            return;
        }
        echo json_encode(['success' => true, 'data' => $ev], JSON_UNESCAPED_UNICODE);
    }

    public static function store(): void {
        AuthMiddleware::requireRoles(['Administrador', 'Editor', 'Periodista']);
        $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
        if (empty($input['nombre']) || empty($input['fecha']) || empty($input['lugar']) || empty($input['categoria_id'])) {
            http_response_code(400);
            echo json_encode(['error' => true, 'mensaje' => 'Nombre, fecha, lugar y categoría son requeridos.'], JSON_UNESCAPED_UNICODE);
            return;
        }

        if (empty($input['slug'])) {
            $input['slug'] = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $input['nombre']), '-')) . '-' . time();
        }

        $id = Evento::create($input);
        echo json_encode(['success' => true, 'mensaje' => 'Evento agendado con éxito.', 'id' => $id], JSON_UNESCAPED_UNICODE);
    }

    public static function update(int $id): void {
        AuthMiddleware::requireRoles(['Administrador', 'Editor']);
        $input = json_decode(file_get_contents('php://input'), true) ?? [];
        $ok = Evento::update($id, $input);
        echo json_encode(['success' => $ok, 'mensaje' => $ok ? 'Evento actualizado.' : 'Sin cambios.'], JSON_UNESCAPED_UNICODE);
    }

    public static function destroy(int $id): void {
        AuthMiddleware::requireRoles(['Administrador']);
        $ok = Evento::delete($id);
        echo json_encode(['success' => $ok, 'mensaje' => $ok ? 'Evento eliminado.' : 'Error al eliminar.'], JSON_UNESCAPED_UNICODE);
    }
}
