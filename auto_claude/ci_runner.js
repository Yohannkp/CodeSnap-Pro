
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Configuration
const CONFIG = {
  backendUrl: 'http://localhost:8000',
  frontendUrl: 'http://localhost:3000',
  screenshotDir: path.join(__dirname, 'screenshots'),
  reportPath: path.join(__dirname, 'test_report.txt'),
  debugReportPath: path.join(__dirname, 'debug_report.txt'),
  timeout: 30000,
};

// Résultats des tests
const results = {
  timestamp: new Date().toISOString(),
  passed: [],
  failed: [],
  skipped: [],
  duration: 0,
};

// Helpers
async function takeScreenshot(page, name) {
  const screenshotPath = path.join(CONFIG.screenshotDir, `${name}-${Date.now()}.png`);

  // Créer le répertoire si nécessaire
  if (!fs.existsSync(CONFIG.screenshotDir)) {
    fs.mkdirSync(CONFIG.screenshotDir, { recursive: true });
  }

  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`📸 Screenshot: ${screenshotPath}`);
  return screenshotPath;
}

function log(message, type = 'info') {
  const icons = { info: 'ℹ️', success: '✅', error: '❌', warning: '⚠️' };
  console.log(`${icons[type] || 'ℹ️'} ${message}`);
}

async function assert(condition, message, page = null, testName = 'unknown') {
  if (condition) {
    log(message, 'success');
    results.passed.push(message);
    return true;
  } else {
    log(message, 'error');
    results.failed.push(message);

    // Prendre un screenshot en cas d'échec
    if (page) {
      const screenshotPath = await takeScreenshot(page, `FAILED-${testName}`);
      log(`Screenshot d'erreur: ${screenshotPath}`, 'warning');
    }

    return false;
  }
}

function generateReport() {
  let report = `
================================================================================
                    MindMap-Logic - Rapport de Tests E2E
================================================================================

📅 Date: ${results.timestamp}
⏱️  Durée: ${results.duration}ms

--------------------------------------------------------------------------------
                                 RÉSULTATS
--------------------------------------------------------------------------------

✅ PASSÉS (${results.passed.length}):
`;

  results.passed.forEach((test, i) => {
    report += `   ${i + 1}. ${test}\n`;
  });

  if (results.failed.length > 0) {
    report += `

❌ ÉCHOUÉS (${results.failed.length}):
`;

    results.failed.forEach((test, i) => {
      report += `   ${i + 1}. ${test}\n`;
    });
  }

  if (results.skipped.length > 0) {
    report += `

⏭️  SKIPPÉS (${results.skipped.length}):
`;

    results.skipped.forEach((test, i) => {
      report += `   ${i + 1}. ${test}\n`;
    });
  }

  const total = results.passed.length + results.failed.length + results.skipped.length;
  const passRate = total > 0 ? ((results.passed.length / total) * 100).toFixed(1) : 0;

  report += `

--------------------------------------------------------------------------------
                                STATISTIQUES
--------------------------------------------------------------------------------

   Total des tests: ${total}
   Réussis: ${results.passed.length}
   Échoués: ${results.failed.length}
   Skippés: ${results.skipped.length}
   Taux de réussite: ${passRate}%

================================================================================
`;

  return report;
}

// =============================================================================
// TESTS
// =============================================================================

async function testBackendHealth() {
  log('Test: Backend Health Check', 'info');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const startTime = Date.now();

  try {
    // Test de connexion au backend
    const response = await page.goto(`${CONFIG.backendUrl}/health`, {
      waitUntil: 'networkidle',
      timeout: 10000
    });

    await assert(
      response.status() === 200,
      'Backend répond avec HTTP 200',
      page,
      'backend-health'
    );

    const content = await page.textContent('body');
    const data = JSON.parse(content);

    await assert(
      data.ollama_connected === true,
      'Ollama est connecté',
      page,
      'backend-health'
    );

    await assert(
      data.status === 'healthy' || data.status === 'degraded',
      `Status API: ${data.status}`,
      page,
      'backend-health'
    );

  } catch (error) {
    await assert(false, `Erreur: ${error.message}`, page, 'backend-health');
  } finally {
    results.duration += Date.now() - startTime;
    await browser.close();
  }
}

