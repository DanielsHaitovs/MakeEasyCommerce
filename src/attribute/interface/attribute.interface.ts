import { SelectQueryBuilder } from 'typeorm';
import { QueryFilterI, QueryResponseI } from '@src/mec/interface/query/query.interface';
import { Attribute } from '../entities/attribute.entity';

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
