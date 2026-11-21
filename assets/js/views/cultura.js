/**
 * TEJIENDO HISTORIAS - Vista Cultura e Identidad (Especial Ñandutí de Itauguá)
 * Rescate patrimonial, artesanas tejedoras, tradiciones e historia viva.
 */

window.TH_VIEWS = window.TH_VIEWS || {};

window.TH_VIEWS.cultura = {
  render() {
    const store = window.TH_STORE;
    const culturaItem = store.data.cultura[0];

    return `
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <!-- Hero Cultural del Ñandutí -->
        <div class="bg-navy rounded-3xl p-8 sm:p-14 text-white border border-gold/40 shadow-xl mb-12 relative overflow-hidden">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div class="lg:col-span-8">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold-light text-xs font-bold uppercase tracking-wider mb-4">
                <span>Tradición Artesanal Inmaterial</span>
              </div>
              <h1 class="text-3xl sm:text-5xl font-serif font-bold text-white mb-4 leading-tight">
                Cultura e Identidad de Itauguá
              </h1>
              <p class="text-base sm:text-lg text-slate-200 font-sans font-light leading-relaxed mb-6 max-w-2xl">
                Cuna nacional del Ñandutí, Itauguá atesora en sus manos la paciencia, el arte y el testimonio de generaciones de mujeres y familias que tejieron el símbolo más representativo del Paraguay.
              </p>
              <div class="flex flex-wrap items-center gap-3">
                <a href="#/noticia/${culturaItem.slug}" class="px-5 py-2.5 rounded-xl bg-gold hover:bg-gold-light text-navy text-xs font-bold transition-all shadow-md">
                  Leer leyenda y origen del Ñandutí →
                </a>
              </div>
            </div>

            <div class="lg:col-span-4 text-center">
              <div class="inline-block p-4 rounded-3xl bg-deep/90 border border-gold/40 shadow-2xl">
                <img src="assets/img/nanduti-symbol.svg" alt="Ñandutí tradicional" class="w-48 h-48 mx-auto animate-pulse" />
                <span class="block text-xs font-bold text-gold-light mt-2 font-serif">Símbolo Identitario Itaugüeño</span>
              </div>
            </div>
          </div>

          <div class="absolute -right-20 -bottom-20 w-80 h-80 opacity-5 pointer-events-none">
            <img src="assets/img/nanduti-symbol.svg" alt="" class="w-full h-full" />
          </div>
        </div>

        <!-- Módulos de Preservación Cultural -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          <div class="bg-white rounded-3xl p-7 border border-slate-200 hover:border-gold transition-all shadow-sm">
            <div class="w-12 h-12 rounded-2xl bg-amber-50 border border-gold/30 flex items-center justify-center text-xl mb-4">
              🧵
            </div>
            <h3 class="text-lg font-serif font-bold text-navy mb-2">Maestras Artesanas</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              Homenaje a las tejedoras que transmiten de madres a hijas las técnicas del dechado, el tensado en bastidor y el manejo minucioso de la aguja.
            </p>
          </div>

          <div class="bg-white rounded-3xl p-7 border border-slate-200 hover:border-gold transition-all shadow-sm">
            <div class="w-12 h-12 rounded-2xl bg-amber-50 border border-gold/30 flex items-center justify-center text-xl mb-4">
              🏛️
            </div>
            <h3 class="text-lg font-serif font-bold text-navy mb-2">Patrimonio Histórico</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              El casco antiguo de Itauguá, su templo parroquial, las casonas coloniales y los museos dedicados a preservar las joyas patrimoniales de la ciudad.
            </p>
          </div>

          <div class="bg-white rounded-3xl p-7 border border-slate-200 hover:border-gold transition-all shadow-sm">
            <div class="w-12 h-12 rounded-2xl bg-amber-50 border border-gold/30 flex items-center justify-center text-xl mb-4">
              📖
            </div>
            <h3 class="text-lg font-serif font-bold text-navy mb-2">Historias de la Comunidad</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              Entrevistas a ciudadanos destacados, anécdotas barriales, tradiciones gastronómicas y la memoria viva compartida entre todos.
            </p>
          </div>

        </div>

        <!-- Artículo Destacado sobre el Ñandutí -->
        <div class="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
          <div class="max-w-3xl">
            <span class="text-xs font-bold text-gold uppercase tracking-wider block mb-1">Archivo Cultural de Itauguá</span>
            <h2 class="text-2xl sm:text-3xl font-serif font-bold text-navy mb-3">
              ${culturaItem.titulo}
            </h2>
            <p class="text-sm text-slate-500 italic mb-6">
              ${culturaItem.subtitulo}
            </p>
            <div class="prose text-slate-700 text-sm leading-relaxed mb-6 font-sans">
              ${culturaItem.cuerpo}
            </div>
            <div class="flex items-center justify-between pt-4 border-t border-slate-100">
              <span class="text-xs text-slate-400">Publicado por ${culturaItem.autor} · ${culturaItem.fecha}</span>
              <a href="#/noticia/${culturaItem.slug}" class="text-xs font-bold text-navy hover:text-gold transition-colors">
                Leer artículo completo →
              </a>
            </div>
          </div>
        </div>

      </section>
    `;
  }
};

