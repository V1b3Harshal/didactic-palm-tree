import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Raleway } from 'next/font/google'
import './globals.css'
import ClientLenisProvider from '@/components/ClientLenisProvider'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300','400','500','600','700','800'],  // keep all body weights
  variable: '--font-sans',
  display: 'swap',
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['200','300','400','600','700'],     // ← only ExtraLight
  variable: '--font-heading',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Convis | Human-Like AI Voice Agents',
  description:
    'Deploy lifelike conversational AI voice agents in minutes. Scale your business communication with Convis - the future of voice automation.',
  keywords: ['AI Voice Agents', 'Conversational AI', 'Voice Automation', 'Customer Service AI', 'Convis AI'],
  authors: [{ name: 'Convis Team' }],
  openGraph: {
    title: 'Convis | Human-Like AI Voice Agents',
    description: 'Deploy lifelike conversational AI voice agents in minutes.',
    url: 'https://didactic-palm-tree-orpin.vercel.app/',
    siteName: 'Convis',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Convis | Human-Like AI Voice Agents',
    description: 'Deploy lifelike conversational AI voice agents in minutes.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${raleway.variable}`}>
      <body>
        <ClientLenisProvider>
          {children}
        </ClientLenisProvider>
      </body>
    </html>
  )
}
