/**
 * Generic YouTube-powered "Now Playing" music player.
 * Reusable across any themed playlist page.
 *
 * Usage:
 *   const player = new MusicPlayer({
 *     songs: [{ title, artist, youtubeId }, ...],
 *     quotes: ["line 1", "line 2", ...],
 *     els: {
 *       title: document.getElementById('song-title'),
 *       artist: document.getElementById('song-artist'),
 *       art: document.getElementById('song-art'),
 *       quote: document.getElementById('quote'),
 *       playPauseBtn: document.getElementById('play-pause'),
 *       prevBtn: document.getElementById('prev'),
 *       nextBtn: document.getElementById('next'),
 *       playerContainer: document.getElementById('yt-player'),
 *     }
 *   });
 */

class MusicPlayer {
  constructor({ songs, quotes, els }) {
    this.songs = songs;
    this.quotes = quotes;
    this.els = els;
    this.currentIndex = 0;
    this.isPlaying = false;
    this.ytPlayer = null;
    this.ytReady = false;

    this._loadYouTubeAPI();
    this._bindControls();
  }

  _loadYouTubeAPI() {
    if (window.YT && window.YT.Player) {
      this._createPlayer();
      return;
    }

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    const prevCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prevCallback === 'function') prevCallback();
      this._createPlayer();
    };
  }

  _createPlayer() {
    this.ytPlayer = new YT.Player(this.els.playerContainer.id, {
      height: '0',
      width: '0',
      videoId: this.songs[this.currentIndex].youtubeId,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        modestbranding: 1,
        rel: 0,
      },
      events: {
        onReady: () => {
          this.ytReady = true;
          this._renderCurrentSong();
        },
        onStateChange: (e) => this._onStateChange(e),
      },
    });
  }

  _onStateChange(e) {
    if (e.data === YT.PlayerState.ENDED) {
      this.next();
    }
    if (e.data === YT.PlayerState.PLAYING) {
      this.isPlaying = true;
      this._updatePlayPauseIcon();
    }
    if (e.data === YT.PlayerState.PAUSED) {
      this.isPlaying = false;
      this._updatePlayPauseIcon();
    }
  }

  _bindControls() {
    this.els.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
    this.els.prevBtn.addEventListener('click', () => this.prev());
    this.els.nextBtn.addEventListener('click', () => this.next());
  }

  _renderCurrentSong() {
    const song = this.songs[this.currentIndex];
    this.els.title.textContent = song.title;
    this.els.artist.textContent = song.artist;
    if (this.els.art) {
      this.els.art.src = `https://img.youtube.com/vi/${song.youtubeId}/hqdefault.jpg`;
    }
    this._rotateQuote();
  }

  _rotateQuote() {
    if (!this.quotes || !this.quotes.length || !this.els.quote) return;
    const quote = this.quotes[this.currentIndex % this.quotes.length];
    this.els.quote.textContent = quote;
    this.els.quote.classList.remove('fade-in');
    // force reflow to restart animation
    void this.els.quote.offsetWidth;
    this.els.quote.classList.add('fade-in');
  }

  _updatePlayPauseIcon() {
    this.els.playPauseBtn.textContent = this.isPlaying ? '⏸' : '▶';
  }

  togglePlayPause() {
    if (!this.ytReady) return;
    if (this.isPlaying) {
      this.ytPlayer.pauseVideo();
    } else {
      this.ytPlayer.playVideo();
    }
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.songs.length) % this.songs.length;
    this._loadSong();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.songs.length;
    this._loadSong();
  }

  _loadSong() {
    const song = this.songs[this.currentIndex];
    this._renderCurrentSong();
    if (!this.ytReady) return;
    const wasPlaying = this.isPlaying;
    this.ytPlayer.loadVideoById(song.youtubeId);
    if (!wasPlaying) {
      // loadVideoById auto-plays; pause immediately if user wasn't playing before
      setTimeout(() => this.ytPlayer.pauseVideo(), 300);
    }
  }
}
