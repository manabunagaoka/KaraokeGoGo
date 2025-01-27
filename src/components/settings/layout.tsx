// components/settings/layout.tsx
'use client';

import React, { useState } from 'react';
import { UserCircle, Mail, Shield, AlertTriangle } from 'lucide-react';
import Profile from './profile';
import Contacts from './contacts';
import Security from './security';
import { auth } from '@clerk/nextjs';

type SettingSection = 'profile' | 'contacts' | 'security' | 'danger';

interface NavItem {
  id: SettingSection;
  label: string;
  icon: React.ReactNode;
  alert?: boolean;
}

export default function SettingsLayout() {
  const [activeSection, setActiveSection] = useState<SettingSection>('profile');

  const navigationItems: NavItem[] = [
    { 
      id: 'profile', 
      label: 'Profile', 
      icon: <UserCircle className="w-5 h-5" /> 
    },
    { 
      id: 'contacts', 
      label: 'Contact Methods', 
      icon: <Mail className="w-5 h-5" /> 
    },
    { 
      id: 'security', 
      label: 'Security', 
      icon: <Shield className="w-5 h-5" /> 
    },
    { 
      id: 'danger', 
      label: 'Danger Zone', 
      icon: <AlertTriangle className="w-5 h-5" />,
      alert: true 
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <Profile />;
      case 'contacts':
        return <Contacts />;
      case 'security':
        return <Security />;
      case 'danger':
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-red-500 mb-4">Danger Zone</h2>
            {/* Danger zone content will be implemented later */}
          </div>
        );
      default:
        return <Profile />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-dark-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <h1 className="text-2xl font-bold text-accent">Settings</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Navigation Sidebar */}
          <nav className="w-full lg:w-64 space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${activeSection === item.id 
                    ? 'bg-accent text-white' 
                    : 'text-gray-300 hover:bg-dark-700'
                  }
                `}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.alert && (
                  <span className="ml-auto">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-dark-800 rounded-lg shadow-lg border border-dark-600">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}