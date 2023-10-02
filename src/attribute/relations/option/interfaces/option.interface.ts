import { GetAttributeOptionsI } from '@src/attribute/interfaces/attribute.interface';
import { QueryResponseI } from '@src/base/interfaces/responses/response.create-query.dto';

export interface OptionI {
    value: string | number | boolean | Date | JSON;
}

export interface CreateOptionI extends OptionI {
    relatedAttributeId?: number;
}

export interface CreateStoreOptionI extends CreateOptionI {
    relatedOptionId?: number;
}

export interface UpdateOptionI extends OptionI {
    relatedAttributeId: number;
}

export interface UpdateStoreOptionI extends UpdateOptionI {
    relatedOptionId: number;
}

export interface GetOptionI extends OptionI {
    id: number;
    relatedAttribute: number;
}

export interface GetStoreOptionI extends GetOptionI {
    relatedOptionId: number;
}

export interface OptionResponseI extends QueryResponseI {
    status: string;
    message: string;
    result?: GetOptionI[];
}

export interface StoreOptionResponseI extends QueryResponseI {
    status: string;
    message: string;
    result?: GetStoreOptionI[];
}

export interface OptionsAttributeResponseI extends QueryResponseI {
    status: string;
    message: string;
    result?: GetAttributeOptionsI | GetAttributeOptionsI[];
}
