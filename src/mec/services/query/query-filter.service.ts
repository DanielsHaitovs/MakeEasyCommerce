import { Injectable } from '@nestjs/common';
import {
    FilterRequestDto,
    QueryFilterDto,
} from '@src/mec/dto/query/query-filter.dto';
import { OrderDirection } from '@src/mec/enum/query/query.enum';
import { EntityTarget, SelectQueryBuilder } from 'typeorm';

const WhereManyIdAlias = '.id IN (:...ids)';
@Injectable()
export class QueryFilterService {
    protected prepareQueryFilter({
        filters,
        alias,
    }: {
        filters: FilterRequestDto;
        alias: string;
    }): QueryFilterDto {
        if (filters.page === undefined) filters.page = 0;
        if (filters.limit === undefined) filters.limit = 0;
        if (filters.by === undefined || filters.by === null) {
            filters.by = null;
            filters.direction = null;
        } else {
            filters.by = alias + '.' + filters.by;
        }

        return {
            pagination: {
                page: filters.page,
                limit: filters.limit,
            },
            order: {
                by: filters.by,
                direction:
                    filters.by != null
                        ? OrderDirection[filters.direction]
                        : null,
            },
        };
    }

    protected whereIdsQuery<Entity>({
        ids,
        alias,
        query,
    }: {
        ids: number[];
        entity: EntityTarget<Entity>;
        alias: string;
        query: SelectQueryBuilder<Entity>;
    }) {
        if (ids === null || alias === null) return query;
        if (Array.isArray(ids)) {
            return query.where(alias + WhereManyIdAlias, {
                ids: ids,
            });
        }

        return query.where(alias + '.id = :id', {
            id: ids[0],
        });
    }

    protected whereQuery<Entity>({
        alias,
        value,
        query,
    }: {
        entity: EntityTarget<Entity>;
        alias: string;
        value: {
            value: any;
        };
        query: SelectQueryBuilder<Entity>;
    }) {
        if (value === null || alias === null) return query;

        return query.where(alias, value);
    }

    protected andWhereQuery<Entity>({
        alias,
        value,
        query,
    }: {
        entity: EntityTarget<Entity>;
        alias: string;
        value: {
            value: any;
        };
        query: SelectQueryBuilder<Entity>;
    }) {
        if (value === null || alias === null) return query;
        return query.andWhere(alias, value);
    }

    protected orWhereQuery<Entity>({
        alias,
        value,
        query,
    }: {
        entity: EntityTarget<Entity>;
        alias: string;
        value: {
            value: any;
        };
        query: SelectQueryBuilder<Entity>;
    }) {
        if (value === null || alias === null) return query;
        return query.orWhere(alias, value);
    }

    protected andHaveQuery<Entity>({
        alias,
        value,
        groupBy,
        query,
    }: {
        alias: string;
        value: {
            value: any;
        };
        groupBy: string;
        query: SelectQueryBuilder<Entity>;
        entity: EntityTarget<Entity>;
    }) {
        if (groupBy === null || value === null || alias === null) return query;
        query.groupBy(groupBy);
        return query.andHaving(alias, value);
    }

    protected orHaveQuery<Entity>({
        alias,
        value,
        query,
        groupBy,
    }: {
        entity: EntityTarget<Entity>;
        alias: string;
        value: {
            value: any;
        };
        groupBy: string;
        query: SelectQueryBuilder<Entity>;
    }) {
        if (groupBy === null || value === null || alias === null) return query;
        query.groupBy(groupBy);
        return query.orHaving(alias, value);
    }

    protected paginateQuery<Entity>({
        page,
        limit,
        query,
    }: {
        entity: EntityTarget<Entity>;
        page: number;
        limit: number;
        query: SelectQueryBuilder<Entity>;
    }) {
        if (Number.isInteger(Number(limit)) && Number.isInteger(Number(page))) {
            // ^^^^ HA-HA XD XD XD ^^^^
            query.skip((Number(page) - 1) * Number(limit));
            query.take(Number(limit));
        }

        return query;
    }

    protected selectQuery<Entity>({
        properties,
        query,
    }: {
        entity: EntityTarget<Entity>;
        properties: string[];
        query: SelectQueryBuilder<Entity>;
    }): SelectQueryBuilder<Entity> {
        if (properties.length === 0) return query;
        if (!Array.isArray(properties)) {
            return query.select([properties]);
        }
        return query.select(properties);
    }

    protected orderQuery<Entity>({
        by,
        direction,
        query,
    }: {
        entity: EntityTarget<Entity>;
        by: string;
        direction: OrderDirection;
        query: SelectQueryBuilder<Entity>;
    }) {
        if (by === null || direction === null) return query;
        return query.orderBy(by, direction);
    }

    protected relationQuery<Entity>({
        joinAlias,
        relationsAlias,
        query,
    }: {
        entity: EntityTarget<Entity>;
        joinAlias: string;
        relationsAlias: string;
        query: SelectQueryBuilder<Entity>;
    }) {
        if (joinAlias === null || relationsAlias === null) return query;
        return query.leftJoinAndSelect(joinAlias, relationsAlias);
    }
}
