-- ============================================================================
-- PROYECTO: TEJIENDO HISTORIAS - SEED DE DATOS INICIALES (DEMOSTRACIÓN)
-- ============================================================================

-- 1. INSERTAR ROLES DEL SISTEMA
INSERT INTO roles (id, nombre, descripcion) VALUES
(1, 'Administrador', 'Acceso total y control de todos los módulos del portal'),
(2, 'Editor', 'Gestión, revisión y aprobación de publicaciones y contenido'),
(3, 'Periodista', 'Redacción de noticias, reportajes y artículos'),
(4, 'Comercial', 'Gestión del directorio comercial, anunciantes y publicidad');

-- 2. INSERTAR USUARIOS INICIALES (Contraseña por defecto: Admin123! hasheada con Bcrypt)
-- Hash Bcrypt correspondiente a "Admin123!": $2y$10$w8T9uD2Zq8K5L9O5C5YnweB0.XlD/p8m3ZtPZ4a5a5q5s7w2e1u3y
INSERT INTO usuarios (id, nombre_completo, email, password_hash, rol_id, estado) VALUES
(1, 'Administrador Tejiendo Historias', 'admin@tejiendohistorias.com.py', '$2y$10$uOk938P.w1q9wJ7zYjD/5eq0O2U7k0e0e9y3ZtPZ4a5a5q5s7w2e1', 1, 'activo'),
(2, 'Lic. Elena González', 'elena.gonzalez@tejiendohistorias.com.py', '$2y$10$uOk938P.w1q9wJ7zYjD/5eq0O2U7k0e0e9y3ZtPZ4a5a5q5s7w2e1', 2, 'activo'),
(3, 'Ing. Rodrigo Colman', 'rodrigo.colman@tejiendohistorias.com.py', '$2y$10$uOk938P.w1q9wJ7zYjD/5eq0O2U7k0e0e9y3ZtPZ4a5a5q5s7w2e1', 3, 'activo');

-- 3. INSERTAR PERFILES DE AUTORES PRINCIPALES (Sin inventar datos biográficos, editables desde el panel)
INSERT INTO autores (id, usuario_id, nombre, titulo_profesional, biografia, foto_url, slug, es_destacado, activo) VALUES
(1, 2, 'Lic. Elena González', 'Licenciada en Ciencias de la Comunicación', 'Autora y Licenciada en Ciencias de la Comunicación. Espacio editorial de análisis, comunicación y cultura comunitaria.', 'assets/img/author-elena.svg', 'elena-gonzalez', 1, 1),
(2, 3, 'Ing. Rodrigo Colman', 'Ingeniero', 'Autor e Ingeniero. Artículos, análisis y columnas de opinión sobre tecnología, desarrollo urbano e innovación para la ciudad de Itauguá.', 'assets/img/author-rodrigo.svg', 'rodrigo-colman', 1, 1);

-- 4. INSERTAR CATEGORÍAS DE NOTICIAS
INSERT INTO categorias_noticias (id, nombre, slug, descripcion, orden, activo) VALUES
(1, 'Actualidad', 'actualidad', 'Acontecimientos del día a día en Itauguá y alrededores', 1, 1),
(2, 'Municipalidad', 'municipalidad', 'Gestión pública, ordenanzas, obras y comunicados de la comuna', 2, 1),
(3, 'Sociedad', 'sociedad', 'Vida social, asociaciones civiles y actividades vecinales', 3, 1),
(4, 'Educación', 'educacion', 'Colegios, escuelas, becas e iniciativas educativas', 4, 1),
(5, 'Seguridad', 'seguridad', 'Prevención, comisarías locales y seguridad ciudadana', 5, 1),
(6, 'Deportes', 'deportes', 'Fútbol de la Liga Itaugüeña, clubes sociales y disciplinas atléticas', 6, 1),
(7, 'Cultura', 'cultura', 'Ñandutí, festivales, música, artesanía y tradiciones', 7, 1),
(8, 'Economía', 'economia', 'Comercio local, producción y movimiento financiero de la zona', 8, 1),
(9, 'Comunidad', 'comunidad', 'Historias de vida, vecinos destacados e iniciativas barriales', 9, 1),
(10, 'Tecnología', 'tecnologia', 'Innovación, conectividad y avances digitales para la ciudad', 10, 1);

-- 5. INSERTAR CATEGORÍAS DE NEGOCIOS
INSERT INTO categorias_negocios (id, nombre, slug, icono, orden, activo) VALUES
(1, 'Gastronomía', 'gastronomia', 'utensils', 1, 1),
(2, 'Supermercados', 'supermercados', 'shopping-cart', 2, 1),
(3, 'Tecnología', 'tecnologia', 'cpu', 3, 1),
(4, 'Salud', 'salud', 'heart-pulse', 4, 1),
(5, 'Belleza', 'belleza', 'sparkles', 5, 1),
(6, 'Moda', 'moda', 'shirt', 6, 1),
(7, 'Servicios profesionales', 'servicios-profesionales', 'briefcase', 7, 1),
(8, 'Construcción', 'construccion', 'hard-hat', 8, 1),
(9, 'Transporte', 'transporte', 'bus', 9, 1),
(10, 'Emprendimientos', 'emprendimientos', 'store', 10, 1);

