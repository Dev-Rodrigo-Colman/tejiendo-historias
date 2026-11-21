/**
 * TEJIENDO HISTORIAS - Vista Comercial: Anunciá en Tejiendo Historias
 * Formatos comerciales, espacios publicitarios y solicitud de tarifas.
 */

window.TH_VIEWS = window.TH_VIEWS || {};

window.TH_VIEWS.publicidadInfo = {
  render() {
    const formatos = [
      {
        nombre: "Banner Principal de Cabecera",
        dimension: "1140 x 120 px",
        ubicacion: "Encabezado superior del portal en todas las vistas",
        precio_sugerido: "450.000 Gs. / mes",
        impacto: "Máxima visibilidad editorial directa"
      },
      {
        nombre: "Publicidad Entre Noticias",
        dimension: "900 x 180 px",
        ubicacion: "Sección central de noticias y portada",
        precio_sugerido: "350.000 Gs. / mes",
        impacto: "Alto engagement durante la lectura"
      },
      {
        nombre: "Columna Lateral Patrocinada",
        dimension: "350 x 300 px",
        ubicacion: "Sidebar fija de artículos y notas de opinión",
        precio_sugerido: "300.000 Gs. / mes",
        impacto: "Presencia constante en notas extensas"
      },
      {
        nombre: "Patrocinador del Reproductor de Radios",
        dimension: "400 x 60 px",
        ubicacion: "Barra flotante inferior de streaming continuo",
        precio_sugerido: "400.000 Gs. / mes",
        impacto: "Exposición 100% permanente durante la sintonización"
      },
      {
        nombre: "Negocio Destacado en Directorio",
        dimension: "Tarjeta Premium",
        ubicacion: "Primeros lugares del Directorio Comercial y Portada",
        precio_sugerido: "250.000 Gs. / mes",
        impacto: "Contacto directo por WhatsApp y mapa"
      }
    ];

    return `
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <!-- Hero Comercial -->
        <div class="bg-navy rounded-3xl p-8 sm:p-14 text-white border border-gold/40 shadow-xl mb-12 text-center max-w-4xl mx-auto relative overflow-hidden">
          <span class="text-xs font-bold text-gold-light uppercase tracking-widest block mb-2">Comercio & Sostenibilidad</span>
          <h1 class="text-3xl sm:text-5xl font-serif font-bold text-white mb-4">
            Anunciá en Tejiendo Historias
          </h1>
          <p class="text-base text-slate-300 max-w-2xl mx-auto mb-8 font-sans font-light">
            Conectá tu empresa, comercio o servicio profesional con la comunidad más informada y activa de Itauguá. Diseños profesionales con métricas de impresiones y clics.
          </p>
          <a 
            href="https://wa.me/595981000111?text=Hola,%20deseo%20solicitar%20información%20sobre%20los%20espacios%20publicitarios%20en%20Tejiendo%20Historias" 
            target="_blank" 
            class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold hover:bg-gold-light text-navy text-xs font-bold transition-all shadow-md"
          >
            <span>📱 Solicitar pauta por WhatsApp</span>
          </a>
        </div>

        <!-- Tabla de Espacios y Formatos Disponibles -->
        <div class="mb-12">
          <div class="text-center max-w-xl mx-auto mb-8">
            <h2 class="text-2xl font-serif font-bold text-navy">Formatos y Espacios Publicitarios</h2>
            <p class="text-xs text-slate-500 mt-1">Elegí la posición estratégica que mejor se adapte a tu presupuesto y objetivos.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${formatos.map(f => `
              <div class="bg-white rounded-3xl p-6 border-2 border-slate-200 hover:border-gold transition-all shadow-sm flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between gap-2 mb-2">
                    <span class="text-[11px] font-bold text-gold uppercase tracking-wider">${f.dimension}</span>
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-900">Activo</span>
                  </div>
                  <h3 class="text-base font-bold text-navy mb-2">${f.nombre}</h3>
                  <p class="text-xs text-slate-500 mb-4">${f.ubicacion}</p>
                  
                  <div class="bg-slate-50 p-3 rounded-xl text-xs text-slate-600 mb-4">
                    <span class="text-slate-400 block text-[10px] uppercase font-bold">Rendimiento:</span>
                    <span class="font-semibold text-navy">${f.impacto}</span>
                  </div>
                </div>

                <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span class="text-[10px] text-slate-400 block">Tarifa base sugerida:</span>
                    <span class="text-sm font-bold text-navy font-serif">${f.precio_sugerido}</span>
                  </div>
                  <a 
                    href="https://wa.me/595981000111?text=Consulta%20por%20formato:%20${encodeURIComponent(f.nombre)}" 
                    target="_blank" 
                    class="px-3.5 py-2 rounded-xl bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold transition-all"
                  >
                    Contratar
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Métrica y Transparencia -->
        <div class="bg-slate-50 rounded-3xl p-8 border border-slate-200 text-center max-w-2xl mx-auto">
          <h3 class="text-lg font-serif font-bold text-navy mb-2">Métricas y Reportes Transparentes</h3>
          <p class="text-xs text-slate-600 leading-relaxed">
            Cada anuncio incorpora un sistema de seguimiento de impresiones y clics en tiempo real, garantizando un retorno tangible de tu inversión publicitaria en la ciudad de Itauguá.
          </p>
        </div>

      </section>
    `;
  }
};

