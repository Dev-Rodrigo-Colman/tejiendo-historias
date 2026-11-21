<?php
// api/controllers/UploadController.php - Gestión Segura de Carga de Imágenes
declare(strict_types=1);

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../middleware/AuthMiddleware.php';

class UploadController {
    public static function upload(): void {
        AuthMiddleware::requireAuth();

        if (empty($_FILES['imagen'])) {
            http_response_code(400);
            echo json_encode(['error' => true, 'mensaje' => 'No se recibió ningún archivo de imagen.'], JSON_UNESCAPED_UNICODE);
            return;
        }

        $file = $_FILES['imagen'];

        if ($file['error'] !== UPLOAD_ERR_OK) {
            http_response_code(400);
            echo json_encode(['error' => true, 'mensaje' => 'Error al subir el archivo (código: ' . $file['error'] . ').'], JSON_UNESCAPED_UNICODE);
            return;
        }

        if ($file['size'] > MAX_UPLOAD_SIZE) {
            http_response_code(400);
            echo json_encode(['error' => true, 'mensaje' => 'El archivo supera el tamaño máximo permitido de 5 MB.'], JSON_UNESCAPED_UNICODE);
            return;
        }

        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $mime = $finfo->file($file['tmp_name']);

        if (!in_array($mime, ALLOWED_MIME_TYPES, true)) {
            http_response_code(400);
            echo json_encode(['error' => true, 'mensaje' => 'Tipo de archivo no permitido. Solo se aceptan JPG, PNG, WEBP y SVG.'], JSON_UNESCAPED_UNICODE);
            return;
        }

        $extensions = [
            'image/jpeg' => 'jpg',
            'image/png' => 'png',
            'image/webp' => 'webp',
            'image/svg+xml' => 'svg'
        ];
        $ext = $extensions[$mime] ?? 'jpg';

        $filename = 'img_' . time() . '_' . bin2hex(random_bytes(6)) . '.' . $ext;
        $destPath = UPLOAD_DIR . $filename;

        if (!is_dir(UPLOAD_DIR)) {
            mkdir(UPLOAD_DIR, 0755, true);
        }

        if (!move_uploaded_file($file['tmp_name'], $destPath)) {
            http_response_code(500);
            echo json_encode(['error' => true, 'mensaje' => 'No se pudo guardar la imagen en el servidor.'], JSON_UNESCAPED_UNICODE);
            return;
        }

        $publicUrl = 'api/uploads/' . $filename;

        echo json_encode([
            'success' => true,
            'mensaje' => 'Imagen subida correctamente.',
            'url' => $publicUrl,
            'filename' => $filename
        ], JSON_UNESCAPED_UNICODE);
    }
}
