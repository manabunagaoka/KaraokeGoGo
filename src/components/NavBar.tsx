'use client';

import { useState } from 'react';
import { Menu, X, Music, Trophy, User, Settings, LogOut } from 'lucide-react';
import { useUser, useClerk } from "@clerk/nextjs";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const clerk = useClerk();
  const pathname = usePathname();

  const handleSignOut = async () => {
    try {
      console.log("Attempting to sign out...");
      setIsMenuOpen(false);
      await clerk.signOut();
      console.log("Sign out successful");
      window.location.href = '/sign-in';
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (!isLoaded) {
    return null;
  }

  const menuItems = [
    { href: '/library', icon: Music, label: 'Library' },
    { href: '/rankings', icon: Trophy, label: 'Rankings' },
    { href: '/settings/account', icon: User, label: 'Account' },
    { href: '/settings', icon: Settings, label: 'Settings' }
  ];

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

        {/* Mobile Menu */}
        {isSignedIn && isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-dark-800 border-b border-dark-600 shadow-lg">
            <div className="px-4 py-2 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`w-full p-3 flex items-center rounded-lg ${
                      pathname === item.href
                        ? 'text-accent bg-dark-700'
                        : 'text-gray-100 hover:bg-dark-700 active:bg-dark-600'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Link>
                );
              })}

              {/* Sign Out Button */}
              <button 
                className="w-full p-3 flex items-center rounded-lg text-accent hover:bg-dark-700 hover:text-accent-hover"
                onClick={handleSignOut}
              >
                <LogOut className="w-5 h-5 mr-3" />
                Sign Out
              </button>
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