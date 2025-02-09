'use client';

import { Shield, Users, Music, Settings, Activity } from 'lucide-react';
import { useAuth } from "@clerk/nextjs";
import { redirect } from 'next/navigation';

const AdminPage = () => {
  const { userId, isLoaded, isSignedIn, user } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    redirect('/sign-in');
  }

  if (userId !== process.env.NEXT_PUBLIC_ADMIN_USER_ID) {
    redirect('/');
  }

  const adminSections = [
    {
      title: "User Management",
      icon: Users,
      description: "Manage user accounts and permissions",
      action: "Manage Users"
    },
    {
      title: "Content Management",
      icon: Music,
      description: "Moderate songs and karaoke content",
      action: "Manage Content"
    },
    {
      title: "System Settings",
      icon: Settings,
      description: "Configure system-wide settings",
      action: "Configure"
    },
    {
      title: "Activity Logs",
      icon: Activity,
      description: "View system activity and logs",
      action: "View Logs"
    }
  ];

  return (
    <main className="min-h-screen p-6">
      <div className="container mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-red-500" />
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminSections.map((section) => {
            const Icon = section.icon;
            return (
              <div 
                key={section.title}
                className="bg-dark-800 p-6 rounded-lg hover:bg-dark-700 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-6 h-6 text-accent" />
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                </div>
                <p className="text-gray-400 mb-4">{section.description}</p>
                <button className="px-4 py-2 bg-accent text-white rounded hover:bg-accent-hover transition-colors">
                  {section.action}
                </button>
              </div>
            );
          })}
        </div>

        // In your admin page, update the bottom section:
        <div className="mt-8 p-4 bg-dark-800 rounded-lg">
          <div className="text-sm text-gray-400">
            <p>Logged in as: {user?.username || user?.firstName || 'Admin'}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminPage;