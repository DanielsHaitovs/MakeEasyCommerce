import { CreateRuleI } from "@src/attribute/relations/attribute-rule/interface/rule.interface";
import { OptionI } from "@src/base/interface/attribute/attributes/option-base.interface";

export type CreateRuleAttributeI = CreateRuleI;
export type CreateAttributeRuleI = CreateRuleAttributeI;
export type UpdateAttributeRule = CreateRuleAttributeI;

export interface GetRuleAttributeI extends CreateRuleAttributeI {
    id: number;
}
export type GetAttributeRuleI = GetRuleAttributeI;

export type CreateOptionAttributeI = OptionI;
export interface CreateOneAttributeOptionI extends CreateOptionAttributeI {
    relatedAttribute: number;
}
export interface CreateManyAttributeOptionI {
    relatedAttribute: number;
    value: OptionI[];
}

export interface GetOptionAttributeI extends CreateOptionAttributeI {
    id: number;
    relatedAttribute: number;
}

export type GetAttributeOptionI = GetOptionAttributeI;