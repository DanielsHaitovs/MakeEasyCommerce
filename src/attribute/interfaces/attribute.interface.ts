import { QueryResponseI } from '@src/base/interfaces/responses/response.create-query.dto';
import {
    CreateOptionI,
    GetOptionI,
    OptionI,
} from '../relations/option/interfaces/option.interface';
import {
    CreateRuleI,
    GetRuleI,
    RuleI,
} from '../relations/rule/interface/rule.interface';

export interface GetAttributeOptionsI {
    id: number;
    options: OptionI[];
}

export interface AttributeDescriptionI {
    isActive: boolean;
    isRequired: boolean;
    name: string;
    code: string;
    description: string;
    dataType?: string;
    isArray: boolean;
}

export interface AttributeShortI {
    description: AttributeDescriptionI;
}

export interface CreateAttributeShortI {
    description: AttributeDescriptionI;
}

export interface CreateAttributeI extends CreateAttributeShortI {
    rule: RuleI;
    options: CreateOptionI[];
}

export interface UpdateAttributeShortI {
    description: AttributeDescriptionI;
}

export interface UpdateAttributeI extends UpdateAttributeShortI {
    rule: CreateRuleI;
    options: CreateOptionI[];
}

export interface GetAttributeI {
    id?: number;
    description?: AttributeDescriptionI;
    rule?: GetRuleI;
    options?: GetOptionI[];
    optionsIds?: number[];
}

export class GetAttributeRuleI {
    id: number;
    rule: GetRuleI;
    optionsIds?: number[];
}

export interface AttributeResponseI extends QueryResponseI {
    status: string;
    message: string;
    result?: GetAttributeI | GetAttributeI[];
}
