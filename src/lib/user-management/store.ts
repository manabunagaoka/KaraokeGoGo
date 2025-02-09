import { create } from 'zustand';
import { ExtendedUser, UserRole, UserPermission } from './types';

interface UserManagementStore {
  users: ExtendedUser[];
  roles: UserRole[];
  permissions: UserPermission[];
  config: {
    rolesEnabled: boolean;
    permissionsEnabled: boolean;
  };
  setUsers: (users: ExtendedUser[]) => void;
  setRoles: (roles: UserRole[]) => void;
  setPermissions: (permissions: UserPermission[]) => void;
  updateUser: (userId: string, data: Partial<ExtendedUser>) => void;
}

export const useUserManagement = create<UserManagementStore>((set) => ({
  users: [],
  roles: [],
  permissions: [],
  config: {
    rolesEnabled: true,
    permissionsEnabled: true,
  },
  setUsers: (users) => set({ users }),
  setRoles: (roles) => set({ roles }),
  setPermissions: (permissions) => set({ permissions }),
  updateUser: (userId, data) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId ? { ...user, ...data } : user
      ),
    })),
}));