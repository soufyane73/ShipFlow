import client from './client';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface AuthResponse {
    token: string;
    token_type: string;
    expires_in: number;
    user: User;
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await client.post<AuthResponse>('/auth/login', credentials);
    return response.data;
};

export const logout = async (): Promise<void> => {
    await client.post('/auth/logout');
};

export const getMe = async (): Promise<User> => {
    const response = await client.get<User>('/auth/me');
    return response.data;
}
