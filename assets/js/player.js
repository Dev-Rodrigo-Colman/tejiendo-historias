/**
 * TEJIENDO HISTORIAS - Reproductor Persistente de Radios en Streaming
 * Implementa una única instancia de audio HTML5, manejo de estados, reconexión y visualización.
 */

window.TH_PLAYER = {
  audio: null,
  currentRadio: null,
  isPlaying: false,
  isLoading: false,
  volume: 0.85,

  init() {
    this.audio = new Audio();
    this.audio.preload = 'none';

    // Recuperar volumen persistido
    const savedVol = localStorage.getItem('th_player_volume');
    if (savedVol !== null) {
      this.volume = parseFloat(savedVol);
      this.audio.volume = this.volume;
    }

    // Configurar escuchadores del elemento audio
    this.audio.addEventListener('playing', () => {
      this.isPlaying = true;
      this.isLoading = false;
      this.updateUI();
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.isLoading = false;
      this.updateUI();
    });

    this.audio.addEventListener('waiting', () => {
      this.isLoading = true;
      this.updateUI();
    });

    this.audio.addEventListener('error', (e) => {
      console.warn('Error en la reproducción del stream:', e);
      this.isPlaying = false;
      this.isLoading = false;
      this.showStreamError();
      this.updateUI();
    });

    // Cargar la primera radio por defecto en estado inactivo para inicializar la barra
    const radios = window.TH_STORE.getRadios();
    if (radios.length > 0) {
      this.currentRadio = radios[0];
      this.updateUI();
    }

    this.bindEvents();
  },

  bindEvents() {
    // Control play/pause principal en la barra inferior
    const playBtn = document.getElementById('player-play-btn');
    if (playBtn) {
      playBtn.addEventListener('click', () => this.togglePlay());
    }

    // Control de volumen
    const volSlider = document.getElementById('player-volume-slider');
    if (volSlider) {
      volSlider.value = this.volume * 100;
      volSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value) / 100;
        this.setVolume(val);
      });
    }

    // Botón mute
    const muteBtn = document.getElementById('player-mute-btn');
    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        if (this.audio.volume > 0) {
          this.audio.volume = 0;
          if (volSlider) volSlider.value = 0;
        } else {
          this.audio.volume = this.volume || 0.8;
          if (volSlider) volSlider.value = (this.volume || 0.8) * 100;
        }
        this.updateUI();
      });
    }

    // Botón para desplegar lista de emisoras desde el reproductor
    const switchBtn = document.getElementById('player-switch-radio-btn');
    if (switchBtn) {
      switchBtn.addEventListener('click', () => {
        const modal = document.getElementById('radios-quick-modal');
        if (modal) modal.classList.toggle('hidden');
      });
    }
  },

  playRadio(radio) {
    if (!radio || !radio.stream_url) return;

    // Si ya está sonando esta emisora, alternar
    if (this.currentRadio && this.currentRadio.id === radio.id && this.isPlaying) {
      this.pause();
      return;
    }

    this.currentRadio = radio;
    this.isLoading = true;
    this.hideStreamError();
    this.updateUI();

    // Actualizar fuente del reproductor único
    this.audio.src = radio.stream_url;
    this.audio.load();

    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlaying = true;
          this.isLoading = false;
          this.updateUI();
        })
        .catch((error) => {
          console.warn("Autoplay o stream bloqueado/no disponible:", error);
          this.isPlaying = false;
          this.isLoading = false;
          this.showStreamError();
          this.updateUI();
        });
    }
  },

  togglePlay() {
    if (!this.currentRadio) {
      const radios = window.TH_STORE.getRadios();
      if (radios.length > 0) this.playRadio(radios[0]);
      return;
    }

    if (this.isPlaying) {
      this.pause();
    } else {
      this.playRadio(this.currentRadio);
    }
  },

  pause() {
    if (this.audio) {
      this.audio.pause();
      this.isPlaying = false;
      this.isLoading = false;
      this.updateUI();
    }
  },

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.audio) {
      this.audio.volume = this.volume;
    }
    localStorage.setItem('th_player_volume', this.volume.toString());
  },

  showStreamError() {
    const errorAlert = document.getElementById('player-error-banner');
    if (errorAlert) {
      errorAlert.classList.remove('hidden');
      setTimeout(() => {
        errorAlert.classList.add('hidden');
      }, 5000);
    }
  },

  hideStreamError() {
    const errorAlert = document.getElementById('player-error-banner');
    if (errorAlert) errorAlert.classList.add('hidden');
  },

  updateUI() {
    const titleEl = document.getElementById('player-radio-name');
    const dialEl = document.getElementById('player-radio-dial');
    const logoEl = document.getElementById('player-radio-logo');
    const playIcon = document.getElementById('player-icon-play');
    const pauseIcon = document.getElementById('player-icon-pause');
    const spinner = document.getElementById('player-icon-loading');
    const eqBars = document.getElementById('player-equalizer');
    const statusBadge = document.getElementById('player-status-badge');

    if (this.currentRadio) {
      if (titleEl) titleEl.textContent = this.currentRadio.nombre;
      if (dialEl) dialEl.textContent = `${this.currentRadio.frecuencia} · Itauguá`;
      if (logoEl) logoEl.src = this.currentRadio.logo_url;
    }

    if (this.isLoading) {
      if (playIcon) playIcon.classList.add('hidden');
      if (pauseIcon) pauseIcon.classList.add('hidden');
      if (spinner) spinner.classList.remove('hidden');
      if (statusBadge) {
        statusBadge.textContent = 'CONECTANDO...';
        statusBadge.className = 'text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30';
      }
      if (eqBars) eqBars.classList.add('opacity-30');
    } else if (this.isPlaying) {
      if (playIcon) playIcon.classList.add('hidden');
      if (pauseIcon) pauseIcon.classList.remove('hidden');
      if (spinner) spinner.classList.add('hidden');
      if (statusBadge) {
        statusBadge.textContent = 'EN VIVO';
        statusBadge.className = 'text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-600 text-white animate-pulse shadow-sm shadow-red-500/50';
      }
      if (eqBars) eqBars.classList.remove('opacity-30');
    } else {
      if (playIcon) playIcon.classList.remove('hidden');
      if (pauseIcon) pauseIcon.classList.add('hidden');
      if (spinner) spinner.classList.add('hidden');
      if (statusBadge) {
        statusBadge.textContent = 'PAUSA';
        statusBadge.className = 'text-xs font-semibold px-2 py-0.5 rounded bg-slate-700 text-slate-300';
      }
      if (eqBars) eqBars.classList.add('opacity-30');
    }

    // Actualizar botones de radios individuales en la vista activa
    document.querySelectorAll('[data-radio-id]').forEach(btn => {
      const id = parseInt(btn.getAttribute('data-radio-id'));
      const textSpan = btn.querySelector('.btn-radio-text');
      const isCurrent = this.currentRadio && this.currentRadio.id === id;
      
      if (isCurrent && this.isPlaying) {
        btn.classList.add('bg-gold', 'text-navy', 'border-gold');
        btn.classList.remove('bg-navy', 'text-white');
        if (textSpan) textSpan.textContent = 'Pausar transmisión';
      } else {
        btn.classList.remove('bg-gold', 'text-navy', 'border-gold');
        btn.classList.add('bg-navy', 'text-white');
        if (textSpan) textSpan.textContent = 'Escuchar en vivo';
      }
    });
  }
};

