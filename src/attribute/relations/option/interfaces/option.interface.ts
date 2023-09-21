import { GetAttributeOptionsInterface } from '@src/attribute/interfaces/attribute.interface';
import { QueryResponseInterface } from '@src/base/interfaces/responses/response.create-query.dto';

export interface OptionInterface {
    value: string | number | boolean | Date | JSON;
}

export interface CreateOptionInterface extends OptionInterface {
    relatedAttributeId: number;
}

export interface UpdateOptionInterface extends OptionInterface {
    relatedAttributeId: number;
}

export interface GetOptionInterface extends OptionInterface {
    id: number;
    relatedAttribute: number;
}

export interface OptionResponseInterface extends QueryResponseInterface {
    status?: string;
    message?: string;
    result?: GetOptionInterface[];
}

export interface OptionsAttributeResponseInterface
    extends QueryResponseInterface {
    status?: string;
    message?: string;
    result?: GetAttributeOptionsInterface | GetAttributeOptionsInterface[];
}
