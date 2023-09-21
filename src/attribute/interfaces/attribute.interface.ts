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
    rules: CreateRulesInterface;
    options: CreateOptionInterface[];
}

export interface UpdateAttributeInterface {
    description: AttributeDescriptionInterface;
    rules: CreateRulesInterface;
    options: CreateOptionInterface[];
}

export interface GetAttributeInterface {
    id?: number;
    description: AttributeDescriptionInterface;
    rules?: GetRuleInterface;
    options?: GetOptionInterface[];
    optionsIds?: number[];
}

export class AttributeRuleInterface {
    id: number;
    rules: GetRuleInterface;
    optionsIds: number[];
}
export interface AttributeResponseInterface extends QueryResponseInterface {
    status?: any;
    message?: string;
    result?: GetAttributeInterface | GetAttributeInterface[];
}
