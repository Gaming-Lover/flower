
function init() {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");

    const titles = ('I LOVE U').split('');
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