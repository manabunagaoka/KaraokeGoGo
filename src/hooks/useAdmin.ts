'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';

export function useAdmin() {
  const { isLoaded, userId } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!isLoaded || !userId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/admin');
        const data = await response.json();
        console.log('Admin status response:', data);
        setIsAdmin(data.isAdmin);
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, [isLoaded, userId]);

  return { isAdmin, isLoading };
}