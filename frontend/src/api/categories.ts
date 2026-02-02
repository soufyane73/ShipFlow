import client from './client';

export interface Category {
    id: string;
    nom: string;
    produits_count?: number;
}

export const getCategories = async (search = ''): Promise<Category[]> => {
    const params = { search };
    const response = await client.get<Category[]>('/categories', { params });
    return response.data;
};

export const createCategory = async (category: Partial<Category>): Promise<Category> => {
    const response = await client.post<Category>('/categories', category);
    return response.data;
};

export const updateCategory = async (id: string, category: Partial<Category>): Promise<Category> => {
    const response = await client.put<Category>(`/categories/${id}`, category);
    return response.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
    await client.delete(`/categories/${id}`);
};
