function isJapanese(text) {
  if (!text || text.trim().length === 0) return true;
  return /[ぁ-んァ-ン一-龯]/.test(text);
}

function filter() {
  const titles = document.querySelectorAll(
    'h3.yt-lockup-metadata-view-model__heading-reset, #video-title, #video-title-link'
  );

  titles.forEach(el => {
    const titleText = el.getAttribute('title') || 
                      el.innerText || 
                      el.querySelector('a')?.getAttribute('aria-label') || "";

    if (titleText.trim().length > 0) {
      const container = el.closest('ytd-rich-item-renderer, ytd-video-renderer, ytd-rich-grid-media');

      if (container) {
        chrome.storage && chrome.storage.sync
          ? chrome.storage.sync.get({ enabled: true, opacity: 0.05 }, prefs => {
              if (!prefs.enabled) {
                container.style.border = '';
                container.style.opacity = '';
                return;
              }

              if (!isJapanese(titleText)) {
                container.style.setProperty('border', '5px dashed red', 'important');
                container.style.setProperty('opacity', String(prefs.opacity), 'important');
              } else {
                container.style.border = 'none';
                container.style.opacity = '1';
              }
            })
          : (() => {
              if (!isJapanese(titleText)) {
                container.style.setProperty('border', '5px dashed red', 'important');
                container.style.setProperty('opacity', '0.05', 'important');
              } else {
                container.style.border = 'none';
                container.style.opacity = '1';
              }
            })();
      }
    }
  });
}

const observer = new MutationObserver(() => {
  filter();
});

const mainArea = document.querySelector('ytd-app') || document.body;
observer.observe(mainArea, { childList: true, subtree: true });

filter();
setInterval(filter, 2000);

console.log("JP Filter: Lockup Logic Active");
