'use client';

import React from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import { Mail, Phone, X, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

function AccountPage() {
  const { user, isLoaded } = useUser();
  const { openUserProfile } = useClerk();
  const router = useRouter();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Please sign in to view settings.
      </div>
    );
  }

  const allEmails = user.emailAddresses || [];
  const allPhones = user.phoneNumbers || [];
  const primaryEmail = user.primaryEmailAddress;
  const primaryPhone = user.primaryPhoneNumber;
  const secondaryEmails = allEmails.filter(
    (email) => email.emailAddress !== primaryEmail?.emailAddress
  );
  const secondaryPhones = allPhones.filter(
    (phone) => phone.phoneNumber !== primaryPhone?.phoneNumber
  );
  const hasPrimaryEmail = !!primaryEmail;
  const hasPrimaryPhone = !!primaryPhone;
  const recoveryEmail = secondaryEmails[0];
  const has2FA =
    (hasPrimaryEmail && hasPrimaryPhone) ||
    (hasPrimaryPhone && secondaryEmails.length > 0) ||
    (hasPrimaryEmail && secondaryPhones.length > 0);

  const openSecuritySettings = async () => {
    try {
      await openUserProfile({
        appearance: {
          baseTheme: 'dark',
          variables: {
            colorBackground: '#000000',
            colorText: '#FFFFFF',
            colorPrimary: '#60A5FA',
            colorTextSecondary: '#E5E7EB',
            colorDanger: '#FF4081',
            colorInputBackground: '#1F2937',
            colorInputText: '#FFFFFF',
          },
          elements: {
            rootBox: {
              backgroundColor: '#000000',
            },
            card: {
              backgroundColor: '#1F2937',
              borderColor: '#374151',
              borderRadius: '0.75rem',
              overflow: 'hidden',
            },
            mainContainer: {
              '& > div:first-of-type': {
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                marginBottom: '1.5rem',
              },
            },
            profileSection: {
              borderBottom: '1px solid #374151',
              paddingBottom: '1rem',
              marginBottom: '1rem',
            },
            passwordSection: {
              borderBottom: '1px solid #374151',
              paddingBottom: '1rem',
              marginBottom: '1rem',
            },
            securitySection: {
              borderBottom: '1px solid #374151',
              paddingBottom: '1rem',
              marginBottom: '1rem',
            }
          },
        },
      });
    } catch (error) {
      console.error('Failed to open security settings:', error);
    }
  };

  return (
    <div className="min-h-screen p-4 text-white bg-black overflow-hidden">
      <div className="max-w-md mx-auto relative">
        <button
          onClick={() => router.back()}
          className="absolute -top-2 right-0 p-2 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="bg-gray-900 rounded-lg p-6 mt-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2 text-white">Account Overview</h1>
            <p className="text-gray-300">Manage your account security and settings</p>
          </div>

          <div className="space-y-6">
            {(primaryEmail || primaryPhone) && (
              <>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:justify-between">
                    <div className="flex items-center min-w-0">
                      {primaryEmail ? (
                        <>
                          <Mail className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0" />
                          <span className="text-gray-50 truncate pointer-events-none select-none">
                            {primaryEmail.emailAddress}
                          </span>
                        </>
                      ) : (
                        <>
                          <Phone className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0" />
                          <span className="text-gray-50 truncate pointer-events-none select-none">
                            {primaryPhone?.phoneNumber}
                          </span>
                        </>
                      )}
                    </div>
                    <span className="text-xs bg-blue-400/20 text-blue-400 px-2 py-1 rounded font-medium tracking-wide whitespace-nowrap flex items-center justify-center min-w-[90px]">
                      Primary ID
                    </span>
                  </div>
                </div>
                <div className="h-px bg-gray-800" />
              </>
            )}

            {has2FA && (
              <>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:justify-between">
                    <div className="flex items-center min-w-0">
                      {hasPrimaryEmail && hasPrimaryPhone ? (
                        <>
                          <Phone className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0" />
                          <span className="text-gray-50 truncate pointer-events-none select-none">
                            {primaryPhone?.phoneNumber}
                          </span>
                        </>
                      ) : hasPrimaryPhone ? (
                        <>
                          <Mail className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0" />
                          <span className="text-gray-50 truncate pointer-events-none select-none">
                            {secondaryEmails[0]?.emailAddress}
                          </span>
                        </>
                      ) : (
                        <>
                          <Phone className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0" />
                          <span className="text-gray-50 truncate pointer-events-none select-none">
                            {secondaryPhones[0]?.phoneNumber}
                          </span>
                        </>
                      )}
                    </div>
                    <span className="text-xs bg-blue-400/20 text-blue-400 px-2 py-1 rounded font-medium tracking-wide whitespace-nowrap flex items-center justify-center min-w-[90px]">
                      2FA
                    </span>
                  </div>
                </div>
                <div className="h-px bg-gray-800" />
              </>
            )}

            {recoveryEmail && (
              <>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:justify-between">
                    <div className="flex items-center min-w-0">
                      <Mail className="w-4 h-4 text-pink-400 mr-2 flex-shrink-0" />
                      <span className="text-gray-50 truncate pointer-events-none select-none">
                        {recoveryEmail.emailAddress}
                      </span>
                    </div>
                    <span className="text-xs bg-pink-400/20 text-pink-400 px-2 py-1 rounded font-medium tracking-wide whitespace-nowrap flex items-center justify-center min-w-[90px]">
                      Recovery Email
                    </span>
                  </div>
                </div>
                <div className="h-px bg-gray-800" />
              </>
            )}

            {(!has2FA || !recoveryEmail) && (
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center text-gray-400">
                  <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>
                    {!has2FA && !recoveryEmail
                      ? 'Add a phone number for 2FA and an email for account recovery'
                      : !has2FA
                      ? 'Add a phone number to enable two-factor authentication'
                      : 'Add a recovery email to protect your account'}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6">
            <button
              onClick={openSecuritySettings}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-400 transition-colors font-medium"
            >
              Manage Account Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;