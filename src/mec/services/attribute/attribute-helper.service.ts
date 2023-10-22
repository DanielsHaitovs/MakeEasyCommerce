import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CreateAttributeRuleDto } from '@src/attribute/dto/attributes/rule/attribute-rule.dto';
import { CreateAttributeDto } from '@src/attribute/dto/create-attribute.dto';
import { Attribute } from '@src/attribute/entities/attribute.entity';
import { CreateAttributeI } from '@src/attribute/interface/attribute.interface';
import { CreateAttributeRuleI } from '@src/attribute/interface/attributes/rule/attribute-rule.interface';
import { Rule } from '@src/rule/entities/rule.entity';
import { EntityManager } from 'typeorm';
import { QueryFilterService } from '../query/query-filter.service';
import {
    AttributeNonRelationQuery,
    AttributeQueryFilterDto,
} from '@src/mec/dto/query/attribute/attribute-filter.dto';
import {
    AttributeResponseI,
    GetAttributeI,
} from '@src/attribute/interface/get-attribute.interface';
import { QueryHelperService } from '../query/helper/query-help.service';

export const AttributeRelationsAlias = ['options', 'rule'];
export const alias = 'attribute';
export const AttributesIndexPrefix = 'ik_attribute_index';

@Injectable()
export class AttributeHelperService extends QueryFilterService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly queryHelper: QueryHelperService,
    ) {
        super();
    }

    prepareAttribute({
        createAttribute,
    }: {
        createAttribute: CreateAttributeDto;
    }): CreateAttributeI {
        return this.entityManager.create(Attribute, createAttribute);
    }

    prepareAttributeRule({
        createRuleDto,
    }: {
        createRuleDto: CreateAttributeRuleDto;
    }): CreateAttributeRuleI {
        return this.entityManager.create(Rule, createRuleDto);
    }

    async ifExists({
        name,
        code,
    }: {
        name: string;
        code: string;
    }): Promise<boolean> {
        return await this.entityManager
            .getRepository(Attribute)
            .createQueryBuilder(alias)
            .where(`${alias}.name = :name`, { name })
            .orWhere(`${alias}.code = :code`, { code })
            .cache(true)
            .useIndex(AttributesIndexPrefix)
            .getExists();
    }

    async attributeQueryFilter({
        filters,
    }: {
        filters: AttributeQueryFilterDto;
    }): Promise<AttributeResponseI> {
        // const queryFilter = this.prepareQueryFilter({ filters, alias });
        const queryFilter = null;

        return await this.nonRelationQuery({
            column: queryFilter.column,
            value: queryFilter.value,
            filters: {
                pagination: {
                    page: queryFilter.pagination.page,
                    limit: queryFilter.pagination.limit,
                },
                order: {
                    by: queryFilter.order.by,
                    direction: queryFilter.order.direction,
                },
                select: queryFilter.select,
            },
        });
    }

    // protected prepareQueryFilter({
    //     filters,
    //     alias,
    // }: {
    //     filters: AttributeQueryFilterDto;
    //     alias: string;
    // }) {
    //     const queryFilter = super.prepareQueryFilter({ filters, alias });
    //     let many = true;
    //     let whereValue = null;
    //     let columnName = '';

    //     if (filters.attributeIds != undefined && filters.attributeIds != null) {
    //         if (filters.attributeIds.length > 1) {
    //             columnName =
    //                 filters.attributeIds[0] != null
    //                     ? alias + '.id IN (:...ids)'
    //                     : '';
    //             whereValue = { ids: filters.attributeIds };
    //         }

    //         if (filters.attributeIds.length === 1) {
    //             many = false;
    //             columnName =
    //                 filters.attributeIds[0] != null ? alias + '.id = :id' : '';
    //             whereValue = { id: filters.attributeIds[0] };
    //         }
    //     } else {
    //         many = false;
    //     }

    //     if (filters.select === undefined) {
    //         filters.select = null;
    //     }

    //     return {
    //         select: filters.select,
    //         value: whereValue,
    //         column: columnName,
    //         many: many,
    //         joinOptions: this.queryHelper.valueToBoolean(filters.joinOptions),
    //         joinRule: this.queryHelper.valueToBoolean(filters.joinRule),
    //         ...queryFilter,
    //     };
    // }

    private async nonRelationQuery({
        column,
        value,
        filters,
    }: {
        column: string;
        value: {
            value: string | number | boolean | Date | JSON;
        };
        filters: AttributeNonRelationQuery;
    }): Promise<AttributeResponseI> {
        try {
            const res: GetAttributeI[] = await this.entityManager
                .getRepository(Attribute)
                .createQueryBuilder(alias)
                .where(column, value)
                .select(filters.select)
                .orderBy(filters.order.by, filters.order.direction)
                .skip(filters.pagination.page)
                .take(filters.pagination.limit)
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
                status: '404',
                message: 'Ups, Error',
                error: {
                    message: 'Not Found',
                    in: 'Attributes Helper Query nonRelationQuery',
                },
            };
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
}
// import { Injectable } from "@nestjs/common";
// import { InjectEntityManager } from "@nestjs/typeorm";
// import { CreateAttributeOptionsDto, CreateOneAttributeOptionDto } from "@src/attribute/dto/attributes/option/create-attribute.option.dto";
// import { CreateRuleAttributeDto } from "@src/attribute/dto/attributes/rule/create-attribute.rule.dto";
// import { CreateAttributeShortDto } from "@src/attribute/dto/create-attribute.dto";
// import { Attribute } from "@src/attribute/entities/attribute.entity";
// import { AttributeResponseI, CreateAttributeShortI, GetAttributeI, GetAttributeShortI } from "@src/attribute/interfaces/attribute.interface";
// import { CreateOptionAttributeI, CreateRuleAttributeI } from "@src/attribute/interfaces/attributes/attributes.interface";
// import { AttributeOption } from "@src/attribute/relations/attribute-option/entities/option.entity";
// import { AttributeRule } from "@src/attribute/relations/attribute-rule/entities/rule.entity";
// import { AttributeConditionDto } from "@src/mec/dto/filter/filters.dto";
// import { AttributeSelectSchema, Joinalias, JoinAttributeRelations } from "@src/mec/enum/attributes/attribute-type.enum";
// import { OrderDirection, OrderType } from "@src/mec/enum/query/query.enum";
// import { QueryResponseI } from "@src/mec/interface/response/response.interface";
// import { EntityManager } from "typeorm";

