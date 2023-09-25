import { QueryResponseInterface } from '@src/base/interfaces/responses/response.create-query.dto';

export interface StoreDescriptionInterface {
    isActive: boolean;
    name: string;
    code: string;
    description: string;
}

export type StoreViewDescriptionInterface = StoreDescriptionInterface;

export interface CreateStoreViewInterface {
    view: StoreViewDescriptionInterface;
}

export interface CreateStoreInterface {
    description: StoreDescriptionInterface;
    storeViews: CreateStoreViewInterface[];
}

export interface GetStoreViewInterface extends CreateStoreViewInterface {
    id: number;
}

export interface GetStoreInterface {
    id: number;
    description: StoreDescriptionInterface;
    storeViews: GetStoreViewInterface[];
}

export interface StoreViewResponseInterface extends QueryResponseInterface {
    status?: string;
    message?: string;
    result?: GetStoreViewInterface | GetStoreViewInterface[];
}

export interface StoreResponseInterface extends QueryResponseInterface {
    status?: string;
    message?: string;
    result?: GetStoreInterface | GetStoreInterface[];
}

export interface CreateStoreViewResponse extends QueryResponseInterface {
    status?: string;
    message?: string;
    result?: CreateStoreViewInterface | CreateStoreViewInterface[];
}

export interface CreateStoreResponse extends QueryResponseInterface {
    status?: string;
    message?: string;
    result?: CreateStoreInterface | CreateStoreInterface[];
}
