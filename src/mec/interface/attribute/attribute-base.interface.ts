import { Attribute } from '@src/attribute/entities/attribute.entity';
import { AttributeType } from '@src/mec/enum/attribute/attribute-type.enum';
import { SelectQueryBuilder } from 'typeorm';
import { QueryFilterI } from '../query/query-base.interface';

export interface AttributeDetailsI {
    description: string;
    isArray: boolean;
    dataType: AttributeType;
}

export interface AttributeShortI {
    isActive: boolean;
    name: string;
    code: string;
    isRequired: boolean;
}

export interface AttributeI extends AttributeShortI {
    details: AttributeDetailsI;
}

export interface AttributeQueryI {
    many: boolean;
    query: SelectQueryBuilder<Attribute>;
}

export interface AttributeQueryFilterI extends QueryFilterI {
    message?: string;
    many: boolean;
    query: SelectQueryBuilder<Attribute>;
}
