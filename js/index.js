// Animate Intro Title "I Have Something"
const title = document.querySelector('.landing-title');
const text = `I Have Something`.split('');

if (title) {
  title.style.display = 'flex';
  title.style.flexWrap = 'wrap';
  title.style.justifyContent = 'center';
  title.style.gap = '0.5rem';

  for (let index = 0; index < text.length; index++) {
    if (text[index] !== ' ') {
      title.innerHTML += `<span>${text[index]}</span>`;
    } else {
      title.innerHTML += `<span style='width: 1rem'></span>`;
    }
  }

  const textElements = document.querySelectorAll('.landing-title span');
  textElements.forEach((element) => {
    const randomDelay = Math.random() * 3;
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

  // Type out "I LOVE U BUBU"
  setTimeout(() => {
    const titles = ('I LOVE U BUBU').split('');
    if (!flowerTitleText) return;
    flowerTitleText.innerHTML = '';
    let charIndex = 0;

    function typeChar() {
      if (charIndex < titles.length) {
        flowerTitleText.innerHTML += titles[charIndex];
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
