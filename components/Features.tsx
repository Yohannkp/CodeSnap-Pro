'use client'

import { Palette, Download, Zap, Shield, Layers, Share2 } from 'lucide-react'

const features = [
  {
    icon: Palette,
    title: '10+ Thèmes',
    description: 'Dracula, Nord, Monokai, GitHub Dark, One Dark... Trouvez le style qui vous correspond.',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
  },
  {
    icon: Download,
    title: 'Export HD',
    description: 'Exportez vos captures en PNG haute résolution, parfait pour le print et le web.',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
  },
  {
    icon: Zap,
    title: 'Ultra Rapide',
    description: 'Capturez et partagez en moins de 2 secondes. Pas besoin de logiciel externe.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
  },
  {
    icon: Shield,
    title: 'Sans Watermark',
    description: 'Version Pro sans watermark. Vos captures sont 100% professionnelles.',
    color: 'text-green-400',
    bg: 'bg-green-400/10',
  },
  {
    icon: Layers,
    title: 'Personnalisable',
    description: 'Taille de police, padding, coins arrondis, ombres... Tout est configurable.',
    color: 'text-pink-400',
    bg: 'bg-pink-400/10',
  },
  {
    icon: Share2,
    title: 'Partage Instant',
    description: 'Copiez directement dans le presse-papiers ou partagez sur LinkedIn/Twitter.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Tout ce dont vous avez <span className="gradient-text">besoin</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto px-4">
            Une expérience de capture de code pensée pour les développeurs modernes
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-secondary/50 border border-foreground/5 hover:border-primary/30 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-foreground/60">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}