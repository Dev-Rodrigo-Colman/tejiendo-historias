/**
 * TEJIENDO HISTORIAS - Store de Estado Global y Proveedor de Datos
 * Conecta con los datos demostrativos estructurados y prepara la integración con la API REST.
 */

window.TH_STORE = {
  // Estado reactivo
  state: {
    currentRoute: 'home',
    activeRadio: null,
    isPlaying: false,
    audioError: null,
    searchQuery: '',
    selectedCategory: null
  },

  // Datos iniciales de demostración estructurados (idénticos a la Base de Datos SQLite)
  data: {
    noticias: [
      {
        id: 1,
        titulo: "[DEMO] Itauguá proyecta nuevo centro de preservación y difusión del arte del Ñandutí",
        subtitulo: "La iniciativa busca respaldar a las maestras tejedoras y proyectar el patrimonio artesanal a nivel regional e internacional.",
        slug: "itaugua-proyecta-nuevo-centro-arte-nanduti-demo",
        cuerpo: `
          <p class="mb-4">[CONTENIDO DE DEMOSTRACIÓN] El proyecto del nuevo centro cultural para Itauguá reúne a artesanas, historiadores y autoridades con el propósito de custodiar las técnicas centenarias del encaje de ñandutí.</p>
          <p class="mb-4">La propuesta incluye salas vivientes de tejido, talleres de formación para nuevas generaciones y una galería permanente con piezas históricas de la ciudad del tejido.</p>
          <blockquote class="p-4 my-4 border-l-4 border-gold bg-amber-50/50 italic text-navy">
            "El ñandutí no es solo un adorno, es el mapa de la memoria y la paciencia de nuestras abuelas que hoy cobra nuevo vigor en las manos jóvenes."
          </blockquote>
          <p class="mb-4">La obra se ubicará en las inmediaciones del casco histórico de la ciudad, facilitando el acceso tanto para los pobladores locales como para los turistas que visitan Itauguá durante todo el año.</p>
        `,
        imagen_destacada: "assets/img/demo-nanduti-noticia.svg",
        categoria_id: 7,
        categoria_nombre: "Cultura",
        categoria_slug: "cultura",
        autor_id: 1,
        autor_nombre: "Lic. Elena González",
        autor_titulo: "Licenciada en Ciencias de la Comunicación",
        autor_foto: "assets/img/author-elena.svg",
        es_destacada: 1,
        es_columna_opinion: 0,
        fecha_publicacion: "2026-11-06 09:00",
        etiquetas: ["ñandutí", "cultura", "artesanía", "patrimonio", "itauguá"],
        vistas: 420
      },
      {
        id: 2,
        titulo: "[DEMO] Comunicación comunitaria: El valor de narrar nuestras propias vivencias",
        subtitulo: "Una reflexión sobre la necesidad de contar con espacios informativos locales que reflejen la identidad de nuestros barrios.",
        slug: "comunicacion-comunitaria-el-valor-de-narrar-demo",
        cuerpo: `
          <p class="mb-4">[CONTENIDO DE DEMOSTRACIÓN] <strong>Por Lic. Elena González</strong>. La comunicación en las ciudades del Departamento Central como Itauguá no puede limitarse a la simple retransmisión de noticias nacionales o internacionales. Cuando un medio digital abre sus páginas a los clubes barriales, a las ferias vecinales y a la voz de las artesanas, se convierte en un espejo donde la comunidad se reconoce.</p>
          <p class="mb-4">Tejiendo Historias nace con esa vocación: conectar los hilos dispersos de nuestra sociedad itaugüeña para crear un tejido sólido, donde cada historia sume valor a la memoria colectiva.</p>
        `,
        imagen_destacada: "assets/img/demo-editorial-1.svg",
        categoria_id: 9,
        categoria_nombre: "Comunidad",
        categoria_slug: "comunidad",
        autor_id: 1,
        autor_nombre: "Lic. Elena González",
        autor_titulo: "Licenciada en Ciencias de la Comunicación",
        autor_foto: "assets/img/author-elena.svg",
        es_destacada: 0,
        es_columna_opinion: 1,
        fecha_publicacion: "2026-11-06 10:30",
        etiquetas: ["opinión", "comunicación", "itauguá", "elena gonzález"],
        vistas: 285
      },
      {
        id: 3,
        titulo: "[DEMO] Transformación digital y conectividad para el desarrollo de Itauguá",
        subtitulo: "Análisis sobre cómo la tecnología y la infraestructura digital pueden potenciar los emprendimientos y la gestión ciudadana.",
        slug: "transformacion-digital-conectividad-itaugua-demo",
        cuerpo: `
          <p class="mb-4">[CONTENIDO DE DEMOSTRACIÓN] <strong>Por Ing. Rodrigo Colman</strong>. Las ciudades intermedias en Paraguay enfrentan una oportunidad histórica: la digitalización de sus servicios y economías locales.</p>
          <p class="mb-4">Para Itauguá, incorporar herramientas de comercio electrónico para nuestras artesanas y negocios gastronómicos, sumado a plataformas de información en tiempo real, no es un lujo tecnológico sino una necesidad estratégica para retener el talento y dinamizar las ventas locales.</p>
        `,
        imagen_destacada: "assets/img/demo-editorial-2.svg",
        categoria_id: 10,
        categoria_nombre: "Tecnología",
        categoria_slug: "tecnologia",
        autor_id: 2,
        autor_nombre: "Ing. Rodrigo Colman",
        autor_titulo: "Ingeniero",
        autor_foto: "assets/img/author-rodrigo.svg",
        es_destacada: 0,
        es_columna_opinion: 1,
        fecha_publicacion: "2026-11-06 11:15",
        etiquetas: ["tecnología", "innovación", "desarrollo", "rodrigo colman"],
        vistas: 310
      }
    ],

    autores: [
      {
        id: 1,
        nombre: "Lic. Elena González",
        titulo_profesional: "Licenciada en Ciencias de la Comunicación",
        biografia: "Autora y Licenciada en Ciencias de la Comunicación. Espacio editorial de análisis, comunicación comunitaria y cultura itaugüeña. Comprometida con dar visibilidad a las historias ciudadanas y el rescate de las tradiciones de nuestra comunidad.",
        foto_url: "assets/img/author-elena.svg",
        slug: "elena-gonzalez",
        espacio_nombre: "El espacio de Elena González",
        articulos_publicados: 14,
        redes: { twitter: "#", facebook: "#", linkedin: "#" }
      },
      {
        id: 2,
        nombre: "Ing. Rodrigo Colman",
        titulo_profesional: "Ingeniero",
        biografia: "Autor e Ingeniero. Artículos, análisis y columnas de opinión sobre tecnología, desarrollo urbano, conectividad e innovación para la ciudad de Itauguá. Promotor de proyectos digitales y soluciones aplicadas a la comunidad.",
        foto_url: "assets/img/author-rodrigo.svg",
        slug: "rodrigo-colman",
        espacio_nombre: "El espacio de Rodrigo Colman",
        articulos_publicados: 11,
        redes: { twitter: "#", linkedin: "#", github: "#" }
      }
    ],

    radios: [
      {
        id: 1,
        nombre: "[DEMO] Radio Itauguá FM",
        frecuencia: "95.5 FM",
        tipo: "FM",
        descripcion: "Emisora comunitaria de prueba con programación informativa, musical y cultural para Itauguá.",
        logo_url: "assets/img/demo-radio-1.svg",
        // Stream oficial de prueba libre Zeno.FM de audio continuo
        stream_url: "https://stream.zeno.fm/f3wvbbqmdg8uv",
        sitio_web: "https://ejemplo-radio1.com",
        activo: 1,
        oyentes_estimados: 1240
      },
      {
        id: 2,
        nombre: "[DEMO] Ñandutí Estéreo",
        frecuencia: "100.9 FM",
        tipo: "FM",
        descripcion: "Folklore paraguayo, noticias de actualidad y música tradicional en la capital del ñandutí.",
        logo_url: "assets/img/demo-radio-2.svg",
        // Stream oficial de prueba libre alternativo
        stream_url: "https://stream.zeno.fm/7x4u8f5m7k0uv",
        sitio_web: "https://ejemplo-radio2.com",
        activo: 1,
        oyentes_estimados: 980
      }
    ],

    negocios: [
      {
        id: 1,
        nombre_comercial: "[DEMO] Artesanías Doña Juana - Ñandutí Tradicional",
        slug: "artesanias-dona-juana-demo",
        categoria: "Emprendimientos",
        categoria_id: 10,
        descripcion: "Taller tradicional de manteles, cuadros, vestidos de fiesta, camisas de ao po'i y recuerdos de ñandutí fino elaborados artesanalmente en bastidor.",
        direccion: "Calle Mcal. Estigarribia c/ Cnel. Martínez, Itauguá",
        telefono: "0294-220100",
        whatsapp: "+595981000111",
        email: "contacto@nandutidemo.com.py",
        horarios: "Lunes a Sábado: 07:30 a 18:30 hs",
        logo_url: "assets/img/nanduti-symbol.svg",
        es_destacado: 1,
        plan_comercial: "premium"
      },
      {
        id: 2,
        nombre_comercial: "[DEMO] Restaurante Las Tejedoras",
        slug: "restaurante-las-tejedoras-demo",
        categoria: "Gastronomía",
        categoria_id: 1,
        descripcion: "Gastronomía típica paraguaya, exquisitos asados al corte, sopa paraguaya tradicional, chipa guasu y ambiente climatizado para toda la familia.",
        direccion: "Ruta PY02 Km 30, Itauguá",
        telefono: "0294-220200",
        whatsapp: "+595982000222",
        email: "reservas@lastejedorasdemo.com",
        horarios: "Martes a Domingo: 11:30 a 15:30 y 19:30 a 23:30 hs",
        logo_url: "assets/img/logo-dark-bg.svg",
        es_destacado: 1,
        plan_comercial: "destacado"
      }
    ],

    eventos: [
      {
        id: 1,
        nombre: "[DEMO] Gran Feria Nacional del Ñandutí 2026",
        slug: "gran-feria-nacional-nanduti-2026-demo",
        categoria: "Cultura",
        descripcion: "Exhibición magistral de maestras artesanas, danzas tradicionales, feria de comidas típicas paraguayas y conciertos con artistas locales e invitados.",
        fecha: "2026-11-20",
        hora: "09:00 hs",
        lugar: "Plaza de los Héroes",
        direccion: "Centro Histórico de Itauguá",
        organizador: "Comisión Cultural y Artesanal de Itauguá",
        contacto: "info@culturaitaugua.gov.py",
        imagen_url: "assets/img/demo-nanduti-noticia.svg",
        estado: "proximo"
      },
      {
        id: 2,
        nombre: "[DEMO] Encuentro Juvenil de Innovación y Tecnología Comunitaria",
        slug: "encuentro-juvenil-innovacion-tecnologia-demo",
        categoria: "Educación",
        descripcion: "Jornada de charlas, robótica, programación aplicada y proyectos comunitarios para estudiantes de colegios técnicos y universitarios de la zona.",
        fecha: "2026-11-28",
        hora: "14:30 hs",
        lugar: "Centro Social y Comunitario",
        direccion: "Avda. Dr. Gaspar R. de Francia, Itauguá",
        organizador: "Club Tecnológico Estudiantil",
        contacto: "contacto@tecnologiaitaugua.org",
        imagen_url: "assets/img/demo-editorial-2.svg",
        estado: "proximo"
      }
    ],

    cultura: [
      {
        id: 1,
        titulo: "[DEMO] El origen y la leyenda del Ñandutí en Itauguá",
        slug: "origen-leyenda-nanduti-itaugua-demo",
        subtitulo: "El misterio de la tela de araña que dio origen al tejido más emblemático de la cultura paraguaya.",
        tema: "nanduti",
        cuerpo: `
          <p class="mb-4">[CONTENIDO DEMOSTRATIVO] El ñandutí es un encaje de agujas que se teje sobre bastidores en círculos concéntricos de múltiples colores o en blanco puro. La tradición popular cuenta la leyenda de Samimbi y el joven guerrero que quiso regalarle una joya tejida con el brillo del rocío matutino...</p>
          <p class="mb-4">En Itauguá, cada diseño o dechado representa elementos de la naturaleza paraguaya: el <em>mburucuyá</em>, la flor del guayabo, las garras del carancho o la estrella del amanecer.</p>
        `,
        imagen_destacada: "assets/img/demo-nanduti-cultura.svg",
        autor: "Lic. Elena González",
        fecha: "2026-11-05"
      }
    ],

    anuncios: [
      {
        id: 1,
        espacio: "banner_header",
        anunciante: "[DEMO] Espacio Publicitario Premium",
        imagen_url: "assets/img/demo-banner-top.svg",
        url_destino: "#anunciar",
        activo: 1
      },
      {
        id: 2,
        espacio: "lateral_derecha",
        anunciante: "[DEMO] Pautá en Tejiendo Historias",
        imagen_url: "assets/img/demo-banner-side.svg",
        url_destino: "#anunciar",
        activo: 1
      }
    ]
  },

  // Métodos de acceso y consulta
  getNoticiasDestacadas() {
    return this.data.noticias.filter(n => n.es_destacada === 1);
  },

  getUltimasNoticias() {
    return this.data.noticias;
  },

  getArticulosPorAutor(autorId) {
    return this.data.noticias.filter(n => n.autor_id === autorId);
  },

  getAutor(id) {
    return this.data.autores.find(a => a.id === id);
  },

  getNoticiaPorSlug(slug) {
    return this.data.noticias.find(n => n.slug === slug);
  },

  getRadios() {
    return this.data.radios;
  },

  getNegocios(categoriaId = null) {
    if (!categoriaId) return this.data.negocios;
    return this.data.negocios.filter(b => b.categoria_id === categoriaId);
  },

  getEventos(proximos = true) {
    return this.data.eventos.filter(e => proximos ? e.estado === 'proximo' : e.estado === 'finalizado');
  }
};

