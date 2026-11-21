/**
 * TEJIENDO HISTORIAS - Vista Agenda de Eventos de Itauguá
 * Próximos eventos, actividades comunitarias y archivo de actividades pasadas.
 */

window.TH_VIEWS = window.TH_VIEWS || {};

window.TH_VIEWS.eventos = {
  render() {
    const store = window.TH_STORE;
    const eventos = store.getEventos(true);

    return `
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <!-- Encabezado de la Agenda -->
        <div class="border-b border-slate-200 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span class="text-xs font-bold text-gold uppercase tracking-wider block mb-1">Agenda Comunitaria & Cultural</span>
            <h1 class="text-3xl font-serif font-bold text-navy">Eventos en Itauguá</h1>
            <p class="text-sm text-slate-500 mt-1">Festivales, ferias, actividades municipales, talleres y encuentros sociales de la ciudad.</p>
          </div>
          
          <div class="flex items-center gap-2">
            <button class="px-4 py-2 rounded-xl bg-navy text-white text-xs font-bold shadow-sm">
              Próximos eventos
            </button>
            <button onclick="alert('Mostrando archivo histórico de eventos anteriores.');" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold">
              Eventos anteriores
            </button>
          </div>
        </div>

        <!-- Grilla de Eventos -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          ${eventos.map(evento => `
            <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div class="relative aspect-[16/9] bg-slate-900 overflow-hidden">
                  <img src="${evento.imagen_url}" alt="${evento.nombre}" class="w-full h-full object-cover" />
                  <div class="absolute top-4 left-4 bg-navy/90 backdrop-blur-md text-gold-light border border-gold/40 px-3 py-1.5 rounded-xl text-center">
                    <span class="block text-[10px] uppercase font-bold tracking-wider">Fecha</span>
                    <span class="block text-sm font-bold">${evento.fecha}</span>
                  </div>
                  <span class="absolute top-4 right-4 bg-gold text-navy font-bold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider">
                    ${evento.categoria}
                  </span>
                </div>

                <div class="p-6">
                  <h2 class="text-xl font-serif font-bold text-navy mb-3 leading-snug">${evento.nombre}</h2>
                  <p class="text-xs text-slate-600 mb-5 leading-relaxed">${evento.descripcion}</p>

                  <div class="space-y-2 text-xs text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <p class="flex items-center gap-2">
                      <span class="font-bold text-navy">📍 Lugar:</span> <span>${evento.lugar} (${evento.direccion})</span>
                    </p>
                    <p class="flex items-center gap-2">
                      <span class="font-bold text-navy">⏰ Horario:</span> <span>${evento.hora}</span>
                    </p>
                    <p class="flex items-center gap-2">
                      <span class="font-bold text-navy">🏛️ Organiza:</span> <span>${evento.organizador}</span>
                    </p>
                    <p class="flex items-center gap-2">
                      <span class="font-bold text-navy">✉️ Contacto:</span> <span>${evento.contacto}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div class="p-6 pt-0 flex items-center justify-between">
                <button 
                  onclick="navigator.clipboard.writeText(window.location.href); alert('Enlace del evento copiado al portapapeles');" 
                  class="text-xs font-bold text-slate-500 hover:text-navy flex items-center gap-1.5"
                >
                  <span>🔗 Compartir evento</span>
                </button>
                <a 
                  href="mailto:${evento.contacto}?subject=Consulta%20sobre%20evento%20${encodeURIComponent(evento.nombre)}" 
                  class="px-4 py-2 rounded-xl bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold transition-all shadow-sm"
                >
                  Más información
                </a>
              </div>
            </div>
          `).join('')}
        </div>

      </section>
    `;
  }
};

