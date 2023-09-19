import { QueryResponseInterface } from '@src/base/interfaces/responses/response.create-query.dto';
import {
    CreateOptionInterface,
    GetOptionInterface,
    OptionInterface,
} from '../relations/option/interfaces/option.interface';
import {
    CreateRulesInterface,
    GetRuleInterface,
} from '../relations/rule/interface/rule.interface';

export interface GetAttributeOptionsInterface {
    id: number;
    options: OptionInterface[];
}

export interface AttributeDescriptionInterface {
    isActive: boolean;
    isRequired: boolean;
    name: string;
    code: string;
    description: string;
    dataType: string;
    isArray: boolean;
}

export interface CreateAttributeInterface {
    description: AttributeDescriptionInterface;
    rule: CreateRulesInterface;
    options: CreateOptionInterface[];
}

export interface UpdateAttributeInterface {
    description: AttributeDescriptionInterface;
    rule: CreateRulesInterface;
    options: CreateOptionInterface[];
}

export interface GetAttributeShortInterface {
    description: AttributeDescriptionInterface;
}

export interface GetAttributeInterface extends GetAttributeShortInterface {
    id: number;
    rule: GetRuleInterface;
    options: GetOptionInterface[];
}

export interface AttributeResponseInterface extends QueryResponseInterface {
    status?: any;
    message?: string;
    result?:
        | GetAttributeInterface
        | GetAttributeInterface[]
        | GetAttributeShortInterface
        | GetAttributeShortInterface[];
}
