function init() {
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

  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");

    const titles = ('I LOVE U BUBU').split('');
    const titleElement = document.getElementById('title');
    if (!titleElement) return;
    let index = 0;

    function appendTitle() {
      if (index < titles.length) {
        titleElement.innerHTML += titles[index];
        index++;
        setTimeout(appendTitle, 300);
      }
    }

    appendTitle();

    clearTimeout(c);
  }, 1000);
}

if (document.readyState === 'complete') {
  init();
} else {
  window.addEventListener('load', init);
}