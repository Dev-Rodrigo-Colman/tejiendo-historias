/**
 * TEJIENDO HISTORIAS - Vista Directorio de Radios de Itauguá
 * Emisoras locales con reproductor persistente y sintonización en vivo.
 */

window.TH_VIEWS = window.TH_VIEWS || {};

window.TH_VIEWS.radios = {
  render() {
    const store = window.TH_STORE;
    const radios = store.getRadios();

    return `
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <!-- Cabecera -->
        <div class="bg-navy rounded-3xl p-8 sm:p-12 text-white shadow-md border border-gold/30 mb-10 relative overflow-hidden">
          <div class="relative z-10 max-w-2xl">
            <span class="text-xs font-bold text-gold-light uppercase tracking-widest block mb-2">Transmisión Comunitaria en Vivo</span>
            <h1 class="text-3xl sm:text-4xl font-serif font-bold text-white mb-3">Radios de Itauguá</h1>
            <p class="text-sm text-slate-300 leading-relaxed font-sans mb-6">
              Sintonizá las principales voces de la radiofonía itaugüeña. El reproductor es persistente: podés continuar escuchando tu emisora preferida mientras recorres todas las secciones de Tejiendo Historias.
            </p>
            <div class="flex items-center gap-3 text-xs text-gold-light font-semibold">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Audio en vivo compatible con navegadores móviles y de escritorio.</span>
            </div>
          </div>
          <div class="absolute -right-8 -bottom-8 w-60 h-60 opacity-10 pointer-events-none">
            <img src="assets/img/nanduti-symbol.svg" alt="ñandutí" class="w-full h-full" />
          </div>
        </div>

        <!-- Grilla de Emisoras -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          ${radios.map(radio => `
            <div class="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 hover:border-gold/60 transition-all shadow-sm flex flex-col justify-between">
              <div>
                <div class="flex items-start justify-between gap-4 mb-6">
                  <div class="flex items-center gap-4">
                    <img src="${radio.logo_url}" alt="${radio.nombre}" class="w-16 h-16 rounded-2xl border border-gold/40 shadow-sm p-1.5 bg-slate-50" />
                    <div>
                      <div class="flex items-center gap-2 mb-1">
                        <span class="px-2.5 py-0.5 rounded-md text-xs font-bold bg-navy text-gold-light">
                          ${radio.frecuencia}
                        </span>
                        <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 uppercase">
                          ${radio.tipo}
                        </span>
                      </div>
                      <h2 class="text-xl font-bold text-navy">${radio.nombre}</h2>
                    </div>
                  </div>
                  <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span> Activa
                  </span>
                </div>

                <p class="text-sm text-slate-600 mb-6 leading-relaxed">
                  ${radio.descripcion}
                </p>

                <div class="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-500 space-y-1.5 mb-6">
                  <div class="flex justify-between">
                    <span class="font-medium text-slate-400">Tipo de señal:</span>
                    <span class="font-semibold text-navy">Stream digital Icecast/Shoutcast</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="font-medium text-slate-400">Sitio oficial:</span>
                    <a href="${radio.sitio_web}" target="_blank" class="text-gold font-semibold hover:underline truncate max-w-[200px]">${radio.sitio_web}</a>
                  </div>
                </div>
              </div>

              <div class="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                <span class="text-xs text-slate-400">~${radio.oyentes_estimados} oyentes estimados</span>
                <button 
                  onclick="window.TH_PLAYER.playRadio(window.TH_STORE.getRadios().find(r => r.id === ${radio.id}))" 
                  data-radio-id="${radio.id}"
                  class="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl bg-navy hover:bg-gold hover:text-navy text-white transition-all shadow-sm"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  <span class="btn-radio-text">Escuchar en vivo</span>
                </button>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Módulo Informativo para Emisoras que deseen sumarse -->
        <div class="bg-gradient-to-r from-amber-50 to-orange-50/50 p-8 rounded-3xl border border-gold/40 text-center max-w-3xl mx-auto">
          <h3 class="text-lg font-serif font-bold text-navy mb-2">¿Gestionás una radio o streaming en Itauguá?</h3>
          <p class="text-xs text-slate-600 mb-4 max-w-xl mx-auto">
            Podés registrar tu emisora comunitaria o comercial directamente a través del panel administrativo sin modificar código, integrando el enlace de streaming oficial.
          </p>
          <a href="#/contacto" class="inline-block px-5 py-2 rounded-xl bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold transition-all shadow-sm">
            Contactar al equipo de Tejiendo Historias
          </a>
        </div>

      </section>
    `;
  }
};

