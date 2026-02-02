import client from './client';

export interface Product {
    id: string;
    nom: string;
    reference: string;
    categorie_id: string;
    poids_moyen: number;
    categorie?: {
        id: string;
        nom: string;
    };
    // Fields present in UI but missing in Backend (for now)
    prix?: number;
    stock?: number;
    created_at?: string;
    updated_at?: string;
}

export interface PaginatedResponse<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export const getProducts = async (page = 1, search = ''): Promise<PaginatedResponse<Product>> => {
    const params = { page, search };
    const response = await client.get<PaginatedResponse<Product>>('/produits', { params });
    return response.data;
};

export const createProduct = async (product: Partial<Product>): Promise<Product> => {
    const response = await client.post<Product>('/produits', product);
    return response.data;
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product> => {
    const response = await client.put<Product>(`/produits/${id}`, product);
    return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
    await client.delete(`/produits/${id}`);
};
