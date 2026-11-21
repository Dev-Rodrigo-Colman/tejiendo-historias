<?php
// test_api.php - Prueba unitaria y funcional de los endpoints de la API
declare(strict_types=1);

echo "=== INICIANDO PRUEBAS DE ENDPOINTS DE LA API REST ===\n\n";

function runEndpoint(string $uri, string $method = 'GET', ?array $postData = null): array {
    $_SERVER['REQUEST_METHOD'] = $method;
    $_SERVER['REQUEST_URI'] = $uri;
    $_GET = [];
    $_POST = $postData ?? [];

    $parts = parse_url($uri);
    if (!empty($parts['query'])) {
        parse_str($parts['query'], $_GET);
    }

    ob_start();
    require __DIR__ . '/api/index.php';
    $output = ob_get_clean();

    $json = json_decode($output, true);
    return [
        'raw' => $output,
        'json' => $json
    ];
}

$tests = [
    'Root Info API' => '/api',
    'Listar Noticias' => '/api/noticias',
    'Categorías de Noticias' => '/api/noticias/categorias',
    'Listar Autores (Elena & Rodrigo)' => '/api/autores',
    'Perfil de Elena González' => '/api/autores/elena-gonzalez',
    'Listar Radios' => '/api/radios',
    'Listar Negocios' => '/api/negocios',
    'Listar Eventos' => '/api/eventos',
    'Publicidad Activa' => '/api/publicidad'
];

$allPassed = true;

foreach ($tests as $name => $endpoint) {
    echo "Probando: [{$name}] -> {$endpoint}... ";
    try {
        $res = runEndpoint($endpoint);
        if ($res['json'] !== null && (!isset($res['json']['error']) || $res['json']['error'] === false)) {
            echo "[OK]\n";
        } else {
            echo "[FALLÓ] Salida: " . substr($res['raw'], 0, 100) . "\n";
            $allPassed = false;
        }
    } catch (Throwable $e) {
        echo "[ERROR EXCEPCIÓN] " . $e->getMessage() . "\n";
        $allPassed = false;
    }
}

echo "\n======================================================\n";
if ($allPassed) {
    echo ">>> RESULTADO: TODOS LOS ENDPOINTS DE LA API FUNCIONAN CORRECTAMENTE <<<\n";
} else {
    echo ">>> RESULTADO: HUBO ERRORES EN LAS PRUEBAS DE LA API <<<\n";
    exit(1);
}
