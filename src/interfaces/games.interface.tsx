export interface IAdminGameOverview {
    title: string;
    description: string;
    thumbnail: string | null;
    updated_date: string;
    updated_by: string;
    created_date: string;
    created_by: string;
    downloads: number;
    revenue: number;
    number_of_levels: number;
}

export interface IAdminGame extends IAdminGameOverview{
    level_ids: any[],
    images: any[],
    price: number
}

export interface IAdminLevel {
    title: string;
    description: string;
    images: any[];
    price: number;
}

export interface IPurchaseGame {
    title: string;
    description: string;
    price: number;
    level_ids: any[];
}

export interface IPurchaseLevel {
    title: string;
    description: string;
    images: any[];
    price: number;
}

export interface ILevel {
    
}

export interface IGame {
    title: string;
    description: string;
    thumbnail: string | null;
    updated_date: string;
    updated_by: string;
    created_date: string;
    created_by: string;
    downloads: number;
    revenue: number;
    number_of_levels: number;
    images: any[];
    price: number;
    level_ids: any[]
}