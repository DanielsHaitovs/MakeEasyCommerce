import { Injectable } from "@nestjs/common";
import { InjectEntityManager } from "@nestjs/typeorm";
import { CreateAttributeOptionsDto, CreateOneAttributeOptionDto } from "@src/attribute/dto/attributes/option/create-attribute.option.dto";
import { CreateRuleAttributeDto } from "@src/attribute/dto/attributes/rule/create-attribute.rule.dto";
import { CreateAttributeShortDto } from "@src/attribute/dto/create-attribute.dto";
import { Attribute } from "@src/attribute/entities/attribute.entity";
import { AttributeResponseI, CreateAttributeShortI, GetAttributeI, GetAttributeShortI } from "@src/attribute/interfaces/attribute.interface";
import { CreateOptionAttributeI, CreateRuleAttributeI } from "@src/attribute/interfaces/attributes/attributes.interface";
import { AttributeOption } from "@src/attribute/relations/attribute-option/entities/option.entity";
import { AttributeRule } from "@src/attribute/relations/attribute-rule/entities/rule.entity";
import { AttributeConditionDto } from "@src/base/dto/filter/filters.dto";
import { JoinAttributeAlias, JoinAttributeRelations } from "@src/base/enum/attributes/attribute-type.enum";
import { OrderType } from "@src/base/enum/query/query.enum";
import { QueryResponseI } from "@src/base/interface/response/response.interface";
import { EntityManager } from "typeorm";

export const AttributeRelationsAlias = ['options', 'rule'];
export const AttributeAlias = 'attribute';
export const AttributesIndexPrefix = 'ik_attribute_index';

