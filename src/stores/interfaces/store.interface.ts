import { QueryResponseInterface } from '@src/base/interfaces/responses/response.create-query.dto';
import { StoreViewI } from '../relations/store-views/interfaces/store-view.interface';

export interface StoreI {
    isActive: boolean;
    name: string;
    code: string;
    description: string;
}

export interface CreateStoreI extends StoreI {
    storeViews?: StoreViewI[];
}

export interface CreateStoreResponseI extends QueryResponseInterface {
    status: string;
    message: string;
    result?: CreateStoreI | CreateStoreI[];
}

export interface GetStoreI extends CreateStoreI {
    id: number;
}

export interface StoreResponseI extends QueryResponseInterface {
    status: string;
    message: string;
    result?: GetStoreI | GetStoreI[];
}
