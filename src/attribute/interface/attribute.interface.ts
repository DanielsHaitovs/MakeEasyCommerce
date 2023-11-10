import { SelectQueryBuilder } from 'typeorm';
import { AttributeType } from '@src/mec/enum/attribute/attribute.enum';
import {
    QueryFilterI,
    QueryResponseI,
} from '@src/mec/interface/query/query.interface';
import { Attribute } from '../entities/attribute.entity';

export interface AttributeI {
    name: string;
    code: string;
    isActive: boolean;
    isRequired: boolean;
    description: string;
    dataType: AttributeType;
    isArray: boolean;
}

export type CreateAttributeI = AttributeI;
export type UpdateAttributeI = CreateAttributeI;

export interface GetAttributeShortI extends CreateAttributeI {
    id: number;
}

export type GetAttributeI = GetAttributeShortI;

export interface AttributeResponseI extends QueryResponseI {
    result?: GetAttributeI | GetAttributeI[];
}

export interface AttributeQueryFilterI extends QueryFilterI {
    message?: string;
    many: boolean;
    query: SelectQueryBuilder<Attribute>;
}
