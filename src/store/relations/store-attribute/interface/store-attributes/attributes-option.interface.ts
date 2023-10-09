import { QueryResponseI } from '@src/base/interfaces/responses/response.create-query.dto';

export interface StoreOptionI {
    value: string | number | boolean | Date | JSON;
}

export interface CreateStoreOptionI extends StoreOptionI {
    storeView: number;
    storeAttribute: number;
    parentOption: number;
}

export type UpdateStoreOptionI = CreateStoreOptionI;

export interface GetStoreOptionI extends CreateStoreOptionI {
    id: number;
}

export interface StoreOptionResponseI extends QueryResponseI {
    status: string;
    message: string;
    result?: GetStoreOptionI | GetStoreOptionI[];
}