async function testHomepage() {
  log('Test: Homepage Loading', 'info');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 720 });
  const startTime = Date.now();

  try {
    await page.goto(CONFIG.frontendUrl, { waitUntil: 'networkidle', timeout: CONFIG.timeout });

    // Vérifier le titre
    const title = await page.title();
    await assert(
      title.includes('MindMap-Logic'),
      `Titre de la page: "${title}"`,
      page,
      'homepage'
    );

    // Vérifier le header
    const headerVisible = await page.locator('h1:has-text("MindMap-Logic")').isVisible();
    await assert(headerVisible, 'Header MindMap-Logic visible', page, 'homepage');

    // Vérifier la dropzone
    const dropzoneVisible = await page.locator('text=Glissez-déposez').isVisible();
    await assert(dropzoneVisible, 'Zone de drop visible', page, 'homepage');

    // Vérifier les badges de format
    const pdfBadge = await page.locator('text=PDF').isVisible();
    await assert(pdfBadge, 'Badge PDF visible', page, 'homepage');

    // Vérifier les instructions
    const instructions = await page.locator('text=Transformez vos documents').isVisible();
    await assert(instructions, 'Instructions visibles', page, 'homepage');

  } catch (error) {
    await assert(false, `Erreur: ${error.message}`, page, 'homepage');
  } finally {
    results.duration += Date.now() - startTime;
    await browser.close();
  }
}

async function testUploadFlow() {
  log('Test: Upload Flow', 'info');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 720 });
  const startTime = Date.now();

  try {
    await page.goto(CONFIG.frontendUrl, { waitUntil: 'networkidle', timeout: CONFIG.timeout });

    // Cliquer sur la dropzone
    const dropzone = page.locator('.dropzone');
    await dropzone.click();

    // Vérifier qu'un input file est présent
    const fileInput = page.locator('input[type="file"]');
    const inputExists = await fileInput.count() > 0;
    await assert(inputExists, 'Input file accessible après clic', page, 'upload-flow');

    // Vérifier le bouton Nouveau fichier (initialement masqué car pas de mindmap)
    const newFileButton = page.locator('button:has-text("Nouveau fichier")');
    const buttonExists = await newFileButton.count() > 0;
    await assert(buttonExists, 'Bouton Nouveau fichier présent dans le header', page, 'upload-flow');

  } catch (error) {
    await assert(false, `Erreur: ${error.message}`, page, 'upload-flow');
  } finally {
    results.duration += Date.now() - startTime;
    await browser.close();
  }
}

async function testApiConnection() {
  log('Test: API Connection from Frontend', 'info');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 720 });
  const startTime = Date.now();

  try {
    await page.goto(CONFIG.frontendUrl, { waitUntil: 'networkidle', timeout: CONFIG.timeout });

    // Injecter du JavaScript pour tester la connexion API
    const apiTest = await page.evaluate(async (url) => {
      try {
        const response = await fetch(`${url}/health`);
        const data = await response.json();
        return { success: true, data };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }, CONFIG.backendUrl);

    await assert(
      apiTest.success === true,
      `API backend accessible depuis le frontend`,
      page,
      'api-connection'
    );

    if (apiTest.success && apiTest.data) {
      await assert(
        apiTest.data.status !== undefined,
        `Données API complètes (status: ${apiTest.data.status})`,
        page,
        'api-connection'
      );
    }

  } catch (error) {
    await assert(false, `Erreur: ${error.message}`, page, 'api-connection');
  } finally {
    results.duration += Date.now() - startTime;
    await browser.close();
  }
}

