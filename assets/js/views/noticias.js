/**
 * TEJIENDO HISTORIAS - Vista Noticias
 * Catálogo editorial con filtros por categoría y buscador integrado.
 */

window.TH_VIEWS = window.TH_VIEWS || {};

window.TH_VIEWS.noticias = {
  render() {
    const store = window.TH_STORE;
    const noticias = store.data.noticias;
    const categorias = [
      "Todas", "Actualidad", "Municipalidad", "Sociedad", "Educación", 
      "Seguridad", "Deportes", "Cultura", "Economía", "Comunidad", "Tecnología"
    ];

    return `
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <!-- Encabezado de Sección -->
        <div class="border-b border-slate-200 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span class="text-xs font-bold text-gold uppercase tracking-wider block mb-1">Información de Itauguá</span>
            <h1 class="text-3xl font-serif font-bold text-navy">Noticias y Actualidad</h1>
            <p class="text-sm text-slate-500 mt-1">El pulso diario de nuestra ciudad, cubierto por periodistas y columnistas locales.</p>
          </div>
          
          <!-- Buscador -->
          <div class="relative w-full md:w-72">
            <input 
              type="text" 
              id="search-input" 
              placeholder="Buscar noticias..." 
              class="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-gold bg-white shadow-sm"
              onkeyup="window.TH_VIEWS.noticias.filterBySearch(this.value)"
            />
            <svg class="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>
        </div>

        <!-- Filtros por Categoría -->
        <div class="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs scrollbar-none">
          ${categorias.map((cat, idx) => `
            <button 
              onclick="window.TH_VIEWS.noticias.filterByCategory('${cat}', this)"
              class="px-3.5 py-1.5 rounded-full font-semibold whitespace-nowrap transition-colors ${idx === 0 ? 'bg-navy text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}"
            >
              ${cat}
            </button>
          `).join('')}
        </div>

        <!-- Grilla de Noticias -->
        <div id="noticias-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${noticias.map(noticia => `
            <article class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div class="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img src="${noticia.imagen_destacada}" alt="${noticia.titulo}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span class="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-bold rounded-md bg-navy text-gold-light border border-gold/30">
                    ${noticia.categoria_nombre}
                  </span>
                </div>
                <div class="p-5">
                  <div class="flex items-center gap-2 text-xs text-slate-400 mb-2">
                    <span>${noticia.fecha_publicacion.split(' ')[0]}</span>
                    <span>•</span>
                    <span>${noticia.vistas} lecturas</span>
                  </div>
                  <h2 class="text-lg font-serif font-bold text-navy group-hover:text-gold transition-colors leading-snug mb-2">
                    <a href="#/noticia/${noticia.slug}">${noticia.titulo}</a>
                  </h2>
                  <p class="text-xs text-slate-500 line-clamp-3 mb-4 leading-relaxed">${noticia.subtitulo}</p>
                </div>
              </div>

              <div class="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div class="flex items-center gap-2.5">
                  <img src="${noticia.autor_foto}" alt="${noticia.autor_nombre}" class="w-7 h-7 rounded-full border border-gold" />
                  <span class="text-xs font-semibold text-slate-700">${noticia.autor_nombre}</span>
                </div>
                <a href="#/noticia/${noticia.slug}" class="text-xs font-bold text-gold hover:text-navy transition-colors">
                  Leer →
                </a>
              </div>
            </article>
          `).join('')}
        </div>

      </section>
    `;
  },

  filterByCategory(categoria, btn) {
    document.querySelectorAll('#app-content button').forEach(b => {
      b.classList.remove('bg-navy', 'text-white', 'shadow-sm');
      b.classList.add('bg-slate-100', 'text-slate-700');
    });
    btn.classList.add('bg-navy', 'text-white', 'shadow-sm');
    btn.classList.remove('bg-slate-100', 'text-slate-700');

    const noticias = window.TH_STORE.data.noticias;
    const filtradas = categoria === 'Todas' ? noticias : noticias.filter(n => n.categoria_nombre.toLowerCase() === categoria.toLowerCase());
    this.renderGrid(filtradas);
  },

  filterBySearch(query) {
    const noticias = window.TH_STORE.data.noticias;
    const filtradas = noticias.filter(n => 
      n.titulo.toLowerCase().includes(query.toLowerCase()) || 
      n.subtitulo.toLowerCase().includes(query.toLowerCase())
    );
    this.renderGrid(filtradas);
  },

  renderGrid(items) {
    const grid = document.getElementById('noticias-grid');
    if (!grid) return;
    if (items.length === 0) {
      grid.innerHTML = `
        <div class="col-span-3 text-center py-12 text-slate-400">
          <p class="text-base font-semibold">No se encontraron noticias coincidentes con los criterios de búsqueda.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map(noticia => `
      <article class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
        <div>
          <div class="relative aspect-[16/10] overflow-hidden bg-slate-900">
            <img src="${noticia.imagen_destacada}" alt="${noticia.titulo}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <span class="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-bold rounded-md bg-navy text-gold-light border border-gold/30">
              ${noticia.categoria_nombre}
            </span>
          </div>
          <div class="p-5">
            <div class="flex items-center gap-2 text-xs text-slate-400 mb-2">
              <span>${noticia.fecha_publicacion.split(' ')[0]}</span>
              <span>•</span>
              <span>${noticia.vistas} lecturas</span>
            </div>
            <h2 class="text-lg font-serif font-bold text-navy group-hover:text-gold transition-colors leading-snug mb-2">
              <a href="#/noticia/${noticia.slug}">${noticia.titulo}</a>
            </h2>
            <p class="text-xs text-slate-500 line-clamp-3 mb-4 leading-relaxed">${noticia.subtitulo}</p>
          </div>
        </div>

        <div class="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <img src="${noticia.autor_foto}" alt="${noticia.autor_nombre}" class="w-7 h-7 rounded-full border border-gold" />
            <span class="text-xs font-semibold text-slate-700">${noticia.autor_nombre}</span>
          </div>
          <a href="#/noticia/${noticia.slug}" class="text-xs font-bold text-gold hover:text-navy transition-colors">
            Leer →
          </a>
        </div>
      </article>
    `).join('');
  }
};

