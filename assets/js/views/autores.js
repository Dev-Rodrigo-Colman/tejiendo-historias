/**
 * TEJIENDO HISTORIAS - Vista Autores y Columnistas
 * Perfiles profesionales editoriales para Lic. Elena González e Ing. Rodrigo Colman.
 */

window.TH_VIEWS = window.TH_VIEWS || {};

window.TH_VIEWS.autores = {
  render(targetSlug = null) {
    const store = window.TH_STORE;
    const autores = store.data.autores;
    const activeAutor = targetSlug ? (autores.find(a => a.slug === targetSlug) || autores[0]) : autores[0];
    const articulos = store.getArticulosPorAutor(activeAutor.id);

    return `
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <!-- Encabezado de la Sección -->
        <div class="text-center max-w-2xl mx-auto mb-10">
          <span class="text-xs font-bold text-gold uppercase tracking-widest block mb-1">Equipo Editorial de Itauguá</span>
          <h1 class="text-3xl sm:text-4xl font-serif font-bold text-navy">Autores y Columnistas Principales</h1>
          <div class="w-16 h-1 bg-gold mx-auto mt-3 rounded-full"></div>
          <p class="text-sm text-slate-500 mt-3 font-sans">
            Las voces profesionales que investigan, analizan y narran la realidad comunitaria, cultural y tecnológica de nuestra ciudad.
          </p>
        </div>

        <!-- Selector de Autores -->
        <div class="flex justify-center gap-4 mb-10">
          ${autores.map(a => `
            <button 
              onclick="window.location.hash = '#/autor/${a.slug}'" 
              class="flex items-center gap-3 px-5 py-3 rounded-2xl border-2 transition-all ${a.id === activeAutor.id ? 'border-gold bg-navy text-white shadow-md' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'}"
            >
              <img src="${a.foto_url}" alt="${a.nombre}" class="w-10 h-10 rounded-full border border-gold/40 object-cover" />
              <div class="text-left">
                <span class="text-xs font-bold block ${a.id === activeAutor.id ? 'text-gold-light' : 'text-navy'}">${a.nombre}</span>
                <span class="text-[11px] block ${a.id === activeAutor.id ? 'text-slate-300' : 'text-slate-500'}">${a.titulo_profesional}</span>
              </div>
            </button>
          `).join('')}
        </div>

        <!-- Perfil Detallado del Autor Seleccionado -->
        <div class="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm mb-12">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div class="md:col-span-4 text-center md:text-left flex flex-col items-center md:items-start">
              <div class="relative inline-block mb-4">
                <img src="${activeAutor.foto_url}" alt="${activeAutor.nombre}" class="w-36 h-36 rounded-full border-4 border-gold shadow-lg object-cover" />
                <span class="absolute bottom-2 right-2 bg-navy text-gold-light p-2 rounded-full border border-gold text-xs shadow">
                  ★
                </span>
              </div>
              <span class="text-xs font-bold text-gold uppercase tracking-wider block mb-1">Perfil Oficial</span>
              <h2 class="text-2xl font-serif font-bold text-navy mb-1">${activeAutor.nombre}</h2>
              <p class="text-sm text-slate-500 font-medium mb-4">${activeAutor.titulo_profesional}</p>
              
              <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 w-full max-w-xs text-xs text-slate-600 mb-4">
                <span class="font-bold text-navy block mb-1">Espacio Destacado:</span>
                <span class="italic text-gold-dark font-medium font-serif">${activeAutor.espacio_nombre}</span>
              </div>

              <div class="text-xs text-slate-400">
                <span>Total de publicaciones: <strong>${activeAutor.articulos_publicados}</strong></span>
              </div>
            </div>

            <div class="md:col-span-8 border-t md:border-t-0 md:border-l border-slate-200 pt-6 md:pt-0 md:pl-8">
              <h3 class="text-lg font-serif font-bold text-navy mb-3">Biografía Profesional</h3>
              <p class="text-base text-slate-700 leading-relaxed mb-6 font-sans">
                ${activeAutor.biografia}
              </p>

              <div class="p-4 rounded-xl bg-amber-50/60 border border-gold/30">
                <h4 class="text-xs font-bold uppercase tracking-wider text-navy mb-2">Líneas editoriales y temáticas:</h4>
                <ul class="text-xs text-slate-600 space-y-1 list-disc list-inside">
                  <li>Artículos de opinión y análisis crítico sobre Itauguá.</li>
                  <li>Entrevistas a personalidades, artesanos y líderes barriales.</li>
                  <li>Historias ciudadanas y rescate del patrimonio cultural.</li>
                  <li>Tecnología, conectividad y desarrollo local sustentable.</li>
                </ul>
              </div>
            </div>

          </div>
        </div>

        <!-- Archivo de Publicaciones del Autor -->
        <div>
          <div class="flex items-center justify-between mb-6 border-b border-slate-200 pb-3">
            <h3 class="text-xl font-serif font-bold text-navy">
              Publicaciones y Columnas de ${activeAutor.nombre}
            </h3>
            <span class="text-xs text-slate-400">${articulos.length} artículos en este archivo</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${articulos.map(art => `
              <article class="bg-white p-6 rounded-2xl border border-slate-200 hover:border-gold transition-all shadow-sm flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between gap-2 text-xs text-slate-400 mb-2">
                    <span class="text-gold font-bold uppercase tracking-wider">${art.categoria_nombre}</span>
                    <span>${art.fecha_publicacion.split(' ')[0]}</span>
                  </div>
                  <h4 class="text-lg font-serif font-bold text-navy hover:text-gold transition-colors mb-2 leading-snug">
                    <a href="#/noticia/${art.slug}">${art.titulo}</a>
                  </h4>
                  <p class="text-xs text-slate-500 line-clamp-3 mb-4 leading-relaxed">${art.subtitulo}</p>
                </div>
                <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span class="text-xs text-slate-400">Lecturas: ${art.vistas}</span>
                  <a href="#/noticia/${art.slug}" class="text-xs font-bold text-navy hover:text-gold transition-colors">
                    Leer columna completa →
                  </a>
                </div>
              </article>
            `).join('')}
          </div>
        </div>

      </section>
    `;
  }
};

