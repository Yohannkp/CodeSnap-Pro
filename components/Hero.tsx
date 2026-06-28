'use client'

import { useState } from 'react'
import { Code2, Sparkles, Zap, Check, Mail } from 'lucide-react'

export default function Hero() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)

    // Simulate API call (in production, connect to Mailchimp/ConvertKit/Notion)
    await new Promise(resolve => setTimeout(resolve, 1000))

    setSubmitted(true)
    setLoading(false)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-primary/30 mb-8">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-foreground/80">v1.0 - Extension Chrome disponible</span>
        </div>

        {/* Titre principal */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="gradient-text">Capturez</span> du code
          <br />
          <span className="text-foreground">comme un pro</span>
        </h1>

        {/* Sous-titre */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/70 mb-8 max-w-2xl mx-auto px-4">
          Transformez vos snippets de code en images époustouflantes.
          Parfait pour LinkedIn, Twitter et blogs.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <a
            href="#pricing"
            className="group relative px-8 py-4 bg-primary text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 glow-effect"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Obtenir CodeSnap Pro
            </span>
          </a>
          <a
            href="#preview"
            className="px-8 py-4 border border-foreground/20 text-foreground/80 font-medium rounded-xl hover:bg-foreground/5 transition-all duration-300"
          >
            Voir la démo →
          </a>
        </div>

        {/* Email Capture Form */}
        <div className="max-w-md mx-auto mb-12">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-foreground/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-foreground/40"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-accent hover:bg-accent/80 disabled:opacity-50 text-background font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="animate-pulse">Envoi en cours...</span>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    Me prévenir quand c'est prêt
                  </>
                )}
              </button>
              <p className="text-xs text-foreground/50">
                Gratuit. Sans spam. Réservez votre place pour le lancement.
              </p>
            </form>
          ) : (
            <div className="bg-success/20 border border-success/30 rounded-xl p-6">
              <div className="flex items-center justify-center gap-2 text-success mb-2">
                <Check className="w-6 h-6" />
                <span className="font-bold text-lg">Parfait !</span>
              </div>
              <p className="text-foreground/80">
                Vous serez notifié dès que l'extension sera disponible.
              </p>
            </div>
          )}
        </div>

        {/* Code Preview Mockup */}
        <div className="relative max-w-3xl mx-auto">
          {/* Decorative glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl blur opacity-30" />

          {/* Code block */}
          <div className="relative code-preview text-left border border-foreground/10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <pre className="text-sm md:text-base">
              <code>
                <span className="text-purple-400">const</span>
                <span className="text-blue-400"> CodeSnap</span>
                <span className="text-foreground"> = </span>
                <span className="text-yellow-400">await</span>
                <span className="text-foreground"> </span>
                <span className="text-purple-400">import</span>
                <span className="text-foreground">(</span>
                <span className="text-green-400">'codesnap-pro'</span>
                <span className="text-foreground">)</span>
                <span className="text-foreground">;</span>
                {'\n\n'}
                <span className="text-purple-400">const</span>
                <span className="text-blue-400"> image</span>
                <span className="text-foreground"> = </span>
                <span className="text-blue-400">CodeSnap</span>
                <span className="text-foreground">.</span>
                <span className="text-yellow-400">capture</span>
                <span className="text-foreground">(</span>
                <span className="text-green-400">{`{ theme: 'dracula' }`}</span>
                <span className="text-foreground">);</span>
                {'\n\n'}
                <span className="text-gray-500">// Ready for LinkedIn 🚀</span>
              </code>
            </pre>
          </div>

          {/* Floating badge */}
          <div className="absolute -right-4 -bottom-4 px-4 py-2 bg-accent text-background font-bold rounded-lg shadow-lg">
            <Code2 className="w-4 h-4 inline mr-2" />
            PNG Export
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-12 sm:mt-16 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-primary">10K+</div>
            <div className="text-xs sm:text-sm text-foreground/60">Développeurs</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-accent">50K+</div>
            <div className="text-xs sm:text-sm text-foreground/60">Captures</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-success">4.9★</div>
            <div className="text-xs sm:text-sm text-foreground/60">Note moyenne</div>
          </div>
        </div>
      </div>
    </section>
  )
}