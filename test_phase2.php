<?php
declare(strict_types=1);

$files = [
    'index.html',
    'admin.html',
    'assets/css/custom.css',
    'assets/js/store.js',
    'assets/js/player.js',
    'assets/js/router.js',
    'assets/js/views/home.js',
    'assets/js/views/noticias.js',
    'assets/js/views/detalle-noticia.js',
    'assets/js/views/autores.js',
    'assets/js/views/radios.js',
    'assets/js/views/negocios.js',
    'assets/js/views/eventos.js',
    'assets/js/views/cultura.js',
    'assets/js/views/publicidad-info.js',
    'assets/img/logo-dark-bg.svg',
    'assets/img/logo-light-bg.svg',
    'assets/img/nanduti-symbol.svg',
    'assets/img/author-elena.svg',
    'assets/img/author-rodrigo.svg'
];

$base = __DIR__ . '/';
$allOk = true;

echo "=== VERIFICACIÓN DE ARCHIVOS DE LA FASE 2 ===\n";
foreach ($files as $f) {
    $p = $base . $f;
    if (!file_exists($p)) {
        echo "[ERROR] FALTA: {$f}\n";
        $allOk = false;
    } else {
        $size = filesize($p);
        echo " [OK] {$f} ({$size} bytes)\n";
    }
}

if ($allOk) {
    echo "\n>>> RESULTADO: TODOS LOS ARCHIVOS DE LA FASE 2 CREADOS Y VERIFICADOS CON ÉXITO <<<\n";
} else {
    echo "\n>>> RESULTADO: ALGUNOS ARCHIVOS NO FUERON ENCONTRADOS <<<\n";
    exit(1);
}

