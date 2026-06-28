'use client'

import { useState, useRef } from 'react'
import { Download, Copy, Check, Loader2, Image, Settings } from 'lucide-react'
import html2canvas from 'html2canvas'

const themes = [
  { id: 'dracula', name: 'Dracula', bg: '#282a36', text: '#f8f8f2', accent: '#bd93f9' },
  { id: 'nord', name: 'Nord', bg: '#2e3440', text: '#eceff4', accent: '#88c0d0' },
  { id: 'monokai', name: 'Monokai', bg: '#272822', text: '#f8f8f2', accent: '#f92672' },
  { id: 'github-dark', name: 'GitHub Dark', bg: '#0d1117', text: '#c9d1d9', accent: '#58a6ff' },
  { id: 'one-dark', name: 'One Dark', bg: '#282c34', text: '#abb2bf', accent: '#61afef' },
  { id: 'night-owl', name: 'Night Owl', bg: '#011627', text: '#d6deeb', accent: '#82aaff' },
]

const windowStyles = [
  { id: 'macos', name: 'macOS', color: '#ff5f57', min: '#febc2e', max: '#28c840' },
  { id: 'windows', name: 'Windows', color: '#0078d4' },
  { id: 'minimal', name: 'Minimal', color: null },
]

const sampleCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calculate the 10th Fibonacci number
const result = fibonacci(10);
console.log(\`Fibonacci(10) = \${result}\`);`

export default function Preview() {
  const [selectedTheme, setSelectedTheme] = useState(themes[0])
  const [selectedWindow, setSelectedWindow] = useState(windowStyles[0])
  const [copied, setCopied] = useState(false)
  const [capturing, setCapturing] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [padding, setPadding] = useState(48)
  const previewRef = useRef<HTMLDivElement>(null)

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCapture = async () => {
    if (!previewRef.current || capturing) return

    setCapturing(true)
    try {
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: selectedTheme.bg,
        scale: 3, // Quality 3x
        useCORS: true,
        logging: false,
        imageTimeout: 0,
        onclone: (clonedDoc) => {
          // Ensure smooth rendering in cloned document
          const clonedElement = clonedDoc.getElementById('capture-target')
          if (clonedElement) {
            clonedElement.style.transform = 'none'
            clonedElement.style.borderRadius = '16px'
          }
        }
      })

      const link = document.createElement('a')
      link.download = `codesnap-${selectedTheme.id}-${Date.now()}.png`
      link.href = canvas.toDataURL('image/png', 1.0)
      link.click()
    } catch (error) {
      console.error('Erreur lors de la capture:', error)
    } finally {
      setCapturing(false)
    }
  }

  const renderWindowControls = () => {
    if (!selectedWindow.color) return null

    if (selectedWindow.id === 'macos') {
      return (
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: selectedWindow.color }} />
          <div className="w-3 h-3 rounded-full" style={{ background: selectedWindow.min }} />
          <div className="w-3 h-3 rounded-full" style={{ background: selectedWindow.max }} />
        </div>
      )
    }

    return (
      <div className="flex items-center gap-1">
        <div className="w-4 h-3 rounded-sm" style={{ background: selectedWindow.color }} />
      </div>
    )
  }

  return (
    <section id="preview" className="py-24 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Essayez <span className="gradient-text">maintenant</span>
          </h2>
          <p className="text-xl text-foreground/60">
            Sélectionnez un thème et visualisez le résultat en temps réel
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Code Editor Preview */}
          <div className="relative">
            {/* Decorative glow */}
            <div
              className="absolute -inset-1 rounded-2xl blur opacity-30"
              style={{ background: `linear-gradient(135deg, ${selectedTheme.accent}40, ${selectedTheme.bg})` }}
            />

            {/* Capture target - this is what gets captured */}
            <div
              id="capture-target"
              ref={previewRef}
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: selectedTheme.bg,
                padding: `${padding}px`,
              }}
            >
              {/* Window frame */}
              <div
                className="rounded-xl overflow-hidden"
                style={{
                  background: `${selectedTheme.bg}f0`,
                  border: `1px solid ${selectedTheme.text}15`,
                }}
              >
                {/* Window header */}
                <div
                  className="flex items-center justify-between px-4 py-3"
                  style={{ borderBottom: `1px solid ${selectedTheme.text}10` }}
                >
                  {renderWindowControls()}
                  <span
                    className="text-xs font-medium opacity-60"
                    style={{ color: selectedTheme.text, fontFamily: 'system-ui' }}
                  >
                    fibonacci.js
                  </span>
                  <div className="w-12" /> {/* Spacer for symmetry */}
                </div>

                {/* Code content */}
                <div
                  className="p-6 overflow-x-auto"
                  style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', monospace" }}
                >
                  <pre
                    className="text-sm leading-relaxed m-0"
                    style={{ color: selectedTheme.text }}
                  >
                    <code>
                      <span style={{ color: '#ff79c6' }}>function</span>
                      <span style={{ color: selectedTheme.text }}> </span>
                      <span style={{ color: '#50fa7b' }}>fibonacci</span>
                      <span style={{ color: selectedTheme.text }}>(</span>
                      <span style={{ color: selectedTheme.accent }}>n</span>
                      <span style={{ color: selectedTheme.text }}>) {'{'}</span>
                      {'\n  '}
                      <span style={{ color: '#ff79c6' }}>if</span>
                      <span style={{ color: selectedTheme.text }}> (</span>
                      <span style={{ color: selectedTheme.accent }}>n</span>
                      <span style={{ color: selectedTheme.text }}> {'<='} </span>
                      <span style={{ color: '#bd93f9' }}>1</span>
                      <span style={{ color: selectedTheme.text }}>) </span>
                      <span style={{ color: '#ff79c6' }}>return</span>
                      <span style={{ color: selectedTheme.text }}> </span>
                      <span style={{ color: selectedTheme.accent }}>n</span>
                      <span style={{ color: selectedTheme.text }}>;</span>
                      {'\n  '}
                      <span style={{ color: '#ff79c6' }}>return</span>
                      <span style={{ color: selectedTheme.text }}> </span>
                      <span style={{ color: selectedTheme.accent }}>fibonacci</span>
                      <span style={{ color: selectedTheme.text }}>(</span>
                      <span style={{ color: selectedTheme.accent }}>n</span>
                      <span style={{ color: selectedTheme.text }}> - </span>
                      <span style={{ color: '#bd93f9' }}>1</span>
                      <span style={{ color: selectedTheme.text }}>) + </span>
                      <span style={{ color: selectedTheme.accent }}>fibonacci</span>
                      <span style={{ color: selectedTheme.text }}>(</span>
                      <span style={{ color: selectedTheme.accent }}>n</span>
                      <span style={{ color: selectedTheme.text }}> - </span>
                      <span style={{ color: '#bd93f9' }}>2</span>
                      <span style={{ color: selectedTheme.text }}>);</span>
                      {'\n'}{'}'}
                      {'\n\n'}
                      <span style={{ color: '#6272a4' }}>// Calculate the 10th Fibonacci number</span>
                      {'\n'}
                      <span style={{ color: '#ff79c6' }}>const</span>
                      <span style={{ color: selectedTheme.text }}> </span>
                      <span style={{ color: selectedTheme.accent }}>result</span>
                      <span style={{ color: selectedTheme.text }}> = </span>
                      <span style={{ color: selectedTheme.accent }}>fibonacci</span>
                      <span style={{ color: selectedTheme.text }}>(</span>
                      <span style={{ color: '#bd93f9' }}>10</span>
                      <span style={{ color: selectedTheme.text }}>);</span>
                      {'\n'}
                      <span style={{ color: selectedTheme.accent }}>console</span>
                      <span style={{ color: selectedTheme.text }}>.</span>
                      <span style={{ color: selectedTheme.accent }}>log</span>
                      <span style={{ color: selectedTheme.text }}>(</span>
                      <span style={{ color: '#f1fa8c' }}>`Fibonacci(10) = ${'${'}</span>
                      <span style={{ color: selectedTheme.accent }}>result</span>
                      <span style={{ color: '#f1fa8c' }}>{'}'}`</span>
                      <span style={{ color: selectedTheme.text }}>);</span>
                    </code>
                  </pre>
                </div>
              </div>

              {/* Watermark */}
              <div className="text-center mt-4 opacity-30">
                <span className="text-xs" style={{ color: selectedTheme.text, fontFamily: 'system-ui' }}>
                  Captured with CodeSnap Pro
                </span>
              </div>
            </div>
          </div>

          {/* Theme selector */}
          <div className="bg-secondary/50 rounded-2xl p-4 sm:p-6 border border-foreground/5">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span style={{ color: selectedTheme.accent }}>●</span>
              Sélection du thème
            </h3>

            <div className="space-y-2 sm:space-y-3 max-h-[280px] lg:max-h-none overflow-y-auto lg:overflow-visible">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 ${
                    selectedTheme.id === theme.id
                      ? 'bg-primary/20 border-2 border-primary'
                      : 'bg-white/5 border border-transparent hover:bg-white/10'
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-lg border border-white/20 flex items-center justify-center"
                    style={{ background: theme.bg }}
                  >
                    <span style={{ color: theme.text }} className="font-mono text-xs">{'{}'}</span>
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{theme.name}</div>
                    <div className="text-xs text-foreground/50">#{theme.id}</div>
                  </div>
                  {selectedTheme.id === theme.id && (
                    <Check className="w-5 h-5 text-primary ml-auto" />
                  )}
                </button>
              ))}
            </div>

            {/* Options toggle */}
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="w-full mt-4 py-2 text-sm text-foreground/60 hover:text-foreground flex items-center justify-center gap-2 transition-colors"
            >
              <Settings className="w-4 h-4" />
              Options avancées
            </button>

            {/* Advanced options */}
            {showOptions && (
              <div className="mt-4 space-y-4 p-4 bg-white/5 rounded-xl">
                <div>
                  <label className="text-sm font-medium mb-2 block">Style de fenêtre</label>
                  <div className="flex gap-2">
                    {windowStyles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setSelectedWindow(style)}
                        className={`flex-1 py-2 px-3 rounded-lg text-xs transition-all ${
                          selectedWindow.id === style.id
                            ? 'bg-primary text-white'
                            : 'bg-white/10 hover:bg-white/20'
                        }`}
                      >
                        {style.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Marge ext. : {padding}px
                  </label>
                  <input
                    type="range"
                    min="16"
                    max="96"
                    value={padding}
                    onChange={(e) => setPadding(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>
              </div>
            )}

            {/* Export button */}
            <button
              onClick={handleCapture}
              disabled={capturing}
              className="w-full mt-6 py-4 bg-primary hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-lg"
            >
              {capturing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Capture en cours...</span>
                </>
              ) : (
                <>
                  <Image className="w-5 h-5" />
                  <span>Capturer cette image</span>
                </>
              )}
            </button>

            {/* Copy code button */}
            <button
              onClick={handleCopy}
              className="w-full mt-3 py-3 bg-white/10 hover:bg-white/20 text-foreground font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Code copié !</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copier le code</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}