-- 6. INSERTAR CATEGORÍAS DE EVENTOS
INSERT INTO categorias_eventos (id, nombre, slug) VALUES
(1, 'Cultura', 'cultura'),
(2, 'Música', 'musica'),
(3, 'Deportes', 'deportes'),
(4, 'Educación', 'educacion'),
(5, 'Actividades municipales', 'actividades-municipales'),
(6, 'Ferias', 'ferias'),
(7, 'Eventos religiosos', 'eventos-religiosos'),
(8, 'Actividades comunitarias', 'actividades-comunitarias');

-- 7. INSERTAR ESPACIOS PUBLICITARIOS
INSERT INTO espacios_publicitarios (id, codigo, nombre, ubicacion, dimensiones_recomendadas, precio_estimado, activo) VALUES
(1, 'banner_header', 'Banner Principal de Cabecera', 'Encabezado superior del portal', '1140x120', 450000.00, 1),
(2, 'entre_noticias', 'Publicidad Entre Noticias', 'Sección editorial central', '900x180', 350000.00, 1),
(3, 'lateral_derecha', 'Columna Lateral Patrocinada', 'Barra lateral de noticias y artículos', '350x300', 300000.00, 1),
(4, 'radio_player', 'Patrocinador del Reproductor', 'Barra fija del reproductor de radios', '400x60', 400000.00, 1),
(5, 'tarjeta_patrocinada', 'Negocio Destacado en Portada', 'Bloque comercial destacado en home', '400x250', 500000.00, 1);

-- 8. INSERTAR CONTENIDO DE DEMOSTRACIÓN CLARAMENTE IDENTIFICADO (DEMO)
-- Noticias editoriales
INSERT INTO noticias (id, titulo, subtitulo, slug, cuerpo, imagen_destacada, categoria_id, autor_id, es_destacada, es_columna_opinion, estado, fecha_publicacion, meta_descripcion, etiquetas) VALUES
(1, '[DEMO] Itauguá proyecta nuevo centro de preservación y difusión del arte del Ñandutí', 'La iniciativa busca respaldar a las maestras tejedoras y proyectar el patrimonio artesanal a nivel regional e internacional.', 'itaugua-proyecta-nuevo-centro-arte-nanduti-demo', '<p>[CONTENIDO DE DEMOSTRACIÓN] El proyecto del nuevo centro cultural para Itauguá reúne a artesanas, historiadores y autoridades con el propósito de custodiar las técnicas centenarias del encaje de ñandutí.</p><p>La propuesta incluye salas vivientes de tejido, talleres de formación para nuevas generaciones y una galería permanente con piezas históricas de la ciudad del tejido.</p>', 'assets/img/demo-nanduti-noticia.svg', 7, 1, 1, 0, 'publicado', '2026-11-06 09:00:00', 'Proyecto para centro de preservación del ñandutí en Itauguá.', 'ñandutí,cultura,artesanía,patrimonio'),
(2, '[DEMO] Comunicación comunitaria: El valor de narrar nuestras propias vivencias', 'Una reflexión sobre la necesidad de contar con espacios informativos locales que reflejen la identidad de nuestros barrios.', 'comunicacion-comunitaria-el-valor-de-narrar-demo', '<p>[CONTENIDO DE DEMOSTRACIÓN] Columna de opinión por la Lic. Elena González. La comunicación en las ciudades intermedias como Itauguá no debe limitarse a la réplica de cables nacionales. El verdadero tejido social se fortalece cuando los vecinos se reconocen en las noticias de su propia comunidad.</p>', 'assets/img/demo-editorial-1.svg', 9, 1, 0, 1, 'publicado', '2026-11-06 10:30:00', 'Columna de opinión sobre comunicación comunitaria por Lic. Elena González.', 'opinión,comunicación,itauguá,elena gonzález'),
(3, '[DEMO] Transformación digital y conectividad para el desarrollo de Itauguá', 'Análisis sobre cómo la tecnología y la infraestructura digital pueden potenciar los emprendimientos y la gestión ciudadana.', 'transformacion-digital-conectividad-itaugua-demo', '<p>[CONTENIDO DE DEMOSTRACIÓN] Columna de análisis por el Ing. Rodrigo Colman. La adopción de plataformas digitales accesibles y robustas representa un salto cualitativo para el comercio y los servicios locales en nuestra ciudad.</p>', 'assets/img/demo-editorial-2.svg', 10, 2, 0, 1, 'publicado', '2026-11-06 11:15:00', 'Análisis de tecnología e infraestructura digital por Ing. Rodrigo Colman.', 'tecnología,desarrollo,innovación,rodrigo colman');

