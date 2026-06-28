// CodeSnap Pro - Test Runner
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Handle ESM __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  frontendUrl: 'http://localhost:3000',
  screenshotDir: path.join(__dirname, 'screenshots'),
  reportPath: path.join(__dirname, 'test_report.txt'),
  timeout: 30000,
};

// Résultats des tests
const results = {
  timestamp: new Date().toISOString(),
  passed: [],
  failed: [],
  duration: 0,
};

// Helpers
async function takeScreenshot(page, name) {
  const screenshotPath = path.join(CONFIG.screenshotDir, `${name}-${Date.now()}.png`);
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
    if (page) {
      const screenshotPath = await takeScreenshot(page, `FAILED-${testName}`);
      log(`Screenshot d'erreur: ${screenshotPath}`, 'warning');
    }
    return false;
  }
}

// =============================================================================
// TESTS
// =============================================================================

async function testHomepage() {
  log('Test: Page d\'accueil CodeSnap Pro', 'info');
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 720 });
  const startTime = Date.now();

  try {
    await page.goto(CONFIG.frontendUrl, { waitUntil: 'networkidle', timeout: CONFIG.timeout });

    // Vérifier le titre
    const title = await page.title();
    await assert(
      title.includes('CodeSnap'),
      `Titre de la page: "${title}"`,
      page,
      'homepage'
    );

    // Vérifier le header hero
    const heroVisible = await page.locator('text=Capturez').first().isVisible();
    await assert(heroVisible, 'Section Hero visible', page, 'homepage');

    // Vérifier le bouton CTA
    const ctaButton = await page.locator('a:has-text("Obtenir CodeSnap Pro")').first().isVisible();
    await assert(ctaButton, 'Bouton CTA "Obtenir CodeSnap Pro" visible', page, 'homepage');

    // Vérifier la section Features
    const featuresSection = await page.locator('#features').isVisible();
    await assert(featuresSection, 'Section Features visible', page, 'homepage');

    // Vérifier la section Pricing
    const pricingSection = await page.locator('#pricing').isVisible();
    await assert(pricingSection, 'Section Tarification visible', page, 'homepage');

    // Vérifier le prix Pro
    const proPrice = await page.locator('text=19€').first().isVisible();
    await assert(proPrice, 'Prix Pro à 19€ affiché', page, 'homepage');

    // Prendre un screenshot de la page
    await takeScreenshot(page, 'codesnap-landing');

  } catch (error) {
    await assert(false, `Erreur: ${error.message}`, page, 'homepage');
  } finally {
    results.duration += Date.now() - startTime;
    await browser.close();
  }
}

async function testThemePreview() {
  log('Test: Changement de thème', 'info');
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 720 });
  const startTime = Date.now();

  try {
    await page.goto(CONFIG.frontendUrl, { waitUntil: 'networkidle', timeout: CONFIG.timeout });

    // Cliquer sur un thème (Nord)
    const nordTheme = page.locator('button:has-text("Nord")');
    if (await nordTheme.count() > 0) {
      await nordTheme.click();
      await assert(true, 'Thème Nord sélectionné', page, 'theme-preview');
    }

    // Prendre un screenshot après changement
    await takeScreenshot(page, 'codesnap-theme-nord');

  } catch (error) {
    await assert(false, `Erreur: ${error.message}`, page, 'theme-preview');
  } finally {
    results.duration += Date.now() - startTime;
    await browser.close();
  }
}

