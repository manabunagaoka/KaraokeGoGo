import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KaraokeGoGo',
  description: 'Sing along and become Karaoke Champion!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: 'dark',
        variables: {
          colorBackground: '#000000',
          colorText: '#FFFFFF',
          colorPrimary: '#60A5FA',
          colorTextSecondary: '#E5E7EB',
          colorDanger: '#FF4081',
          colorInputBackground: '#1F2937',
          colorInputText: '#FFFFFF',
        }
      }}
      // Specify available features
      components={{
        devices: false,
        activeDevices: false
      }}
      userProfile={{
        defaultTab: "security",
        defaultFields: ["username", "email", "password"],
        hideDevices: true
      }}
    >
      <html lang="en">
        <body className={`${inter.className} bg-dark-900 text-white`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}