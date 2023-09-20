import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Attributes } from '@src/attribute/entities/attributes.entity';
import { AttributeResponseInterface } from '@src/attribute/interfaces/attribute.interface';
import { AttributeSingleConditionDto } from '@src/base/dto/filter/filters.dto';
import { JoinAttributeRelations } from '@src/base/enum/attributes/attribute-type.enum';
import { OrderType } from '@src/base/enum/query/query.enum';
import { EntityManager } from 'typeorm';

export const alias = 'attributes';

@Injectable()
export class AttributeHelperService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}
    async singleConditionAttributeQuery({
        filters,
    }: {
        filters: AttributeSingleConditionDto;
    }): Promise<AttributeResponseInterface> {
        const skip = (filters.page - 1) * filters.limit;
        const selectList: string[] = null;
        let rawValue = null;
        let columnName = '';
        if (filters.select != null) {
            for (const addToSelect of filters.select) {
                selectList.push(alias + '.' + addToSelect);
            }
        }
        if (filters.columnName != null && filters.columnName != '') {
            columnName = alias + '.' + filters.columnName + ' = :value';
            rawValue = {
                value: filters.value,
            };
        }

        if (filters.orderBy != null) {
            filters.orderBy = alias + '.' + filters.orderBy;
        }
        try {
            if (filters.joinOptions === true && filters.joinRules === true) {
                return await this.joinMultipleRelationQuery({
                    skip: skip,
                    limit: filters.limit,
                    selectList: selectList,
                    alias: alias,
                    columnName: columnName,
                    rawValue: rawValue,
                    orderBy: filters.orderBy,
                    orderDirection: filters.orderDirection,
                });
            }

            if (filters.joinRules === true || filters.joinOptions === true) {
                return await this.joinSingleRelationQuery({
                    relation:
                        JoinAttributeRelations[
                            filters.joinOptions ? 'Options' : 'Rules'
                        ],
                    skip: skip,
                    limit: filters.limit,
                    selectList: selectList,
                    alias: alias,
                    columnName: columnName,
                    rawValue: rawValue,
                    orderBy: filters.orderBy,
                    orderDirection: filters.orderDirection,
                });
            }

            return await this.nonRelationQuery({
                skip: skip,
                limit: filters.limit,
                selectList: selectList,
                alias: alias,
                columnName: columnName,
                rawValue: {
                    value: filters.value,
                },
                orderBy: filters.orderBy,
                orderDirection: filters.orderDirection,
            });
        } catch (e) {
            return {
                error: {
                    message: e.message,
                    in: 'Attributes Helper Query',
                },
            };
        }
    }

    async nonRelationQuery({
        skip,
        limit,
        selectList,
        alias,
        columnName,
        rawValue,
        orderBy,
        orderDirection,
    }: {
        skip: number;
        limit: number;
        selectList: string[];
        alias: string;
        columnName: string;
        rawValue: {
            value: string | number | boolean | Date | JSON;
        };
        orderBy: string;
        orderDirection: OrderType | OrderType.ASC;
    }): Promise<AttributeResponseInterface> {
        return {
            result: await this.entityManager
                .getRepository(Attributes)
                .createQueryBuilder(alias)
                .where(columnName, rawValue)
                .select(selectList)
                .orderBy(orderBy, orderDirection)
                .skip(skip)
                .take(limit)
                .cache(true)
                .useIndex('fk_attribute_simple_condition_query')
                .getMany(),
        };
    }

    async joinSingleRelationQuery({
        relation,
        skip,
        limit,
        selectList,
        alias,
        columnName,
        rawValue,
        orderBy,
        orderDirection,
    }: {
        relation: JoinAttributeRelations;
        skip: number;
        limit: number;
        selectList: string[];
        alias: string;
        columnName: string;
        rawValue: {
            value: string | number | boolean | Date | JSON;
        };
        orderBy: string;
        orderDirection: OrderType | OrderType.ASC;
    }): Promise<AttributeResponseInterface> {
        return {
            result: await this.entityManager
                .getRepository(Attributes)
                .createQueryBuilder(alias)
                .where(columnName, rawValue)
                .leftJoinAndSelect(alias + '.' + relation, relation)
                .select(selectList)
                .orderBy(orderBy, orderDirection)
                .skip(skip)
                .take(limit)
                .cache(true)
                .useIndex('fk_attribute_single_relation_query')
                .getMany(),
        };
    }

    async joinMultipleRelationQuery({
        skip,
        limit,
        selectList,
        alias,
        columnName,
        rawValue,
        orderBy,
        orderDirection,
    }: {
        skip: number;
        limit: number;
        selectList: string[];
        alias: string;
        columnName: string;
        rawValue: {
            value: string | number | boolean | Date | JSON;
        };
        orderBy: string;
        orderDirection: OrderType | OrderType.ASC;
    }): Promise<AttributeResponseInterface> {
        return {
            result: await this.entityManager
                .getRepository(Attributes)
                .createQueryBuilder(alias)
                .where(columnName, rawValue)
                .leftJoinAndSelect('attributes.options', 'options')
                .leftJoinAndSelect('attributes.rules', 'rules')
                .select(selectList)
                .orderBy(orderBy, orderDirection)
                .skip(skip)
                .take(limit)
                .cache(true)
                .useIndex('fk_attribute_single_relation_query')
                .getMany(),
        };
    }
}
