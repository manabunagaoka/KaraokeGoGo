// components/settings/profile.tsx
'use client';

import React from 'react';
import { PencilLine, Mail, Phone, Settings, Trash2 } from 'lucide-react';

interface ProfileData {
  displayName: string;
  bio: string;
  email: string;
  phone: string;
  recoveryEmail: string;
  twoFactorEnabled: boolean;
}

export default function Profile() {
  const [profile, setProfile] = React.useState<ProfileData>({
    displayName: 'John Doe',
    bio: 'Karaoke enthusiast',
    email: 'john@example.com',
    phone: '+1234567890',
    recoveryEmail: '',
    twoFactorEnabled: false
  });
  
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedProfile, setEditedProfile] = React.useState(profile);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      // TODO: Add API call to save profile
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setProfile(editedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Profile Settings</h2>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                disabled={isSaving}
                className="px-4 py-2 bg-dark-700 text-white hover:bg-dark-600 rounded-lg 
                         transition-colors flex items-center gap-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg 
                         transition-colors flex items-center gap-2"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg 
                       transition-colors flex items-center gap-2"
            >
              <PencilLine className="w-4 h-4" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Public Information */}
      <div className="bg-dark-700 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-4">Public Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Display Name</label>
            <input
              type="text"
              value={isEditing ? editedProfile.displayName : profile.displayName}
              onChange={(e) => setEditedProfile({ ...editedProfile, displayName: e.target.value })}
              disabled={!isEditing}
              className="w-full bg-dark-800 border border-dark-600 text-white rounded-lg p-2 
                       focus:ring-accent focus:border-accent disabled:opacity-50"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Bio</label>
            <textarea
              value={isEditing ? editedProfile.bio : profile.bio}
              onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
              disabled={!isEditing}
              className="w-full bg-dark-800 border border-dark-600 text-white rounded-lg p-2 h-24 
                       focus:ring-accent focus:border-accent disabled:opacity-50"
            />
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="bg-dark-700 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-4">Account Information</h3>
        <div className="space-y-6">
          {/* Email Section */}
          <div className="bg-dark-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="text-accent" />
                <div>
                  <div className="text-white">{profile.email}</div>
                  <div className="text-sm text-gray-400">Primary Login Method</div>
                </div>
              </div>
              <span className="bg-accent/20 text-accent px-2 py-1 text-sm rounded">
                Primary
              </span>
            </div>
          </div>

          {/* Phone Section */}
          <div className="bg-dark-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Phone className="text-gray-400" />
                <div>
                  <div className="text-white">{profile.phone}</div>
                  <div className="text-sm text-gray-400">Alternative Contact</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recovery Email */}
          <div>
            <label className="block text-gray-300 mb-2">Recovery Email (Optional)</label>
            <input
              type="email"
              value={isEditing ? editedProfile.recoveryEmail : profile.recoveryEmail}
              onChange={(e) => setEditedProfile({ ...editedProfile, recoveryEmail: e.target.value })}
              disabled={!isEditing}
              placeholder="Add a backup email for account recovery"
              className="w-full bg-dark-800 border border-dark-600 text-white rounded-lg p-2 
                       focus:ring-accent focus:border-accent disabled:opacity-50"
            />
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-dark-700 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h3>
        <div className="border border-red-500/20 rounded-lg p-4 bg-red-950/10">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-red-400">Delete Account</h4>
              <p className="text-sm text-gray-400">Permanently remove your account and all data</p>
            </div>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 
                       rounded-lg transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}