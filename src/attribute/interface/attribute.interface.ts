import { AttributeShortI } from '@src/mec/interface/attribute/attribute-base.interface';
import { CreateRuleI } from '@src/rule/interface/rule.interface';
import { QueryResponseI } from '@src/mec/interface/response/response.interface';

export type CreateAttributeShortI = AttributeShortI;
export interface CreateAttributeI extends AttributeShortI {
    rule: CreateRuleI;
}

export type UpdateAttributeShortI = CreateAttributeShortI;
export type UpdateAttributeI = CreateAttributeI;

export interface PrepareAttributeResponseI extends QueryResponseI {
    result?: CreateAttributeI;
}
