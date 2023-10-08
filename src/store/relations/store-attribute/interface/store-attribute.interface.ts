import { AttributeDescriptionI } from '@src/attribute/interfaces/attribute.interface';
import { CreateStoreRuleI } from './store-attributes/attributes-rule.interface';
import { QueryResponseI } from '@src/base/interfaces/responses/response.create-query.dto';

export interface CreateStoreAttributeDescriptionI {
    description: AttributeDescriptionI;
}

export interface GetStoreAttributeDescriptionI
    extends CreateStoreAttributeDescriptionI {
    id: number;
}

export interface CreateStoreAttributeShortI {
    storeView: number;
    useDefault: boolean;
    defaultAttribute: number;
    storeAttribute: CreateStoreAttributeDescriptionI;
    rule: CreateStoreRuleI;
}

export type CreateStoreAttributeI = CreateStoreAttributeShortI;
export type UpdateStoreAttributeShortI = CreateStoreAttributeShortI;
export interface GetStoreAttributeShortI extends CreateStoreAttributeShortI {
    id: number;
}

export type GetStoreAttributeI = GetStoreAttributeShortI;

export interface StoreAttributeResponseI extends QueryResponseI {
    status: string;
    message: string;
    result?: GetStoreAttributeI | GetStoreAttributeI[];
}
