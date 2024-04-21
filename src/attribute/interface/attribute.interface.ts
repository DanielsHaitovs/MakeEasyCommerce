import { SelectQueryBuilder } from 'typeorm';
import { QueryFilterI, QueryResponseI } from '@src/mec/interface/query/query.interface';
import { Attribute } from '../entities/attribute.entity';
import { AttributeOptionString } from '../entities/options/string-option.entity';
import { AttributeOptionNumber } from '../entities/options/number-option.entity';

export type AttributeI = Attribute;

export type CreateAttributeI = AttributeI;
export type UpdateAttributeI = CreateAttributeI;

export type PrepareAttributeResponseI = QueryResponseI<CreateAttributeI>;

export interface GetAttributeI extends CreateAttributeI {
    id: number;
}

export type AttributeResponseI<T> = QueryResponseI<T>;

export interface AttributeQueryFilterI extends QueryFilterI {
    message?: string;
    many: boolean;
    query: SelectQueryBuilder<Attribute>;
}

export interface OptionQueryFilterI {
    message?: string;
    stringQuery: SelectQueryBuilder<AttributeOptionString>;
    numberQuery: SelectQueryBuilder<AttributeOptionNumber>;
}
