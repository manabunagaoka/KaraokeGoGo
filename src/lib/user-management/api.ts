import { ExtendedUser, UserRole, UserPermission } from './types';

export class UserManagementAPI {
  private baseUrl: string;
  private apiKey?: string;

  constructor(baseUrl: string, apiKey?: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  private async fetch<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers = {
      'Content-Type': 'application/json',
      ...(this.apiKey && { Authorization: `Bearer ${this.apiKey}` }),
      ...options.headers,
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getUsers(): Promise<ExtendedUser[]> {
    return this.fetch<ExtendedUser[]>('/users');
  }

  async updateUser(
    userId: string,
    data: Partial<ExtendedUser>
  ): Promise<ExtendedUser> {
    return this.fetch<ExtendedUser>(`/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async getRoles(): Promise<UserRole[]> {
    return this.fetch<UserRole[]>('/roles');
  }

  async getPermissions(): Promise<UserPermission[]> {
    return this.fetch<UserPermission[]>('/permissions');
  }

  async assignRole(userId: string, roleId: string): Promise<void> {
    await this.fetch(`/users/${userId}/roles/${roleId}`, {
      method: 'PUT',
    });
  }

  async removeRole(userId: string, roleId: string): Promise<void> {
    await this.fetch(`/users/${userId}/roles/${roleId}`, {
      method: 'DELETE',
    });
  }
}