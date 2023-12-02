import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import {
    Entity,
    EntityManager,
    EntityTarget,
    SelectQueryBuilder,
} from 'typeorm';
import { Attribute } from '@src/attribute/entities/attribute.entity';

import { AttributeQueryFilterDto } from '@src/attribute/dto/filter/attribute-filter.dto';
import {
    AttributeQueryFilterI,
    AttributeResponseI,
    GetAttributeI,
} from '@src/attribute/interface/attribute.interface';
import { FilterWhereValueDto } from '@src/mec/dto/filter/query-filter.dto';
import {
    AttributeProperties,
    JoinAttributeAlias,
} from '@src/attribute/enum/attribute.enum';
import { DataHelperService } from '@src/utils/data-help.service';
import { QueryFilterService } from '@src/mec/service/query/query-filter.service';

@Injectable()
export class AttributeQueryService extends QueryFilterService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly dataHelper: DataHelperService,
    ) {
        super();
    }

    queryFilter({
        filters,
        alias,
    }: {
        filters: AttributeQueryFilterDto;
        alias: string;
    }): AttributeQueryFilterI {
        filters = this.attributeQueryFilter({ filters });
        const queryFilter = super.queryFilter({ filters, alias });
        const whereConditions: FilterWhereValueDto[] = [];
        let many = true;
        try {
            let attributeQuery = this.entityManager
                .getRepository(Attribute)
                .createQueryBuilder(alias);

            if (filters.valueIds != undefined) {
                many = filters.valueIds.length > 1 ? true : false;
                attributeQuery = this.whereIdsQuery({
                    ids: filters.valueIds,
                    alias: alias,
                    query: attributeQuery,
                    entity: Attribute,
                });
            }

            if (filters.isActive != undefined) {
                whereConditions.push({
                    where: filters.isActive,
                    alias: AttributeProperties.IsActive,
                });
            }

            if (filters.isRequired != undefined) {
                whereConditions.push({
                    where: filters.isRequired,
                    alias: AttributeProperties.IsRequired,
                });
            }

            if (whereConditions.length > 0) {
                attributeQuery = this.andWhereQuery({
                    where: whereConditions,
                    query: attributeQuery,
                    entity: Attribute,
                });
            }

            // if (filters.joinOptions != undefined && filters.joinOptions) {
            //     attributeQuery = this.relationQuery({
            //         joinAlias: JoinAttributeRelations.Options,
            //         relationsAlias: JoinAttributeAlias.Options,
            //         query: attributeQuery,
            //         entity: Attribute,
            //     });
            // }

            // if (filters.joinRule != undefined && filters.joinRule) {
            //     attributeQuery = this.relationQuery({
            //         joinAlias: JoinAttributeRelations.Rule,
            //         relationsAlias: JoinAttributeAlias.Rule,
            //         query: attributeQuery,
            //         entity: Attribute,
            //     });
            // }

            if (filters.selectProp != undefined) {
                attributeQuery = this.selectQuery({
                    properties: Array.isArray(filters.selectProp)
                        ? filters.selectProp
                        : [filters.selectProp],
                    joinRule: filters.joinRule,
                    joinOptions: filters.joinOptions,
                    query: attributeQuery,
                    entity: Attribute,
                });
            }

            if (queryFilter.order.by != undefined) {
                attributeQuery.orderBy(
                    queryFilter.order.by,
                    queryFilter.order.direction,
                );
            }

            if (many === true) {
                attributeQuery = this.paginateQuery({
                    page: queryFilter.pagination.page,
                    limit: queryFilter.pagination.limit,
                    query: attributeQuery,
                    entity: Attribute,
                });
            }

            return {
                message: null,
                many: many,
                query: attributeQuery,
                ...queryFilter,
            };
        } catch (e) {
            const error = e as Error;

            return {
                message: error.message,
                query: null,
                many: null,
                ...queryFilter,
            };
        }
    }

    protected attributeQueryFilter({
        filters,
    }: {
        filters: AttributeQueryFilterDto;
    }): AttributeQueryFilterDto {
        filters.isActive = this.dataHelper.valueToBoolean({
            value: filters.isActive,
        });
        filters.isRequired = this.dataHelper.valueToBoolean({
            value: filters.isRequired,
        });
        filters.joinRule = this.dataHelper.valueToBoolean({
            value: filters.joinRule,
        });
        filters.joinOptions = this.dataHelper.valueToBoolean({
            value: filters.joinOptions,
        });

        if (!Array.isArray(filters.valueIds) && filters.valueIds < 1) {
            filters.valueIds = undefined;
        }

        return filters;
    }

    protected selectQuery<Entity>({
        properties,
        query,
        joinRule,
        joinOptions,
    }: {
        joinRule: boolean;
        joinOptions: boolean;
        entity: EntityTarget<Entity>;
        properties: string[];
        query: SelectQueryBuilder<Entity>;
    }): SelectQueryBuilder<Entity> {
        if (properties === undefined || properties === null) return query;
        const [first] = properties;
        if (first === AttributeProperties.All) {
            properties = undefined;
        }

        if (properties === undefined || properties.length === 0) {
            if (joinRule === true) {
                properties.push(
                    AttributeProperties.Id,
                    JoinAttributeAlias.Rule,
                );
            }
            if (joinOptions === true) {
                properties.push(
                    AttributeProperties.Id,
                    JoinAttributeAlias.Options,
                );
            }

            if (properties != undefined) {
                return super.selectQuery({
                    properties,
                    query,
                    entity: Entity,
                });
            }

            return query;
        }

        if (joinRule === true) {
            properties.push(JoinAttributeAlias.Rule);
        }

        if (joinOptions === true) {
            properties.push(JoinAttributeAlias.Options);
        }

        return super.selectQuery({
            properties,
            query,
            entity: Entity,
        });
    }

    protected toSingleAttributeObject({
        response,
    }: {
        response: AttributeResponseI;
    }): GetAttributeI {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return this.dataHelper.toObject({ response });
    }
}