// export const AttributeRelationsAlias = ['options', 'rule'];
// export const alias = 'attribute';
// export const AttributesIndexPrefix = 'ik_attribute_index';

// @Injectable()
// export class AttributeHelperService {
//     constructor(
//         @InjectEntityManager()
//         private readonly entityManager: EntityManager,
//     ) {}

//     toSingleAttributeObject({
//         attributeResponse,
//     }: {
//         attributeResponse: AttributeResponseI;
//     }): GetAttributeI {
//         if (Array.isArray(attributeResponse.result)) {
//             return attributeResponse.result[0];
//         }

//         return attributeResponse.result;
//     }

//     prepareAttributeShort({
//         createAttribute,
//     }: {
//         createAttribute: CreateAttributeShortDto;
//     }): CreateAttributeShortI {
//         return this.entityManager.create(Attribute, createAttribute)
//     }

//     prepareAttributeRule({
//         createRuleDto,
//     }: {
//         createRuleDto: CreateRuleAttributeDto;
//     }): CreateRuleAttributeI {
//         return this.entityManager.create(AttributeRule, createRuleDto)
//     }

//     prepareOneAttributeOption({
//         prepareOption,
//     }: {
//         prepareOption: CreateOneAttributeOptionDto;
//     }): CreateOptionAttributeI {
//         return this.entityManager.create(AttributeOption, prepareOption)
//     }

//     // Create options for attribute
//     prepareManyAttributeOption({
//         prepareOption,
//     }: {
//         prepareOption: CreateAttributeOptionsDto;
//     }): CreateOptionAttributeI[] {
//         return prepareOption.options.map(option => this.entityManager.create(AttributeOption, {
//             relatedAttribute: prepareOption.relatedAttribute,
//             value: option.value,
//         }));
//     }

//     async ifExists({
//         name,
//         code,
//     }: {
//         name: string;
//         code: string;
//     }): Promise<boolean> {
//         return await this.entityManager.getRepository(Attribute)
//         .createQueryBuilder(alias)
//         .where(`${alias}.name = :name`, { name })
//         .orWhere(`${alias}.code = :code`, { code })
//         .cache(true)
//         .useIndex('ik_attribute_index')
//         .getExists();
//     }

