import { QueryResponseI } from '@src/base/interfaces/responses/response.create-query.dto';

export interface StoreI {
    isActive: boolean;
    name: string;
    code: string;
    description: string;
}

export interface CreateStoreI extends StoreI {
    storeViews?: null; //StoreViewI[];
}

export interface CreateStoreResponseI extends QueryResponseI {
    status: string;
    message: string;
    result?: CreateStoreI | CreateStoreI[];
}

export interface GetStoreI extends CreateStoreI {
    id: number;
}

export interface StoreResponseI extends QueryResponseI {
    status: string;
    message: string;
    result?: GetStoreI | GetStoreI[];
}
