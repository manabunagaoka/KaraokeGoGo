// src/app/settings/page.tsx
export default function SettingsPage() {
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        {/* Settings content will go here later */}
      </div>
    </div>
  );
}

// src/app/settings/account/page.tsx
'use client';

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Mail, Phone, Shield, AlertCircle } from "lucide-react";

export default function AccountPage() {
  const { user, isLoaded } = useUser();
  
  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center bg-black">Loading...</div>;
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center bg-black">Please sign in to view settings.</div>;
  }

  const primaryEmail = user.primaryEmailAddress;
  const primaryPhone = user.primaryPhoneNumber;
  const backupEmails = user.emailAddresses?.filter(email => email.id !== primaryEmail?.id) || [];
  const backupPhones = user.phoneNumbers?.filter(phone => phone.id !== primaryPhone?.id) || [];

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-dark-800 rounded-lg p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Account Security</h1>
            <p className="text-gray-400">Manage your contact methods and security settings</p>
          </div>

          {/* Primary Contact Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Shield className="w-5 h-5 text-accent mr-2" />
              <h2 className="text-lg font-semibold">Primary Contact</h2>
            </div>
            
            <div className="bg-dark-700 rounded-lg p-4">
              {primaryEmail && (
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-accent mr-2" />
                    <span>{primaryEmail.emailAddress}</span>
                  </div>
                  <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">Primary</span>
                </div>
              )}
              {primaryPhone && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-accent mr-2" />
                    <span>{primaryPhone.phoneNumber}</span>
                  </div>
                  <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">Primary</span>
                </div>
              )}
            </div>
          </div>

          {/* Backup Methods Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-accent mr-2" />
                <h2 className="text-lg font-semibold">Backup Methods</h2>
              </div>
              <button
                onClick={() => user.createEmailAddress()}
                className="text-accent hover:text-accent/80 text-sm"
              >
                Add Method
              </button>
            </div>

            <div className="bg-dark-700 rounded-lg p-4">
              {backupEmails.length === 0 && backupPhones.length === 0 ? (
                <div className="flex items-center text-gray-400 text-sm">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  <span>No backup contact methods added</span>
                </div>
              ) : (
                <div className="space-y-3">
                  {backupEmails.map(email => (
                    <div key={email.id} className="flex items-center">
                      <Mail className="w-4 h-4 text-gray-400 mr-2" />
                      <span>{email.emailAddress}</span>
                    </div>
                  ))}
                  {backupPhones.map(phone => (
                    <div key={phone.id} className="flex items-center">
                      <Phone className="w-4 h-4 text-gray-400 mr-2" />
                      <span>{phone.phoneNumber}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Account Settings Button */}
          <button
            onClick={() => user.openAccountSettings()}
            className="w-full bg-accent text-white py-2 rounded-lg hover:bg-accent/90 transition-colors"
          >
            Manage Account Settings
          </button>
        </div>
      </div>
    </div>
  );
}