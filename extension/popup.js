// CodeSnap Pro - Popup Script
document.getElementById('captureBtn').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  try {
    // Envoyer un message au content script pour capturer
    const results = await chrome.tabs.sendMessage(tab.id, { action: 'capture' });

    if (results.success) {
      // Télécharger l'image capturée
      const link = document.createElement('a');
      link.href = results.dataUrl;
      link.download = `codesnap-${Date.now()}.png`;
      link.click();
    } else {
      alert('Erreur: ' + results.error);
    }
  } catch (error) {
    console.error('Erreur:', error);
    alert('Capture non disponible sur cette page');
  }
});