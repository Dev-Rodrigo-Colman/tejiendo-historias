<?php
// init_db.php - Script para inicializar y verificar la base de datos
declare(strict_types=1);

$dbPath = __DIR__ . '/database.sqlite';
$schemaPath = __DIR__ . '/schema.sql';
$seedPath = __DIR__ . '/seed.sql';

echo "=== INICIALIZANDO BASE DE DATOS TEJIENDO HISTORIAS ===\n";

try {
    // Si existe la base de datos previa de pruebas, la recreamos para garantizar integridad limpia
    if (file_exists($dbPath)) {
        unlink($dbPath);
        echo "[OK] Base de datos previa removida para recreación limpia.\n";
    }

    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->exec("PRAGMA foreign_keys = ON;");

    echo "[...] Ejecutando schema.sql...\n";
    $schemaSql = file_get_contents($schemaPath);
    $pdo->exec($schemaSql);
    echo "[OK] Tablas e índices creados con éxito.\n";

    echo "[...] Ejecutando seed.sql...\n";
    $seedSql = file_get_contents($seedPath);
    $pdo->exec($seedSql);
    echo "[OK] Datos demostrativos iniciales insertados con éxito.\n";

    // Verificación de conteos
    $tablas = [
        'roles' => 'Roles de usuario',
        'usuarios' => 'Usuarios',
        'autores' => 'Autores (Elena González y Rodrigo Colman)',
        'categorias_noticias' => 'Categorías de noticias',
        'noticias' => 'Noticias publicadas',
        'radios' => 'Emisoras de radio',
        'negocios' => 'Negocios locales',
        'anuncios' => 'Anuncios publicitarios',
        'eventos' => 'Eventos agendados',
        'articulos_cultura' => 'Artículos culturales de ñandutí'
    ];

    echo "\n--- RESUMEN DE REGISTROS INSERTADOS ---\n";
    foreach ($tablas as $tabla => $desc) {
        $stmt = $pdo->query("SELECT COUNT(*) FROM {$tabla}");
        $total = $stmt->fetchColumn();
        echo " - {$desc} ({$tabla}): {$total} registros\n";
    }

    echo "\n=== BASE DE DATOS INICIALIZADA SATISFACTORIAMENTE ===\n";

} catch (Exception $e) {
    echo "\n[ERROR CRÍTICO] " . $e->getMessage() . "\n";
    exit(1);
}

