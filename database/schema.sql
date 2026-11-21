-- ============================================================================
-- PROYECTO: TEJIENDO HISTORIAS - PORTAL DIGITAL DE ITAUGUÁ, PARAGUAY
-- ESQUEMA RELACIONAL DE BASE DE DATOS (ANSI SQL / SQLite / MariaDB / PostgreSQL)
-- ============================================================================

-- 1. ROLES DE USUARIOS
CREATE TABLE IF NOT EXISTS roles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(255) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. USUARIOS DEL SISTEMA
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_completo VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    rol_id INTEGER NOT NULL,
    estado VARCHAR(20) DEFAULT 'activo', -- 'activo', 'inactivo'
    ultimo_acceso TIMESTAMP NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rol_id) REFERENCES roles (id) ON DELETE RESTRICT
);

-- 3. PERFILES DE AUTORES Y COLUMNISTAS
CREATE TABLE IF NOT EXISTS autores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NULL,
    nombre VARCHAR(150) NOT NULL,
    titulo_profesional VARCHAR(150) NOT NULL, -- Ej: 'Licenciada en Ciencias de la Comunicación', 'Ingeniero'
    biografia TEXT NULL,
    foto_url VARCHAR(255) NULL,
    slug VARCHAR(150) NOT NULL UNIQUE,
    redes_sociales TEXT NULL, -- JSON con links a Facebook, Twitter/X, Instagram, LinkedIn
    es_destacado INTEGER DEFAULT 1, -- Para destacar a Elena González y Rodrigo Colman
    activo INTEGER DEFAULT 1,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE SET NULL
);

-- 4. CATEGORÍAS DE NOTICIAS
CREATE TABLE IF NOT EXISTS categorias_noticias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    descripcion VARCHAR(255) NULL,
    orden INTEGER DEFAULT 0,
    activo INTEGER DEFAULT 1
);

-- 5. NOTICIAS Y COLUMNAS EDITORIALES
CREATE TABLE IF NOT EXISTS noticias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo VARCHAR(255) NOT NULL,
    subtitulo VARCHAR(350) NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    cuerpo TEXT NOT NULL,
    imagen_destacada VARCHAR(255) NULL,
    galeria_imagenes TEXT NULL, -- Formato JSON con rutas a fotos adicionales
    categoria_id INTEGER NOT NULL,
    autor_id INTEGER NOT NULL,
    es_destacada INTEGER DEFAULT 0,
    es_columna_opinion INTEGER DEFAULT 0,
    estado VARCHAR(20) DEFAULT 'publicado', -- 'borrador', 'publicado', 'programado'
    fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    meta_descripcion VARCHAR(255) NULL,
    etiquetas VARCHAR(255) NULL, -- Lista separada por comas
    vistas INTEGER DEFAULT 0,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias_noticias (id) ON DELETE RESTRICT,
    FOREIGN KEY (autor_id) REFERENCES autores (id) ON DELETE RESTRICT
);

-- 6. RADIOS DE ITAUGUÁ Y STREAMS EN VIVO
CREATE TABLE IF NOT EXISTS radios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(120) NOT NULL,
    frecuencia VARCHAR(50) NOT NULL, -- Ej: '95.5 FM', '100.9 FM', 'Online'
    tipo VARCHAR(20) DEFAULT 'FM', -- 'FM', 'AM', 'WEB'
    descripcion TEXT NULL,
    logo_url VARCHAR(255) NULL,
    stream_url VARCHAR(500) NOT NULL,
    sitio_web VARCHAR(255) NULL,
    redes_sociales TEXT NULL, -- JSON
    activo INTEGER DEFAULT 1,
    orden INTEGER DEFAULT 0,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. CATEGORÍAS DE NEGOCIOS LOCALES
CREATE TABLE IF NOT EXISTS categorias_negocios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    icono VARCHAR(50) NULL,
    orden INTEGER DEFAULT 0,
    activo INTEGER DEFAULT 1
);

