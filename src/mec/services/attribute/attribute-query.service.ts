import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import {
    Entity,
    EntityManager,
    EntityTarget,
    SelectQueryBuilder,
} from 'typeorm';
import { DataHelperService } from '@src/utils/data-help.service';

import { QueryFilterService } from '../query/query-filter.service';
import {
    AttributeResponseI,
    GetAttributeI,
} from '@src/attribute/interface/get-attribute.interface';
import { AttributeQueryFilterDto } from '@src/mec/dto/query/attribute/attribute-filter.dto';
import { AttributeQueryFilterI } from '@src/mec/interface/attribute/attribute-base.interface';
import { Attribute } from '@src/attribute/entities/attribute.entity';
import {
    AttributeSelect,
    JoinAttributeAlias,
    JoinAttributeRelations,
} from '@src/mec/enum/attribute/attribute-type.enum';

@Injectable()
export class AttributeQueryService extends QueryFilterService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly dataHelper: DataHelperService,
    ) {
        super();
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
        if (!Array.isArray(properties) || properties === null) return query;
        if (properties.length > 0) {
            const extendSelect: string[] = [];
            properties.forEach((select) => {
                if (select != AttributeSelect.All) {
                    extendSelect.push(select);
                }
            });

            if (extendSelect.length === 0 && joinRule === true) {
                extendSelect.push(AttributeSelect.Id);
            } else if (extendSelect.length === 0 && joinOptions === true) {
                extendSelect.push(AttributeSelect.Id);
            }
            if (extendSelect.length > 0) {
                if (joinRule === true) {
                    extendSelect.push(JoinAttributeAlias.Rule);
                }

                if (joinOptions === true) {
                    extendSelect.push(JoinAttributeAlias.Options);
                }
            }

            return super.selectQuery({
                properties: extendSelect,
                query,
                entity: Entity,
            });
        }
    }

    protected toSingleAttributeObject({
        response,
    }: {
        response: AttributeResponseI;
    }): GetAttributeI {
        return this.dataHelper.toSingleObject({ response });
    }

    protected prepareQueryFilter({
        filters,
        alias,
    }: {
        filters: AttributeQueryFilterDto;
        alias: string;
    }): AttributeQueryFilterI {
        const queryFilter = super.prepareQueryFilter({ filters, alias });
        let many = true;
        try {
            // I definitely need to clean it :D ->
            const isActive: boolean = this.dataHelper.valueToBoolean(
                filters.isActive,
            );
            const isRequired: boolean = this.dataHelper.valueToBoolean(
                filters.isRequired,
            );
            const joinRule: boolean = this.dataHelper.valueToBoolean(
                filters.joinRule,
            );
            const joinOptions: boolean = this.dataHelper.valueToBoolean(
                filters.joinOptions,
            );
            //<-
            let attributeQuery = this.entityManager
                .getRepository(Attribute)
                .createQueryBuilder(alias);

            if (filters.valueIds != undefined && filters.valueIds != null) {
                many = filters.valueIds.length === 1 ? false : true;
                attributeQuery = this.whereIdsQuery({
                    ids: filters.valueIds,
                    alias: alias,
                    query: attributeQuery,
                    entity: Attribute,
                });
                if (isActive != null) {
                    attributeQuery = this.andWhereQuery({
                        alias: alias + '.isActive = :value',
                        value: {
                            value: isActive,
                        },
                        query: attributeQuery,
                        entity: Attribute,
                    });
                }

                if (isRequired != null) {
                    attributeQuery = this.andWhereQuery({
                        alias: alias + '.isRequired = :value',
                        value: {
                            value: isRequired,
                        },
                        query: attributeQuery,
                        entity: Attribute,
                    });
                }
            }

            if (filters.valueIds === undefined || filters.valueIds === null) {
                if (isActive != null) {
                    attributeQuery = this.whereQuery({
                        alias: alias + '.isActive = :value',
                        value: {
                            value: isActive,
                        },
                        query: attributeQuery,
                        entity: Attribute,
                    });
                }

                if (isRequired != null) {
                    attributeQuery = this.andWhereQuery({
                        alias: alias + '.isRequired = :value',
                        value: {
                            value: isRequired,
                        },
                        query: attributeQuery,
                        entity: Attribute,
                    });
                }
            }

            if (joinOptions != null && joinOptions) {
                attributeQuery = this.relationQuery({
                    joinAlias: JoinAttributeRelations.Options,
                    relationsAlias: JoinAttributeAlias.Options,
                    query: attributeQuery,
                    entity: Attribute,
                });
            }

            if (joinRule != null && joinRule) {
                attributeQuery = this.relationQuery({
                    joinAlias: JoinAttributeRelations.Rule,
                    relationsAlias: JoinAttributeAlias.Rule,
                    query: attributeQuery,
                    entity: Attribute,
                });
            }
            if (filters.selectProp != null) {
                attributeQuery = this.selectQuery({
                    properties: Array.isArray(filters.selectProp)
                        ? filters.selectProp
                        : [filters.selectProp],
                    joinRule,
                    joinOptions,
                    query: attributeQuery,
                    entity: Attribute,
                });
            }

            if (queryFilter.order.by != null) {
                attributeQuery.orderBy(
                    queryFilter.order.by,
                    queryFilter.order.direction,
                );
            }

            if (many === true && filters.limit > 0 && filters.page > 0) {
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
            return {
                message: e.message,
                query: null,
                many: null,
                ...queryFilter,
            };
        }
    }
}
