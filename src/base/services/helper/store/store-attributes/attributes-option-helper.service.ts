import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { SingleConditionDto } from '@src/base/dto/filter/filters.dto';
import { OrderType } from '@src/base/enum/query/query.enum';
import { StoreViewOption } from '@src/store/relations/store-attribute/entities/store-attribute/attribute-option.entity';
import { StoreOptionResponseI } from '@src/store/relations/store-attribute/interface/store-attributes/attributes-option.interface';
import { EntityManager } from 'typeorm';
export const alias = 'storeOptions';
export const indexKey = 'fk_store_view_option_query';
@Injectable()
export class StoreOptionHelperService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}
    async singleConditionOptionQuery({
        filters,
    }: {
        alias: string;
        filters: SingleConditionDto;
    }): Promise<StoreOptionResponseI> {
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

        if (!filters.many || filters.many === null) {
            try {
                return await this.singleNonRelationQuery({
                    selectList: ruleList,
                    columnName: columnName,
                    rawValue: rawValue,
                    orderBy: orderBy,
                    orderDirection: filters.orderDirection,
                });
            } catch (e) {
                return {
                    status: '666',
                    message: 'Ups, Error',
                    error: {
                        message: e.message,
                        in: 'Store Option Helper Query',
                    },
                };
            }
        }
        try {
            return await this.nonRelationQuery({
                skip: skip,
                limit: filters.limit,
                selectList: ruleList,
                columnName: columnName,
                rawValue: rawValue,
                orderBy: orderBy,
                orderDirection: filters.orderDirection,
            });
        } catch (e) {
            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    message: e.message,
                    in: 'Store Option Helper Query',
                },
            };
        }
    }

    private async nonRelationQuery({
        skip,
        limit,
        selectList,
        columnName,
        rawValue,
        orderBy,
        orderDirection,
    }: {
        skip: number;
        limit: number;
        selectList: string[];
        columnName: string;
        rawValue: {
            value: string | number | boolean | Date | JSON;
        };
        orderBy: string;
        orderDirection: OrderType | OrderType.ASC;
    }): Promise<StoreOptionResponseI> {
        const result = await this.entityManager
            .getRepository(StoreViewOption)
            .createQueryBuilder(alias)
            .where(columnName, rawValue)
            .select(selectList)
            .orderBy(orderBy, orderDirection)
            .skip(skip)
            .take(limit)
            .cache(true)
            .useIndex(indexKey)
            .getMany();

        if (result != null) {
            return {
                status: '200',
                message: 'Success',
                result: result,
            };
        }

        return {
            status: '404',
            message: 'Store Options Not Found',
            error: {
                message:
                    'Column ' +
                    columnName +
                    ' with value ' +
                    rawValue.value +
                    ' not found',
                in: 'Store Attribute Option Helper Service',
            },
        };
    }

    private async singleNonRelationQuery({
        selectList,
        columnName,
        rawValue,
        orderBy,
        orderDirection,
    }: {
        selectList: string[];
        columnName: string;
        rawValue: {
            value: string | number | boolean | Date | JSON;
        };
        orderBy: string;
        orderDirection: OrderType | OrderType.ASC;
    }): Promise<StoreOptionResponseI> {
        const result = await this.entityManager
            .getRepository(StoreViewOption)
            .createQueryBuilder(alias)
            .where(columnName, rawValue)
            .select(selectList)
            .orderBy(orderBy, orderDirection)
            .cache(true)
            .useIndex(indexKey)
            .getOne();

        if (result != null) {
            return {
                status: '200',
                message: 'Success',
                result: result,
            };
        }

        return {
            status: '404',
            message: 'Store Option Not Found',
            error: {
                message:
                    'Column ' +
                    columnName +
                    ' with value ' +
                    rawValue.value +
                    ' not found',
                in: 'Store Attribute Option Helper Service',
            },
        };
    }
}
