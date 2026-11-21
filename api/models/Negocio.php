<?php
// api/models/Negocio.php - Modelo del Directorio Comercial de Itauguá
declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';

class Negocio {
    public static function getAll(?string $categoria = null, ?string $search = null, bool $onlyActive = true): array {
        $db = Database::getConnection();
        $sql = "
            SELECT n.*, c.nombre AS categoria_nombre, c.slug AS categoria_slug, c.icono AS categoria_icono
            FROM negocios n
            JOIN categorias_negocios c ON n.categoria_id = c.id
            WHERE 1=1
        ";
        $params = [];

        if ($onlyActive) {
            $sql .= " AND n.estado = 'activo'";
        }

        if (!empty($categoria) && strtolower($categoria) !== 'todos los rubros') {
            $sql .= " AND (c.slug = :cat OR LOWER(c.nombre) = :cat_name)";
            $params[':cat'] = strtolower($categoria);
            $params[':cat_name'] = strtolower($categoria);
        }

        if (!empty($search)) {
            $sql .= " AND (n.nombre_comercial LIKE :search OR n.descripcion LIKE :search OR n.direccion LIKE :search)";
            $params[':search'] = '%' . $search . '%';
        }

        $sql .= " ORDER BY n.es_destacado DESC, n.nombre_comercial ASC";

        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        $negocios = $stmt->fetchAll();

        foreach ($negocios as &$b) {
            $b['categoria'] = $b['categoria_nombre'];
        }

        return $negocios;
    }

    public static function getCategorias(): array {
        $db = Database::getConnection();
        $stmt = $db->query("SELECT * FROM categorias_negocios WHERE activo = 1 ORDER BY orden ASC, nombre ASC");
        return $stmt->fetchAll();
    }

    public static function getById(int $id): ?array {
        $db = Database::getConnection();
        $stmt = $db->prepare("
            SELECT n.*, c.nombre AS categoria_nombre 
            FROM negocios n 
            JOIN categorias_negocios c ON n.categoria_id = c.id 
            WHERE n.id = :id 
            LIMIT 1
        ");
        $stmt->execute([':id' => $id]);
        $b = $stmt->fetch();
        return $b ?: null;
    }

    public static function create(array $data): int {
        $db = Database::getConnection();
        $stmt = $db->prepare("
            INSERT INTO negocios (
                nombre_comercial, slug, categoria_id, descripcion, direccion,
                telefono, whatsapp, email, sitio_web, horarios, logo_url,
                plan_comercial, es_destacado, estado
            ) VALUES (
                :nombre_comercial, :slug, :categoria_id, :descripcion, :direccion,
                :telefono, :whatsapp, :email, :sitio_web, :horarios, :logo_url,
                :plan_comercial, :es_destacado, :estado
            )
        ");
        $stmt->execute([
            ':nombre_comercial' => $data['nombre_comercial'],
            ':slug' => $data['slug'],
            ':categoria_id' => (int)$data['categoria_id'],
            ':descripcion' => $data['descripcion'] ?? null,
            ':direccion' => $data['direccion'] ?? 'Itauguá',
            ':telefono' => $data['telefono'] ?? null,
            ':whatsapp' => $data['whatsapp'] ?? null,
            ':email' => $data['email'] ?? null,
            ':sitio_web' => $data['sitio_web'] ?? null,
            ':horarios' => $data['horarios'] ?? 'Lunes a Sábado',
            ':logo_url' => $data['logo_url'] ?? 'assets/img/nanduti-symbol.svg',
            ':plan_comercial' => $data['plan_comercial'] ?? 'basico',
            ':es_destacado' => !empty($data['es_destacado']) ? 1 : 0,
            ':estado' => $data['estado'] ?? 'activo'
        ]);
        return (int)$db->lastInsertId();
    }

    public static function update(int $id, array $data): bool {
        $db = Database::getConnection();
        $fields = [];
        $params = [':id' => $id];
        $allowed = ['nombre_comercial', 'categoria_id', 'descripcion', 'direccion', 'telefono', 'whatsapp', 'email', 'sitio_web', 'horarios', 'logo_url', 'plan_comercial', 'es_destacado', 'estado'];
        foreach ($allowed as $f) {
            if (array_key_exists($f, $data)) {
                $fields[] = "{$f} = :{$f}";
                $params[":{$f}"] = $data[$f];
            }
        }
        if (empty($fields)) return false;
        $sql = "UPDATE negocios SET " . implode(', ', $fields) . " WHERE id = :id";
        $stmt = $db->prepare($sql);
        return $stmt->execute($params);
    }

    public static function delete(int $id): bool {
        $db = Database::getConnection();
        $stmt = $db->prepare("DELETE FROM negocios WHERE id = :id");
        return $stmt->execute([':id' => $id]);
    }
}
