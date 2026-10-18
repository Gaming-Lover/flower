function init() {
  document.body.classList.remove("not-loaded");

  // Start romantic instrumental audio playback
  const bgAudio = document.getElementById('bg-audio');
  if (bgAudio) {
    const urlParams = new URLSearchParams(window.location.search);
    const customAudio = urlParams.get('audio');
    if (customAudio) {
      bgAudio.src = customAudio;
    }

    bgAudio.volume = 0.85;

    const playAudio = () => {
      const p = bgAudio.play();
      if (p !== undefined) {
        p.catch(() => {});
      }
    };

    // Attempt automatic playback
    playAudio();

    // Fallback if browser autoplay blocks unprompted audio until user interacts with document
    const triggerAudio = () => {
      playAudio();
      ['click', 'touchstart', 'pointerdown', 'keydown'].forEach(evt => {
        document.removeEventListener(evt, triggerAudio);
      });
    };

    ['click', 'touchstart', 'pointerdown', 'keydown'].forEach(evt => {
      document.addEventListener(evt, triggerAudio, { once: true });
    });
  }

  // Animate the love message
  setTimeout(() => {
    const chars = ['I', ' ', 'L', 'O', 'V', 'E', ' ', 'U', ' ', '<span class="heart-glow">❤️</span>', ' ', 'B', 'U', 'B', 'U'];
    const titleElement = document.getElementById('title');
    if (!titleElement) return;
    titleElement.innerHTML = '';
    let index = 0;

    function appendTitle() {
      if (index < chars.length) {
        titleElement.innerHTML += chars[index];
        index++;
        setTimeout(appendTitle, 250);
      }
    }

    appendTitle();
  }, 800);
}

// Run as soon as DOM is ready, don't block on heavy media download
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}