//     async attributeQueryFilter({
//         filters,
//     }: {
//         filters: AttributeConditionDto;
//     }): Promise<AttributeResponseI> {
//         const queryFilter = this.prepareAttributeQueryFilter({ filters });
//         console.log(queryFilter);

//         if (!queryFilter.many || queryFilter.many === null) {
//             if (queryFilter.joinAttributeOption === true && queryFilter.joinAttributeRule === true) {
//                 return await this.joinOneMultiRelationQuery({
//                     selectList: queryFilter.selectList,
//                     columnName: queryFilter.columnName,
//                     value: queryFilter.value,
//                     orderBy: queryFilter.orderBy,
//                     orderDirection: queryFilter.orderDirection,
//                 })
//             }

//             if (queryFilter.joinAttributeRule === true || queryFilter.joinAttributeOption === true) {
//                 return await this.joinOneRelationQuery({
//                     attributeRelation: queryFilter.attributeRelations,
//                     relationAlias: queryFilter.attributeRelationsAlias,
//                     selectList: queryFilter.selectList,
//                     columnName: queryFilter.columnName,
//                     value: queryFilter.value,
//                     orderBy: queryFilter.orderBy,
//                     orderDirection: queryFilter.orderDirection,
//                 });
//             }

//             return await this.oneNonRelationQuery({
//                 selectList: queryFilter.selectList,
//                 columnName: queryFilter.columnName,
//                 value: queryFilter.value,
//                 orderBy: queryFilter.orderBy,
//                 orderDirection: queryFilter.orderDirection,
//             });
//         }

//         if (queryFilter.joinAttributeOption === true && queryFilter.joinAttributeRule === true) {
//             return await this.joinMultiRelationQuery({
//                 skip: queryFilter.skip,
//                 limit: queryFilter.limit,
//                 selectList: queryFilter.selectList,
//                 columnName: queryFilter.columnName,
//                 value: queryFilter.value,
//                 orderBy: queryFilter.orderBy,
//                 orderDirection: queryFilter.orderDirection,
//             });
//         }

//         if (queryFilter.joinAttributeOption === true || queryFilter.joinAttributeRule === true) {
//             return await this.joinRelationQuery({
//                 attributeRelation: queryFilter.attributeRelations,
//                 relationAlias: queryFilter.attributeRelationsAlias,
//                 skip: queryFilter.skip,
//                 limit: queryFilter.limit,
//                 selectList: queryFilter.selectList,
//                 columnName: queryFilter.columnName,
//                 value: queryFilter.value,
//                 orderBy: queryFilter.orderBy,
//                 orderDirection: queryFilter.orderDirection,
//             });
//         }

//         return await this.nonRelationQuery({
//             skip: queryFilter.skip,
//             limit: queryFilter.limit,
//             selectList: queryFilter.selectList,
//             columnName: queryFilter.columnName,
//             value: queryFilter.value,
//             orderBy: queryFilter.orderBy,
//             orderDirection: queryFilter.orderDirection,
//         })
//     }

//     // find 1 attribute with id and its code
//     async findAttributeCodeById({
//             attributeId,
//         }: {
//             attributeId: number;
//         }): Promise<string | QueryResponseI> {
//             try {
//                 const res: GetAttributeShortI = await this.entityManager
//                 .getRepository(Attribute)
//                 .createQueryBuilder(alias)
//                 .where(alias + '.id = :id', { id: attributeId })
//                 .select([alias + '.id', alias + '.description.code'])
//                 .getOne();

//                 if (res != null) {
//                     return res.code;
//                 }

//                 return {
//                     status: '404',
//                     message: 'Ups, Error',
//                     error: {
//                         message: 'Not Found',
//                         in: 'Attributes Helper Query findAttributeCodeById',
//                     },
//                 }
//             } catch (e) {
//                 return {
//                     status: '666',
//                     message: 'Ups, Error',
//                     error: {
//                         message: e.message,
//                         in: 'Attributes Helper Query findAttributeCodeById',
//                     },
//                 };
//             }
//     }

//     // find many attribute with id and theirs codes
//     async findManyAttributeCodeById({
//         attributeIds,
//     }: {
//         attributeIds: number[];
//     }): Promise<string[] | QueryResponseI> {
//         try {
//             const codes: GetAttributeShortI[] = await this.entityManager
//             .getRepository(Attribute)
//             .createQueryBuilder(alias)
//             .where(alias + '.id IN (:...ids)', { ids: attributeIds })
//             .select([alias + '.id', alias + '.description.code'])
//             .getMany();

