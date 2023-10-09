import { AttributeDescriptionI } from '@src/attribute/interfaces/attribute.interface';
import { CreateStoreRuleI } from './store-attributes/attributes-rule.interface';
import { QueryResponseI } from '@src/base/interfaces/responses/response.create-query.dto';
import {
    CreateStoreOptionI,
    GetStoreOptionI,
} from './store-attributes/attributes-option.interface';

export interface CreateStoreAttributeBaseI {
    storeView: number;
    useDefault: boolean;
    defaultAttribute: number;
    rule: CreateStoreRuleI;
}

export interface CreateStoreAttributeDescriptionShortI {
    description: AttributeDescriptionI;
}

export interface CreateStoreAttributeDescriptionI {
    description: AttributeDescriptionI;
    storeOptions: CreateStoreOptionI[];
}

export interface CreateStoreAttributeShortI extends CreateStoreAttributeBaseI {
    storeAttribute: CreateStoreAttributeDescriptionShortI;
}

export interface CreateStoreAttributeI extends CreateStoreAttributeBaseI {
    storeAttribute: CreateStoreAttributeDescriptionI;
}

export type UpdateStoreAttributeShortI = CreateStoreAttributeShortI;
export type UpdateStoreAttributeI = CreateStoreAttributeI;

export interface GetStoreAttributeDescriptionShortI
    extends CreateStoreAttributeDescriptionShortI {
    id: number;
}

export interface GetStoreAttributeDescriptionI {
    id: number;
    description: AttributeDescriptionI;
    storeOptions: GetStoreOptionI[];
}

export interface GetStoreAttributeShortI extends CreateStoreAttributeBaseI {
    id: number;
    storeAttribute: GetStoreAttributeDescriptionShortI;
}

export interface GetStoreAttributeI extends CreateStoreAttributeBaseI {
    storeAttribute: GetStoreAttributeDescriptionI;
}

export interface StoreAttributeResponseI extends QueryResponseI {
    status: string;
    message: string;
    result?: GetStoreAttributeI | GetStoreAttributeI[];
}

export interface StoreShortAttributeResponseI extends QueryResponseI {
    status: string;
    message: string;
    result?: GetStoreAttributeShortI | GetStoreAttributeShortI[];
}
