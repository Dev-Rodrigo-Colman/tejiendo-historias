/**
 * TEJIENDO HISTORIAS - Enrutador SPA del Cliente
 * Permite la navegación fluida entre páginas sin recargar la ventana para mantener la radio activa.
 */

window.TH_ROUTER = {
  routes: {
    '': 'home',
    'home': 'home',
    'noticias': 'noticias',
    'autores': 'autores',
    'radios': 'radios',
    'negocios': 'negocios',
    'eventos': 'eventos',
    'cultura': 'cultura',
    'publicidad': 'publicidadInfo'
  },

  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    // Primera carga
    this.handleRoute();
  },

  handleRoute() {
    const rawHash = window.location.hash.slice(1).replace(/^\//, '');
    const [path, param] = rawHash.split('/');
    const cleanPath = path || 'home';

    const container = document.getElementById('app-content');
    if (!container) return;

    // Actualizar enlaces de navegación activos en el menú
    document.querySelectorAll('[data-nav]').forEach(link => {
      const target = link.getAttribute('data-nav');
      if (target === cleanPath || (target === 'home' && cleanPath === '')) {
        link.classList.add('text-gold', 'font-bold', 'border-b-2', 'border-gold');
        link.classList.remove('text-slate-200');
      } else {
        link.classList.remove('text-gold', 'font-bold', 'border-b-2', 'border-gold');
        link.classList.add('text-slate-200');
      }
    });

    // Rutas dinámicas
    if (cleanPath === 'noticia' && param) {
      container.innerHTML = window.TH_VIEWS.detalleNoticia.render(param);
      document.title = "Noticia · Tejiendo Historias - Itauguá";
    } else if (cleanPath === 'autor' && param) {
      container.innerHTML = window.TH_VIEWS.autores.render(param);
      document.title = "Perfil de Autor · Tejiendo Historias";
    } else if (cleanPath === 'contacto') {
      window.location.hash = '#/publicidad';
    } else {
      const viewKey = this.routes[cleanPath] || 'home';
      const view = window.TH_VIEWS[viewKey];
      if (view && typeof view.render === 'function') {
        container.innerHTML = view.render();
      } else {
        container.innerHTML = window.TH_VIEWS.home.render();
      }

      const titles = {
        'home': 'Tejiendo Historias - Portal Digital de Itauguá, Paraguay',
        'noticias': 'Noticias y Actualidad · Tejiendo Historias',
        'autores': 'Autores y Columnistas · Tejiendo Historias',
        'radios': 'Radios en Vivo de Itauguá · Tejiendo Historias',
        'negocios': 'Directorio de Negocios · Tejiendo Historias',
        'eventos': 'Agenda de Eventos de Itauguá · Tejiendo Historias',
        'cultura': 'Cultura y Ñandutí · Tejiendo Historias',
        'publicidadInfo': 'Anunciá con Nosotros · Tejiendo Historias'
      };
      document.title = titles[viewKey] || 'Tejiendo Historias - Portal Digital de Itauguá';
    }

    // Scroll suave a la parte superior al cambiar de vista
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Actualizar estado del reproductor en la nueva vista cargada
    if (window.TH_PLAYER && typeof window.TH_PLAYER.updateUI === 'function') {
      window.TH_PLAYER.updateUI();
    }
  }
};

