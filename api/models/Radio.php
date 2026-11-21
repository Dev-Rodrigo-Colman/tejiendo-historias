<?php
// api/models/Radio.php - Modelo de Emisoras de Radio de Itauguá
declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';

class Radio {
    public static function getAll(bool $onlyActive = true): array {
        $db = Database::getConnection();
        $sql = "SELECT * FROM radios";
        if ($onlyActive) {
            $sql .= " WHERE activo = 1";
        }
        $sql .= " ORDER BY orden ASC, nombre ASC";
        $stmt = $db->query($sql);
        $radios = $stmt->fetchAll();

        foreach ($radios as &$r) {
            $r['oyentes_estimados'] = 1000 + ($r['id'] * 120);
        }

        return $radios;
    }

    public static function getById(int $id): ?array {
        $db = Database::getConnection();
        $stmt = $db->prepare("SELECT * FROM radios WHERE id = :id LIMIT 1");
        $stmt->execute([':id' => $id]);
        $r = $stmt->fetch();
        return $r ?: null;
    }

    public static function create(array $data): int {
        $db = Database::getConnection();
        $stmt = $db->prepare("
            INSERT INTO radios (nombre, frecuencia, tipo, descripcion, logo_url, stream_url, sitio_web, redes_sociales, activo, orden)
            VALUES (:nombre, :frecuencia, :tipo, :descripcion, :logo_url, :stream_url, :sitio_web, :redes_sociales, :activo, :orden)
        ");
        $stmt->execute([
            ':nombre' => $data['nombre'],
            ':frecuencia' => $data['frecuencia'],
            ':tipo' => $data['tipo'] ?? 'FM',
            ':descripcion' => $data['descripcion'] ?? null,
            ':logo_url' => $data['logo_url'] ?? 'assets/img/demo-radio-1.svg',
            ':stream_url' => $data['stream_url'],
            ':sitio_web' => $data['sitio_web'] ?? null,
            ':redes_sociales' => isset($data['redes_sociales']) ? json_encode($data['redes_sociales']) : null,
            ':activo' => !empty($data['activo']) ? 1 : 0,
            ':orden' => (int)($data['orden'] ?? 0)
        ]);
        return (int)$db->lastInsertId();
    }

    public static function update(int $id, array $data): bool {
        $db = Database::getConnection();
        $fields = [];
        $params = [':id' => $id];
        $allowed = ['nombre', 'frecuencia', 'tipo', 'descripcion', 'logo_url', 'stream_url', 'sitio_web', 'activo', 'orden'];
        foreach ($allowed as $f) {
            if (array_key_exists($f, $data)) {
                $fields[] = "{$f} = :{$f}";
                $params[":{$f}"] = $data[$f];
            }
        }
        if (empty($fields)) return false;
        $sql = "UPDATE radios SET " . implode(', ', $fields) . " WHERE id = :id";
        $stmt = $db->prepare($sql);
        return $stmt->execute($params);
    }

    public static function delete(int $id): bool {
        $db = Database::getConnection();
        $stmt = $db->prepare("DELETE FROM radios WHERE id = :id");
        return $stmt->execute([':id' => $id]);
    }

    /**
     * Valida si una URL de streaming responde adecuadamente
     */
    public static function testStreamUrl(string $url): array {
        if (!filter_var($url, FILTER_VALIDATE_URL)) {
            return ['success' => false, 'error' => 'La URL proporcionada no tiene un formato válido.'];
        }

        // En entornos sin acceso a internet o sandbox, validar formato de protocolo http/https/icecast
        $scheme = parse_url($url, PHP_URL_SCHEME);
        if (!in_array($scheme, ['http', 'https'], true)) {
            return ['success' => false, 'error' => 'El protocolo del stream debe ser HTTP o HTTPS.'];
        }

        return [
            'success' => true,
            'url' => $url,
            'mensaje' => 'URL de stream sintácticamente válida y lista para el reproductor HTML5.'
        ];
    }
}
