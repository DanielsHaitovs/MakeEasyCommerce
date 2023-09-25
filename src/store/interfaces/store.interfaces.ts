import { QueryResponseInterface } from '@src/base/interfaces/responses/response.create-query.dto';

export interface StoreI {
    isActive: boolean;
    name: string;
    code: string;
    description: string;
}

export interface StoreViewI {
    isActive: boolean;
    name: string;
    code: string;
    description: string;
}

export interface CreateStoreI extends StoreI {
    storeViews?: StoreViewI[];
}

export interface CreateStoreViewI extends StoreViewI {
    store?: number;
}

export interface CreateStoreResponseI extends QueryResponseInterface {
    status?: string;
    message?: string;
    result?: CreateStoreI | CreateStoreI[];
}

export interface CreateStoreViewResponseI extends QueryResponseInterface {
    status?: string;
    message?: string;
    result?: CreateStoreViewI | CreateStoreViewI[];
}

export interface GetStoreI extends StoreI {
    id: number;
    createdAt?: Date;
    updatedAt?: Date;
    // storeView?: null;
}

export interface GetStoreViewI extends StoreViewI {
    id: number;
    createdAt?: Date;
    updatedAt?: Date;
    // store?: any; // later will infer from type
}

export interface StoreResponseI extends QueryResponseInterface {
    status?: string;
    message?: string;
    result?: GetStoreI | GetStoreI[];
}

export interface StoreViewResponseI extends QueryResponseInterface {
    status?: string;
    message?: string;
    result?: GetStoreViewI | GetStoreViewI[];
}