//             if (codes != null) {
//                 return {
//                     status: '200',
//                     message: 'Success',
//                     result: codes.filter((attribute) => attribute.code ),
//                 };
//             }

//             return {
//                 status: '404',
//                 message: 'Ups, Error',
//                 error: {
//                     message: 'Not Found',
//                     in: 'Attributes Helper Query findManyAttributeCodeById',
//                 },
//             }
//         } catch (e) {
//             return {
//                 status: '666',
//                 message: 'Ups, Error',
//                 error: {
//                     message: e.message,
//                     in: 'Attributes Helper Query findManyAttributeCodeById',
//                 },
//             };
//         }
//     }

//     private async oneNonRelationQuery({
//         selectList,
//         columnName,
//         value,
//         orderBy,
//         orderDirection,
//     }: {
//         selectList: string[];
//         columnName: string;
//         value: {
//             value: string | number | boolean | Date | JSON;
//         };
//         orderBy: string;
//         orderDirection: OrderDirection;
//     }): Promise<AttributeResponseI> {
//         try {
//             const res: GetAttributeI = await this.entityManager
//             .getRepository(Attribute)
//             .createQueryBuilder(alias)
//             .where(columnName, value)
//             .select(selectList)
//             .orderBy(OrderType[orderBy], OrderDirection[orderDirection])
//             .cache(true)
//             .useIndex(AttributesIndexPrefix)
//             .getOne();

//             if (res != null) {
//                 return {
//                     status: '200',
//                     message: 'Success',
//                     result: res,
//                 };
//             }

//             return {
//                 status: '404',
//                 message: 'Ups, Error',
//                 error: {
//                     message: 'Not Found',
//                     in: 'Attributes Helper Query oneNonRelationQuery',
//                 },
//             }

//         } catch (e) {
//             return {
//                 status: '666',
//                 message: 'Ups, Error',
//                 error: {
//                     message: e.message,
//                     in: 'Attributes Helper Query oneNonRelationQuery',
//                 },
//             };
//         }
//     }

//     private async nonRelationQuery({
//         skip,
//         limit,
//         selectList,
//         columnName,
//         value,
//         orderBy,
//         orderDirection,
//     }: {
//         skip: number;
//         limit: number;
//         selectList: string[];
//         columnName: string;
//         value: {
//             value: string | number | boolean | Date | JSON;
//         };
//         orderBy: string;
//         orderDirection: OrderDirection;
//     }): Promise<AttributeResponseI> {
//         try {
//             const res: GetAttributeI[] = await this.entityManager
//             .getRepository(Attribute)
//             .createQueryBuilder(alias)
//             .where(columnName, value)
//             .select(selectList)
//             .orderBy(orderBy, orderDirection)
//             .skip(skip)
//             .take(limit)
//             .cache(true)
//             .useIndex(AttributesIndexPrefix)
//             .getMany();

//             if (res != null) {
//                 return {
//                     status: '200',
//                     message: 'Success',
//                     result: res,
//                 };
//             }

//             return {
//                 status: '404',
//                 message: 'Ups, Error',
//                 error: {
//                     message: 'Not Found',
//                     in: 'Attributes Helper Query nonRelationQuery',
//                 },
//             }

//         } catch (e) {
//             return {
//                 status: '666',
//                 message: 'Ups, Error',
//                 error: {
//                     message: e.message,
//                     in: 'Attributes Helper Query nonRelationQuery',
//                 },
//             };
//         }
//     }

//     private async joinOneRelationQuery({
//         attributeRelation,
//         relationAlias,
//         selectList,
//         columnName,
//         value,
//         orderBy,
//         orderDirection,
//     }: {
//         attributeRelation: JoinAttributeRelations;
//         relationAlias: Joinalias;
//         selectList: string[];
//         columnName: string;
//         value: {
//             value: string | number | boolean | Date | JSON;
//         };
//         orderBy: string;
//         orderDirection: OrderDirection;
//     }): Promise<AttributeResponseI> {
//         try {
//             const res: GetAttributeI = await this.entityManager
//             .getRepository(Attribute)
//             .createQueryBuilder(alias)
//             .where(columnName, value)
//             .select(selectList)
//             .leftJoinAndSelect(attributeRelation, relationAlias)
//             .orderBy(orderBy, orderDirection)
//             .cache(true)
//             .useIndex(AttributesIndexPrefix)
//             .getOne();

