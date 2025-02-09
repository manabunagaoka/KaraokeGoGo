export interface UserRole {
    id: string;
    name: string;
    permissions: string[];
  }
  
  export interface UserPermission {
    id: string;
    name: string;
    description: string;
  }
  
  export interface ExtendedUser {
    id: string;
    roles: UserRole[];
    permissions: string[];
    metadata: Record<string, any>;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface UserManagementConfig {
    rolesEnabled: boolean;
    permissionsEnabled: boolean;
    customFields: {
      name: string;
      type: 'string' | 'number' | 'boolean' | 'date';
      required: boolean;
    }[];
  }