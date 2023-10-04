import { RuleConfigI } from '@src/attribute/relations/rule/interface/rule.interface';
import { QueryResponseI } from '@src/base/interfaces/responses/response.create-query.dto';

// export interface GetAttributeOptionsI {
//     id: number;
//     options: OptionI[];
// }

export interface StoreRuleI {
    front: RuleConfigI;
    back: RuleConfigI;
}

export type CreateStoreRuleI = StoreRuleI;

export interface GetStoreRuleI extends StoreRuleI {
    id: number;
}

export interface StoreAttributeDescriptionI {
    isActive: boolean;
    isRequired: boolean;
    name: string;
    code?: string;
    description: string;
    dataType?: string;
    isArray: boolean;
    storeView?: number;
}

export interface CreateAttributeShortI {
    description: StoreAttributeDescriptionI;
    relatedAttribute: number;
}

export interface CreateStoreAttributeI extends CreateAttributeShortI {
    rule: StoreRuleI;
}

export interface UpdateAttributeShortI {
    description: StoreAttributeDescriptionI;
}

export interface UpdateAttributeI extends UpdateAttributeShortI {
    rule: StoreRuleI;
}

export interface GetStoreAttributeI {
    id?: number;
    description?: StoreAttributeDescriptionI;
    rule?: GetStoreRuleI;
    // options?: GetOptionI[];
    // optionsIds?: number[];
}

export class GetStoreAttributeRuleI {
    id: number;
    rule: GetStoreRuleI;
    // optionsIds?: number[];
}

export interface StoreAttributeResponseI extends QueryResponseI {
    status: string;
    message: string;
    result?: GetStoreAttributeI | GetStoreAttributeI[];
}