//             if (res != null) {
//                 return {
//                     status: '200',
//                     message: 'Success',
//                     result: res,
//                 };
//             }

//             return {
//                 status: '404',
//                 message: 'Ups, Error',
//                 error: {
//                     message: 'Not Found',
//                     in: 'Attributes Helper Query joinOneRelationQuery',
//                 },
//             }

//         } catch (e) {
//             return {
//                 status: '666',
//                 message: 'Ups, Error',
//                 error: {
//                     message: e.message,
//                     in: 'Attributes Helper Query joinOneRelationQuery',
//                 },
//             };
//         }
//     }

//     private async joinRelationQuery({
//         attributeRelation,
//         relationAlias,
//         skip,
//         limit,
//         selectList,
//         columnName,
//         value,
//         orderBy,
//         orderDirection,
//     }: {
//         attributeRelation: JoinAttributeRelations;
//         relationAlias: Joinalias;
//         skip: number;
//         limit: number;
//         selectList: string[];
//         columnName: string;
//         value: {
//             value: string | number | boolean | Date | JSON;
//         };
//         orderBy: string;
//         orderDirection: OrderDirection;
//     }): Promise<AttributeResponseI> {
//         try {
//             const res : GetAttributeI[] = await this.entityManager
//             .getRepository(Attribute)
//             .createQueryBuilder(alias)
//             .where(columnName, value)
//             .select(selectList)
//             .leftJoinAndSelect(attributeRelation, relationAlias)
//             .orderBy(orderBy, orderDirection)
//             .skip(skip)
//             .take(limit)
//             .cache(true)
//             .useIndex(AttributesIndexPrefix)
//             .getMany();

//             if (res != null) {
//                 return {
//                     status: '200',
//                     message: 'Success',
//                     result: res,
//                 };
//             }

//             return {
//                 status: '404',
//                 message: 'Ups, Error',
//                 error: {
//                     message: 'Not Found',
//                     in: 'Attributes Helper Query joinRelationQuery',
//                 },
//             }

//         } catch (e) {
//             return {
//                 status: '666',
//                 message: 'Ups, Error',
//                 error: {
//                     message: e.message,
//                     in: 'Attributes Helper Query joinRelationQuery',
//                 },
//             };
//         }
//     }

//     private async joinOneMultiRelationQuery({
//         selectList,
//         columnName,
//         value,
//         orderBy,
//         orderDirection,
//     }: {
//         selectList: string[];
//         columnName: string;
//         value: {
//             value: string | number | boolean | Date | JSON;
//         };
//         orderBy: string;
//         orderDirection: OrderDirection;
//     }): Promise<AttributeResponseI> {
//         try {
//             const res: GetAttributeI = await this.entityManager
//             .getRepository(Attribute)
//             .createQueryBuilder(alias)
//             .where(columnName, value)
//             .select(selectList)
//             .leftJoinAndSelect(JoinAttributeRelations.Options, Joinalias.Options)
//             .leftJoinAndSelect(JoinAttributeRelations.Rule, Joinalias.Rule)
//             .orderBy(orderBy, orderDirection)
//             .cache(true)
//             .useIndex(AttributesIndexPrefix)
//             .getOne();

//             if (res != null) {
//                 return {
//                     status: '200',
//                     message: 'Success',
//                     result: res,
//                 };
//             }

//             return {
//                 status: '404',
//                 message: 'Ups, Error',
//                 error: {
//                     message: 'Not Found',
//                     in: 'Attributes Helper Query joinOneMultiRelationQuery',
//                 },
//             }

//         } catch (e) {
//             return {
//                 status: '666',
//                 message: 'Ups, Error',
//                 error: {
//                     message: e.message,
//                     in: 'Attributes Helper Query joinOneMultiRelationQuery',
//                 },
//             };
//         }
//     }

//     private async joinMultiRelationQuery({
//         skip,
//         limit,
//         selectList,
//         columnName,
//         value,
//         orderBy,
//         orderDirection,
//     }: {
//         skip: number;
//         limit: number;
//         selectList: string[];
//         columnName: string;
//         value: {
//             value: string | number | boolean | Date | JSON;
//         };
//         orderBy: string;
//         orderDirection: OrderDirection;
//     }): Promise<AttributeResponseI> {
//         try{
//             const res: GetAttributeI[] = await this.entityManager
//             .getRepository(Attribute)
//             .createQueryBuilder(alias)
//             .where(columnName, value)
//             .select(selectList)
//             .leftJoinAndSelect(JoinAttributeRelations.Options, Joinalias.Options)
//             .leftJoinAndSelect(JoinAttributeRelations.Rule, Joinalias.Rule)
//             .orderBy(orderBy, orderDirection)
//             .skip(skip)
//             .take(limit)
//             .cache(true)
//             .useIndex(AttributesIndexPrefix)
//             .getMany();

