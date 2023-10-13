import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { StoreOptionFilters } from '@src/base/dto/filter/store/store-filters.dto';
import { OrderType } from '@src/base/enum/query/query.enum';
import { StoreViewOption } from '@src/store/relations/store-attribute/entities/store-attribute/attribute-option.entity';
import {
    GetStoreOptionI,
    StoreOptionResponseI,
} from '@src/store/relations/store-attribute/interface/store-attributes/attributes-option.interface';
import { EntityManager } from 'typeorm';
export const alias = 'storeOption';
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
        filters: StoreOptionFilters;
    }): Promise<StoreOptionResponseI> {
        let storeViewColumn = '';
        let storeViewValue = null;
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

        if (filters.storeViewId != null) {
            storeViewColumn = alias + '.storeView = :storeView';
            storeViewValue = {
                storeView: filters.storeViewId,
            };
        }

        if (!filters.many || filters.many === null) {
            try {
                return await this.singleNonRelationQuery({
                    storeViewColumn: storeViewColumn,
                    storeViewValue: storeViewValue,
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
                storeViewColumn: storeViewColumn,
                storeViewValue: storeViewValue,
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

    private async singleNonRelationQuery({
        storeViewColumn,
        storeViewValue,
        selectList,
        columnName,
        rawValue,
        orderBy,
        orderDirection,
    }: {
        storeViewColumn: string;
        storeViewValue: {
            storeViewId: number;
        };
        selectList: string[];
        columnName: string;
        rawValue: {
            value: string | number | boolean | Date | JSON;
        };
        orderBy: string;
        orderDirection: OrderType | OrderType.ASC;
    }): Promise<StoreOptionResponseI> {
        if (storeViewValue === null) {
            const result: GetStoreOptionI = await this.entityManager
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
        }

        const storeViewResult: GetStoreOptionI = await this.entityManager
            .getRepository(StoreViewOption)
            .createQueryBuilder(alias)
            .where(columnName, rawValue)
            .andWhere(storeViewColumn, storeViewValue)
            .select(selectList)
            .orderBy(orderBy, orderDirection)
            .cache(true)
            .useIndex(indexKey)
            .getOne();

        if (storeViewResult != null) {
            return {
                status: '200',
                message: 'Success',
                result: storeViewResult,
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

    private async nonRelationQuery({
        storeViewColumn,
        storeViewValue,
        skip,
        limit,
        selectList,
        columnName,
        rawValue,
        orderBy,
        orderDirection,
    }: {
        storeViewColumn: string;
        storeViewValue: {
            storeViewId: number;
        };
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
        if (storeViewValue === null) {
            const result: GetStoreOptionI[] = await this.entityManager
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
        }
        const storeViewResult: GetStoreOptionI[] = await this.entityManager
            .getRepository(StoreViewOption)
            .createQueryBuilder(alias)
            .where(columnName, rawValue)
            .andWhere(storeViewColumn, storeViewValue)
            .select(selectList)
            .orderBy(orderBy, orderDirection)
            .skip(skip)
            .take(limit)
            .cache(true)
            .useIndex(indexKey)
            .getMany();

        if (storeViewResult.length > 0) {
            return {
                status: '200',
                message: 'Success',
                result: storeViewResult,
            };
        }

        if (rawValue === null) {
            return {
                status: '404',
                message: 'Store Options Not Found',
                error: {
                    message: 'Could not find any record',
                    in: 'Store Attribute Option Helper Service',
                },
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
}
