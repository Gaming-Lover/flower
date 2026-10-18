// Animate Intro Title with "I Have" on line 1 and "Something" on line 2
const title = document.querySelector('.landing-title');

if (title) {
  title.innerHTML = `
    <div class="line line--1"></div>
    <div class="line line--2"></div>
  `;
  const line1 = title.querySelector('.line--1');
  const line2 = title.querySelector('.line--2');

  const text1 = 'I HAVE'.split('');
  const text2 = 'SOMETHING'.split('');

  text1.forEach((char) => {
    if (char !== ' ') {
      line1.innerHTML += `<span>${char}</span>`;
    } else {
      line1.innerHTML += `<span class="word-gap"></span>`;
    }
  });

  text2.forEach((char) => {
    if (char !== ' ') {
      line2.innerHTML += `<span>${char}</span>`;
    } else {
      line2.innerHTML += `<span class="word-gap"></span>`;
    }
  });

  const textElements = title.querySelectorAll('span:not(.word-gap)');
  textElements.forEach((element) => {
    const randomDelay = Math.random() * 2.5;
    element.style.animationDelay = `${randomDelay}s`;
  });
}

// Handle audio player
const bgAudio = document.getElementById('bg-audio');
const urlParams = new URLSearchParams(window.location.search);
const customAudio = urlParams.get('audio');
if (customAudio && bgAudio) {
  bgAudio.src = customAudio;
}

// Handle Reveal on Clicking "Open"
const openBtn = document.getElementById('open-btn');
const landingScreen = document.getElementById('landing-screen');
const flowerScreen = document.getElementById('flower-screen');
const flowerTitleText = document.getElementById('flower-title-text');

let isRevealed = false;

function revealGarden() {
  if (isRevealed) return;
  isRevealed = true;

  // Start audio immediately in user gesture
  if (bgAudio) {
    bgAudio.volume = 0.85;
    const playPromise = bgAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }

  // Fade out landing screen
  if (landingScreen) {
    landingScreen.classList.add('fade-out');
  }

  // Fade in flower garden
  if (flowerScreen) {
    flowerScreen.style.opacity = '1';
    flowerScreen.style.pointerEvents = 'auto';
  }

  // Type out "I LOVE U ❤️ BUBU" in the up box
  setTimeout(() => {
    const chars = ['I', ' ', 'L', 'O', 'V', 'E', ' ', 'U', ' ', '<span class="heart-glow">❤️</span>', ' ', 'B', 'U', 'B', 'U'];
    if (!flowerTitleText) return;
    flowerTitleText.innerHTML = '';
    let charIndex = 0;

    function typeChar() {
      if (charIndex < chars.length) {
        flowerTitleText.innerHTML += chars[charIndex];
        charIndex++;
        setTimeout(typeChar, 250);
      }
    }

    typeChar();
  }, 900);

  // Update browser URL cleanly
  if (window.history && window.history.pushState) {
    window.history.pushState({}, '', '/flower.html');
  }
}

if (openBtn) {
  openBtn.addEventListener('click', (e) => {
    e.preventDefault();
    revealGarden();
  });
}

// Support auto-reveal if ?open=1 is passed in URL
if (urlParams.get('open') === '1') {
  setTimeout(revealGarden, 300);
}
