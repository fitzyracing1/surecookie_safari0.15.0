// Popup UI logic for SureCookie extension

// Safari compatibility: use browser or chrome API
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

// Load and display current settings
document.addEventListener('DOMContentLoaded', () => {
  browserAPI.storage.sync.get(['enabled', 'autoAcceptCookies', 'totalCookiesAccepted'], (items) => {
    document.getElementById('enableExtension').checked = items.enabled !== false;
    document.getElementById('autoAccept').checked = items.autoAcceptCookies !== false;
    document.getElementById('counter').textContent = items.totalCookiesAccepted || 0;
  });

  // Save settings when changed
  document.getElementById('enableExtension').addEventListener('change', (e) => {
    browserAPI.storage.sync.set({ enabled: e.target.checked });
  });

  document.getElementById('autoAccept').addEventListener('change', (e) => {
    browserAPI.storage.sync.set({ autoAcceptCookies: e.target.checked });
  });

  // Reset counter
  document.getElementById('resetCounter').addEventListener('click', () => {
    browserAPI.storage.sync.set({ totalCookiesAccepted: 0 });
    document.getElementById('counter').textContent = '0';
  });
});
