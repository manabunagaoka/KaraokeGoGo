'use client';

import { useState } from 'react';
import { Menu, X, Music, Trophy, User, Settings, LogOut, Shield } from 'lucide-react';
import { useClerk, useAuth } from "@clerk/nextjs";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const NavBar = () => {
  const { isLoaded, isSignedIn, userId, user } = useAuth();
  const { signOut } = useClerk();
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsLoggingOut(true);
      setIsMenuOpen(false);
      await signOut();
      router.push('/sign-in');
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!isLoaded || isLoggingOut) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          <div className="text-accent">
            {isLoggingOut ? 'Signing out...' : 'Loading...'}
          </div>
        </div>
      </div>
    );
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
            <Link href="/" className="text-lg font-bold text-accent">
              KaraokeGoGo
            </Link>
            {isSignedIn && (
              <div className="flex items-center gap-3">
                {userId === process.env.NEXT_PUBLIC_ADMIN_USER_ID && (
                  <Link
                    href="/admin"
                    className="p-2 rounded-lg text-white bg-red-600 hover:bg-red-700 cursor-pointer transition-colors duration-200 flex items-center justify-center active:bg-red-800"
                    title="Admin Settings"
                  >
                    <Shield size={20} className="animate-pulse" />
                  </Link>
                )}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-lg text-gray-300 hover:bg-dark-700 active:bg-dark-600"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isSignedIn && isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-dark-800 border-b border-dark-600 shadow-lg">
            <div className="px-4 py-2 space-y-1">
              <div className="p-3">
                <div className="text-sm text-accent">
                  {user?.username || userId}
                </div>
              </div>
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

              <button 
                className="w-full p-3 flex items-center rounded-lg text-red-500 hover:bg-dark-700 hover:text-red-400"
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