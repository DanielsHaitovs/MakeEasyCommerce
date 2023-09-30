import { QueryResponseInterface } from '@src/base/interfaces/responses/response.create-query.dto';

export interface StoreViewI {
    isActive: boolean;
    name: string;
    code: string;
    description: string;
}

export interface CreateStoreViewI extends StoreViewI {
    store: number;
}

export interface CreateStoreViewResponseI extends QueryResponseInterface {
    status: string;
    message: string;
    result?: CreateStoreViewI | CreateStoreViewI[];
}

export interface GetStoreViewI extends StoreViewI {
    id: number;
    createdAt?: Date;
    updatedAt?: Date;
    store: number;
}

export interface StoreViewResponseI extends QueryResponseInterface {
    status: string;
    message: string;
    result?: GetStoreViewI | GetStoreViewI[];
}
