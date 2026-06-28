// CodeSnap Pro - Background Script
// Gère les événements en arrière-plan

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('CodeSnap Pro installé!');
    // Initialiser le storage
    chrome.storage.local.set({
      capturesToday: 0,
      lastCaptureDate: new Date().toDateString(),
      premium: false,
    });
  }
});

// Compteur de captures quotidiennes
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'incrementCapture') {
    chrome.storage.local.get(['capturesToday', 'lastCaptureDate', 'premium'], (data) => {
      const today = new Date().toDateString();

      // Reset si nouveau jour
      if (data.lastCaptureDate !== today) {
        chrome.storage.local.set({ capturesToday: 1, lastCaptureDate: today });
      } else if (!data.premium) {
        // Limite gratuite: 5/jour
        const newCount = (data.capturesToday || 0) + 1;
        chrome.storage.local.set({ capturesToday: newCount });
        sendResponse({ count: newCount, limit: 5 });
      }
    });
    return true;
  }
});