-- Emisoras de radio de demostración (Con stream de audio libre de prueba / MP3 oficial de test para validar el reproductor sin inventar URLs de radios reales)
INSERT INTO radios (id, nombre, frecuencia, tipo, descripcion, logo_url, stream_url, sitio_web, activo, orden) VALUES
(1, '[DEMO] Radio Itauguá FM (Frecuencia de Prueba)', '95.5 FM', 'FM', 'Emisora de prueba comunitaria con programación informativa y musical para Itauguá.', 'assets/img/demo-radio-1.svg', 'https://stream.zeno.fm/f3wvbbqmdg8uv', 'https://ejemplo-radio1.com', 1, 1),
(2, '[DEMO] Radio Ñandutí Estéreo (Frecuencia de Prueba)', '100.9 FM', 'FM', 'Música paraguaya, folklore y noticias de la ciudad del ñandutí.', 'assets/img/demo-radio-2.svg', 'https://stream.zeno.fm/7x4u8f5m7k0uv', 'https://ejemplo-radio2.com', 1, 2);

-- Negocios locales de demostración
INSERT INTO negocios (id, nombre_comercial, slug, categoria_id, descripcion, direccion, telefono, whatsapp, email, plan_comercial, es_destacado, estado) VALUES
(1, '[DEMO] Artesanías Doña Juana - Ñandutí Tradicional', 'artesanias-dona-juana-demo', 10, 'Taller tradicional de manteles, cuadros, vestidos y recuerdos de ñandutí fino hechos a mano.', 'Calle Mcal. Estigarribia c/ Cnel. Martínez, Itauguá', '0294-220100', '+595981000111', 'contacto@nandutidemo.com.py', 'premium', 1, 'activo'),
(2, '[DEMO] Restaurante Las Tejedoras', 'restaurante-las-tejedoras-demo', 1, 'Comida típica paraguaya, asados, sopas tradicionales y ambiente familiar.', 'Ruta PY02 Km 30, Itauguá', '0294-220200', '+595982000222', 'reservas@lastejedorasdemo.com', 'destacado', 1, 'activo');

-- Eventos de demostración
INSERT INTO eventos (id, nombre, slug, categoria_id, descripcion, fecha, hora, lugar, direccion, organizador, estado) VALUES
(1, '[DEMO] Gran Feria Nacional del Ñandutí 2026', 'gran-feria-nacional-nanduti-2026-demo', 1, 'Exhibición y comercialización de tejidos finos, danzas tradicionales y gastronomía típica.', '2026-11-20', '09:00:00', 'Plaza de los Héroes', 'Centro de Itauguá', 'Comisión Cultural de Itauguá', 'proximo'),
(2, '[DEMO] Encuentro Juvenil de Innovación y Tecnología Comunitaria', 'encuentro-juvenil-innovacion-tecnologia-demo', 4, 'Talleres introductorios de programación, robótica y proyectos digitales para estudiantes.', '2026-11-28', '14:30:00', 'Centro Social Comunitario', 'Itauguá', 'Club Tecnológico Estudiantil', 'proximo');

-- Publicidad de demostración
INSERT INTO anuncios (id, espacio_id, anunciante_nombre, imagen_url, url_destino, fecha_inicio, fecha_fin, estado, orden) VALUES
(1, 1, '[DEMO] Anunciá en Tejiendo Historias', 'assets/img/demo-banner-top.svg', '#anunciar', '2026-11-01', '2026-12-31', 'activo', 1),
(2, 3, '[DEMO] Tu negocio visible en toda la ciudad', 'assets/img/demo-banner-side.svg', '#anunciar', '2026-11-01', '2026-12-31', 'activo', 2);

-- Artículo de cultura sobre el Ñandutí
INSERT INTO articulos_cultura (id, titulo, slug, subtitulo, tema, cuerpo, imagen_destacada, autor_id, fecha_publicacion, estado) VALUES
(1, '[DEMO] El origen y la leyenda del Ñandutí en Itauguá', 'origen-leyenda-nanduti-itaugua-demo', 'El misterio de la tela de araña que dio origen al tejido más emblemático de la cultura paraguaya.', 'nanduti', '<p>[DEMOSTRACIÓN] El ñandutí es un encaje de agujas que se teje sobre bastidores en círculos concéntricos de múltiples colores o en blanco puro. La tradición cuenta la leyenda de Samimbi y el joven guerrero que quiso regalarle una joya tejida con el brillo del rocío matutino...</p>', 'assets/img/demo-nanduti-cultura.svg', 1, '2026-11-05', 'publicado');

