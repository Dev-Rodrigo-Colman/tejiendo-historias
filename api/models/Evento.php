<?php
// api/models/Evento.php - Modelo de Agenda de Eventos de Itauguá
declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';

class Evento {
    public static function getAll(bool $upcomingOnly = false): array {
        $db = Database::getConnection();
        
        // Auto-archivar eventos cuya fecha ya pasó
        $db->exec("UPDATE eventos SET estado = 'finalizado' WHERE fecha < CURRENT_DATE AND estado = 'proximo'");

        $sql = "
            SELECT e.*, c.nombre AS categoria_nombre, c.slug AS categoria_slug
            FROM eventos e
            JOIN categorias_eventos c ON e.categoria_id = c.id
        ";

        if ($upcomingOnly) {
            $sql .= " WHERE e.estado = 'proximo' AND e.fecha >= CURRENT_DATE ORDER BY e.fecha ASC, e.hora ASC";
        } else {
            $sql .= " ORDER BY e.fecha DESC, e.hora DESC";
        }

        $stmt = $db->query($sql);
        $eventos = $stmt->fetchAll();

        foreach ($eventos as &$ev) {
            $ev['categoria'] = $ev['categoria_nombre'];
        }

        return $eventos;
    }

    public static function getCategorias(): array {
        $db = Database::getConnection();
        $stmt = $db->query("SELECT * FROM categorias_eventos ORDER BY nombre ASC");
        return $stmt->fetchAll();
    }

    public static function getById(int $id): ?array {
        $db = Database::getConnection();
        $stmt = $db->prepare("
            SELECT e.*, c.nombre AS categoria_nombre 
            FROM eventos e 
            JOIN categorias_eventos c ON e.categoria_id = c.id 
            WHERE e.id = :id 
            LIMIT 1
        ");
        $stmt->execute([':id' => $id]);
        $ev = $stmt->fetch();
        return $ev ?: null;
    }

    public static function create(array $data): int {
        $db = Database::getConnection();
        $stmt = $db->prepare("
            INSERT INTO eventos (
                nombre, slug, categoria_id, descripcion, fecha, hora,
                lugar, direccion, organizador, contacto, enlace_inscripcion, imagen_url, estado
            ) VALUES (
                :nombre, :slug, :categoria_id, :descripcion, :fecha, :hora,
                :lugar, :direccion, :organizador, :contacto, :enlace_inscripcion, :imagen_url, :estado
            )
        ");
        $stmt->execute([
            ':nombre' => $data['nombre'],
            ':slug' => $data['slug'],
            ':categoria_id' => (int)$data['categoria_id'],
            ':descripcion' => $data['descripcion'],
            ':fecha' => $data['fecha'],
            ':hora' => $data['hora'] ?? null,
            ':lugar' => $data['lugar'],
            ':direccion' => $data['direccion'] ?? 'Itauguá',
            ':organizador' => $data['organizador'] ?? null,
            ':contacto' => $data['contacto'] ?? null,
            ':enlace_inscripcion' => $data['enlace_inscripcion'] ?? null,
            ':imagen_url' => $data['imagen_url'] ?? 'assets/img/demo-nanduti-noticia.svg',
            ':estado' => $data['estado'] ?? 'proximo'
        ]);
        return (int)$db->lastInsertId();
    }

    public static function update(int $id, array $data): bool {
        $db = Database::getConnection();
        $fields = [];
        $params = [':id' => $id];
        $allowed = ['nombre', 'categoria_id', 'descripcion', 'fecha', 'hora', 'lugar', 'direccion', 'organizador', 'contacto', 'imagen_url', 'estado'];
        foreach ($allowed as $f) {
            if (array_key_exists($f, $data)) {
                $fields[] = "{$f} = :{$f}";
                $params[":{$f}"] = $data[$f];
            }
        }
        if (empty($fields)) return false;
        $sql = "UPDATE eventos SET " . implode(', ', $fields) . " WHERE id = :id";
        $stmt = $db->prepare($sql);
        return $stmt->execute($params);
    }

    public static function delete(int $id): bool {
        $db = Database::getConnection();
        $stmt = $db->prepare("DELETE FROM eventos WHERE id = :id");
        return $stmt->execute([':id' => $id]);
    }
}
