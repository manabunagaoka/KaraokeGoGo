import { z } from 'zod'; // We'll use Zod for validation

// Validation schemas
export const userSchema = z.object({
  id: z.string(),
  isAdmin: z.boolean(),
  metadata: z.record(z.any()).optional(),
  roles: z.array(z.string()),
});

export const roleSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  permissions: z.array(z.string()),
});

export const updateUserSchema = userSchema.partial().omit({ id: true });

// API route paths
export const routes = {
  users: '/api/user-management/users',
  user: (userId: string) => `/api/user-management/users/${userId}`,
  roles: '/api/user-management/roles',
  role: (roleId: string) => `/api/user-management/roles/${roleId}`,
  userRoles: (userId: string) => `/api/user-management/users/${userId}/roles`,
  userRole: (userId: string, roleId: string) => 
    `/api/user-management/users/${userId}/roles/${roleId}`,
} as const;