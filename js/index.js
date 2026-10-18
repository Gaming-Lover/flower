const title = document.querySelector('.title');
const text = `I Have Something`.split('');

if (title) {
  // Create container for better responsive layout
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

  const textElements = document.querySelectorAll('.title span');
  textElements.forEach((element) => {
    const randomDelay = Math.random() * 3;
    element.style.animationDelay = `${randomDelay}s`;
  });
}

// Handle audio playback on clicking Open button
const openBtn = document.querySelector('.btn');
const bgAudio = document.getElementById('bg-audio');

const urlParams = new URLSearchParams(window.location.search);
const audioParam = urlParams.get('audio');
if (audioParam && bgAudio) {
  bgAudio.src = audioParam;
}

if (openBtn) {
  openBtn.addEventListener('click', (e) => {
    e.preventDefault();
    sessionStorage.setItem('playMusic', 'true');

    if (bgAudio) {
      bgAudio.currentTime = 0;
      const playPromise = bgAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }

    setTimeout(() => {
      const target = audioParam ? `flower.html?audio=${encodeURIComponent(audioParam)}` : 'flower.html';
      window.location.href = target;
    }, 150);
  });
}
