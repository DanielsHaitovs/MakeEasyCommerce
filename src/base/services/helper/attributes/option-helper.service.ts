import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Option } from '@src/attribute/relations/option/entities/option.entity';
import { OptionResponseInterface } from '@src/attribute/relations/option/interfaces/option.interface';
import { SingleConditionDto } from '@src/base/dto/filter/filters.dto';
import { EntityManager } from 'typeorm';

@Injectable()
export class OptionHelperService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}
    async singleConditionOptionQuery({
        alias,
        filters,
    }: {
        alias: string;
        filters: SingleConditionDto;
    }): Promise<OptionResponseInterface> {
        const skip = (filters.page - 1) * filters.limit;
        const selectList: string[] = [];
        let select = false;
        let where = false;
        let order = false;
        if (filters.select != null) {
            for (const addToSelect of filters.select) {
                selectList.push(alias + '.' + addToSelect);
            }
            select = true;
        }
        if (alias == 'option' && filters.columnName != null) {
            filters.columnName = alias + '.' + filters.columnName + ' = :value';
            where = true;
        }
        if (filters.orderBy != null) {
            filters.orderBy = alias + '.' + filters.orderBy;
            order = true;
        }
        console.log(filters);
        try {
            if (where && filters.columnName != '') {
                if (select) {
                    if (order) {
                        return {
                            result: await this.entityManager
                                .getRepository(Option)
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
                                .useIndex('fk_option_where_condition_query')
                                .getMany(),
                        };
                    }
                    return {
                        result: await this.entityManager
                            .getRepository(Option)
                            .createQueryBuilder(alias)
                            .where(filters.columnName, {
                                value: filters.value,
                            })
                            .select(selectList)
                            .skip(skip)
                            .take(filters.limit)
                            .cache(true)
                            .useIndex('fk_option_where_condition_query')
                            .getMany(),
                    };
                }

                if (order) {
                    return {
                        result: await this.entityManager
                            .getRepository(Option)
                            .createQueryBuilder(alias)
                            .where(filters.columnName, {
                                value: filters.value,
                            })
                            .orderBy(filters.orderBy, filters.orderDirection)
                            .skip(skip)
                            .take(filters.limit)
                            .cache(true)
                            .useIndex('fk_option_where_condition_query')
                            .getMany(),
                    };
                }
                return {
                    result: await this.entityManager
                        .getRepository(Option)
                        .createQueryBuilder(alias)
                        .where(filters.columnName, {
                            value: filters.value,
                        })
                        .skip(skip)
                        .take(filters.limit)
                        .cache(true)
                        .useIndex('fk_option_where_condition_query')
                        .getMany(),
                };
            }

            if (select) {
                if (order) {
                    return {
                        result: await this.entityManager
                            .getRepository(Option)
                            .createQueryBuilder(alias)
                            .select(selectList)
                            .orderBy(filters.orderBy, filters.orderDirection)
                            .skip(skip)
                            .take(filters.limit)
                            .cache(true)
                            .useIndex('fk_option_select_condition_query')
                            .getMany(),
                    };
                }
                return {
                    result: await this.entityManager
                        .getRepository(Option)
                        .createQueryBuilder(alias)
                        .select(selectList)
                        .skip(skip)
                        .take(filters.limit)
                        .cache(true)
                        .useIndex('fk_option_select_condition_query')
                        .getMany(),
                };
            }

            if (order) {
                return {
                    result: await this.entityManager
                        .getRepository(Option)
                        .createQueryBuilder(alias)
                        .orderBy(filters.orderBy, filters.orderDirection)
                        .skip(skip)
                        .take(filters.limit)
                        .cache(true)
                        .useIndex('fk_option_ordered_condition_query')
                        .getMany(),
                };
            }
            return {
                result: await this.entityManager
                    .getRepository(Option)
                    .createQueryBuilder(alias)
                    .skip(skip)
                    .take(filters.limit)
                    .cache(true)
                    .useIndex('fk_option_query')
                    .getMany(),
            };
        } catch (e) {
            return {
                error: {
                    message: e.message,
                    in: 'Option Helper Query',
                },
            };
        }
    }
}
