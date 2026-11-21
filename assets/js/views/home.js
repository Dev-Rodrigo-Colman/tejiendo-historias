/**
 * TEJIENDO HISTORIAS - Vista Portada Principal (Home Editorial)
 * Diseño editorial elegante, cultural y balanceado inspirado en el ñandutí.
 */

window.TH_VIEWS = window.TH_VIEWS || {};

window.TH_VIEWS.home = {
  render() {
    const store = window.TH_STORE;
    const destacada = store.getNoticiasDestacadas()[0] || store.data.noticias[0];
    const secundarias = store.data.noticias.filter(n => n.id !== destacada.id);
    const autorElena = store.getAutor(1);
    const autorRodrigo = store.getAutor(2);
    const articulosElena = store.getArticulosPorAutor(1);
    const articulosRodrigo = store.getArticulosPorAutor(2);
    const radios = store.getRadios();
    const negocios = store.getNegocios();
    const eventos = store.getEventos(true);
    const culturaItem = store.data.cultura[0];
    const bannerTop = store.data.anuncios.find(a => a.espacio === 'banner_header');
    const bannerSide = store.data.anuncios.find(a => a.espacio === 'lateral_derecha');

    return `
      <!-- BANNER PUBLICITARIO SUPERIOR -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <div class="relative overflow-hidden rounded-xl border border-gold/30 shadow-sm bg-navy group">
          <a href="#/publicidad" class="block">
            <img src="${bannerTop.imagen_url}" alt="${bannerTop.anunciante}" class="w-full h-auto max-h-28 object-cover transition-transform duration-300 group-hover:scale-[1.01]" />
          </a>
          <span class="absolute top-1 right-2 text-[9px] uppercase tracking-wider text-gold-light/70 bg-navy/80 px-2 py-0.5 rounded">Publicidad</span>
        </div>
      </section>

      <!-- PORTADA EDITORIAL: NOTICIA PRINCIPAL & SECUNDARIAS -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- Noticia Principal (8 Columnas) -->
          <div class="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden hover:shadow-md transition-shadow">
            <div class="relative overflow-hidden aspect-[16/9] bg-slate-900 group">
              <img src="${destacada.imagen_destacada}" alt="${destacada.titulo}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/40 to-transparent"></div>
              
              <div class="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                <span class="px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-gold text-navy shadow-sm">
                  ${destacada.categoria_nombre}
                </span>
                <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-navy/80 backdrop-blur-sm text-gold-light border border-gold/30">
                  ★ Portada Itauguá
                </span>
              </div>

              <div class="absolute bottom-6 left-6 right-6 text-white">
                <p class="text-xs font-medium text-gold-light uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span>Itauguá, Central</span>
                  <span>•</span>
                  <span>${destacada.fecha_publicacion}</span>
                </p>
                <h1 class="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white leading-tight mb-3 hover:text-gold-light transition-colors">
                  <a href="#/noticia/${destacada.slug}">${destacada.titulo}</a>
                </h1>
                <p class="text-sm sm:text-base text-slate-200 line-clamp-2 mb-4 font-sans font-light">
                  ${destacada.subtitulo}
                </p>
                <div class="flex items-center justify-between pt-3 border-t border-white/20">
                  <div class="flex items-center gap-3">
                    <img src="${destacada.autor_foto}" alt="${destacada.autor_nombre}" class="w-9 h-9 rounded-full border border-gold" />
                    <div>
                      <span class="text-xs font-bold text-white block">${destacada.autor_nombre}</span>
                      <span class="text-[11px] text-gold-light/90 block">${destacada.autor_titulo}</span>
                    </div>
                  </div>
                  <a href="#/noticia/${destacada.slug}" class="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-gold hover:bg-gold-light text-navy transition-all shadow-sm">
                    Leer noticia completa
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Columna Lateral Editorial & Tarjetas Secundarias (4 Columnas) -->
          <div class="lg:col-span-4 flex flex-col gap-6">
            
            <div class="bg-navy text-white p-5 rounded-2xl shadow-sm border border-gold/20 relative overflow-hidden">
              <div class="absolute -right-12 -bottom-12 w-32 h-32 opacity-10 pointer-events-none">
                <img src="assets/img/nanduti-symbol.svg" alt="ñandutí" class="w-full h-full" />
              </div>
              <div class="flex items-center justify-between mb-4 border-b border-gold/30 pb-3">
                <h2 class="text-sm font-bold tracking-wider text-gold-light uppercase flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-gold animate-ping"></span>
                  Actualidad & Opinión
                </h2>
                <a href="#/noticias" class="text-xs text-slate-300 hover:text-gold transition-colors">Ver todas →</a>
              </div>

              <div class="divide-y divide-slate-800">
                ${secundarias.map(item => `
                  <article class="py-4 first:pt-0 last:pb-0 group">
                    <div class="flex items-center gap-2 text-[11px] font-semibold text-gold-light mb-1">
                      <span class="text-gold uppercase">${item.categoria_nombre}</span>
                      <span>•</span>
                      <span class="text-slate-400">${item.fecha_publicacion.split(' ')[0]}</span>
                    </div>
                    <h3 class="text-base font-serif font-bold text-white group-hover:text-gold-light transition-colors leading-snug mb-2">
                      <a href="#/noticia/${item.slug}">${item.titulo}</a>
                    </h3>
                    <div class="flex items-center gap-2 text-xs text-slate-300">
                      <img src="${item.autor_foto}" alt="${item.autor_nombre}" class="w-5 h-5 rounded-full border border-gold/40" />
                      <span>${item.autor_nombre}</span>
                    </div>
                  </article>
                `).join('')}
              </div>
            </div>

            <!-- Banner Patrocinado Lateral -->
            <div class="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm relative text-center">
              <span class="text-[9px] uppercase tracking-wider text-slate-400 block mb-1">Espacio Comercial</span>
              <a href="#/publicidad" class="block overflow-hidden rounded-xl">
                <img src="${bannerSide.imagen_url}" alt="${bannerSide.anunciante}" class="w-full h-auto object-cover hover:opacity-95 transition-opacity" />
              </a>
            </div>

          </div>

        </div>
      </section>

      <!-- SECCIÓN DEDICADA A LOS AUTORES EDITORIALES -->
      <section class="bg-gradient-to-b from-slate-50 to-white py-12 border-y border-slate-200/70">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div class="text-center max-w-2xl mx-auto mb-10">
            <span class="text-xs font-bold uppercase tracking-widest text-gold block mb-2">Columnistas & Análisis</span>
            <h2 class="text-2xl sm:text-3xl font-serif font-bold text-navy">Voces Principales de Nuestra Ciudad</h2>
            <div class="w-16 h-1 bg-gold mx-auto mt-3 rounded-full"></div>
            <p class="text-sm text-slate-600 mt-3 font-sans">
              Miradas profundas sobre la comunidad, el periodismo ciudadano y el futuro tecnológico de Itauguá.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <!-- EL ESPACIO DE ELENA GONZÁLEZ -->
            <div class="bg-white rounded-2xl p-7 shadow-sm border-2 border-slate-100 hover:border-gold/50 transition-all flex flex-col justify-between relative group">
              <div class="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -z-0 opacity-80"></div>
              
              <div class="relative z-10">
                <div class="flex items-center gap-4 mb-5">
                  <div class="relative">
                    <img src="${autorElena.foto_url}" alt="${autorElena.nombre}" class="w-20 h-20 rounded-full border-2 border-gold shadow-md object-cover" />
                    <span class="absolute bottom-0 right-0 w-6 h-6 bg-gold text-navy rounded-full flex items-center justify-center text-xs font-bold shadow">
                      ✍️
                    </span>
                  </div>
                  <div>
                    <span class="text-xs font-bold text-gold uppercase tracking-wider block">Sección Editorial</span>
                    <h3 class="text-xl font-serif font-bold text-navy">${autorElena.espacio_nombre}</h3>
                    <p class="text-xs font-medium text-slate-500">${autorElena.titulo_profesional}</p>
                  </div>
                </div>

                <p class="text-sm text-slate-600 mb-5 leading-relaxed italic bg-slate-50 p-4 rounded-xl border-l-4 border-gold">
                  "${autorElena.biografia}"
                </p>

                <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Último artículo publicado</h4>
                <div class="bg-white p-4 rounded-xl border border-slate-200 hover:border-navy transition-colors">
                  <span class="text-[11px] font-semibold text-gold block mb-1">Comunidad & Sociedad</span>
                  <a href="#/noticia/${articulosElena[0].slug}" class="text-base font-serif font-bold text-navy hover:text-gold block mb-2 leading-snug">
                    ${articulosElena[0].titulo}
                  </a>
                  <p class="text-xs text-slate-500 line-clamp-2">${articulosElena[0].subtitulo}</p>
                </div>
              </div>

              <div class="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between relative z-10">
                <span class="text-xs text-slate-500">${autorElena.articulos_publicados} columnas en archivo</span>
                <a href="#/autor/${autorElena.slug}" class="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-gold transition-colors">
                  Ver archivo de Elena González →
                </a>
              </div>
            </div>

            <!-- EL ESPACIO DE RODRIGO COLMAN -->
            <div class="bg-white rounded-2xl p-7 shadow-sm border-2 border-slate-100 hover:border-gold/50 transition-all flex flex-col justify-between relative group">
              <div class="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -z-0 opacity-80"></div>
              
              <div class="relative z-10">
                <div class="flex items-center gap-4 mb-5">
                  <div class="relative">
                    <img src="${autorRodrigo.foto_url}" alt="${autorRodrigo.nombre}" class="w-20 h-20 rounded-full border-2 border-gold shadow-md object-cover" />
                    <span class="absolute bottom-0 right-0 w-6 h-6 bg-navy text-gold-light rounded-full flex items-center justify-center text-xs font-bold shadow">
                      ⚙️
                    </span>
                  </div>
                  <div>
                    <span class="text-xs font-bold text-gold uppercase tracking-wider block">Sección Especializada</span>
                    <h3 class="text-xl font-serif font-bold text-navy">${autorRodrigo.espacio_nombre}</h3>
                    <p class="text-xs font-medium text-slate-500">${autorRodrigo.titulo_profesional}</p>
                  </div>
                </div>

                <p class="text-sm text-slate-600 mb-5 leading-relaxed italic bg-slate-50 p-4 rounded-xl border-l-4 border-navy">
                  "${autorRodrigo.biografia}"
                </p>

                <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Último análisis técnico</h4>
                <div class="bg-white p-4 rounded-xl border border-slate-200 hover:border-navy transition-colors">
                  <span class="text-[11px] font-semibold text-navy block mb-1">Innovación & Desarrollo</span>
                  <a href="#/noticia/${articulosRodrigo[0].slug}" class="text-base font-serif font-bold text-navy hover:text-gold block mb-2 leading-snug">
                    ${articulosRodrigo[0].titulo}
                  </a>
                  <p class="text-xs text-slate-500 line-clamp-2">${articulosRodrigo[0].subtitulo}</p>
                </div>
              </div>

              <div class="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between relative z-10">
                <span class="text-xs text-slate-500">${autorRodrigo.articulos_publicados} artículos en archivo</span>
                <a href="#/autor/${autorRodrigo.slug}" class="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-gold transition-colors">
                  Ver archivo de Rodrigo Colman →
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      <!-- RADIOS DE ITAUGUÁ EN VIVO -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="bg-navy rounded-3xl p-8 lg:p-10 text-white shadow-xl border border-gold/30 relative overflow-hidden">
          
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-gold/20 pb-6">
            <div>
              <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-light mb-1">
                <span class="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                Transmisión Comunitaria
              </div>
              <h2 class="text-2xl sm:text-3xl font-serif font-bold text-white">Radios en Vivo de Itauguá</h2>
              <p class="text-sm text-slate-300 mt-1">Escuchá la señal en directo sin interrupciones mientras navegás por el portal.</p>
            </div>
            <a href="#/radios" class="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-lg bg-white/10 hover:bg-gold hover:text-navy transition-colors self-start md:self-auto">
              Ver directorio de radios →
            </a>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${radios.map(radio => `
              <div class="bg-deep rounded-2xl p-6 border border-slate-700/80 hover:border-gold/60 transition-all flex flex-col justify-between">
                <div>
                  <div class="flex items-start justify-between gap-4 mb-4">
                    <div class="flex items-center gap-3">
                      <img src="${radio.logo_url}" alt="${radio.nombre}" class="w-14 h-14 rounded-xl border border-gold/40 shadow bg-navy p-1" />
                      <div>
                        <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-gold/20 text-gold-light border border-gold/30">${radio.frecuencia}</span>
                        <h3 class="text-lg font-bold text-white mt-1">${radio.nombre}</h3>
                      </div>
                    </div>
                    <span class="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Online
                    </span>
                  </div>
                  <p class="text-xs text-slate-300 mb-4 line-clamp-2">${radio.descripcion}</p>
                </div>

                <div class="pt-4 border-t border-slate-700/50 flex items-center justify-between">
                  <span class="text-[11px] text-slate-400">~${radio.oyentes_estimados} oyentes conectados</span>
                  <button 
                    onclick="window.TH_PLAYER.playRadio(window.TH_STORE.getRadios().find(r => r.id === ${radio.id}))" 
                    data-radio-id="${radio.id}"
                    class="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-navy hover:bg-gold hover:text-navy text-white border border-gold/40 transition-all shadow-sm"
                  >
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    <span class="btn-radio-text">Escuchar en vivo</span>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>

        </div>
      </section>

      <!-- CULTURA E IDENTIDAD: EL ARTE DEL ÑANDUTÍ -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="bg-gradient-to-r from-amber-50/70 via-white to-amber-50/40 rounded-3xl p-8 sm:p-12 border-2 border-gold/30 shadow-sm relative overflow-hidden">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div class="lg:col-span-7">
              <span class="text-xs font-bold uppercase tracking-widest text-gold block mb-2">Patrimonio Vivo de Itauguá</span>
              <h2 class="text-2xl sm:text-3xl font-serif font-bold text-navy mb-4">
                El Ñandutí: La trama que une nuestra memoria
              </h2>
              <p class="text-sm text-slate-700 leading-relaxed mb-4">
                En cada bastidor itaugüeño, las maestras tejedoras entrelazan finos hilos de seda o algodón recreando figuras ancestrales que identifican a nuestra ciudad ante el Paraguay y el mundo.
              </p>
              <p class="text-sm text-slate-700 leading-relaxed mb-6">
                Tejiendo Historias rinde tributo a nuestras artesanas y difunde las técnicas, dechados y testimonios de quienes custodian este símbolo inmaterial de la nación.
              </p>
              
              <div class="flex flex-wrap items-center gap-4">
                <a href="#/cultura" class="px-5 py-2.5 rounded-xl bg-navy hover:bg-navy-dark text-white text-xs font-bold transition-all shadow">
                  Conocer más sobre el Ñandutí
                </a>
                <a href="#/noticia/${culturaItem.slug}" class="px-5 py-2.5 rounded-xl bg-white hover:bg-amber-100/60 text-navy text-xs font-bold border border-gold/50 transition-all">
                  Leer leyenda de Samimbi
                </a>
              </div>
            </div>

            <div class="lg:col-span-5 text-center">
              <div class="relative inline-block p-4 bg-white rounded-2xl shadow-md border border-gold/40">
                <img src="${culturaItem.imagen_destacada}" alt="Ñandutí Cultura" class="w-full max-w-sm rounded-xl object-cover" />
                <span class="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-navy text-gold-light px-4 py-1 rounded-full text-[11px] font-bold border border-gold shadow-md whitespace-nowrap">
                  Capital del Ñandutí · Itauguá
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- DIRECTORIO DE NEGOCIOS DESTACADOS & AGENDA DE EVENTOS -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <!-- Negocios de Itauguá (7 Columnas) -->
          <div class="lg:col-span-7">
            <div class="flex items-center justify-between mb-6 border-b border-slate-200 pb-3">
              <div>
                <span class="text-xs font-bold text-gold uppercase tracking-wider block">Comercio Local</span>
                <h2 class="text-xl sm:text-2xl font-serif font-bold text-navy">Directorio de Negocios</h2>
              </div>
              <a href="#/negocios" class="text-xs font-bold text-navy hover:text-gold transition-colors">
                Ver todos (${negocios.length}) →
              </a>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              ${negocios.map(negocio => `
                <div class="bg-white rounded-2xl p-5 border border-slate-200 hover:border-gold/60 shadow-sm hover:shadow transition-all flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between mb-3">
                      <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                        ${negocio.categoria}
                      </span>
                      ${negocio.es_destacado ? `
                        <span class="text-[10px] font-bold text-gold flex items-center gap-1">
                          ★ Destacado
                        </span>
                      ` : ''}
                    </div>
                    <h3 class="text-base font-bold text-navy mb-1 leading-snug">${negocio.nombre_comercial}</h3>
                    <p class="text-xs text-slate-500 mb-3">${negocio.direccion}</p>
                    <p class="text-xs text-slate-600 line-clamp-2 mb-4">${negocio.descripcion}</p>
                  </div>

                  <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span class="text-[11px] text-slate-500">${negocio.horarios}</span>
                    <a 
                      href="https://wa.me/${negocio.whatsapp.replace(/[^0-9]/g, '')}" 
                      target="_blank" 
                      class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                    >
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Próximos Eventos de Itauguá (5 Columnas) -->
          <div class="lg:col-span-5">
            <div class="flex items-center justify-between mb-6 border-b border-slate-200 pb-3">
              <div>
                <span class="text-xs font-bold text-gold uppercase tracking-wider block">Agenda Ciudadana</span>
                <h2 class="text-xl sm:text-2xl font-serif font-bold text-navy">Próximos Eventos</h2>
              </div>
              <a href="#/eventos" class="text-xs font-bold text-navy hover:text-gold transition-colors">
                Ver calendario →
              </a>
            </div>

            <div class="flex flex-col gap-4">
              ${eventos.map(evento => `
                <div class="bg-white rounded-2xl p-5 border border-slate-200 hover:border-navy transition-all shadow-sm flex items-start gap-4">
                  <div class="bg-navy text-gold-light text-center px-3 py-2.5 rounded-xl border border-gold/40 shrink-0">
                    <span class="block text-xs uppercase font-medium">Nov</span>
                    <span class="block text-xl font-bold font-serif leading-none mt-0.5">${evento.fecha.split('-')[2]}</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <span class="text-[10px] font-bold text-gold uppercase tracking-wider block mb-0.5">${evento.categoria}</span>
                    <h3 class="text-sm font-bold text-navy leading-snug truncate">${evento.nombre}</h3>
                    <p class="text-xs text-slate-500 mt-1 flex items-center gap-2">
                      <span>📍 ${evento.lugar}</span>
                      <span>•</span>
                      <span>⏰ ${evento.hora}</span>
                    </p>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Call to action para publicar negocio o evento -->
            <div class="mt-6 bg-gradient-to-br from-navy to-deep text-white p-6 rounded-2xl border border-gold/30 text-center relative overflow-hidden">
              <span class="text-xs text-gold-light font-bold uppercase tracking-wider block mb-1">Crecimiento Comercial</span>
              <h3 class="text-lg font-serif font-bold mb-2">¿Tenés un negocio o evento en Itauguá?</h3>
              <p class="text-xs text-slate-300 mb-4">Sumate a nuestra red y aumentá tu visibilidad en toda la ciudad.</p>
              <a href="#/publicidad" class="inline-block px-5 py-2 rounded-xl bg-gold hover:bg-gold-light text-navy font-bold text-xs transition-colors shadow">
                Anunciá con nosotros
              </a>
            </div>

          </div>

        </div>
      </section>
    `;
  }
};

