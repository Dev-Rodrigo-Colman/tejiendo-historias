<?php
// api/controllers/PublicidadController.php
declare(strict_types=1);

require_once __DIR__ . '/../models/Publicidad.php';
require_once __DIR__ . '/../middleware/AuthMiddleware.php';

class PublicidadController {
    public static function index(): void {
        $anuncios = Publicidad::getAnunciosActivos();
        echo json_encode(['success' => true, 'data' => $anuncios], JSON_UNESCAPED_UNICODE);
    }

    public static function all(): void {
        AuthMiddleware::requireRoles(['Administrador', 'Comercial']);
        $anuncios = Publicidad::getAll();
        echo json_encode(['success' => true, 'data' => $anuncios], JSON_UNESCAPED_UNICODE);
    }

    public static function espacios(): void {
        $espacios = Publicidad::getEspacios();
        echo json_encode(['success' => true, 'data' => $espacios], JSON_UNESCAPED_UNICODE);
    }

    public static function click(int $id): void {
        Publicidad::trackClick($id);
        echo json_encode(['success' => true, 'mensaje' => 'Clic registrado'], JSON_UNESCAPED_UNICODE);
    }

    public static function store(): void {
        AuthMiddleware::requireRoles(['Administrador', 'Comercial']);
        $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
        if (empty($input['anunciante_nombre']) || empty($input['espacio_id'])) {
            http_response_code(400);
            echo json_encode(['error' => true, 'mensaje' => 'Nombre del anunciante y espacio son obligatorios.'], JSON_UNESCAPED_UNICODE);
            return;
        }

        $id = Publicidad::create($input);
        echo json_encode(['success' => true, 'mensaje' => 'Pauta publicitaria registrada con éxito.', 'id' => $id], JSON_UNESCAPED_UNICODE);
    }
}
