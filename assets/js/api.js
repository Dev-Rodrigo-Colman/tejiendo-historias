/**
 * TEJIENDO HISTORIAS - Cliente de Integración API RESTful
 * Conecta la interfaz del frontend dinámicamente con la base de datos a través de la API en PHP.
 */

window.TH_API = {
  baseUrl: 'api',

  async request(endpoint, options = {}) {
    const token = localStorage.getItem('th_token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...(options.headers || {})
    };

    try {
      const res = await fetch(`${this.baseUrl}/${endpoint.replace(/^\//, '')}`, {
        ...options,
        headers
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ mensaje: 'Error en la petición' }));
        throw new Error(errorData.mensaje || `Error HTTP ${res.status}`);
      }

      return await res.json();
    } catch (err) {
      console.warn(`[TH_API] Fallback o error en ${endpoint}:`, err.message);
      return null;
    }
  },

  // --- MÉTODOS DE CONSULTA Y PERSISTENCIA ---

  async syncStoreWithDatabase() {
    // Si estamos corriendo bajo un servidor HTTP, sincronizar datos frescos desde la Base de Datos
    if (window.location.protocol.startsWith('http')) {
      const [noticiasRes, autoresRes, radiosRes, negociosRes, eventosRes, publicidadRes] = await Promise.all([
        this.request('noticias'),
        this.request('autores'),
        this.request('radios'),
        this.request('negocios'),
        this.request('eventos?proximos=1'),
        this.request('publicidad')
      ]);

      if (noticiasRes && noticiasRes.data) window.TH_STORE.data.noticias = noticiasRes.data;
      if (autoresRes && autoresRes.data) window.TH_STORE.data.autores = autoresRes.data;
      if (radiosRes && radiosRes.data) window.TH_STORE.data.radios = radiosRes.data;
      if (negociosRes && negociosRes.data) window.TH_STORE.data.negocios = negociosRes.data;
      if (eventosRes && eventosRes.data) window.TH_STORE.data.eventos = eventosRes.data;
      if (publicidadRes && publicidadRes.data) window.TH_STORE.data.anuncios = publicidadRes.data;

      console.log('[TH_API] Datos sincronizados satisfactoriamente desde la Base de Datos.');
    }
  },

  async login(email, password) {
    return await this.request('auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },

  async getDashboardStats() {
    return await this.request('dashboard/stats');
  },

  async testRadioStream(url) {
    return await this.request('radios/test-stream', {
      method: 'POST',
      body: JSON.stringify({ stream_url: url })
    });
  },

  async createNoticia(data) {
    return await this.request('noticias', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  async createNegocio(data) {
    return await this.request('negocios', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  async createRadio(data) {
    return await this.request('radios', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
};
