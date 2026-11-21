<?php
// api/models/Publicidad.php - Modelo de Espacios y Pautas Publicitarias
declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';

class Publicidad {
    public static function getAnunciosActivos(): array {
        $db = Database::getConnection();
        $stmt = $db->query("
            SELECT a.*, e.codigo AS espacio_codigo, e.nombre AS espacio_nombre, e.ubicacion AS espacio_ubicacion
            FROM anuncios a
            JOIN espacios_publicitarios e ON a.espacio_id = e.id
            WHERE a.estado = 'activo'
              AND a.fecha_inicio <= CURRENT_DATE
              AND a.fecha_fin >= CURRENT_DATE
            ORDER BY a.orden ASC, a.id DESC
        ");
        $anuncios = $stmt->fetchAll();

        // Registrar impresiones
        if (!empty($anuncios)) {
            $ids = array_column($anuncios, 'id');
            $placeholders = implode(',', array_fill(0, count($ids), '?'));
            $updateStmt = $db->prepare("UPDATE anuncios SET impresiones = impresiones + 1 WHERE id IN ($placeholders)");
            $updateStmt->execute($ids);
        }

        foreach ($anuncios as &$an) {
            $an['espacio'] = $an['espacio_codigo'];
            $an['anunciante'] = $an['anunciante_nombre'];
        }

        return $anuncios;
    }

    public static function getEspacios(): array {
        $db = Database::getConnection();
        $stmt = $db->query("SELECT * FROM espacios_publicitarios WHERE activo = 1 ORDER BY id ASC");
        return $stmt->fetchAll();
    }

    public static function trackClick(int $id): void {
        $db = Database::getConnection();
        $stmt = $db->prepare("UPDATE anuncios SET clics = clics + 1 WHERE id = :id");
        $stmt->execute([':id' => $id]);
    }

    public static function getAll(): array {
        $db = Database::getConnection();
        $stmt = $db->query("
            SELECT a.*, e.nombre AS espacio_nombre, e.codigo AS espacio_codigo
            FROM anuncios a
            JOIN espacios_publicitarios e ON a.espacio_id = e.id
            ORDER BY a.id DESC
        ");
        return $stmt->fetchAll();
    }

    public static function create(array $data): int {
        $db = Database::getConnection();
        $stmt = $db->prepare("
            INSERT INTO anuncios (
                espacio_id, anunciante_nombre, imagen_url, url_destino,
                fecha_inicio, fecha_fin, estado, orden
            ) VALUES (
                :espacio_id, :anunciante_nombre, :imagen_url, :url_destino,
                :fecha_inicio, :fecha_fin, :estado, :orden
            )
        ");
        $stmt->execute([
            ':espacio_id' => (int)$data['espacio_id'],
            ':anunciante_nombre' => $data['anunciante_nombre'],
            ':imagen_url' => $data['imagen_url'] ?? 'assets/img/demo-banner-top.svg',
            ':url_destino' => $data['url_destino'] ?? '#anunciar',
            ':fecha_inicio' => $data['fecha_inicio'] ?? date('Y-m-d'),
            ':fecha_fin' => $data['fecha_fin'] ?? date('Y-m-d', strtotime('+30 days')),
            ':estado' => $data['estado'] ?? 'activo',
            ':orden' => (int)($data['orden'] ?? 0)
        ]);
        return (int)$db->lastInsertId();
    }
}
