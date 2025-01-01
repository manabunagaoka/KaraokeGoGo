'use client'

import Link from 'next/link'
import { Music, Compass, User, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-dark-800 border-b border-dark-600">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-xl text-accent">
            RapSynth
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-2">
            <Link href="/" className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-dark-600 text-gray-300 hover:text-white transition-all">
              <Music className="w-5 h-5" />
              <span>Create</span>
            </Link>
            <Link href="/explore" className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-dark-600 text-gray-300 hover:text-white transition-all">
              <Compass className="w-5 h-5" />
              <span>Explore</span>
            </Link>
            <Link href="/profile" className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-dark-600 text-gray-300 hover:text-white transition-all">
              <User className="w-5 h-5" />
              <span>Profile</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
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
            <Link 
              href="/" 
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-300 hover:bg-dark-600 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Music className="w-5 h-5" />
              <span>Create</span>
            </Link>
            <Link 
              href="/explore" 
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-300 hover:bg-dark-600 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Compass className="w-5 h-5" />
              <span>Explore</span>
            </Link>
            <Link 
              href="/profile" 
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-300 hover:bg-dark-600 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}