'use client'

import { useState } from 'react'
import { Download, Check, Code, X, Mail } from 'lucide-react'

const freeFeatures = [
  { text: '5 captures par jour', included: true },
  { text: '3 thèmes de base', included: true },
  { text: 'Export PNG standard', included: true },
  { text: 'Watermark "CodeSnap"', included: true },
  { text: 'Captures illimitées', included: false },
  { text: 'Thèmes premium', included: false },
  { text: 'Sans watermark', included: false },
  { text: 'Support prioritaire', included: false },
]

export default function FreeDownload() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setSubmitted(true)
    setDownloading(true)

    // Simulate a small delay for email capture
    await new Promise(resolve => setTimeout(resolve, 500))

    // Trigger download
    const link = document.createElement('a')
    link.href = '/extension-free.zip'
    link.download = 'CodeSnap-Pro.zip'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setDownloading(false)
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 mb-4">
            <Code className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Commencez gratuitement
          </h1>
          <p className="text-foreground/60">
            Téléchargez CodeSnap Pro et capturez du code magnifique
          </p>
        </div>

        {/* Free version card */}
        <div className="bg-secondary/50 rounded-2xl p-6 sm:p-8 border border-foreground/10 mb-8">
          {/* Features */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Inclus dans la version gratuite :</h2>
            <ul className="space-y-3">
              {freeFeatures.map((feature, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-3 ${
                    feature.included ? 'text-foreground' : 'text-foreground/40'
                  }`}
                >
                  {feature.included ? (
                    <Check className="w-5 h-5 text-success flex-shrink-0" />
                  ) : (
                    <X className="w-5 h-5 text-foreground/30 flex-shrink-0" />
                  )}
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Upgrade CTA */}
          <div className="bg-primary/10 rounded-xl p-4 mb-6">
            <p className="text-sm text-foreground/80">
              <span className="font-semibold">Want more?</span> Passez à Pro pour{' '}
              <span className="font-bold text-primary">8.77€</span> et débloquez :
            </p>
            <ul className="text-sm text-foreground/60 mt-2 space-y-1">
              <li>• Captures illimitées</li>
              <li>• 10+ thèmes premium</li>
              <li>• Sans watermark</li>
              <li>• Support prioritaire</li>
            </ul>
            <a
              href="https://yendiyo.gumroad.com/l/codesnap-pro"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-sm font-semibold text-primary hover:underline"
            >
              Voir CodeSnap Pro →
            </a>
          </div>

          {/* Download form */}
          {!submitted ? (
            <form onSubmit={handleDownload} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Entrez votre email pour télécharger
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-background border border-foreground/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
                <p className="text-xs text-foreground/50 mt-2">
                  Nous vous enverrons aussi des tips pour utiliser CodeSnap
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl font-semibold bg-primary hover:bg-primary/90 text-white transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Télécharger gratuitement
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/20 mb-4">
                <Check className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {downloading ? 'Téléchargement en cours...' : 'Prêt à installer!'}
              </h3>
              <p className="text-foreground/60">
                {downloading
                  ? 'Votre fichier devrait se télécharger automatiquement'
                  : 'Si le téléchargement n\'a pas commencé,'}
              </p>
              {!downloading && (
                <a
                  href="/extension-free.zip"
                  download="CodeSnap-Pro.zip"
                  className="inline-block mt-4 text-primary font-semibold hover:underline"
                >
                  Cliquez ici pour télécharger
                </a>
              )}
            </div>
          )}
        </div>

        {/* Installation instructions */}
        <div className="bg-background rounded-2xl p-6 border border-foreground/10">
          <h2 className="text-lg font-semibold mb-4">Comment installer :</h2>
          <ol className="space-y-4 text-foreground/80">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary font-bold text-sm flex items-center justify-center">1</span>
              <span>Extrayez le fichier ZIP téléchargé</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary font-bold text-sm flex items-center justify-center">2</span>
              <span>Ouvrez Chrome et allez dans <code className="bg-secondary px-2 py-1 rounded text-sm">chrome://extensions/</code></span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary font-bold text-sm flex items-center justify-center">3</span>
              <span>Activez le "Mode développeur" (en haut à droite)</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary font-bold text-sm flex items-center justify-center">4</span>
              <span>Cliquez sur "Charger l'extension non empaquetée"</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary font-bold text-sm flex items-center justify-center">5</span>
              <span>Sélectionnez le dossier extrait</span>
            </li>
          </ol>
        </div>

        {/* Footer */}
        <p className="text-center text-foreground/50 text-sm mt-8">
          Une question ? <a href="mailto:yendiyohann@gmail.com" className="text-primary hover:underline">Contactez-nous</a>
        </p>
      </div>
    </section>
  )
}