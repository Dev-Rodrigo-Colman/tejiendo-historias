<?php
// api/controllers/NegociosController.php
declare(strict_types=1);

require_once __DIR__ . '/../models/Negocio.php';
require_once __DIR__ . '/../middleware/AuthMiddleware.php';

class NegociosController {
    public static function index(): void {
        $cat = $_GET['categoria'] ?? null;
        $search = $_GET['q'] ?? null;
        $onlyActive = !isset($_GET['all']);
        $negocios = Negocio::getAll($cat, $search, $onlyActive);
        echo json_encode(['success' => true, 'data' => $negocios], JSON_UNESCAPED_UNICODE);
    }

    public static function categorias(): void {
        $cats = Negocio::getCategorias();
        echo json_encode(['success' => true, 'data' => $cats], JSON_UNESCAPED_UNICODE);
    }

    public static function show(int $id): void {
        $b = Negocio::getById($id);
        if (!$b) {
            http_response_code(404);
            echo json_encode(['error' => true, 'mensaje' => 'Negocio no encontrado.'], JSON_UNESCAPED_UNICODE);
            return;
        }
        echo json_encode(['success' => true, 'data' => $b], JSON_UNESCAPED_UNICODE);
    }

    public static function store(): void {
        AuthMiddleware::requireRoles(['Administrador', 'Comercial']);
        $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
        if (empty($input['nombre_comercial']) || empty($input['categoria_id'])) {
            http_response_code(400);
            echo json_encode(['error' => true, 'mensaje' => 'Nombre y categoría son obligatorios.'], JSON_UNESCAPED_UNICODE);
            return;
        }

        if (empty($input['slug'])) {
            $input['slug'] = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $input['nombre_comercial']), '-')) . '-' . time();
        }

        $id = Negocio::create($input);
        echo json_encode(['success' => true, 'mensaje' => 'Comercio registrado con éxito.', 'id' => $id], JSON_UNESCAPED_UNICODE);
    }

    public static function update(int $id): void {
        AuthMiddleware::requireRoles(['Administrador', 'Comercial']);
        $input = json_decode(file_get_contents('php://input'), true) ?? [];
        $ok = Negocio::update($id, $input);
        echo json_encode(['success' => $ok, 'mensaje' => $ok ? 'Comercio actualizado.' : 'Sin cambios.'], JSON_UNESCAPED_UNICODE);
    }

    public static function destroy(int $id): void {
        AuthMiddleware::requireRoles(['Administrador']);
        $ok = Negocio::delete($id);
        echo json_encode(['success' => $ok, 'mensaje' => $ok ? 'Comercio eliminado.' : 'Error al eliminar.'], JSON_UNESCAPED_UNICODE);
    }
}
