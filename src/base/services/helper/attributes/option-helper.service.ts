import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Option } from '@src/attribute/relations/option/entities/option.entity';
import { OptionResponseInterface } from '@src/attribute/relations/option/interfaces/option.interface';
import { SingleConditionDto } from '@src/base/dto/filter/filters.dto';
import { OrderType } from '@src/base/enum/query/query.enum';
import { EntityManager } from 'typeorm';

export const alias = 'options';
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
        let ruleList: string[] = [];
        let rawValue = null;
        let columnName = '';
        let orderBy = '';
        if (filters.select != null && filters.select[0] != null) {
            for (const addToSelect of filters.select) {
                ruleList.push(
                    alias + '.' + filters.select[0] + '.' + addToSelect,
                );
            }
        } else {
            ruleList = null;
        }
        if (filters.columnName != null && filters.columnName != '') {
            columnName = alias + '.' + filters.columnName + ' = :value';
            rawValue = {
                value: filters.value,
            };
        }

        if (filters.orderBy != null) {
            orderBy = alias + '.' + filters.orderBy;
        }
        try {
            return await this.nonRelationQuery({
                skip: skip,
                limit: filters.limit,
                selectList: ruleList,
                alias: alias,
                columnName: columnName,
                rawValue: rawValue,
                orderBy: orderBy,
                orderDirection: filters.orderDirection,
            });
        } catch (e) {
            return {
                error: {
                    message: e.message,
                    in: 'Option Helper Query',
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
    }): Promise<OptionResponseInterface> {
        return {
            result: await this.entityManager
                .getRepository(Option)
                .createQueryBuilder(alias)
                .where(columnName, rawValue)
                .select(selectList)
                .orderBy(orderBy, orderDirection)
                .skip(skip)
                .take(limit)
                .cache(true)
                .useIndex('fk_option_simple_condition_query')
                .getMany(),
        };
    }
}
