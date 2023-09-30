import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { SingleConditionDto } from '@src/base/dto/filter/filters.dto';
import { OrderType } from '@src/base/enum/query/query.enum';
import { Store } from '@src/stores/entities/store.entity';
import {
    GetStoreI,
    StoreResponseI,
} from '@src/stores/interfaces/store.interface';
import { StoreView } from '@src/store-view/entities/store-view.entity';
import { StoreViewResponseI } from '@src/store-view/interfaces/store-view.interface';
import { EntityManager } from 'typeorm';
// Bastard, Typeorm support reading tables schema data
export const StoreColumnsList: string[] = [
    // 'useInCatalog',
    // 'useInListing',
    // 'useInLayeredNavigation',
    // 'useInFilter',
    // 'useInOptionFilter',
    // 'useInSort',
    // 'useInSearch',
    // 'useInPromo',
    // 'useInReport',
];
export const StoreAlias = 'store';
export const StoreViewAlias = 'store_view';

// This helper class is really bad...
// it has 4 function and 2 of them are duplicates...
// Future me, rewrite it!! ref at the bottom
@Injectable()
export class StoreHelperService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}

    async ifExists({
        name,
        code,
    }: {
        name: string;
        code: string;
    }): Promise<boolean> {
        return await this.entityManager
            .getRepository(Store)
            .createQueryBuilder(StoreAlias)
            .where('store.name = :name', { name })
            .orWhere('store.code = :code', { code })
            .getExists();
    }

    async ifStoreViewExists({
        name,
        code,
    }: {
        name: string;
        code: string;
    }): Promise<boolean> {
        return await this.entityManager
            .getRepository(Store)
            .createQueryBuilder(StoreViewAlias)
            .where('store_view.name = :name', { name })
            .orWhere('store_view.code = :code', { code })
            .getExists();
    }

    async singleConditionStoreQuery({
        filters,
    }: {
        filters: SingleConditionDto;
    }): Promise<StoreResponseI> {
        const skip = (filters.page - 1) * filters.limit;
        let storeList: string[] = [];
        let rawValue = null;
        let columnName = '';
        let orderBy = '';
        if (filters.select != null && filters.select[0] != undefined) {
            for (const addToSelect of StoreColumnsList) {
                storeList.push(
                    StoreAlias + '.' + filters.select[0] + '.' + addToSelect,
                );
            }
        } else {
            storeList = null;
        }
        if (filters.columnName != null && filters.columnName != '') {
            columnName = StoreAlias + '.' + filters.columnName + ' = :value';
            rawValue = {
                value: filters.value,
            };
        }

        if (filters.orderBy != null) {
            orderBy = StoreAlias + '.' + filters.orderBy;
        }
        try {
            return {
                status: '200',
                message: 'Success',
                result: await this.nonRelationQuery({
                    skip: skip,
                    limit: filters.limit,
                    selectList: storeList,
                    columnName: columnName,
                    rawValue: rawValue,
                    orderBy: orderBy,
                    orderDirection: filters.orderDirection,
                }),
            };
        } catch (e) {
            return {
                status: '600',
                message: 'Ups, Error',
                error: {
                    message: e.message,
                    in: 'Store Helper Query',
                },
            };
        }
    }

    async singleConditionStoreViewQuery({
        filters,
    }: {
        filters: SingleConditionDto;
    }): Promise<StoreViewResponseI> {
        const skip = (filters.page - 1) * filters.limit;
        let storeList: string[] = [];
        let rawValue = null;
        let columnName = '';
        let orderBy = '';
        if (filters.select != null && filters.select[0] != undefined) {
            for (const addToSelect of StoreColumnsList) {
                storeList.push(
                    StoreViewAlias +
                        '.' +
                        filters.select[0] +
                        '.' +
                        addToSelect,
                );
            }
        } else {
            storeList = null;
        }
        if (filters.columnName != null && filters.columnName != '') {
            columnName =
                StoreViewAlias + '.' + filters.columnName + ' = :value';
            rawValue = {
                value: filters.value,
            };
        }

        if (filters.orderBy != null) {
            orderBy = StoreViewAlias + '.' + filters.orderBy;
        }
        try {
            return await this.nonRelationStoreViewQuery({
                skip: skip,
                limit: filters.limit,
                selectList: storeList,
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
                    in: 'Store View Helper Query',
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
    }): Promise<GetStoreI[]> {
        return await this.entityManager
            .getRepository(Store)
            .createQueryBuilder(StoreAlias)
            .where(columnName, rawValue)
            .select(selectList)
            .orderBy(orderBy, orderDirection)
            .skip(skip)
            .take(limit)
            .cache(true)
            .useIndex('fk_store_simple_condition_query')
            .getMany();
    }

    // I'm lazy, this this and "nonRelationQuery" function are duplicates...
    // In common time will be "okay.." to do via switch?maybe
    // Later I'll pass entity as construct through function
    private async nonRelationStoreViewQuery({
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
    }): Promise<StoreViewResponseI> {
        return {
            status: '200',
            message: 'Success',
            result: await this.entityManager
                .getRepository(StoreView)
                .createQueryBuilder(StoreViewAlias)
                .where(columnName, rawValue)
                .select(selectList)
                .orderBy(orderBy, orderDirection)
                .skip(skip)
                .take(limit)
                .cache(true)
                .useIndex('fk_store_view_simple_condition_query')
                .getMany(),
        };
    }
}
