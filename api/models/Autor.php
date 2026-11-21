<?php
// api/models/Autor.php - Modelo de Autores y Columnistas Principales
declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';

class Autor {
    public static function getAll(): array {
        $db = Database::getConnection();
        $stmt = $db->query("
            SELECT a.*, 
                   COUNT(n.id) AS articulos_publicados
            FROM autores a
            LEFT JOIN noticias n ON a.id = n.autor_id AND n.estado = 'publicado'
            WHERE a.activo = 1
            GROUP BY a.id
            ORDER BY a.es_destacado DESC, a.id ASC
        ");
        $autores = $stmt->fetchAll();

        foreach ($autores as &$autor) {
            $autor['espacio_nombre'] = "El espacio de " . (str_replace(['Lic. ', 'Ing. '], '', $autor['nombre']));
            if (!empty($autor['redes_sociales'])) {
                $autor['redes'] = json_decode($autor['redes_sociales'], true);
            } else {
                $autor['redes'] = ['twitter' => '#', 'facebook' => '#', 'linkedin' => '#'];
            }
        }

        return $autores;
    }

    public static function getBySlug(string $slug): ?array {
        $db = Database::getConnection();
        $stmt = $db->prepare("
            SELECT a.*, 
                   COUNT(n.id) AS articulos_publicados
            FROM autores a
            LEFT JOIN noticias n ON a.id = n.autor_id AND n.estado = 'publicado'
            WHERE a.slug = :slug
            GROUP BY a.id
            LIMIT 1
        ");
        $stmt->execute([':slug' => $slug]);
        $autor = $stmt->fetch();
        if (!$autor) return null;

        $autor['espacio_nombre'] = "El espacio de " . (str_replace(['Lic. ', 'Ing. '], '', $autor['nombre']));
        if (!empty($autor['redes_sociales'])) {
            $autor['redes'] = json_decode($autor['redes_sociales'], true);
        } else {
            $autor['redes'] = ['twitter' => '#', 'facebook' => '#', 'linkedin' => '#'];
        }

        return $autor;
    }

    public static function getById(int $id): ?array {
        $db = Database::getConnection();
        $stmt = $db->prepare("SELECT * FROM autores WHERE id = :id LIMIT 1");
        $stmt->execute([':id' => $id]);
        $autor = $stmt->fetch();
        return $autor ?: null;
    }

    public static function update(int $id, array $data): bool {
        $db = Database::getConnection();
        $fields = [];
        $params = [':id' => $id];

        $allowed = ['nombre', 'titulo_profesional', 'biografia', 'foto_url', 'redes_sociales', 'activo'];
        foreach ($allowed as $f) {
            if (array_key_exists($f, $data)) {
                $fields[] = "{$f} = :{$f}";
                $params[":{$f}"] = $data[$f];
            }
        }

        if (empty($fields)) return false;

        $sql = "UPDATE autores SET " . implode(', ', $fields) . " WHERE id = :id";
        $stmt = $db->prepare($sql);
        return $stmt->execute($params);
    }
}
