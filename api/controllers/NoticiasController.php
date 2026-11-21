<?php
// api/controllers/NoticiasController.php
declare(strict_types=1);

require_once __DIR__ . '/../models/Noticia.php';
require_once __DIR__ . '/../middleware/AuthMiddleware.php';

class NoticiasController {
    public static function index(): void {
        $cat = $_GET['categoria'] ?? null;
        $search = $_GET['q'] ?? null;
        $estado = $_GET['estado'] ?? 'publicado';

        // Si es consulta pública no se muestran borradores
        $noticias = Noticia::getAll($cat, $search, $estado);
        echo json_encode(['success' => true, 'data' => $noticias], JSON_UNESCAPED_UNICODE);
    }

    public static function show(string $slug): void {
        $noticia = Noticia::getBySlug($slug);
        if (!$noticia) {
            http_response_code(404);
            echo json_encode(['error' => true, 'mensaje' => 'Noticia no encontrada'], JSON_UNESCAPED_UNICODE);
            return;
        }

        Noticia::incrementViews((int)$noticia['id']);
        $noticia['vistas'] = (int)$noticia['vistas'] + 1;

        echo json_encode(['success' => true, 'data' => $noticia], JSON_UNESCAPED_UNICODE);
    }

    public static function categorias(): void {
        $categorias = Noticia::getCategorias();
        echo json_encode(['success' => true, 'data' => $categorias], JSON_UNESCAPED_UNICODE);
    }

    public static function store(): void {
        AuthMiddleware::requireRoles(['Administrador', 'Editor', 'Periodista']);
        
        $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
        if (empty($input['titulo']) || empty($input['cuerpo']) || empty($input['categoria_id'])) {
            http_response_code(400);
            echo json_encode(['error' => true, 'mensaje' => 'Título, cuerpo y categoría son obligatorios.'], JSON_UNESCAPED_UNICODE);
            return;
        }

        // Generar slug si no se envía
        if (empty($input['slug'])) {
            $input['slug'] = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $input['titulo']), '-')) . '-' . time();
        }

        $id = Noticia::create($input);
        echo json_encode(['success' => true, 'mensaje' => 'Noticia creada con éxito.', 'id' => $id], JSON_UNESCAPED_UNICODE);
    }

    public static function update(int $id): void {
        AuthMiddleware::requireRoles(['Administrador', 'Editor', 'Periodista']);
        $input = json_decode(file_get_contents('php://input'), true) ?? [];
        $ok = Noticia::update($id, $input);
        echo json_encode(['success' => $ok, 'mensaje' => $ok ? 'Noticia actualizada.' : 'No se realizaron cambios.'], JSON_UNESCAPED_UNICODE);
    }

    public static function destroy(int $id): void {
        AuthMiddleware::requireRoles(['Administrador', 'Editor']);
        $ok = Noticia::delete($id);
        echo json_encode(['success' => $ok, 'mensaje' => $ok ? 'Noticia eliminada.' : 'No se pudo eliminar.'], JSON_UNESCAPED_UNICODE);
    }
}