-- 8. DIRECTORIO DE NEGOCIOS DE ITAUGUÁ
CREATE TABLE IF NOT EXISTS negocios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_comercial VARCHAR(150) NOT NULL,
    slug VARCHAR(150) NOT NULL UNIQUE,
    categoria_id INTEGER NOT NULL,
    descripcion TEXT NULL,
    direccion VARCHAR(255) NULL,
    telefono VARCHAR(50) NULL,
    whatsapp VARCHAR(50) NULL,
    email VARCHAR(150) NULL,
    sitio_web VARCHAR(255) NULL,
    redes_sociales TEXT NULL, -- JSON
    horarios TEXT NULL,
    logo_url VARCHAR(255) NULL,
    fotos_galeria TEXT NULL, -- JSON
    latitud DECIMAL(10, 8) NULL,
    longitud DECIMAL(11, 8) NULL,
    plan_comercial VARCHAR(50) DEFAULT 'basico', -- 'basico', 'destacado', 'premium'
    es_destacado INTEGER DEFAULT 0,
    estado VARCHAR(20) DEFAULT 'activo', -- 'activo', 'inactivo', 'pendiente'
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias_negocios (id) ON DELETE RESTRICT
);

-- 9. ESPACIOS PUBLICITARIOS
CREATE TABLE IF NOT EXISTS espacios_publicitarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo VARCHAR(50) NOT NULL UNIQUE, -- 'banner_header', 'entre_noticias', 'lateral_derecha', 'banner_footer', 'radio_player'
    nombre VARCHAR(120) NOT NULL,
    ubicacion VARCHAR(150) NOT NULL,
    dimensiones_recomendadas VARCHAR(50) NULL, -- Ej: '728x90', '300x250', '1200x200'
    precio_estimado DECIMAL(12, 2) DEFAULT 0.00,
    activo INTEGER DEFAULT 1
);

-- 10. ANUNCIOS Y PAUTAS PUBLICITARIAS
CREATE TABLE IF NOT EXISTS anuncios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    espacio_id INTEGER NOT NULL,
    anunciante_nombre VARCHAR(150) NOT NULL,
    imagen_url VARCHAR(255) NOT NULL,
    url_destino VARCHAR(500) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    estado VARCHAR(20) DEFAULT 'activo', -- 'activo', 'inactivo', 'programado'
    orden INTEGER DEFAULT 0,
    impresiones INTEGER DEFAULT 0,
    clics INTEGER DEFAULT 0,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (espacio_id) REFERENCES espacios_publicitarios (id) ON DELETE RESTRICT
);

-- 11. CATEGORÍAS DE EVENTOS
CREATE TABLE IF NOT EXISTS categorias_eventos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE
);

-- 12. AGENDA DE EVENTOS DE ITAUGUÁ
CREATE TABLE IF NOT EXISTS eventos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    categoria_id INTEGER NOT NULL,
    descripcion TEXT NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NULL,
    lugar VARCHAR(200) NOT NULL,
    direccion VARCHAR(255) NULL,
    organizador VARCHAR(150) NULL,
    contacto VARCHAR(100) NULL,
    enlace_inscripcion VARCHAR(500) NULL,
    imagen_url VARCHAR(255) NULL,
    estado VARCHAR(20) DEFAULT 'proximo', -- 'proximo', 'finalizado', 'cancelado'
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias_eventos (id) ON DELETE RESTRICT
);

-- 13. SECCIÓN CULTURA E IDENTIDAD DE ITAUGUÁ (ÑANDUTÍ Y TRADICIÓN)
CREATE TABLE IF NOT EXISTS articulos_cultura (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    subtitulo VARCHAR(350) NULL,
    tema VARCHAR(50) NOT NULL, -- 'nanduti', 'artesanos', 'tradiciones', 'patrimonio', 'historia'
    cuerpo TEXT NOT NULL,
    imagen_destacada VARCHAR(255) NULL,
    galeria_imagenes TEXT NULL,
    autor_id INTEGER NULL,
    fecha_publicacion DATE DEFAULT CURRENT_DATE,
    estado VARCHAR(20) DEFAULT 'publicado',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (autor_id) REFERENCES autores (id) ON DELETE SET NULL
);

-- ÍNDICES PARA ALTO RENDIMIENTO EN BÚSQUEDAS Y FILTROS
CREATE INDEX IF NOT EXISTS idx_noticias_categoria ON noticias(categoria_id);
CREATE INDEX IF NOT EXISTS idx_noticias_autor ON noticias(autor_id);
CREATE INDEX IF NOT EXISTS idx_noticias_estado_fecha ON noticias(estado, fecha_publicacion);
CREATE INDEX IF NOT EXISTS idx_negocios_categoria ON negocios(categoria_id);
CREATE INDEX IF NOT EXISTS idx_negocios_destacado ON negocios(es_destacado, estado);
CREATE INDEX IF NOT EXISTS idx_eventos_fecha ON eventos(fecha, estado);
CREATE INDEX IF NOT EXISTS idx_anuncios_espacio ON anuncios(espacio_id, estado);