//             if (res != null) {
//                 return {
//                     status: '200',
//                     message: 'Success',
//                     result: res,
//                 };
//             }

//             return {
//                 status: '404',
//                 message: 'Ups, Error',
//                 error: {
//                     message: 'Not Found',
//                     in: 'Attributes Helper Query joinMultiRelationQuery',
//                 },
//             }

//         } catch(e) {
//             return {
//                 status: '666',
//                 message: 'Ups, Error',
//                 error: {
//                     message: e.message,
//                     in: 'Attributes Helper Query joinMultiRelationQuery',
//                 },
//             };
//         }
//     }

//     private valueToBoolean(value: any) {
//         if (value === null && value === undefined) {
//             return undefined;
//         }
//         if (typeof value === 'boolean') {
//             return value;
//         }
//         if (['true', 'on', 'yes', '1'].includes(value.toLowerCase())) {
//             return true;
//         }
//         if (['false', 'off', 'no', '0'].includes(value.toLowerCase())) {
//             return false;
//         }
//         return undefined;
//     }

//     private prepareAttributeQueryFilter({
//         filters,
//     }: {
//         filters: AttributeConditionDto;
//     }) {
//         const booleanValue = this.valueToBoolean(filters.value);
//         const skip = (filters.page - 1) * filters.limit;
//         let selectList: string[] = [];
//         let value = null;
//         let columnName = '';

//         if (filters.select != null) {
//             if (!Array.isArray(filters.select)) {
//                 filters.select = [filters.select];
//             }

//             for (const addToSelect of filters.select) {
//                 if (!AttributeRelationsAlias.includes(AttributeSelectSchema[addToSelect])) {
//                     selectList.push(alias + '.' + addToSelect);
//                 } else {
//                     selectList.push(AttributeSelectSchema[addToSelect]);
//                 }
//             }
//         } else {
//             selectList = null;
//         }

//         if (filters.columnName != null && filters.columnName != undefined) {
//             columnName = alias + '.' + filters.columnName + ' = :value';
//             if (booleanValue != undefined) {
//                 value = {
//                     value: booleanValue,
//                 };
//             }

//             value = {
//                 value: filters.value,
//             };
//         }

//         if (filters.orderBy != null && filters.orderBy != undefined) {
//             filters.orderBy = alias + '.' + filters.orderBy;
//         } else {
//             filters.orderBy = null;
//         }

//         const booleanFilters = {
//             joinOptions: this.valueToBoolean(filters.joinOptions),
//             joinRule: this.valueToBoolean(filters.joinRule),
//             many: this.valueToBoolean(filters.many),
//         }

//         if (OrderType[filters.orderBy] === OrderType.NO) {
//             filters.orderBy = null;
//             filters.orderDirection = null;
//         }

//         const attributeRelations = JoinAttributeRelations[booleanFilters.joinOptions ? 'Options' : 'Rule'];
//         const attributeRelationsAlias = Joinalias[booleanFilters.joinOptions ? 'Options' : 'Rule']
//         return {
//             selectList: selectList,
//             value: value,
//             columnName: columnName,
//             attributeRelations: attributeRelations,
//             attributeRelationsAlias: attributeRelationsAlias,
//             joinAttributeOption: booleanFilters.joinOptions,
//             joinOptionRelation: booleanFilters.joinOptions ? JoinAttributeRelations.Options : null,
//             joinOptionAlias: booleanFilters.joinOptions ? Joinalias.Options : null,
//             joinAttributeRule: booleanFilters.joinRule,
//             joinRuleRelation: booleanFilters.joinRule ? JoinAttributeRelations.Rule : null,
//             joinRuleAlias: booleanFilters.joinRule ? Joinalias.Rule : null,
//             skip: skip,
//             limit: filters.limit,
//             orderBy: OrderType[filters.orderBy],
//             orderDirection: OrderDirection[filters.orderDirection],
//             many: booleanFilters.many,
//         }
//     }
// }
