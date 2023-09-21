import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Attributes } from '@src/attribute/entities/attributes.entity';
import { AttributeResponseInterface } from '@src/attribute/interfaces/attribute.interface';
import { AttributeSingleConditionDto } from '@src/base/dto/filter/filters.dto';
import { JoinAttributeRelations } from '@src/base/enum/attributes/attribute-type.enum';
import { OrderType } from '@src/base/enum/query/query.enum';
import { EntityManager } from 'typeorm';

export const aliases = ['attributes', 'options', 'rules'];
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
        let selectList: string[] = [];
        let rawValue = null;
        let columnName = '';

        if (filters.select != null && filters.select[0] != null) {
            for (const addToSelect of filters.select) {
                if (!aliases.includes(addToSelect)) {
                    selectList.push(alias + '.' + addToSelect);
                } else {
                    selectList.push(addToSelect);
                }
            }
        } else {
            selectList = null;
        }
        console.log(selectList);
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
                rawValue: rawValue,
                orderBy: filters.orderBy,
                orderDirection: OrderType[filters.orderDirection],
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
        orderDirection: OrderType | OrderType.NO;
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
        orderDirection: OrderType | OrderType.NO;
    }): Promise<AttributeResponseInterface> {
        return {
            result: await this.entityManager
                .getRepository(Attributes)
                .createQueryBuilder(alias)
                .where(columnName, rawValue)
                .select(selectList)
                .leftJoinAndSelect(alias + '.' + relation, relation)
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
        orderDirection: OrderType | OrderType.NO;
    }): Promise<AttributeResponseInterface> {
        return {
            result: await this.entityManager
                .getRepository(Attributes)
                .createQueryBuilder(alias)
                .where(columnName, rawValue)
                .select(selectList)
                .leftJoinAndSelect('attributes.options', 'options')
                .leftJoinAndSelect('attributes.rules', 'rules')
                .orderBy(orderBy, orderDirection)
                .skip(skip)
                .take(limit)
                .cache(true)
                .useIndex('fk_attribute_single_relation_query')
                .getMany(),
        };
    }
}
