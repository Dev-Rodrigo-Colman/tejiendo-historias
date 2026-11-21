<?php
// api/index.php - Enrutador Central de la API RESTful de Tejiendo Historias
declare(strict_types=1);

require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/middleware/CorsMiddleware.php';
require_once __DIR__ . '/controllers/NoticiasController.php';
require_once __DIR__ . '/controllers/AutoresController.php';
require_once __DIR__ . '/controllers/RadiosController.php';
require_once __DIR__ . '/controllers/NegociosController.php';
require_once __DIR__ . '/controllers/EventosController.php';
require_once __DIR__ . '/controllers/PublicidadController.php';
require_once __DIR__ . '/controllers/AuthController.php';
require_once __DIR__ . '/controllers/DashboardController.php';
require_once __DIR__ . '/controllers/UploadController.php';

// Aplicar CORS y cabeceras
CorsMiddleware::handle();

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$uri = $_SERVER['REQUEST_URI'] ?? '/';

// Extraer el path relativo eliminando prefijos de carpetas y query strings
$path = parse_url($uri, PHP_URL_PATH) ?? '/';

// Normalizar quitando /api o el nombre de carpeta si está en XAMPP
$path = preg_replace('#^.*?/api/?#i', '', $path);
$path = trim($path, '/');
$segments = $path !== '' ? explode('/', $path) : [];

$resource = $segments[0] ?? '';
$actionOrId = $segments[1] ?? '';
$subAction = $segments[2] ?? '';