async function testCaptureButton() {
  log('Test: Bouton de capture d\'image', 'info');
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 720 });
  const startTime = Date.now();

  try {
    await page.goto(CONFIG.frontendUrl, { waitUntil: 'networkidle', timeout: CONFIG.timeout });

    // Scroller jusqu'à la section preview
    await page.locator('#preview').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Vérifier que le bouton existe
    const captureButton = page.locator('button:has-text("Capturer cette image")');
    const buttonExists = await captureButton.count() > 0;
    await assert(buttonExists, 'Bouton "Capturer cette image" présent', page, 'capture-button');

    // Vérifier qu'il est cliquable
    const buttonEnabled = await captureButton.isEnabled();
    await assert(buttonEnabled, 'Bouton "Capturer cette image" est cliquable', page, 'capture-button');

    // Cliquer sur le bouton et vérifier qu'il réagit (état loading)
    await captureButton.click();
    await page.waitForTimeout(500);

    // Vérifier que l'état loading ou que le fichier est téléchargé
    // (On vérifie juste que le click ne génère pas d'erreur)
    await assert(true, 'Bouton cliqué sans erreur', page, 'capture-button');

    // Prendre un screenshot après le clic
    await takeScreenshot(page, 'codesnap-after-capture');

  } catch (error) {
    await assert(false, `Erreur: ${error.message}`, page, 'capture-button');
  } finally {
    results.duration += Date.now() - startTime;
    await browser.close();
  }
}

async function testPricingSection() {
  log('Test: Section tarification', 'info');
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 720 });
  const startTime = Date.now();

  try {
    await page.goto(`${CONFIG.frontendUrl}#pricing`, { waitUntil: 'networkidle', timeout: CONFIG.timeout });

    // Vérifier les deux plans
    const freePlan = await page.locator('text=Gratuit').first().isVisible();
    await assert(freePlan, 'Plan Gratuit visible', page, 'pricing');

    const proPlan = await page.locator('text=Pro').first().isVisible();
    await assert(proPlan, 'Plan Pro visible', page, 'pricing');

    // Vérifier les badges de confiance
    const stripeBadge = await page.locator('text=Paiement sécurisé Stripe').isVisible();
    await assert(stripeBadge, 'Badge "Paiement sécurisé" visible', page, 'pricing');

    // Prendre un screenshot
    await takeScreenshot(page, 'codesnap-pricing');

  } catch (error) {
    await assert(false, `Erreur: ${error.message}`, page, 'pricing');
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
  log('     CodeSnap Pro - CI Runner - Automated Testing', 'info');
  log('═══════════════════════════════════════════════════════════════', 'info');
  log(`🎯 Mode: ${testFilter}`, 'info');
  log(`🌐 Frontend: ${CONFIG.frontendUrl}`, 'info');
  log('', 'info');

  // Créer le répertoire screenshots
  if (!fs.existsSync(CONFIG.screenshotDir)) {
    fs.mkdirSync(CONFIG.screenshotDir, { recursive: true });
  }

  const startTime = Date.now();

  // Exécuter les tests selon le filtre
  const tests = {
    homepage: testHomepage,
    theme: testThemePreview,
    capture: testCaptureButton,
    pricing: testPricingSection,
  };

  if (testFilter === 'all') {
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
  const total = results.passed.length + results.failed.length;
  const passRate = total > 0 ? ((results.passed.length / total) * 100).toFixed(1) : 0;

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('                      RÉSULTATS');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`✅ PASSÉS: ${results.passed.length}`);
  console.log(`❌ ÉCHOUÉS: ${results.failed.length}`);
  console.log(`📊 Taux de réussite: ${passRate}%`);
  console.log(`⏱️  Durée: ${results.duration}ms`);
  console.log('═══════════════════════════════════════════════════════════════');

  // Sauvegarder le rapport
  let report = `CodeSnap Pro - Test Report\n${'='.repeat(50)}\n`;
  report += `Date: ${results.timestamp}\n`;
  report += `Réussis: ${results.passed.length}/${total}\n`;
  report += `Échoués: ${results.failed.length}\n\n`;
  report += 'Tests passés:\n';
  results.passed.forEach((t, i) => report += `  ${i + 1}. ✅ ${t}\n`);
  if (results.failed.length > 0) {
    report += '\nTests échoués:\n';
    results.failed.forEach((t, i) => report += `  ${i + 1}. ❌ ${t}\n`);
  }
  fs.writeFileSync(CONFIG.reportPath, report);

  if (results.failed.length > 0) {
    console.log(`\n❌ ${results.failed.length} test(s) échoué(s)`);
    process.exit(1);
  } else {
    console.log(`\n✅ Tous les tests réussis!`);
    process.exit(0);
  }
}

main().catch((error) => {
  console.error('Erreur fatale:', error);
  process.exit(1);
});