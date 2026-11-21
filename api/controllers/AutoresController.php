<?php
// api/controllers/AutoresController.php
declare(strict_types=1);

require_once __DIR__ . '/../models/Autor.php';
require_once __DIR__ . '/../models/Noticia.php';
require_once __DIR__ . '/../middleware/AuthMiddleware.php';

class AutoresController {
    public static function index(): void {
        $autores = Autor::getAll();
        echo json_encode(['success' => true, 'data' => $autores], JSON_UNESCAPED_UNICODE);
    }

    public static function show(string $slug): void {
        $autor = Autor::getBySlug($slug);
        if (!$autor) {
            http_response_code(404);
            echo json_encode(['error' => true, 'mensaje' => 'Autor no encontrado'], JSON_UNESCAPED_UNICODE);
            return;
        }

        $articulos = Noticia::getByAutor((int)$autor['id']);
        $autor['articulos'] = $articulos;

        echo json_encode(['success' => true, 'data' => $autor], JSON_UNESCAPED_UNICODE);
    }

    public static function update(int $id): void {
        AuthMiddleware::requireRoles(['Administrador', 'Editor']);
        $input = json_decode(file_get_contents('php://input'), true) ?? [];
        $ok = Autor::update($id, $input);
        echo json_encode(['success' => $ok, 'mensaje' => $ok ? 'Perfil de autor actualizado con éxito.' : 'Error al actualizar.'], JSON_UNESCAPED_UNICODE);
    }
}
