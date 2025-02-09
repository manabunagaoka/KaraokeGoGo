import { useEffect, useMemo } from 'react';
import { useUserManagement } from './store';
import { UserManagementAPI } from './api';
import { ExtendedUser, UserRole } from './types';

export function useUsers() {
  const { users, setUsers } = useUserManagement();
  const api = useMemo(() => new UserManagementAPI(process.env.NEXT_PUBLIC_API_URL!), []);

  useEffect(() => {
    const loadUsers = async () => {
      const fetchedUsers = await api.getUsers();
      setUsers(fetchedUsers);
    };
    loadUsers();
  }, [api, setUsers]);

  return users;
}

export function useUserRoles(userId: string) {
  const users = useUsers();
  const user = users.find((u) => u.id === userId);
  return user?.roles || [];
}

export function useHasPermission(permission: string) {
  const { userId } = useAuth(); // You'll need to implement this based on your auth system
  const userRoles = useUserRoles(userId);
  
  return useMemo(() => {
    return userRoles.some((role) => role.permissions.includes(permission));
  }, [userRoles, permission]);
}