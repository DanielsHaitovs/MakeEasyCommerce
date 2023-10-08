import { QueryResponseI } from '@src/base/interfaces/responses/response.create-query.dto';

export interface StoreRuleConfigI {
    useInCatalog: boolean;
    useInListing: boolean;
    useInLayeredNavigation: boolean;
    useInFilter: boolean;
    useInOptionFilter: boolean;
    useInSort: boolean;
    useInSearch: boolean;
    useInPromo: boolean;
    useInReport: boolean;
}

export interface StoreRuleI {
    front: StoreRuleConfigI;
    back: StoreRuleConfigI;
}

export interface CreateStoreRuleI extends StoreRuleI {
    storeView: number;
    storeAttribute?: number;
}

export interface GetStoreRuleI extends CreateStoreRuleI {
    id: number;
}

export interface GetStoreRuleFrontI extends StoreRuleConfigI {
    id: number;
}

export interface GetStoreRuleBackI extends StoreRuleConfigI {
    id: number;
}

export interface UpdateStoreRuleI {
    front?: StoreRuleConfigI;
    back?: StoreRuleConfigI;
}

export interface StoreRuleResponseI extends QueryResponseI {
    status: string;
    message: string;
    result?: GetStoreRuleI | GetStoreRuleI[];
}
