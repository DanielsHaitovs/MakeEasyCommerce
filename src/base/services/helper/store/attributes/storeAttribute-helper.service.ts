import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Attributes } from '@src/attribute/entities/attributes.entity';
import { GetAttributeI } from '@src/attribute/interfaces/attribute.interface';
import { StoreAttributeFilters } from '@src/base/dto/filter/store/store-filters.dto';
import { OrderType } from '@src/base/enum/query/query.enum';
import { StoreAttribute } from '@src/store/relations/store-attribute/entities/store-attribute.entity';
import {
    GetStoreAttributeI,
    GetStoreAttributeShortI,
    StoreAttributeResponseI,
    StoreShortAttributeResponseI,
} from '@src/store/relations/store-attribute/interface/store-attribute.interface';
import { EntityManager } from 'typeorm';
// Bastard, Typeorm supports reading tables schema data
export const StoreColumnsList: string[] = [];
export const DefaultAttributeAlias = 'default_attribute';
export const StoreAttributeAlias = 'store_attribute';
export const StoreViewAlias = 'store_view';
export const indexKey = 'fk_store_view_attribute_query';

// This helper class is really bad...
// it has 4 function and 2 of them are duplicates...
// Future me, rewrite it!! ref at the bottom
@Injectable()
export class StoreAttributeHelperService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}

    async ifAttributeExists({
        storeViewId,
        relatedAttributeId,
    }: {
        storeViewId: number;
        relatedAttributeId: number;
    }): Promise<boolean> {
        return await this.entityManager
            .getRepository(StoreAttribute)
            .createQueryBuilder(StoreAttributeAlias)
            .where(StoreAttributeAlias + '.storeView = :storeView', {
                storeView: storeViewId,
            })
            .andWhere(
                StoreAttributeAlias + '.defaultAttribute = :defaultAttribute',
                { defaultAttribute: relatedAttributeId },
            )
            .getExists();
    }

    async isAttributeDefault({
        storeViewId,
        relatedAttributeId,
    }: {
        storeViewId: number;
        relatedAttributeId: number;
    }): Promise<boolean> {
        return await this.entityManager
            .getRepository(StoreAttribute)
            .createQueryBuilder(StoreAttributeAlias)
            .where(StoreAttributeAlias + '.storeView = :storeView', {
                storeView: storeViewId,
            })
            .andWhere(
                StoreAttributeAlias + '.relatedAttribute = :relatedAttribute',
                { relatedAttribute: relatedAttributeId },
            )
            .andWhere(StoreAttributeAlias + '.useDefault = :useDefault', {
                useDefault: true,
            })
            .getExists();
    }

    async findAttributeDefaultCode({
        relatedAttributeId,
    }: {
        relatedAttributeId: number;
    }): Promise<GetAttributeI> {
        try {
            return await this.entityManager
                .getRepository(Attributes)
                .createQueryBuilder(DefaultAttributeAlias)
                .where(DefaultAttributeAlias + '.id = :id', {
                    id: relatedAttributeId,
                })
                .select([DefaultAttributeAlias + '.description.code'])
                .getOne();
        } catch (e) {
            return e.message;
        }
    }

    async findStoreShortAttributeQuery({
        filters,
    }: {
        filters: StoreAttributeFilters;
    }): Promise<StoreShortAttributeResponseI> {
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
                    StoreAttributeAlias +
                        '.' +
                        filters.select[0] +
                        '.' +
                        addToSelect,
                );
            }
        } else {
            ruleList = null;
        }

        if (filters.columnName != null && filters.columnName != '') {
            columnName =
                StoreAttributeAlias + '.' + filters.columnName + ' = :value';
            rawValue = {
                value: filters.value,
            };
        }

        if (filters.orderBy != null) {
            orderBy = StoreAttributeAlias + '.' + filters.orderBy;
        }

        if (filters.storeViewId != null) {
            storeViewColumn = StoreAttributeAlias + '.storeView = :storeView';
            storeViewValue = {
                storeView: filters.storeViewId,
            };
        }

        if (!filters.many || filters.many === null) {
            try {
                return await this.oneNonRelationQuery({
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
                        in: 'Store Attribute Helper Query',
                    },
                };
            }
        }
        try {
            return await this.manyNonRelationQuery({
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
            console.log(e);
            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    message: e.message,
                    in: 'Store Attribute (Option?) Helper Query',
                },
            };
        }
    }

    async findStoreAttributeRelationsQuery({
        filters,
    }: {
        filters: StoreAttributeFilters;
    }): Promise<StoreAttributeResponseI> {
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
                    StoreAttributeAlias +
                        '.' +
                        filters.select[0] +
                        '.' +
                        addToSelect,
                );
            }
        } else {
            ruleList = null;
        }

        if (filters.columnName != null && filters.columnName != '') {
            columnName =
                StoreAttributeAlias + '.' + filters.columnName + ' = :value';
            rawValue = {
                value: filters.value,
            };
        }

        if (filters.orderBy != null) {
            orderBy = StoreAttributeAlias + '.' + filters.orderBy;
        }

        if (filters.storeViewId != null) {
            storeViewColumn = StoreAttributeAlias + '.storeView = :storeView';
            storeViewValue = {
                storeView: filters.storeViewId,
            };
        }

        if (!filters.many || filters.many === null) {
            try {
                return await this.oneRelationQuery({
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
                        in: 'Store Attribute Helper Query',
                    },
                };
            }
        }
        try {
            return await this.manyRelationQuery({
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
                    in: 'Store Attributes (Options?) Helper Query',
                },
            };
        }
    }

    async oneNonRelationQuery({
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
    }): Promise<StoreShortAttributeResponseI> {
        if (storeViewValue === null) {
            const result: GetStoreAttributeShortI = await this.entityManager
                .getRepository(StoreAttribute)
                .createQueryBuilder(StoreAttributeAlias)
                .where(columnName, rawValue)
                .leftJoinAndSelect(
                    StoreAttributeAlias + '.rule',
                    'attributeRule',
                )
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

        const storeViewResult: GetStoreAttributeShortI =
            await this.entityManager
                .getRepository(StoreAttribute)
                .createQueryBuilder(StoreAttributeAlias)
                .where(columnName, rawValue)
                .andWhere(storeViewColumn, storeViewValue)
                .leftJoinAndSelect(
                    StoreAttributeAlias + '.rule',
                    'attributeRule',
                )
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
            message: 'Store Attribute Not Found',
            error: {
                message:
                    'Column ' +
                    columnName +
                    ' with value ' +
                    rawValue.value +
                    ' not found',
                in: 'Store Attribute Helper Service',
            },
        };
    }

    async manyNonRelationQuery({
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
    }): Promise<StoreShortAttributeResponseI> {
        if (storeViewValue === null) {
            const result = await this.entityManager
                .getRepository(StoreAttribute)
                .createQueryBuilder(StoreAttributeAlias)
                .where(columnName, rawValue)
                // .leftJoinAndSelect(
                //     StoreAttributeAlias + '.rule',
                //     'attributeRule',
                // )
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

        // This query is complex cuz options are Many to One relation to Store Attribute Description
        // Which itself is represented as One to One by Store Attribute
        const storeViewResult =
            await this.entityManager
                .getRepository(StoreAttribute)
                .createQueryBuilder('store_attribute')
                // .leftJoinAndSelect('store_attribute.attribute', 'attribute')
                // .leftJoinAndSelect('store_attribute.rule', 'rule')
                // .leftJoinAndSelect('store_attribute.storeOption', 'storeOption')
                .getMany();
                // .where(columnName, rawValue)
                // .andWhere(storeViewColumn, storeViewValue)
                // .leftJoinAndSelect(
                //     StoreAttributeAlias + '.rule',
                //     'attributeRule',
                // )
                // .select(selectList)
                // .orderBy(orderBy, orderDirection)
                // .skip(skip)
                // .take(limit)
                // .cache(true)
                // .useIndex(indexKey)

        if (storeViewResult != null) {
            return {
                status: '200',
                message: 'Success',
                result: storeViewResult,
            };
        }

        return {
            status: '404',
            message: 'Store Attribute Not Found',
            error: {
                message:
                    'Column ' +
                    columnName +
                    ' with value ' +
                    rawValue.value +
                    ' not found',
                in: 'Store Attribute Helper Service',
            },
        };
    }

    async oneRelationQuery({
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
    }): Promise<StoreAttributeResponseI> {
        if (storeViewValue === null) {
            const result: GetStoreAttributeI = await this.entityManager
                .getRepository(StoreAttribute)
                .createQueryBuilder(StoreAttributeAlias)
                .where(columnName, rawValue)
                .select(selectList)
                .leftJoinAndSelect(
                    StoreAttributeAlias + '.storeAttribute',
                    'storeAttribute',
                )
                .leftJoinAndSelect('storeAttribute.storeOption', 'storeOption')
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

        const storeViewResult: GetStoreAttributeI = await this.entityManager
            .getRepository(StoreAttribute)
            .createQueryBuilder(StoreAttributeAlias)
            .where(columnName, rawValue)
            .select(selectList)
            .leftJoinAndSelect(
                StoreAttributeAlias + '.storeAttribute',
                'storeAttribute',
            )
            .leftJoinAndSelect('storeAttribute.storeOption', 'storeOption')
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
            message: 'Store Attribute Not Found',
            error: {
                message:
                    'Column ' +
                    columnName +
                    ' with value ' +
                    rawValue.value +
                    ' not found',
                in: 'Store Attribute Helper Service',
            },
        };
    }

    async manyRelationQuery({
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
    }): Promise<StoreAttributeResponseI> {
        const res: GetStoreAttributeI[] = await this.entityManager
            .getRepository(StoreAttribute)
            .createQueryBuilder('store_attribute')
            .leftJoinAndSelect(
                'store_attribute.storeAttribute',
                'storeAttribute',
            )
            .leftJoinAndSelect('storeAttribute.storeOption', 'storeOption')
            .getMany();

        return {
            status: '200',
            message: 'Success',
            result: res,
        };
        if (storeViewValue === null) {
            const result: GetStoreAttributeI[] = await this.entityManager
                .getRepository(StoreAttribute)
                .createQueryBuilder(StoreAttributeAlias)
                .where(columnName, rawValue)
                .select(selectList)
                .leftJoinAndSelect(
                    StoreAttributeAlias + '.storeAttribute',
                    'storeAttribute',
                )
                .leftJoinAndSelect('storeAttribute.storeOption', 'storeOption')
                .orderBy(orderBy, orderDirection)
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

        console.log(123);
        // This query is complex cuz options are Many to One relation to Store Attribute Description
        // Which itself is represented as One to One by Store Attribute
        const storeViewResult: GetStoreAttributeI[] = await this.entityManager
            .getRepository(StoreAttribute)
            .createQueryBuilder('store_attribute')
            .leftJoinAndSelect(
                'store_attribute.storeAttribute',
                'storeAttribute',
            )
            .leftJoinAndSelect('storeAttribute.storeOption', 'storeOption')
            // .leftJoinAndSelect(
            //     'store_attribute.storeAttribute',
            //     'storeAttribute',
            // )
            // .select(selectList)
            // .where(columnName, rawValue)
            // .leftJoinAndSelect(
            //     'store_attribute.storeAttribute',
            //     'storeAttribute',
            // )
            // .orderBy(orderBy, orderDirection)
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
            message: 'Store Attribute Not Found',
            error: {
                message:
                    'Column ' +
                    columnName +
                    ' with value ' +
                    rawValue.value +
                    ' not found',
                in: 'Store Attribute Helper Service',
            },
        };
    }
}
