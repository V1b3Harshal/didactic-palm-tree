// app/layout.tsx  (Server Component — no "use client")
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300','400','500','600','700','800'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: ' Convis - AI-Driven Automation',
  description:
    'Transform your business with AI-driven automation solutions. Streamline operations, boost efficiency, and unlock unprecedented growth.',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={jakarta.className}>
        {children}
      </body>
    </html>
  )
}
