import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import {
    CreateOptionI,
    GetOptionI,
    OptionResponseI,
} from '@src/attribute/relations/attribute-option/interface/create-option.interface';
import { SingleConditionDto } from '@src/base/dto/filter/filters.dto';
import { OrderType } from '@src/base/enum/query/query.enum';
import { CreateOptionDto } from '@src/attribute/relations/attribute-option/dto/create-option.dto';
import { AttributeOption } from '@src/attribute/relations/attribute-option/entities/option.entity';
export const alias = 'options';
export const indexKey = 'fk_option_simple_query';

@Injectable()
export class OptionHelperService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}

    prepareOption({
        relatedAttribute,
        prepareOption,
    }: {
        relatedAttribute: number;
        prepareOption: CreateOptionDto;
    }): CreateOptionI {
        return this.entityManager.create(AttributeOption, {
            relatedAttribute: relatedAttribute,
            value: prepareOption.value,
        });
    }

    prepareAttributeOptions({
        relatedAttribute,
        prepareOptions,
    }: {
        relatedAttribute: number;
        prepareOptions: CreateOptionDto[];
    }): CreateOptionI[] {
        const result: CreateOptionI[] = [];
        for (const option of prepareOptions) {
            result.push({
                relatedAttribute: relatedAttribute,
                value: option.value,
            });
        }

        return result;
    }

    toSingleOptionObject({
        optionResponse,
    }: {
        optionResponse: OptionResponseI;
    }): GetOptionI {
        if (optionResponse.status === '200') {
            if (Array.isArray(optionResponse.result)) {
                return optionResponse.result[0];
            }
    
            return optionResponse.result;
        }

        return null;
    }

    toArrayOptionObject({
        optionResponse,
    }: {
        optionResponse: OptionResponseI;
    }): GetOptionI[] {
        if (optionResponse.status === '200') {
            if (Array.isArray(optionResponse.result)) {
                return optionResponse.result;
            }

            return null;
        }

        return null;
    }

    async simpleOptionQuery({
        filters,
    }: {
        filters: SingleConditionDto;
    }): Promise<OptionResponseI> {
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
                return await this.oneNonRelationQuery({
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
                        in: 'Option Helper Query',
                    },
                };
            }
        }
        try {
            return await this.manyNonRelationQuery({
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
                    in: 'Option Helper Query',
                },
            };
        }
    }

    private async manyNonRelationQuery({
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
    }): Promise<OptionResponseI> {
        const result: GetOptionI[] = await this.entityManager
            .getRepository(AttributeOption)
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
            message: 'Not Found',
            error: {
                message: 'Return body is empty',
                in: 'Option Helper -> manyNonRelationQuery',
            },
        };
    }

    private async oneNonRelationQuery({
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
    }): Promise<OptionResponseI> {
        const result: GetOptionI = await this.entityManager
            .getRepository(AttributeOption)
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
            message: 'Not Found',
            error: {
                message: 'Return body is empty',
                in: 'Option Helper -> oneNonRelationQuery',
            },
        };
    }
}
