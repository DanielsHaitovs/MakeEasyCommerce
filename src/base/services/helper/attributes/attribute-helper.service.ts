import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Attributes } from '@src/attribute/entities/attributes.entity';
import { AttributeResponseInterface } from '@src/attribute/interfaces/attribute.interface';
import { SingleConditionDto } from '@src/base/dto/filter/filters.dto';
import { EntityManager } from 'typeorm';

@Injectable()
export class AttributeHelperService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}
    async singleConditionAttributeQuery({
        alias,
        filters,
    }: {
        alias: string;
        filters: SingleConditionDto;
    }): Promise<AttributeResponseInterface> {
        const skip = (filters.page - 1) * filters.limit;
        const selectList: string[] = [];
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
            if (where && filters.columnName != '') {
                if (select) {
                    if (order) {
                        return {
                            result: await this.entityManager
                                .getRepository(Attributes)
                                .createQueryBuilder(alias)
                                .where(filters.columnName, {
                                    value: filters.value,
                                })
                                .select(selectList)
                                .orderBy(
                                    filters.orderBy,
                                    filters.orderDirection,
                                )
                                .skip(skip)
                                .take(filters.limit)
                                .cache(true)
                                .useIndex('fk_attribute_where_condition_query')
                                .getMany(),
                        };
                    }
                    return {
                        result: await this.entityManager
                            .getRepository(Attributes)
                            .createQueryBuilder(alias)
                            .where(filters.columnName, {
                                value: filters.value,
                            })
                            .select(selectList)
                            .skip(skip)
                            .take(filters.limit)
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
                            .where(filters.columnName, {
                                value: filters.value,
                            })
                            .orderBy(filters.orderBy, filters.orderDirection)
                            .skip(skip)
                            .take(filters.limit)
                            .cache(true)
                            .useIndex('fk_attribute_where_condition_query')
                            .getMany(),
                    };
                }
                return {
                    result: await this.entityManager
                        .getRepository(Attributes)
                        .createQueryBuilder(alias)
                        .where(filters.columnName, {
                            value: filters.value,
                        })
                        .skip(skip)
                        .take(filters.limit)
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
                            .orderBy(filters.orderBy, filters.orderDirection)
                            .skip(skip)
                            .take(filters.limit)
                            .cache(true)
                            .useIndex('fk_attribute_select_condition_query')
                            .getMany(),
                    };
                }
                console.log(4765);
                console.log(filters);
                console.log(selectList);
                const res = await this.entityManager
                    .getRepository(Attributes)
                    .createQueryBuilder('attributes')
                    // .select(['attributes.id', 'attributes.description.name'])
                    .getMany();

                console.log(res);
                return {
                    result: res,
                };
                // return {
                //     result: await this.entityManager
                //         .getRepository(Attributes)
                //         .createQueryBuilder(alias)
                //         .select([''])
                //         .skip(skip)
                //         .take(filters.limit)
                //         .cache(true)
                //         .useIndex('fk_attribute_select_condition_query')
                //         .getMany(),
                // };
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
                    .take(filters.limit)
                    .cache(true)
                    .useIndex('fk_attribute_query')
                    .getMany(),
            };
        } catch (e) {
            return {
                error: {
                    message: e.message,
                    in: 'Attributes Helper Query',
                },
            };
        }
    }
}