async function testMindMapViewer() {
  log('Test: MindMapViewer Component', 'info');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 720 });
  const startTime = Date.now();

  try {
    await page.goto(CONFIG.frontendUrl, { waitUntil: 'networkidle', timeout: CONFIG.timeout });

    // Vérifier que React Flow n'est pas visible (pas de mindmap généré)
    const reactFlow = page.locator('.react-flow');
    const flowExists = await reactFlow.count() > 0;

    if (!flowExists) {
      results.skipped.push('MindMapViewer: Aucune mindmap à afficher (backend non testé avec fichier)');
      log('Skipped: Pas de mindmap générée (upload non effectué)', 'warning');
    } else {
      // Vérifier les controls React Flow
      const controls = page.locator('.react-flow__controls');
      const controlsVisible = await controls.isVisible();
      await assert(controlsVisible, 'Controls React Flow visibles', page, 'mindmap-viewer');

      // Vérifier la minimap
      const minimap = page.locator('.react-flow__minimap');
      const minimapVisible = await minimap.isVisible();
      await assert(minimapVisible, 'Minimap React Flow visible', page, 'mindmap-viewer');
    }

  } catch (error) {
    await assert(false, `Erreur: ${error.message}`, page, 'mindmap-viewer');
  } finally {
    results.duration += Date.now() - startTime;
    await browser.close();
  }
}

// =============================================================================
// MAIN
// =============================================================================

async function main() {
  const args = process.argv.slice(2);
  const testFilter = args[0] || 'all';

  log('═══════════════════════════════════════════════════════════════', 'info');
  log('     MindMap-Logic - CI Runner - Automated Testing', 'info');
  log('═══════════════════════════════════════════════════════════════', 'info');
  log(`🎯 Mode: ${testFilter}`, 'info');
  log(`🌐 Frontend: ${CONFIG.frontendUrl}`, 'info');
  log(`🔧 Backend: ${CONFIG.backendUrl}`, 'info');
  log('', 'info');

  // Créer le répertoire screenshots
  if (!fs.existsSync(CONFIG.screenshotDir)) {
    fs.mkdirSync(CONFIG.screenshotDir, { recursive: true });
  }

  const startTime = Date.now();

  // Exécuter les tests selon le filtre
  const tests = {
    health: testBackendHealth,
    homepage: testHomepage,
    upload: testUploadFlow,
    api: testApiConnection,
    mindmap: testMindMapViewer,
  };

  if (testFilter === 'all') {
    // Exécuter tous les tests
    for (const [name, testFn] of Object.entries(tests)) {
      log(`\n▶ Exécution du test: ${name}`, 'info');
      await testFn();
    }
  } else if (tests[testFilter]) {
    await tests[testFilter]();
  } else {
    log(`Test inconnu: ${testFilter}`, 'error');
    log(`Tests disponibles: ${Object.keys(tests).join(', ')}`, 'info');
    process.exit(1);
  }

  results.duration += Date.now() - startTime;

  // Générer le rapport
  const report = generateReport();
  console.log(report);

  // Sauvegarder le rapport
  fs.writeFileSync(CONFIG.reportPath, report);
  log(`📄 Rapport sauvegardé: ${CONFIG.reportPath}`, 'info');

  // En cas d'échec, générer un debug_report
  if (results.failed.length > 0) {
    const debugReport = `
================================================================================
                         DEBUG REPORT - ÉCHECS DÉTECTÉS
================================================================================

Tests échoués:
${results.failed.map((f, i) => `${i + 1}. ${f}`).join('\n')}

Étapes de debugging recommandées:
1. Vérifier que le backend FastAPI est en cours d'exécution
2. Vérifier qu'Ollama est запущен et le modèle disponible
3. Vérifier les logs dans le terminal
4. Consulter les screenshots dans: ${CONFIG.screenshotDir}

================================================================================
`;
    fs.writeFileSync(CONFIG.debugReportPath, debugReport);
    log(`🐛 Debug report: ${CONFIG.debugReportPath}`, 'warning');
  }

  // Sortie avec code d'erreur si des tests ont échoué
  if (results.failed.length > 0) {
    log(`\n❌ ${results.failed.length} test(s) échoué(s)`, 'error');
    process.exit(1);
  } else {
    log(`\n✅ Tous les tests réussis! (${results.passed.length}/${results.passed.length})`, 'success');
    process.exit(0);
  }
}

main().catch((error) => {
  console.error('Erreur fatale:', error);
  process.exit(1);
});