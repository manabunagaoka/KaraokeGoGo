'use client'

import Link from 'next/link'
import { Music, Compass, User, Menu, X, Shield, LogOut, LogIn, Settings } from 'lucide-react'
import { useState } from 'react'
import { useAdmin } from '@/hooks/useAdmin'
import { useAuth, SignInButton, SignOutButton } from '@clerk/nextjs'

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isAdmin } = useAdmin()
  const { isSignedIn } = useAuth()

  // Add makeAdmin function
  const makeAdmin = async () => {
    try {
      const response = await fetch('/api/admin/setup', {
        method: 'POST',
      });
      const data = await response.json();
      console.log('Admin setup response:', data); // Add this debug log
      if (data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error making admin:', error);
    }
  };

  // Your existing navigation items
  const navigationItems = [
    { href: '/library', icon: Music, label: 'Library' },
    { href: '/rankings', icon: Compass, label: 'Rankings' },
    { href: '/account', icon: User, label: 'Account' },
    { href: '/settings', icon: Settings, label: 'Settings' },
    ...(isAdmin ? [{ href: '/admin', icon: Shield, label: 'Admin' }] : [])
  ]

  // Add this debug log
  console.log('Auth state:', { isSignedIn, isAdmin });

  return (
    <nav className="bg-dark-800 border-b border-dark-600">
      {/* Your existing nav container */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-xl text-accent">
            RapSynth
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navigationItems.map(({ href, icon: Icon, label }) => (
              <Link 
                key={href}
                href={href} 
                className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-dark-600 text-gray-300 hover:text-white transition-all"
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            ))}
            
            {/* Force show Make Admin button - TEMPORARY */}
            <button
              onClick={makeAdmin}
              className="flex items-center space-x-1 px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white transition-all"
            >
              <Shield className="w-5 h-5" />
              <span>Make Admin</span>
            </button>

            <SignOutButton>
              <button className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-dark-600 text-gray-300 hover:text-white transition-all">
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </SignOutButton>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md hover:bg-dark-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-300" />
            ) : (
              <Menu className="w-6 h-6 text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-dark-800 border-t border-dark-600">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationItems.map(({ href, icon: Icon, label }) => (
              <Link 
                key={href}
                href={href} 
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-300 hover:bg-dark-600 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            ))}
            
            {/* Force show Make Admin button in mobile menu - TEMPORARY */}
            <button
              onClick={makeAdmin}
              className="flex w-full items-center space-x-2 px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
            >
              <Shield className="w-5 h-5" />
              <span>Make Admin</span>
            </button>

            <SignOutButton>
              <button className="flex w-full items-center space-x-2 px-3 py-2 rounded-md text-gray-300 hover:bg-dark-600 hover:text-white">
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </SignOutButton>
          </div>
        </div>
      )}
    </nav>
  )
}