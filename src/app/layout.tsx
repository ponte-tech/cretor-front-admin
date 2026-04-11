import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import I18nProvider from '@/providers/I18nProvider'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-primary',
})

export const metadata: Metadata = {
  title: 'Daniel Krammes',
  description: 'Imobiliaria em Balneario Camboriu - Guilherme Pilger Corretor de Imoveis',
  themeColor: '#0a0604',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={poppins.variable}>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}
