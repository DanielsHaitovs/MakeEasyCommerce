import { OptionI } from '@src/base/interface/attribute/attributes/option-base.interface';
import { QueryResponseI } from '@src/base/interface/response/response.interface';

export interface CreateOptionI extends OptionI {
    relatedAttribute: number;
}

export type UpdateOptionI = CreateOptionI;

export interface GetOptionI extends CreateOptionI {
    id: number;
}

export interface OptionResponseI extends QueryResponseI {
    status: string;
    message: string;
    result?: GetOptionI | GetOptionI[];
}
