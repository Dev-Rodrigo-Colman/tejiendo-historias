/**
 * TEJIENDO HISTORIAS - Vista Detalle de Noticia
 * Diseño editorial completo para lectura con botones de compartir y bloque de autor.
 */

window.TH_VIEWS = window.TH_VIEWS || {};

window.TH_VIEWS.detalleNoticia = {
  render(slug) {
    const store = window.TH_STORE;
    const noticia = store.getNoticiaPorSlug(slug) || store.data.noticias[0];
    const autor = store.getAutor(noticia.autor_id);
    const relacionadas = store.data.noticias.filter(n => n.id !== noticia.id);

    return `
      <article class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <!-- Breadcrumb -->
        <nav class="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
          <a href="#/" class="hover:text-gold">Inicio</a>
          <span>/</span>
          <a href="#/noticias" class="hover:text-gold">Noticias</a>
          <span>/</span>
          <span class="text-gold uppercase tracking-wider font-bold">${noticia.categoria_nombre}</span>
        </nav>

        <!-- Cabecera Editorial -->
        <header class="mb-8">
          <div class="flex items-center gap-3 mb-4">
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-navy text-gold-light border border-gold/40">
              ${noticia.categoria_nombre}
            </span>
            <span class="text-xs text-slate-500 flex items-center gap-1.5">
              <span>📅 ${noticia.fecha_publicacion}</span>
              <span>•</span>
              <span>👁️ ${noticia.vistas} lecturas</span>
            </span>
          </div>

          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy leading-tight mb-4">
            ${noticia.titulo}
          </h1>

          <p class="text-lg sm:text-xl text-slate-600 font-sans font-light leading-relaxed mb-6 border-l-4 border-gold pl-4 italic">
            ${noticia.subtitulo}
          </p>

          <!-- Bloque de Firma del Autor -->
          <div class="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-200">
            <div class="flex items-center gap-3">
              <img src="${autor.foto_url}" alt="${autor.nombre}" class="w-12 h-12 rounded-full border-2 border-gold shadow-sm object-cover" />
              <div>
                <span class="text-sm font-bold text-navy block">${autor.nombre}</span>
                <span class="text-xs text-slate-500 block">${autor.titulo_profesional}</span>
              </div>
            </div>

            <!-- Botones de Compartir -->
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Compartir:</span>
              <a 
                href="https://api.whatsapp.com/send?text=${encodeURIComponent(noticia.titulo + ' ' + window.location.href)}" 
                target="_blank" 
                class="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 transition-colors"
              >
                WhatsApp
              </a>
              <button 
                onclick="navigator.clipboard.writeText(window.location.href); alert('Enlace copiado al portapapeles');" 
                class="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
              >
                Copiar link
              </button>
            </div>
          </div>
        </header>

        <!-- Imagen Destacada Principal -->
        <figure class="mb-8 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900">
          <img src="${noticia.imagen_destacada}" alt="${noticia.titulo}" class="w-full h-auto max-h-[500px] object-cover" />
          <figcaption class="p-3 text-xs text-slate-400 bg-slate-900 text-center italic">
            Fotografía editorial ilustrativa de Itauguá, Central · Tejiendo Historias
          </figcaption>
        </figure>

        <!-- Cuerpo del Artículo -->
        <div class="prose max-w-none text-slate-800 text-base sm:text-lg leading-relaxed mb-10 font-sans font-normal">
          ${noticia.cuerpo}
        </div>

        <!-- Etiquetas -->
        <div class="pt-6 border-t border-slate-200 mb-10 flex flex-wrap items-center gap-2">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2">Etiquetas:</span>
          ${noticia.etiquetas.map(tag => `
            <span class="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 hover:bg-gold/20 hover:text-navy transition-colors cursor-pointer">
              #${tag}
            </span>
          `).join('')}
        </div>

        <!-- Tarjeta del Autor Expandida -->
        <div class="bg-gradient-to-r from-slate-50 to-amber-50/50 rounded-2xl p-6 border border-gold/30 shadow-sm mb-12 flex flex-col sm:flex-row items-center gap-6">
          <img src="${autor.foto_url}" alt="${autor.nombre}" class="w-20 h-20 rounded-full border-2 border-gold shadow-md shrink-0 object-cover" />
          <div class="text-center sm:text-left">
            <span class="text-xs font-bold text-gold uppercase tracking-wider block mb-1">Acerca del Autor</span>
            <h3 class="text-lg font-serif font-bold text-navy mb-1">${autor.nombre}</h3>
            <p class="text-xs text-slate-500 font-medium mb-2">${autor.titulo_profesional}</p>
            <p class="text-xs text-slate-600 leading-relaxed mb-3">${autor.biografia}</p>
            <a href="#/autor/${autor.slug}" class="text-xs font-bold text-navy hover:text-gold transition-colors inline-flex items-center gap-1">
              Ver todas las columnas de ${autor.nombre} →
            </a>
          </div>
        </div>

        <!-- Noticias Relacionadas -->
        <section class="border-t border-slate-200 pt-8">
          <h2 class="text-xl font-serif font-bold text-navy mb-6">Noticias y Columnas Relacionadas</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            ${relacionadas.map(rel => `
              <div class="bg-white p-5 rounded-2xl border border-slate-200 hover:border-gold shadow-sm transition-all group">
                <span class="text-[11px] font-bold text-gold uppercase tracking-wider block mb-1">${rel.categoria_nombre}</span>
                <h3 class="text-base font-serif font-bold text-navy group-hover:text-gold transition-colors mb-2 leading-snug">
                  <a href="#/noticia/${rel.slug}">${rel.titulo}</a>
                </h3>
                <p class="text-xs text-slate-500 line-clamp-2 mb-3">${rel.subtitulo}</p>
                <span class="text-xs text-slate-400">${rel.fecha_publicacion.split(' ')[0]}</span>
              </div>
            `).join('')}
          </div>
        </section>

      </article>
    `;
  }
};

