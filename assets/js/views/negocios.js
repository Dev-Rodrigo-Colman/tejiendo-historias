/**
 * TEJIENDO HISTORIAS - Vista Directorio de Negocios de Itauguá
 * Guía comercial local con filtros por rubro y botón directo a WhatsApp.
 */

window.TH_VIEWS = window.TH_VIEWS || {};

window.TH_VIEWS.negocios = {
  render() {
    const store = window.TH_STORE;
    const negocios = store.getNegocios();
    const categorias = [
      "Todos los rubros", "Gastronomía", "Supermercados", "Tecnología", "Salud", 
      "Belleza", "Moda", "Servicios profesionales", "Construcción", "Transporte", "Emprendimientos"
    ];

    return `
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <!-- Encabezado de la Guía Comercial -->
        <div class="border-b border-slate-200 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span class="text-xs font-bold text-gold uppercase tracking-wider block mb-1">Comercio & Emprendimiento Local</span>
            <h1 class="text-3xl font-serif font-bold text-navy">Directorio de Negocios de Itauguá</h1>
            <p class="text-sm text-slate-500 mt-1">Conectá directamente con comercios, talleres artesanales, gastronomía y servicios de la ciudad.</p>
          </div>
          
          <div class="flex items-center gap-3">
            <a href="#/publicidad" class="px-4 py-2 rounded-xl bg-gold hover:bg-gold-light text-navy text-xs font-bold transition-all shadow-sm">
              + Registrar mi negocio
            </a>
          </div>
        </div>

        <!-- Filtros por Categoría -->
        <div class="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs scrollbar-none">
          ${categorias.map((cat, idx) => `
            <button 
              onclick="window.TH_VIEWS.negocios.filterByCategory('${cat}', this)"
              class="px-3.5 py-1.5 rounded-full font-semibold whitespace-nowrap transition-colors ${idx === 0 ? 'bg-navy text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}"
            >
              ${cat}
            </button>
          `).join('')}
        </div>

        <!-- Grilla de Negocios -->
        <div id="negocios-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${negocios.map(negocio => `
            <div class="bg-white rounded-3xl border border-slate-200 hover:border-gold/60 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div class="flex items-start justify-between gap-4 mb-4">
                  <div class="flex items-center gap-3">
                    <img src="${negocio.logo_url}" alt="${negocio.nombre_comercial}" class="w-12 h-12 rounded-xl border border-gold/30 p-1 bg-slate-50 object-contain" />
                    <div>
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 uppercase">
                        ${negocio.categoria}
                      </span>
                      <h2 class="text-base font-bold text-navy mt-1 group-hover:text-gold transition-colors leading-snug">${negocio.nombre_comercial}</h2>
                    </div>
                  </div>
                  ${negocio.es_destacado ? `
                    <span class="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full shrink-0">
                      ★ Destacado
                    </span>
                  ` : ''}
                </div>

                <p class="text-xs text-slate-600 mb-4 leading-relaxed line-clamp-3">
                  ${negocio.descripcion}
                </p>

                <div class="space-y-1.5 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl mb-4">
                  <p class="flex items-center gap-2">
                    <span class="text-slate-400">📍</span> <span class="truncate">${negocio.direccion}</span>
                  </p>
                  <p class="flex items-center gap-2">
                    <span class="text-slate-400">🕒</span> <span>${negocio.horarios}</span>
                  </p>
                  <p class="flex items-center gap-2">
                    <span class="text-slate-400">📞</span> <span>${negocio.telefono}</span>
                  </p>
                </div>
              </div>

              <div class="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <span class="text-[11px] text-slate-400 font-medium">Itauguá</span>
                <a 
                  href="https://wa.me/${negocio.whatsapp.replace(/[^0-9]/g, '')}?text=Hola!%20Los%20vi%20en%20el%20portal%20Tejiendo%20Historias" 
                  target="_blank" 
                  class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm"
                >
                  <span>Escribir por WhatsApp</span>
                </a>
              </div>
            </div>
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

    const negocios = window.TH_STORE.data.negocios;
    const filtrados = categoria === 'Todos los rubros' ? negocios : negocios.filter(n => n.categoria.toLowerCase() === categoria.toLowerCase());
    
    const grid = document.getElementById('negocios-grid');
    if (!grid) return;
    if (filtrados.length === 0) {
      grid.innerHTML = `
        <div class="col-span-3 text-center py-12 text-slate-400">
          <p class="text-base font-semibold">No hay negocios registrados aún en este rubro.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtrados.map(negocio => `
      <div class="bg-white rounded-3xl border border-slate-200 hover:border-gold/60 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
        <div>
          <div class="flex items-start justify-between gap-4 mb-4">
            <div class="flex items-center gap-3">
              <img src="${negocio.logo_url}" alt="${negocio.nombre_comercial}" class="w-12 h-12 rounded-xl border border-gold/30 p-1 bg-slate-50 object-contain" />
              <div>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 uppercase">
                  ${negocio.categoria}
                </span>
                <h2 class="text-base font-bold text-navy mt-1 group-hover:text-gold transition-colors leading-snug">${negocio.nombre_comercial}</h2>
              </div>
            </div>
            ${negocio.es_destacado ? `
              <span class="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full shrink-0">
                ★ Destacado
              </span>
            ` : ''}
          </div>

          <p class="text-xs text-slate-600 mb-4 leading-relaxed line-clamp-3">
            ${negocio.descripcion}
          </p>

          <div class="space-y-1.5 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl mb-4">
            <p class="flex items-center gap-2">
              <span class="text-slate-400">📍</span> <span class="truncate">${negocio.direccion}</span>
            </p>
            <p class="flex items-center gap-2">
              <span class="text-slate-400">🕒</span> <span>${negocio.horarios}</span>
            </p>
            <p class="flex items-center gap-2">
              <span class="text-slate-400">📞</span> <span>${negocio.telefono}</span>
            </p>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
          <span class="text-[11px] text-slate-400 font-medium">Itauguá</span>
          <a 
            href="https://wa.me/${negocio.whatsapp.replace(/[^0-9]/g, '')}?text=Hola!%20Los%20vi%20en%20el%20portal%20Tejiendo%20Historias" 
            target="_blank" 
            class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm"
          >
            <span>Escribir por WhatsApp</span>
          </a>
        </div>
      </div>
    `).join('');
  }
};

