<?php
// api/controllers/DashboardController.php
declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/AuthMiddleware.php';

class DashboardController {
    public static function stats(): void {
        AuthMiddleware::requireAuth();

        $db = Database::getConnection();

        $noticiasPub = (int)$db->query("SELECT COUNT(*) FROM noticias WHERE estado = 'publicado'")->fetchColumn();
        $noticiasBorrador = (int)$db->query("SELECT COUNT(*) FROM noticias WHERE estado = 'borrador'")->fetchColumn();
        $totalRadios = (int)$db->query("SELECT COUNT(*) FROM radios WHERE activo = 1")->fetchColumn();
        $totalNegocios = (int)$db->query("SELECT COUNT(*) FROM negocios WHERE estado = 'activo'")->fetchColumn();
        $totalAnuncios = (int)$db->query("SELECT COUNT(*) FROM anuncios WHERE estado = 'activo'")->fetchColumn();
        $totalEventos = (int)$db->query("SELECT COUNT(*) FROM eventos WHERE estado = 'proximo'")->fetchColumn();

        $stmtRecent = $db->query("
            SELECT n.id, n.titulo, n.fecha_publicacion, n.estado, c.nombre AS categoria, a.nombre AS autor
            FROM noticias n
            JOIN categorias_noticias c ON n.categoria_id = c.id
            JOIN autores a ON n.autor_id = a.id
            ORDER BY n.id DESC
            LIMIT 5
        ");
        $recientes = $stmtRecent->fetchAll();

        echo json_encode([
            'success' => true,
            'kpis' => [
                'noticias_publicadas' => $noticiasPub,
                'noticias_borradores' => $noticiasBorrador,
                'total_noticias' => $noticiasPub + $noticiasBorrador,
                'total_radios' => $totalRadios,
                'total_negocios' => $totalNegocios,
                'total_anuncios' => $totalAnuncios,
                'proximos_eventos' => $totalEventos
            ],
            'publicaciones_recientes' => $recientes,
            'servidor' => [
                'driver' => $db->getAttribute(PDO::ATTR_DRIVER_NAME),
                'php_version' => PHP_VERSION,
                'hora_servidor' => date('Y-m-d H:i:s')
            ]
        ], JSON_UNESCAPED_UNICODE);
    }
}
