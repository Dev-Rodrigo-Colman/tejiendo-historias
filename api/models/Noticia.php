<?php
// api/models/Noticia.php - Modelo de Noticias y Columnas de Opinión
declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';

class Noticia {
    public static function getAll(?string $categoria = null, ?string $search = null, ?string $estado = 'publicado', int $limit = 50): array {
        $db = Database::getConnection();
        $sql = "
            SELECT n.*, 
                   c.nombre AS categoria_nombre, c.slug AS categoria_slug,
                   a.nombre AS autor_nombre, a.titulo_profesional AS autor_titulo, a.foto_url AS autor_foto, a.slug AS autor_slug
            FROM noticias n
            JOIN categorias_noticias c ON n.categoria_id = c.id
            JOIN autores a ON n.autor_id = a.id
            WHERE 1=1
        ";
        $params = [];

        if ($estado !== null) {
            $sql .= " AND n.estado = :estado";
            $params[':estado'] = $estado;
        }

        if (!empty($categoria) && strtolower($categoria) !== 'todas') {
            $sql .= " AND (c.slug = :cat OR LOWER(c.nombre) = :cat_name)";
            $params[':cat'] = strtolower($categoria);
            $params[':cat_name'] = strtolower($categoria);
        }

        if (!empty($search)) {
            $sql .= " AND (n.titulo LIKE :search OR n.subtitulo LIKE :search OR n.cuerpo LIKE :search OR n.etiquetas LIKE :search)";
            $params[':search'] = '%' . $search . '%';
        }

        $sql .= " ORDER BY n.fecha_publicacion DESC LIMIT :limit";
        
        $stmt = $db->prepare($sql);
        foreach ($params as $key => $val) {
            $stmt->bindValue($key, $val);
        }
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll();
    }

    public static function getBySlug(string $slug): ?array {
        $db = Database::getConnection();
        $stmt = $db->prepare("
            SELECT n.*, 
                   c.nombre AS categoria_nombre, c.slug AS categoria_slug,
                   a.nombre AS autor_nombre, a.titulo_profesional AS autor_titulo, a.foto_url AS autor_foto, a.slug AS autor_slug, a.biografia AS autor_bio
            FROM noticias n
            JOIN categorias_noticias c ON n.categoria_id = c.id
            JOIN autores a ON n.autor_id = a.id
            WHERE n.slug = :slug
            LIMIT 1
        ");
        $stmt->execute([':slug' => $slug]);
        $result = $stmt->fetch();
        return $result ?: null;
    }

    public static function getDestacadas(int $limit = 5): array {
        $db = Database::getConnection();
        $stmt = $db->prepare("
            SELECT n.*, 
                   c.nombre AS categoria_nombre, c.slug AS categoria_slug,
                   a.nombre AS autor_nombre, a.titulo_profesional AS autor_titulo, a.foto_url AS autor_foto, a.slug AS autor_slug
            FROM noticias n
            JOIN categorias_noticias c ON n.categoria_id = c.id
            JOIN autores a ON n.autor_id = a.id
            WHERE n.es_destacada = 1 AND n.estado = 'publicado'
            ORDER BY n.fecha_publicacion DESC
            LIMIT :limit
        ");
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public static function getByAutor(int $autorId, int $limit = 20): array {
        $db = Database::getConnection();
        $stmt = $db->prepare("
            SELECT n.*, 
                   c.nombre AS categoria_nombre, c.slug AS categoria_slug
            FROM noticias n
            JOIN categorias_noticias c ON n.categoria_id = c.id
            WHERE n.autor_id = :autor_id AND n.estado = 'publicado'
            ORDER BY n.fecha_publicacion DESC
            LIMIT :limit
        ");
        $stmt->bindValue(':autor_id', $autorId, PDO::PARAM_INT);
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public static function incrementViews(int $id): void {
        $db = Database::getConnection();
        $stmt = $db->prepare("UPDATE noticias SET vistas = vistas + 1 WHERE id = :id");
        $stmt->execute([':id' => $id]);
    }

    public static function getCategorias(): array {
        $db = Database::getConnection();
        $stmt = $db->query("SELECT * FROM categorias_noticias WHERE activo = 1 ORDER BY orden ASC, nombre ASC");
        return $stmt->fetchAll();
    }

    public static function create(array $data): int {
        $db = Database::getConnection();
        $stmt = $db->prepare("
            INSERT INTO noticias (
                titulo, subtitulo, slug, cuerpo, imagen_destacada, galeria_imagenes,
                categoria_id, autor_id, es_destacada, es_columna_opinion, estado,
                fecha_publicacion, meta_descripcion, etiquetas
            ) VALUES (
                :titulo, :subtitulo, :slug, :cuerpo, :imagen_destacada, :galeria_imagenes,
                :categoria_id, :autor_id, :es_destacada, :es_columna_opinion, :estado,
                :fecha_publicacion, :meta_descripcion, :etiquetas
            )
        ");

        $stmt->execute([
            ':titulo' => $data['titulo'],
            ':subtitulo' => $data['subtitulo'] ?? null,
            ':slug' => $data['slug'],
            ':cuerpo' => $data['cuerpo'],
            ':imagen_destacada' => $data['imagen_destacada'] ?? 'assets/img/demo-nanduti-noticia.svg',
            ':galeria_imagenes' => isset($data['galeria_imagenes']) ? json_encode($data['galeria_imagenes']) : null,
            ':categoria_id' => (int)$data['categoria_id'],
            ':autor_id' => (int)$data['autor_id'],
            ':es_destacada' => !empty($data['es_destacada']) ? 1 : 0,
            ':es_columna_opinion' => !empty($data['es_columna_opinion']) ? 1 : 0,
            ':estado' => $data['estado'] ?? 'publicado',
            ':fecha_publicacion' => $data['fecha_publicacion'] ?? date('Y-m-d H:i:s'),
            ':meta_descripcion' => $data['meta_descripcion'] ?? null,
            ':etiquetas' => $data['etiquetas'] ?? 'itauguá,noticias'
        ]);

        return (int)$db->lastInsertId();
    }

    public static function update(int $id, array $data): bool {
        $db = Database::getConnection();
        $fields = [];
        $params = [':id' => $id];

        $allowed = [
            'titulo', 'subtitulo', 'slug', 'cuerpo', 'imagen_destacada', 'categoria_id',
            'autor_id', 'es_destacada', 'es_columna_opinion', 'estado', 'meta_descripcion', 'etiquetas'
        ];

        foreach ($allowed as $f) {
            if (array_key_exists($f, $data)) {
                $fields[] = "{$f} = :{$f}";
                $params[":{$f}"] = $data[$f];
            }
        }

        if (empty($fields)) return false;

        $fields[] = "actualizado_en = CURRENT_TIMESTAMP";
        $sql = "UPDATE noticias SET " . implode(', ', $fields) . " WHERE id = :id";
        $stmt = $db->prepare($sql);
        return $stmt->execute($params);
    }

    public static function delete(int $id): bool {
        $db = Database::getConnection();
        $stmt = $db->prepare("DELETE FROM noticias WHERE id = :id");
        return $stmt->execute([':id' => $id]);
    }
}
