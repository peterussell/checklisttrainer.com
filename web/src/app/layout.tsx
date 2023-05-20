import './globals.css'
import { Inter } from 'next/font/google'

import { DefaultLayout } from '@/layouts'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ChecklistTrainer',
  description: 'Master your memory items',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DefaultLayout>
          {children}
        </DefaultLayout>
      </body>
    </html>
  )
}
