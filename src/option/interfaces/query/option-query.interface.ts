import {
    QueryFilterI,
    QueryResponseI,
} from '@src/mec/interface/query/query.interface';
import { AttributeOption } from '@src/option/entities/option.entity';
import { SelectQueryBuilder } from 'typeorm';
import { GetOptionI } from '../get-option.interface';

export interface OptionQueryFilterI extends QueryFilterI {
    message?: string;
    many: boolean;
    query: SelectQueryBuilder<AttributeOption>;
}

export interface OptionResponseI extends QueryResponseI {
    result?: GetOptionI | GetOptionI[];
}