@Injectable()
export class AttributeHelperService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}
    

    toSingleAttributeObject({
        attributeResponse,
    }: {
        attributeResponse: AttributeResponseI;
    }): GetAttributeI {
        if (Array.isArray(attributeResponse.result)) {
            return attributeResponse.result[0];
        }

        return attributeResponse.result;
    }

    prepareAttributeShort({
        createAttribute,
    }: {
        createAttribute: CreateAttributeShortDto;
    }): CreateAttributeShortI {
        return this.entityManager.create(Attribute, createAttribute)
    }

    prepareAttributeRule({
        createRuleDto,
    }: {
        createRuleDto: CreateRuleAttributeDto;
    }): CreateRuleAttributeI {
        return this.entityManager.create(AttributeRule, createRuleDto)
    }

    prepareOneAttributeOption({
        prepareOption,
    }: {
        prepareOption: CreateOneAttributeOptionDto;
    }): CreateOptionAttributeI {
        return this.entityManager.create(AttributeOption, prepareOption)
    }

    // Create options for attribute
    prepareManyAttributeOption({
        prepareOption,
    }: {
        prepareOption: CreateAttributeOptionsDto;
    }): CreateOptionAttributeI[] {
        return prepareOption.options.map(option => this.entityManager.create(AttributeOption, {
            relatedAttribute: prepareOption.relatedAttribute,
            value: option.value,
        }));
    }
    
    async ifExists({
        name,
        code,
    }: {
        name: string;
        code: string;
    }): Promise<boolean> {
        return await this.entityManager.getRepository(Attribute)
        .createQueryBuilder(AttributeAlias)
        .where(`${AttributeAlias}.name = :name`, { name })
        .orWhere(`${AttributeAlias}.code = :code`, { code })
        .cache(true)
        .useIndex('ik_attribute_index')
        .getExists();
    }

    async attributeQueryFilter({
        filters,
    }: {
        filters: AttributeConditionDto;
    }): Promise<AttributeResponseI> {
        const queryFilter = this.prepareAttributeQueryFilter({ filters });
        if (!queryFilter.many || queryFilter.many === null) {
        
            if (queryFilter.joinAttributeOption === true && queryFilter.joinAttributeRule === true) {
                return await this.joinOneMultipleRelationQuery({
                    selectList: queryFilter.selectList,
                    columnName: queryFilter.columnName,
                    rawValue: queryFilter.rawValue,
                    orderBy: queryFilter.orderBy,
                    orderDirection: queryFilter.orderDirection,
                })
            }

            if (queryFilter.joinAttributeRule === true || queryFilter.joinAttributeOption === true) {
                return await this.joinOneSingleRelationQuery({
                    attributeRelation: queryFilter.attributeRelations,
                    relationAlias: queryFilter.attributeRelationsAlias,
                    selectList: queryFilter.selectList,
                    columnName: queryFilter.columnName,
                    rawValue: queryFilter.rawValue,
                    orderBy: queryFilter.orderBy,
                    orderDirection: queryFilter.orderDirection,
                });
            }

            return await this.singleNonRelationQuery({
                selectList: queryFilter.selectList,
                columnName: queryFilter.columnName,
                rawValue: queryFilter.rawValue,
                orderBy: queryFilter.orderBy,
                orderDirection: queryFilter.orderDirection,
            });
        }

        if (queryFilter.joinAttributeOption === true && queryFilter.joinAttributeRule === true) {
            return await this.joinMultipleRelationQuery({
                skip: queryFilter.skip,
                limit: queryFilter.limit,
                selectList: queryFilter.selectList,
                columnName: queryFilter.columnName,
                rawValue: queryFilter.rawValue,
                orderBy: queryFilter.orderBy,
                orderDirection: queryFilter.orderDirection,
            });
        }

        if (queryFilter.joinAttributeOption === true || queryFilter.joinAttributeRule === true) {
            return await this.joinSingleRelationQuery({
                attributeRelation: queryFilter.attributeRelations,
                relationAlias: queryFilter.attributeRelationsAlias,
                skip: queryFilter.skip,
                limit: queryFilter.limit,
                selectList: queryFilter.selectList,
                columnName: queryFilter.columnName,
                rawValue: queryFilter.rawValue,
                orderBy: queryFilter.orderBy,
                orderDirection: queryFilter.orderDirection,
            });
        }

        return await this.nonRelationQuery({
            skip: queryFilter.skip,
            limit: queryFilter.limit,
            selectList: queryFilter.selectList,
            columnName: queryFilter.columnName,
            rawValue: queryFilter.rawValue,
            orderBy: queryFilter.orderBy,
            orderDirection: queryFilter.orderDirection,
        })
    }

    // find 1 attribute with id and its code
    async findAttributeCodeById({
            attributeId,
        }: {
            attributeId: number;
        }): Promise<string | QueryResponseI> {
            try {
                const res: GetAttributeShortI = await this.entityManager
                .getRepository(Attribute)
                .createQueryBuilder(AttributeAlias)
                .where(AttributeAlias + '.id = :id', { id: attributeId })
                .select([AttributeAlias + '.id', AttributeAlias + '.description.code'])
                .getOne();

                if (res != null) {
                    return res.code;
                }

                return {
                    status: '666',
                    message: 'Ups, Error',
                    error: {
                        message: 'Empty Result',
                        in: 'Attributes Helper Query findAttributeCodeById',
                    },
                }
            } catch (e) {
                return {
                    status: '666',
                    message: 'Ups, Error',
                    error: {
                        message: e.message,
                        in: 'Attributes Helper Query findAttributeCodeById',
                    },
                };
            }
    }
    
    // find many attribute with id and theirs codes
    async findManyAttributeCodeById({
        attributeIds,
    }: {
        attributeIds: number[];
    }): Promise<string[] | QueryResponseI> {
        try {
            const codes: GetAttributeShortI[] = await this.entityManager
            .getRepository(Attribute)
            .createQueryBuilder(AttributeAlias)
            .where(AttributeAlias + '.id IN (:...ids)', { ids: attributeIds })
            .select([AttributeAlias + '.id', AttributeAlias + '.description.code'])
            .getMany();

            if (codes != null) {
                return {
                    status: '200',
                    message: 'Success',
                    result: codes.filter((attribute) => attribute.code ),
                };
            }
            
            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    message: 'Empty Result',
                    in: 'Attributes Helper Query findManyAttributeCodeById',
                },
            }
        } catch (e) {
            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    message: e.message,
                    in: 'Attributes Helper Query findManyAttributeCodeById',
                },
            };
        }
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
        orderDirection: OrderType | OrderType.NO;
    }): Promise<AttributeResponseI> {
        try {
            const res: GetAttributeI = await this.entityManager
            .getRepository(Attribute)
            .createQueryBuilder(AttributeAlias)
            .where(columnName, rawValue)
            .select(selectList)
            .orderBy(orderBy, orderDirection)
            .cache(true)
            .useIndex(AttributesIndexPrefix)
            .getOne();

            if (res != null) {
                return {
                    status: '200',
                    message: 'Success',
                    result: res,
                };
            }

            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    message: 'Empty Result',
                    in: 'Attributes Helper Query singleNonRelationQuery',
                },
            }

        } catch (e) {
            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    message: e.message,
                    in: 'Attributes Helper Query singleNonRelationQuery',
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
        orderDirection: OrderType | OrderType.NO;
    }): Promise<AttributeResponseI> {
        try {
            const res: GetAttributeI[] = await this.entityManager
            .getRepository(Attribute)
            .createQueryBuilder(AttributeAlias)
            .where(columnName, rawValue)
            .select(selectList)
            .orderBy(orderBy, orderDirection)
            .skip(skip)
            .take(limit)
            .cache(true)
            .useIndex(AttributesIndexPrefix)
            .getMany();

            if (res != null) {
                return {
                    status: '200',
                    message: 'Success',
                    result: res,
                };
            }

            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    message: 'Empty Result',
                    in: 'Attributes Helper Query nonRelationQuery',
                },
            }

        } catch (e) {
            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    message: e.message,
                    in: 'Attributes Helper Query nonRelationQuery',
                },
            };
        }
    }

    private async joinOneSingleRelationQuery({
        attributeRelation,
        relationAlias,
        selectList,
        columnName,
        rawValue,
        orderBy,
        orderDirection,
    }: {
        attributeRelation: JoinAttributeRelations;
        relationAlias: JoinAttributeAlias;
        selectList: string[];
        columnName: string;
        rawValue: {
            value: string | number | boolean | Date | JSON;
        };
        orderBy: string;
        orderDirection: OrderType | OrderType.NO;
    }): Promise<AttributeResponseI> {
        try {
            const res: GetAttributeI = await this.entityManager
            .getRepository(Attribute)
            .createQueryBuilder(AttributeAlias)
            .where(columnName, rawValue)
            .select(selectList)
            .leftJoinAndSelect(attributeRelation, relationAlias)
            .orderBy(orderBy, orderDirection)
            .cache(true)
            .useIndex(AttributesIndexPrefix)
            .getOne();

            if (res != null) {
                return {
                    status: '200',
                    message: 'Success',
                    result: res,
                };
            }

            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    message: 'Empty Result',
                    in: 'Attributes Helper Query joinOneSingleRelationQuery',
                },
            }

        } catch (e) {
            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    message: e.message,
                    in: 'Attributes Helper Query joinOneSingleRelationQuery',
                },
            };
        }
    }

    private async joinSingleRelationQuery({
        attributeRelation,
        relationAlias,
        skip,
        limit,
        selectList,
        columnName,
        rawValue,
        orderBy,
        orderDirection,
    }: {
        attributeRelation: JoinAttributeRelations;
        relationAlias: JoinAttributeAlias;
        skip: number;
        limit: number;
        selectList: string[];
        columnName: string;
        rawValue: {
            value: string | number | boolean | Date | JSON;
        };
        orderBy: string;
        orderDirection: OrderType | OrderType.NO;
    }): Promise<AttributeResponseI> {
        try {
            const res : GetAttributeI[] = await this.entityManager
            .getRepository(Attribute)
            .createQueryBuilder(AttributeAlias)
            .where(columnName, rawValue)
            .select(selectList)
            .leftJoinAndSelect(attributeRelation, relationAlias)
            .orderBy(orderBy, orderDirection)
            .skip(skip)
            .take(limit)
            .cache(true)
            .useIndex(AttributesIndexPrefix)
            .getMany();

            if (res != null) {
                return {
                    status: '200',
                    message: 'Success',
                    result: res,
                };
            } 

            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    message: 'Empty Result',
                    in: 'Attributes Helper Query joinSingleRelationQuery',
                },
            }

        } catch (e) {
            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    message: e.message,
                    in: 'Attributes Helper Query joinSingleRelationQuery',
                },
            };
        }
    }

    private async joinOneMultipleRelationQuery({
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
        orderDirection: OrderType | OrderType.NO;
    }): Promise<AttributeResponseI> {
        try {
            const res: GetAttributeI = await this.entityManager
            .getRepository(Attribute)
            .createQueryBuilder(AttributeAlias)
            .where(columnName, rawValue)
            .select(selectList)
            .leftJoinAndSelect(JoinAttributeRelations.Options, JoinAttributeAlias.Options)
            .leftJoinAndSelect(JoinAttributeRelations.Rule, JoinAttributeAlias.Rule)
            .orderBy(orderBy, orderDirection)
            .cache(true)
            .useIndex(AttributesIndexPrefix)
            .getOne();

            if (res != null) {
                return {
                    status: '200',
                    message: 'Success',
                    result: res,
                };    
            }
            
            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    message: 'Empty Result',
                    in: 'Attributes Helper Query joinOneMultipleRelationQuery',
                },
            }

        } catch (e) {
            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    message: e.message,
                    in: 'Attributes Helper Query joinOneMultipleRelationQuery',
                },
            };
        }
    }

    private async joinMultipleRelationQuery({
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
        orderDirection: OrderType | OrderType.NO;
    }): Promise<AttributeResponseI> {
        try{
            const res: GetAttributeI[] = await this.entityManager
            .getRepository(Attribute)
            .createQueryBuilder(AttributeAlias)
            .where(columnName, rawValue)
            .select(selectList)
            .leftJoinAndSelect(JoinAttributeRelations.Options, JoinAttributeAlias.Options)
            .leftJoinAndSelect(JoinAttributeRelations.Rule, JoinAttributeAlias.Rule)
            .orderBy(orderBy, orderDirection)
            .skip(skip)
            .take(limit)
            .cache(true)
            .useIndex(AttributesIndexPrefix)
            .getMany();

            if (res != null) {
                return {
                    status: '200',
                    message: 'Success',
                    result: res,
                };    
            }

            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    message: 'Empty Result',
                    in: 'Attributes Helper Query joinMultipleRelationQuery',
                },
            }

        } catch(e) {
            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    message: e.message,
                    in: 'Attributes Helper Query joinMultipleRelationQuery',
                },
            };
        }
    }
    
    private prepareAttributeQueryFilter({
        filters,
    }: {
        filters: AttributeConditionDto;
    }) {
        const skip = (filters.page - 1) * filters.limit;
        let selectList: string[] = [];
        let rawValue = null;
        let columnName = '';
        if (filters.select != null && filters.select[0] != null) {
            for (const addToSelect of filters.select) {
                if (!AttributeRelationsAlias.includes(addToSelect)) {
                    selectList.push(AttributeAlias + '.' + addToSelect);
                } else {
                    selectList.push(addToSelect);
                }
            }
        } else {
            selectList = null;
        }
        if (filters.columnName != null && filters.columnName != '') {
            columnName = AttributeAlias + '.' + filters.columnName + ' = :value';
            rawValue = {
                value: filters.value,
            };
        }

        if (filters.orderBy != null) {
            filters.orderBy = AttributeAlias + '.' + filters.orderBy;
        }

        return {
            selectList: selectList,
            rawValue: rawValue,
            columnName: columnName,
            attributeRelations: JoinAttributeRelations[filters.joinOptions ? 'Options' : 'Rule'],
            attributeRelationsAlias: JoinAttributeAlias[filters.joinOptions ? 'Options' : 'Rule'],
            joinAttributeOption: filters.joinOptions,
            joinOptionRelation: filters.joinOptions ? JoinAttributeRelations.Options : null,
            joinOptionAlias: filters.joinOptions ? JoinAttributeAlias.Options : null,
            joinAttributeRule: filters.joinRule,
            joinRuleRelation: filters.joinRule ? JoinAttributeRelations.Rule : null,
            joinRuleAlias: filters.joinRule ? JoinAttributeAlias.Rule : null,
            skip: skip,
            limit: filters.limit,
            orderBy: filters.orderBy,
            orderDirection: OrderType[filters.orderDirection],
            many: filters.many,
        }
    }
}
