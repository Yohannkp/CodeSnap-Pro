// CodeSnap Pro - Content Script
// S'exécute sur les pages web pour détecter et capturer le code

// Écouter les messages du popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'capture') {
    captureCodeElement().then(sendResponse);
    return true; // Indique réponse asynchrone
  }
});

async function captureCodeElement() {
  try {
    // Trouver tous les éléments <code> ou <pre> sur la page
    const codeElements = document.querySelectorAll('pre code, pre, code');

    if (codeElements.length === 0) {
      return { success: false, error: 'Aucun code trouvé sur cette page' };
    }

    // Sélectionner le premier élément de code trouvé
    const codeElement = codeElements[0];

    // Utiliser html2canvas si disponible, sinon créer une capture basique
    if (typeof html2canvas !== 'undefined') {
      const canvas = await html2canvas(codeElement, {
        backgroundColor: '#282a36',
        scale: 2,
      });

      return {
        success: true,
        dataUrl: canvas.toDataURL('image/png'),
      };
    } else {
      // Capture basique sans html2canvas
      return {
        success: false,
        error: 'html2canvas non disponible',
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// Optionnel: Ajouter un bouton de capture flottant
function addCaptureButton() {
  const btn = document.createElement('div');
  btn.innerHTML = '📸';
  btn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 50%;
    cursor: pointer;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 999999;
  `;
  btn.title = 'Capturer avec CodeSnap Pro';
  btn.onclick = async () => {
    const result = await captureCodeElement();
    if (result.success) {
      const link = document.createElement('a');
      link.href = result.dataUrl;
      link.download = `codesnap-${Date.now()}.png`;
      link.click();
    }
  };
  document.body.appendChild(btn);
}

// Décommenter pour activer le bouton flottant
// addCaptureButton();