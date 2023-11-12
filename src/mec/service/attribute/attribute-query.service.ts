import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import {
    Entity,
    EntityManager,
    EntityTarget,
    SelectQueryBuilder,
} from 'typeorm';
import { Attribute } from '@src/attribute/entities/attribute.entity';
import {
    AttributeSelect,
    JoinAttributeAlias,
    JoinAttributeRelations,
} from '@src/mec/enum/attribute/attribute.enum';

import { DataHelperService } from '@src/mec/utils/data-help.service';
import { QueryFilterService } from '../query/query-filter.service';

import { AttributeQueryFilterDto } from '@src/mec/dto/filter/attribute/attribute-filter.dto';
import {
    AttributeQueryFilterI,
    AttributeResponseI,
    GetAttributeI,
} from '@src/attribute/interface/attribute.interface';

@Injectable()
export class AttributeQueryService extends QueryFilterService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly dataHelper: DataHelperService,
    ) {
        super();
    }

    prepareQueryFilter({
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
                if (isActive != undefined) {
                    attributeQuery = this.andWhereQuery({
                        alias: alias + '.isActive = :value',
                        data: {
                            value: isActive,
                        },
                        query: attributeQuery,
                        entity: Attribute,
                    });
                }

                if (isRequired != undefined) {
                    attributeQuery = this.andWhereQuery({
                        alias: alias + '.isRequired = :value',
                        data: {
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
                        data: {
                            value: isActive,
                        },
                        query: attributeQuery,
                        entity: Attribute,
                    });
                }

                if (isRequired != undefined) {
                    attributeQuery = this.andWhereQuery({
                        alias: alias + '.isRequired = :value',
                        data: {
                            value: isRequired,
                        },
                        query: attributeQuery,
                        entity: Attribute,
                    });
                }
            }

            if (joinOptions != undefined && joinOptions) {
                attributeQuery = this.relationQuery({
                    joinAlias: JoinAttributeRelations.Options,
                    relationsAlias: JoinAttributeAlias.Options,
                    query: attributeQuery,
                    entity: Attribute,
                });
            }

            if (joinRule != undefined && joinRule) {
                attributeQuery = this.relationQuery({
                    joinAlias: JoinAttributeRelations.Rule,
                    relationsAlias: JoinAttributeAlias.Rule,
                    query: attributeQuery,
                    entity: Attribute,
                });
            }
            if (filters.selectProp != undefined) {
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

            if (queryFilter.order.by != undefined) {
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
            const error = e as Error;

            return {
                message: error.message,
                query: null,
                many: null,
                ...queryFilter,
            };
        }
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

        return query;
    }

    protected toSingleAttributeObject({
        response,
    }: {
        response: AttributeResponseI;
    }): GetAttributeI {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return this.dataHelper.toSingleObject({ response });
    }
}
