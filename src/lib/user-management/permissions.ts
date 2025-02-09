export const PERMISSIONS = {
    USER: {
      CREATE: 'user:create',
      READ: 'user:read',
      UPDATE: 'user:update',
      DELETE: 'user:delete',
    },
    ROLE: {
      CREATE: 'role:create',
      READ: 'role:read',
      UPDATE: 'role:update',
      DELETE: 'role:delete',
    },
    // Add more permission types as needed
  } as const;
  
  export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS][keyof typeof PERMISSIONS[keyof typeof PERMISSIONS]];
  
  export const DEFAULT_ROLES = {
    SUPER_ADMIN: {
      name: 'Super Admin',
      description: 'Full system access',
      permissions: Object.values(PERMISSIONS).flatMap(group => Object.values(group)),
    },
    USER_MANAGER: {
      name: 'User Manager',
      description: 'Can manage users',
      permissions: Object.values(PERMISSIONS.USER),
    },
    BASIC_USER: {
      name: 'Basic User',
      description: 'Basic user access',
      permissions: [PERMISSIONS.USER.READ],
    },
  } as const;