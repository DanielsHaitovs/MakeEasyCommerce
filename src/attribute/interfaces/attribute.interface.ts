import { QueryResponseI } from '@src/base/interfaces/responses/response.create-query.dto';
import {
    CreateOptionI,
    GetOptionI,
    OptionI,
} from '../relations/option/interfaces/option.interface';
import {
    CreateRulesI,
    GetRuleI,
    RuleI,
} from '../relations/rule/interface/rule.interface';
import { AttributeType } from '@src/base/enum/attributes/attribute-type.enum';

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
    rules: RuleI;
    options: CreateOptionI[];
}

export interface UpdateAttributeShortI {
    description: AttributeDescriptionI;
}

export interface UpdateAttributeI extends UpdateAttributeShortI {
    rules: CreateRulesI;
    options: CreateOptionI[];
}

export interface GetAttributeI {
    id?: number;
    description?: AttributeDescriptionI;
    rules?: GetRuleI;
    options?: GetOptionI[];
    optionsIds?: number[];
}

export class GetAttributeRuleI {
    id: number;
    rules: GetRuleI;
    optionsIds?: number[];
}

export interface AttributeResponseI extends QueryResponseI {
    status: string;
    message: string;
    result?: GetAttributeI | GetAttributeI[];
}
