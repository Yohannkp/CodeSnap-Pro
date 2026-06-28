import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CodeSnap Pro - Capture de Code Stylisée',
  description: 'Capturez du code avec un rendu professionnel pour LinkedIn, Twitter et blogs. Thèmes personnalisables, export PNG haute résolution.',
  keywords: ['capture code', 'screenshot code', 'syntax highlighting', 'code image', 'developer tools'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-[#0F0F14] text-[#E2E8F0]">
        {children}
      </body>
    </html>
  )
}