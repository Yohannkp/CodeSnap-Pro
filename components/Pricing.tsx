'use client'

import { Check, X, Zap } from 'lucide-react'

const plans = [
  {
    name: 'Gratuit',
    price: '0€',
    description: 'Pour tester et utiliser au quotidien',
    features: [
      { text: '5 captures par jour', included: true },
      { text: '3 thèmes de base', included: true },
      { text: 'Export PNG standard', included: true },
      { text: 'Watermark "CodeSnap"', included: true },
      { text: 'Captures illimitées', included: false },
      { text: 'Thèmes premium', included: false },
      { text: 'Sans watermark', included: false },
      { text: 'Support prioritaire', included: false },
    ],
    cta: 'Installer gratuitement',
    popular: false,
  },
  {
    name: 'Pro',
    price: '8.77€',
    description: 'Une seule fois, durée de vie illimitée',
    priceNote: 'Paiement unique • Licence permanente',
    features: [
      { text: 'Captures illimitées', included: true },
      { text: '10+ thèmes premium', included: true },
      { text: 'Export PNG haute résolution', included: true },
      { text: 'Sans watermark', included: true },
      { text: 'Nouveaux thèmes inclus', included: true },
      { text: 'Support prioritaire', included: true },
      { text: 'Accès anticipé aux nouvelles fonctionnalités', included: true },
      { text: 'Licence pour 3 appareils', included: true },
    ],
    cta: 'Obtenir CodeSnap Pro',
    popular: true,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Simple et <span className="gradient-text">abordable</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-foreground/60 px-4">
            Commencez gratuitement, passez à Pro quand vous êtes prêt
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-b from-primary/20 to-secondary border-2 border-primary'
                  : 'bg-secondary/50 border border-foreground/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-sm font-semibold rounded-full flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  Plus populaire
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-bold gradient-text">{plan.price}</span>
                </div>
                {plan.priceNote && (
                  <p className="text-sm text-foreground/50 mt-1">{plan.priceNote}</p>
                )}
                <p className="text-foreground/60 mt-2">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
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

              <a
                href="https://yendiyo.gumroad.com/l/codesnap-pro"
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full py-4 rounded-xl font-semibold text-center transition-all duration-300 ${
                  plan.popular
                    ? 'bg-primary hover:bg-primary/80 text-white glow-effect'
                    : 'bg-white/10 hover:bg-white/20 text-foreground'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-4 sm:gap-6 text-foreground/50 text-xs sm:text-sm px-4">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-success" />
            <span>Paiement sécurisé Stripe</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-success" />
            <span>Remboursement sous 30 jours</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-success" />
            <span>Licence à vie</span>
          </div>
        </div>
      </div>
    </section>
  )
}