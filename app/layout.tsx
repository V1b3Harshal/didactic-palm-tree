// app/layout.tsx  (Server Component — no "use client")
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google'
import './globals.css'
import ClientLenisProvider from '@/components/ClientLenisProvider'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300','400','500','600','700','800'],
  variable: '--font-sans',
})

const space = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300','400','500','600','700'],
  variable: '--font-heading',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Convis - AI-Driven Automation',
  description:
    'Transform your business with AI-driven automation solutions. Streamline operations, boost efficiency, and unlock unprecedented growth.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${space.variable}`}>
      <body>
        <ClientLenisProvider>
          {children}
        </ClientLenisProvider>
      </body>
    </html>
  )
}
