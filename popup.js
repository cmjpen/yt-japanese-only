const DEFAULTS = { enabled: true, opacity: 0.05 };

function $(id){ return document.getElementById(id); }

function load() {
  chrome.storage.sync.get(DEFAULTS, prefs => {
    $('enabled').checked = prefs.enabled;
    $('opacity').value = prefs.opacity;
    $('opacityValue').innerText = prefs.opacity;
  });
}

function save() {
  const prefs = { enabled: $('enabled').checked, opacity: parseFloat($('opacity').value) };
  chrome.storage.sync.set(prefs, () => {
    const status = document.createElement('div');
    status.innerText = 'Saved';
    document.body.appendChild(status);
    setTimeout(() => status.remove(), 1000);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  load();
  $('opacity').addEventListener('input', e => {
    $('opacityValue').innerText = e.target.value;
  });
  $('save').addEventListener('click', save);
});
