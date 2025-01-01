'use client';

import { useState } from 'react';
import { Menu, X, Music, Trophy, User, LogOut } from 'lucide-react';
import { useUser, SignOutButton } from "@clerk/nextjs";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-dark-800 border-b border-dark-600 z-50">
        <div className="px-4 h-14">
          <div className="flex items-center justify-between h-full">
            <h1 className="text-lg font-bold text-accent">KaraokeGoGo</h1>
            {isSignedIn && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg text-gray-300 hover:bg-dark-700 active:bg-dark-600"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu - Only show when signed in */}
        {isSignedIn && isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-dark-800 border-b border-dark-600 shadow-lg">
            <div className="px-4 py-2 space-y-1">
              <button 
                className="w-full p-3 flex items-center rounded-lg text-gray-100 hover:bg-dark-700 active:bg-dark-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <Music className="w-5 h-5 mr-3" />
                Library
              </button>
              <button 
                className="w-full p-3 flex items-center rounded-lg text-gray-100 hover:bg-dark-700 active:bg-dark-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <Trophy className="w-5 h-5 mr-3" />
                Rankings
              </button>
              <div className="p-3 flex items-center text-gray-300">
                <User className="w-5 h-5 mr-3" />
                {user?.username || user?.firstName || 'User'}
              </div>
              <SignOutButton>
                <button className="w-full p-3 flex items-center rounded-lg text-accent hover:bg-dark-700 hover:text-accent-hover">
                  <LogOut className="w-5 h-5 mr-3" />
                  Sign Out
                </button>
              </SignOutButton>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-14" />
    </>
  );
};

export default NavBar;