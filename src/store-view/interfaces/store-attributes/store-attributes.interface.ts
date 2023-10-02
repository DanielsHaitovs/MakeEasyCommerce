import { CreateAttributeShortI } from '@src/attribute/interfaces/attribute.interface';
import {
    CreateRulesI,
    GetRuleI,
} from '@src/attribute/relations/rule/interface/rule.interface';
import { QueryResponseI } from '@src/base/interfaces/responses/response.create-query.dto';

export interface CreateStoreViewAttributeShortI {
    useDefault: boolean;
    storeView: number;
    // attributes: CreateAttributeShortI;
    relatedAttribute: number;
    // rules: CreateRulesI;
}

export interface CreateStoreViewAttributeI
    extends CreateStoreViewAttributeShortI {
    attributes: CreateAttributeShortI;
    rules: CreateRulesI;
}

export interface GetStoreViewAttributeI {
    id: number;
    useDefault: boolean;
    storeView: number;
    // attributes: CreateAttributeShortI;
    relatedAttribute: number;
    // rules: GetRuleI;
}

export interface StoreViewAttributeResponseI extends QueryResponseI {
    status: string;
    message: string;
    result?: GetStoreViewAttributeI | GetStoreViewAttributeI[];
}
