import { EntityTarget, SelectQueryBuilder } from 'typeorm';
import {
    FilterRequestDto,
    QueryFilterDto,
} from '@src/mec/dto/filter/query-filter.dto';
import { OrderDirection } from '@src/mec/enum/query/query.enum';

const WhereManyIdAlias = '.id IN (:...ids)';
export class QueryFilterService {
    protected prepareQueryFilter({
        filters,
        alias,
    }: {
        filters: FilterRequestDto;
        alias: string;
    }): QueryFilterDto {
        if (!Number.isInteger(filters.page)) filters.page = 0;
        if (!Number.isInteger(filters.limit)) filters.limit = 0;

        if (filters.by != undefined) {
            filters.by = alias + '.' + filters.by;
        } else {
            filters.direction = undefined;
        }
        return {
            pagination: {
                page: filters.page,
                limit: filters.limit,
            },
            order: {
                by: filters.by,
                direction:
                    filters.by != undefined
                        ? OrderDirection[filters.direction]
                        : undefined,
            },
        };
    }

    protected whereQuery<Entity>({
        alias,
        data,
        query,
    }: {
        entity: EntityTarget<Entity>;
        alias: string;
        data: {
            value: unknown;
        };
        query: SelectQueryBuilder<Entity>;
    }): SelectQueryBuilder<Entity> {
        if (data.value === undefined || alias === undefined) return query;

        return query.where(alias, data);
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
    }): SelectQueryBuilder<Entity> {
        if (ids === undefined || alias === undefined) return query;

        if (ids.length > 1) {
            if (!Array.isArray(ids)) {
                ids = [ids];
            }

            if (ids[0] !== 0) {
                return query.where(alias + WhereManyIdAlias, {
                    ids: ids,
                });
            }
        } else if (ids.length > 0) {
            if (ids[0] !== 0) {
                return query.where(alias + '.id = :id', {
                    id: ids[0],
                });
            }
        }

        return query;
    }

    protected andWhereQuery<Entity>({
        alias,
        data,
        query,
    }: {
        entity: EntityTarget<Entity>;
        alias: string;
        data: {
            value: unknown;
        };
        query: SelectQueryBuilder<Entity>;
    }): SelectQueryBuilder<Entity> {
        if (data === undefined || alias === undefined) return query;
        return query.andWhere(alias, data);
    }

    protected orWhereQuery<Entity>({
        alias,
        value,
        query,
    }: {
        entity: EntityTarget<Entity>;
        alias: string;
        value: {
            value: unknown;
        };
        query: SelectQueryBuilder<Entity>;
    }): SelectQueryBuilder<Entity> {
        if (value === undefined || alias === undefined) return query;
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
            value: unknown;
        };
        groupBy: string;
        query: SelectQueryBuilder<Entity>;
        entity: EntityTarget<Entity>;
    }): SelectQueryBuilder<Entity> {
        if (groupBy === undefined || value === undefined || alias === undefined)
            return query;
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
            value: unknown;
        };
        groupBy: string;
        query: SelectQueryBuilder<Entity>;
    }): SelectQueryBuilder<Entity> {
        if (groupBy === undefined || value === undefined || alias === undefined)
            return query;
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
    }): SelectQueryBuilder<Entity> {
        if (Number.isInteger(Number(limit)) && Number.isInteger(Number(page))) {
            // ^^^^ HA-HA XD XD XD ^^^^ ^^^^ HA-HA XD XD XD ^^^^ ^^^^ HA-HA XD XD XD ^^^^
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
        if (properties.length === undefined) return query;
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
    }): SelectQueryBuilder<Entity> {
        if (by === undefined || direction === undefined) return query;
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
    }): SelectQueryBuilder<Entity> {
        if (joinAlias === undefined || relationsAlias === undefined)
            return query;
        return query.leftJoinAndSelect(joinAlias, relationsAlias);
    }
}
