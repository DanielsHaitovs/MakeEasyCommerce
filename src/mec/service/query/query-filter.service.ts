import { EntityTarget, SelectQueryBuilder } from 'typeorm';
import { FilterWhereValueDto, QueryFilterDto } from '@src/mec/dto/query/filter.dto';
import { OrderDirection } from '@src/mec/enum/query/query.enum';

export class QueryService {
    private idsError = false;
    private whereManyIdAlias = '.id IN (:...ids)';

    //To Do
    // If smth fails then currently initial state of filters is being returned
    // This is wrong
    // Also missing preparation for query order filters, feels like this can be done here
    protected prepareFilter({ filters, alias }: { filters: QueryFilterDto; alias: string }): QueryFilterDto {
        const initialFilter = filters;

        try {
            const { pagination } = filters;
            if (Number(pagination.page) > 0 || Number(pagination.limit) > 0) {
                filters.pagination = {
                    page: Number(pagination.page),
                    limit: Number(pagination.limit)
                };
            } else {
                filters.pagination.limit = undefined;
                filters.pagination.page = undefined;
            }

            this.idsError = true;
            const { ids } = filters;
            if (ids != undefined && ids.length > 0) {
                if (!Array.isArray(ids) && Number(ids)) {
                    filters.ids = [Number(ids)];
                } else {
                    filters.ids = ids.flatMap((id) => Number(id));
                }
            }

            return filters;
        } catch {
            // if (this.idsError) {}

            return initialFilter;
        }

        // try {
        //     const { order } = filters;

        //     if (order.by != undefined) {
        //         filters.order.by = alias + '.' + order.by;
        //     } else {
        //         filters.order = undefined;
        //     }
        // } catch {
        //     filters.order = undefined;
        // }

        // return filters;
    }

    protected whereQuery<Entity>({
        alias,
        data,
        query
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
        query
    }: {
        ids: number[];
        entity: EntityTarget<Entity>;
        alias: string;
        query: SelectQueryBuilder<Entity>;
    }): SelectQueryBuilder<Entity> {
        if (ids === undefined || alias === undefined) return query;
        if (!Array.isArray(ids)) ids = [ids];

        return query.where(alias + this.whereManyIdAlias, {
            ids: ids
        });
    }

    protected andWhereQuery<Entity>({
        where,
        query
    }: {
        entity: EntityTarget<Entity>;
        where: FilterWhereValueDto[];
        query: SelectQueryBuilder<Entity>;
    }): SelectQueryBuilder<Entity> {
        if (where === undefined) return query;
        if (!Array.isArray(where)) {
            where = [where];
        }

        for (const condition of where) {
            if (condition.where != undefined && condition.alias != undefined) {
                const propertyName = condition.alias.substring(condition.alias.lastIndexOf('.') + 1);
                const alias = condition.alias + ' = :' + propertyName;
                query = query.andWhere(alias, {
                    [propertyName]: condition.where
                });
            }
        }

        return query;
    }

    protected orWhereQuery<Entity>({
        alias,
        value,
        query
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
        query
    }: {
        alias: string;
        value: {
            value: unknown;
        };
        groupBy: string;
        query: SelectQueryBuilder<Entity>;
        entity: EntityTarget<Entity>;
    }): SelectQueryBuilder<Entity> {
        if (groupBy === undefined || value === undefined || alias === undefined) return query;
        query.groupBy(groupBy);
        return query.andHaving(alias, value);
    }

    protected orHaveQuery<Entity>({
        alias,
        value,
        query,
        groupBy
    }: {
        entity: EntityTarget<Entity>;
        alias: string;
        value: {
            value: unknown;
        };
        groupBy: string;
        query: SelectQueryBuilder<Entity>;
    }): SelectQueryBuilder<Entity> {
        if (groupBy === undefined || value === undefined || alias === undefined) return query;
        query.groupBy(groupBy);
        return query.orHaving(alias, value);
    }

    protected paginateQuery<Entity>({
        page,
        limit,
        query
    }: {
        entity: EntityTarget<Entity>;
        page: number;
        limit: number;
        query: SelectQueryBuilder<Entity>;
    }): SelectQueryBuilder<Entity> {
        if (page === undefined || limit === undefined) return query;
        if (page === 0 && limit === 0) return query;

        query.skip((Number(page) - 1) * Number(limit));
        query.take(Number(limit));
        return query;
    }

    protected selectQuery<Entity>({
        properties,
        query
    }: {
        entity: EntityTarget<Entity>;
        properties: string[];
        query: SelectQueryBuilder<Entity>;
    }): SelectQueryBuilder<Entity> {
        if (properties === undefined) return query;
        if (!Array.isArray(properties)) {
            return query.select([properties]);
        }
        return query.select(properties);
    }

    protected orderQuery<Entity>({
        by,
        direction,
        query
    }: {
        entity: EntityTarget<Entity>;
        by: string;
        direction: OrderDirection;
        query: SelectQueryBuilder<Entity>;
    }): SelectQueryBuilder<Entity> {
        if (by === undefined || direction === undefined || direction === OrderDirection.None) return query;

        return query.orderBy(by, direction);
    }

    protected relationQuery<Entity>({
        joinAlias,
        relationsAlias,
        query
    }: {
        entity: EntityTarget<Entity>;
        joinAlias: string;
        relationsAlias: string;
        query: SelectQueryBuilder<Entity>;
    }): SelectQueryBuilder<Entity> {
        if (joinAlias === undefined || relationsAlias === undefined) return query;
        return query.leftJoinAndSelect(joinAlias, relationsAlias);
    }
}