try {
    switch ($resource) {
        // --- 1. NOTICIAS ---
        case 'noticias':
            if ($method === 'GET') {
                if ($actionOrId === 'categorias') {
                    NoticiasController::categorias();
                } elseif ($actionOrId !== '') {
                    NoticiasController::show($actionOrId);
                } else {
                    NoticiasController::index();
                }
            } elseif ($method === 'POST') {
                NoticiasController::store();
            } elseif ($method === 'PUT' && is_numeric($actionOrId)) {
                NoticiasController::update((int)$actionOrId);
            } elseif ($method === 'DELETE' && is_numeric($actionOrId)) {
                NoticiasController::destroy((int)$actionOrId);
            } else {
                http_response_code(405);
                echo json_encode(['error' => true, 'mensaje' => 'Método no permitido para noticias.']);
            }
            break;

        // --- 2. AUTORES (Elena González y Rodrigo Colman) ---
        case 'autores':
            if ($method === 'GET') {
                if ($actionOrId !== '') {
                    AutoresController::show($actionOrId);
                } else {
                    AutoresController::index();
                }
            } elseif ($method === 'PUT' && is_numeric($actionOrId)) {
                AutoresController::update((int)$actionOrId);
            } else {
                http_response_code(405);
                echo json_encode(['error' => true, 'mensaje' => 'Método no permitido para autores.']);
            }
            break;

        // --- 3. RADIOS DE ITAUGUÁ ---
        case 'radios':
            if ($method === 'GET') {
                if ($actionOrId !== '' && is_numeric($actionOrId)) {
                    RadiosController::show((int)$actionOrId);
                } else {
                    RadiosController::index();
                }
            } elseif ($method === 'POST') {
                if ($actionOrId === 'test-stream') {
                    RadiosController::testStream();
                } else {
                    RadiosController::store();
                }
            } elseif ($method === 'PUT' && is_numeric($actionOrId)) {
                RadiosController::update((int)$actionOrId);
            } elseif ($method === 'DELETE' && is_numeric($actionOrId)) {
                RadiosController::destroy((int)$actionOrId);
            } else {
                http_response_code(405);
                echo json_encode(['error' => true, 'mensaje' => 'Método no permitido para radios.']);
            }
            break;

        // --- 4. NEGOCIOS LOCALES ---
        case 'negocios':
            if ($method === 'GET') {
                if ($actionOrId === 'categorias') {
                    NegociosController::categorias();
                } elseif ($actionOrId !== '' && is_numeric($actionOrId)) {
                    NegociosController::show((int)$actionOrId);
                } else {
                    NegociosController::index();
                }
            } elseif ($method === 'POST') {
                NegociosController::store();
            } elseif ($method === 'PUT' && is_numeric($actionOrId)) {
                NegociosController::update((int)$actionOrId);
            } elseif ($method === 'DELETE' && is_numeric($actionOrId)) {
                NegociosController::destroy((int)$actionOrId);
            } else {
                http_response_code(405);
                echo json_encode(['error' => true, 'mensaje' => 'Método no permitido para negocios.']);
            }
            break;

        // --- 5. EVENTOS ---
        case 'eventos':
            if ($method === 'GET') {
                if ($actionOrId === 'categorias') {
                    EventosController::categorias();
                } elseif ($actionOrId !== '' && is_numeric($actionOrId)) {
                    EventosController::show((int)$actionOrId);
                } else {
                    EventosController::index();
                }
            } elseif ($method === 'POST') {
                EventosController::store();
            } elseif ($method === 'PUT' && is_numeric($actionOrId)) {
                EventosController::update((int)$actionOrId);
            } elseif ($method === 'DELETE' && is_numeric($actionOrId)) {
                EventosController::destroy((int)$actionOrId);
            } else {
                http_response_code(405);
                echo json_encode(['error' => true, 'mensaje' => 'Método no permitido para eventos.']);
            }
            break;

        // --- 6. PUBLICIDAD ---
        case 'publicidad':
            if ($method === 'GET') {
                if ($actionOrId === 'espacios') {
                    PublicidadController::espacios();
                } elseif ($actionOrId === 'all') {
                    PublicidadController::all();
                } else {
                    PublicidadController::index();
                }
            } elseif ($method === 'POST') {
                if ($actionOrId === 'click' && is_numeric($subAction)) {
                    PublicidadController::click((int)$subAction);
                } else {
                    PublicidadController::store();
                }
            } else {
                http_response_code(405);
                echo json_encode(['error' => true, 'mensaje' => 'Método no permitido para publicidad.']);
            }
            break;

        // --- 7. AUTENTICACIÓN ---
        case 'auth':
            if ($method === 'POST' && $actionOrId === 'login') {
                AuthController::login();
            } elseif ($method === 'GET' && $actionOrId === 'me') {
                AuthController::me();
            } elseif ($method === 'POST' && $actionOrId === 'logout') {
                AuthController::logout();
            } else {
                http_response_code(404);
                echo json_encode(['error' => true, 'mensaje' => 'Ruta de autenticación no encontrada.']);
            }
            break;

        // --- 8. DASHBOARD ADMIN ---
        case 'dashboard':
            if ($actionOrId === 'stats') {
                DashboardController::stats();
            } else {
                http_response_code(404);
                echo json_encode(['error' => true, 'mensaje' => 'Recurso de dashboard no encontrado.']);
            }
            break;

        // --- 9. SUBIDA SEGURA DE ARCHIVOS ---
        case 'upload':
            if ($method === 'POST') {
                UploadController::upload();
            } else {
                http_response_code(405);
                echo json_encode(['error' => true, 'mensaje' => 'Método no permitido para subida de archivos.']);
            }
            break;

        // --- ROOT INFO DE LA API ---
        case '':
            echo json_encode([
                'api' => 'Tejiendo Historias API RESTful',
                'version' => '1.0.0',
                'ciudad' => 'Itauguá, Paraguay',
                'eslogan' => 'Las historias de nuestra ciudad, tejidas entre todos',
                'estado' => 'operativo',
                'endpoints' => [
                    '/api/noticias',
                    '/api/autores',
                    '/api/radios',
                    '/api/negocios',
                    '/api/eventos',
                    '/api/publicidad',
                    '/api/auth',
                    '/api/dashboard/stats'
                ]
            ], JSON_UNESCAPED_UNICODE);
            break;

        default:
            http_response_code(404);
            echo json_encode([
                'error' => true,
                'mensaje' => 'Endpoint no encontrado: ' . $resource
            ], JSON_UNESCAPED_UNICODE);
            break;
    }
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'mensaje' => 'Error interno en el servidor.',
        'detalle' => APP_ENV === 'development' ? $e->getMessage() : null
    ], JSON_UNESCAPED_UNICODE);
}
