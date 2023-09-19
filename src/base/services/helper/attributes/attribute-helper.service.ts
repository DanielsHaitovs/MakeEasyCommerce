import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Attributes } from '@src/attribute/entities/attributes.entity';
import { AttributeResponseInterface } from '@src/attribute/interfaces/attribute.interface';
import { AttributeSingleConditionDto } from '@src/base/dto/filter/filters.dto';
import { OrderType } from '@src/base/enum/query/query.enum';
import { EntityManager } from 'typeorm';

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
        const selectList: string[] = [];
        const alias = 'attributes';
        let select = false;
        let where = false;
        let order = false;
        if (filters.select != null) {
            for (const addToSelect of filters.select) {
                selectList.push(alias + '.' + addToSelect);
            }

            console.log(selectList);
            select = true;
        }
        if (alias == 'attributes' && filters.columnName != null) {
            filters.columnName = alias + '.' + filters.columnName + ' = :value';
            where = true;
        }
        if (filters.orderBy != null) {
            filters.orderBy = alias + '.' + filters.orderBy;
            order = true;
        }
        try {
            if (filters.joinOptions === true && filters.joinRules === true) {
            }

            if (filters.joinRules === true || filters.joinOptions === true) {
            }
            return await this.nonRelationQuery({
                skip: skip,
                limit: filters.limit,
                select: select,
                selectList: selectList,
                alias: alias,
                where: where,
                columnName: filters.columnName,
                rawValue: filters.value,
                order: order,
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
        select,
        selectList,
        alias,
        where,
        columnName,
        rawValue,
        order,
        orderBy,
        orderDirection,
    }: {
        skip: number;
        limit: number;
        select: boolean;
        selectList: string[];
        alias: string;
        where: boolean;
        columnName: string;
        rawValue: string | number | boolean | Date | JSON;
        order: boolean;
        orderBy: string;
        orderDirection: OrderType;
    }): Promise<AttributeResponseInterface> {
        if (where && columnName != '') {
            if (select) {
                if (order) {
                    return {
                        result: await this.entityManager
                            .getRepository(Attributes)
                            .createQueryBuilder(alias)
                            .where(columnName, {
                                value: rawValue,
                            })
                            .select(selectList)
                            .orderBy(orderBy, orderDirection)
                            .skip(skip)
                            .take(limit)
                            .cache(true)
                            .useIndex('fk_attribute_where_condition_query')
                            .getMany(),
                    };
                }
                return {
                    result: await this.entityManager
                        .getRepository(Attributes)
                        .createQueryBuilder(alias)
                        .where(columnName, {
                            value: rawValue,
                        })
                        .select(selectList)
                        .skip(skip)
                        .take(limit)
                        .cache(true)
                        .useIndex('fk_attribute_where_condition_query')
                        .getMany(),
                };
            }

            if (order) {
                return {
                    result: await this.entityManager
                        .getRepository(Attributes)
                        .createQueryBuilder(alias)
                        .where(columnName, {
                            value: rawValue,
                        })
                        .orderBy(orderBy, orderDirection)
                        .skip(skip)
                        .take(limit)
                        .cache(true)
                        .useIndex('fk_attribute_where_condition_query')
                        .getMany(),
                };
            }
            return {
                result: await this.entityManager
                    .getRepository(Attributes)
                    .createQueryBuilder(alias)
                    .where(columnName, {
                        value: rawValue,
                    })
                    .skip(skip)
                    .take(limit)
                    .cache(true)
                    .useIndex('fk_attribute_where_condition_query')
                    .getMany(),
            };
        }

        if (select) {
            if (order) {
                return {
                    result: await this.entityManager
                        .getRepository(Attributes)
                        .createQueryBuilder(alias)
                        .select(selectList)
                        .orderBy(orderBy, orderDirection)
                        .skip(skip)
                        .take(limit)
                        .cache(true)
                        .useIndex('fk_attribute_select_condition_query')
                        .getMany(),
                };
            }
            return {
                result: await this.entityManager
                    .getRepository(Attributes)
                    .createQueryBuilder(alias)
                    .select([''])
                    .skip(skip)
                    .take(limit)
                    .cache(true)
                    .useIndex('fk_attribute_select_condition_query')
                    .getMany(),
            };
        }

        if (order) {
            console.log('here');
            return {
                result: await this.entityManager
                    .getRepository(Attributes)
                    .createQueryBuilder(alias)
                    .getMany(),
            };
        }
        return {
            result: await this.entityManager
                .getRepository(Attributes)
                .createQueryBuilder(alias)
                .skip(skip)
                .take(limit)
                .cache(true)
                .useIndex('fk_attribute_query')
                .getMany(),
        };
    }
    catch(e) {
        return {
            error: {
                message: e.message,
                in: 'Attributes Helper Query',
            },
        };
    }
}
