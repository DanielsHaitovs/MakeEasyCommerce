import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { StoreRuleFilters } from '@src/base/dto/filter/store/store-filters.dto';
import { OrderType } from '@src/base/enum/query/query.enum';
import { StoreViewRule } from '@src/store/relations/store-attribute/entities/store-attribute/attribute-rule.entity';
import {
    GetStoreRuleI,
    StoreRuleResponseI,
} from '@src/store/relations/store-attribute/interface/store-attributes/attributes-rule.interface';
import { EntityManager } from 'typeorm';

export const alias = 'storeRule';
export const indexKey = 'fk_store_view_rule_query';
export const RuleList: string[] = [
    'useInCatalog',
    'useInListing',
    'useInLayeredNavigation',
    'useInFilter',
    'useInOptionFilter',
    'useInSort',
    'useInSearch',
    'useInPromo',
    'useInReport',
];

@Injectable()
export class StoreRuleHelperService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}
    async singleConditionRuleQuery({
        filters,
    }: {
        filters: StoreRuleFilters;
    }): Promise<StoreRuleResponseI> {
        let storeViewColumn = '';
        let storeViewValue = null;
        const skip = (filters.page - 1) * filters.limit;
        let modifiedRuleList: string[] = [];
        let rawValue = null;
        let columnName = '';
        let orderBy = '';
        if (filters.select != null && filters.select[0] != undefined) {
            for (const addToSelect of RuleList) {
                modifiedRuleList.push(
                    alias + '.' + filters.select[0] + '.' + addToSelect,
                );
            }
        } else {
            modifiedRuleList = null;
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
                    selectList: modifiedRuleList,
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
                        in: 'Store Rule Helper Query',
                    },
                };
            }
        }

        try {
            return await this.nonRelationQuery({
                skip: skip,
                limit: filters.limit,
                storeViewColumn: storeViewColumn,
                storeViewValue: storeViewValue,
                selectList: modifiedRuleList,
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
                    in: 'Store Rule Helper Query',
                },
            };
        }
    }

    async findByStoreViewAndAttribute({
        storeAttribute,
        storeViewId,
    }: {
        storeAttribute: number;
        storeViewId: number;
    }): Promise<StoreRuleResponseI> {
        const result: GetStoreRuleI = await this.entityManager
            .getRepository(StoreViewRule)
            .createQueryBuilder(alias)
            .where(alias + '.storeAttribute = :storeAttribute', {
                storeAttribute: storeAttribute,
            })
            .andWhere(alias + '.storeView = :storeView', {
                storeView: storeViewId,
            })
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
            message: 'Rule Not Found',
            error: {
                message:
                    'Store Rule for attribute ' +
                    storeAttribute +
                    ' for store view id ' +
                    storeViewId +
                    ' not found',
                in: 'Store Attribute Rule Helper Service',
            },
        };
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
    }): Promise<StoreRuleResponseI> {
        if (storeViewValue === null) {
            const result: GetStoreRuleI = await this.entityManager
                .getRepository(StoreViewRule)
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

        const storeViewResult: GetStoreRuleI = await this.entityManager
            .getRepository(StoreViewRule)
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
            message: 'Rule Not Found',
            error: {
                message:
                    'Column ' +
                    columnName +
                    ' with value ' +
                    rawValue.value +
                    ' not found',
                in: 'Store Attribute Rule Helper Service',
            },
        };
    }

    private async nonRelationQuery({
        skip,
        limit,
        storeViewColumn,
        storeViewValue,
        selectList,
        columnName,
        rawValue,
        orderBy,
        orderDirection,
    }: {
        skip: number;
        limit: number;
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
    }): Promise<StoreRuleResponseI> {
        if (storeViewValue === null) {
            const result: GetStoreRuleI[] = await this.entityManager
                .getRepository(StoreViewRule)
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

        const storeViewResult: GetStoreRuleI[] = await this.entityManager
            .getRepository(StoreViewRule)
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

        if (storeViewResult != null) {
            return {
                status: '200',
                message: 'Success',
                result: storeViewResult,
            };
        }
        return {
            status: '404',
            message: 'Rule Not Found',
            error: {
                message:
                    'Column ' +
                    columnName +
                    ' with value ' +
                    rawValue.value +
                    ' not found',
                in: 'Store Attribute Rule Helper Service',
            },
        };
    }
}
