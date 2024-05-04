import { EntityTarget, SelectQueryBuilder } from 'typeorm';
import { PaginationDto, QueryFilterDto } from '@src/mec/dto/query/filter.dto';
import { OrderDirection } from '@src/mec/enum/query/query.enum';

export class QueryService {
    protected prepareFilter({ filters, alias }: { filters: QueryFilterDto; alias: string }): QueryFilterDto {
        filters = this.prepareIdsFilter({ filters });
        filters = this.preparePagination({ filters });
        filters = this.prepareOrderFilter({ filters, alias });

        return filters;
    }

    protected whereQuery<Entity>({
        alias,
        data,
        query
    }: {
        alias: string;
        entity: EntityTarget<Entity>;
        data: unknown;
        query: SelectQueryBuilder<Entity>;
    }): SelectQueryBuilder<Entity> {
        if (data === undefined || alias === undefined) return query;
        const propertyName = alias.substring(alias.lastIndexOf('.') + 1);
        console.log(propertyName);
        return query.where(alias + '= :' + propertyName, { [propertyName]: data });
    }

    protected whereIdsQuery<Entity>({
        ids,
        query
    }: {
        ids: number[];
        entity: EntityTarget<Entity>;
        query: SelectQueryBuilder<Entity>;
    }): SelectQueryBuilder<Entity> {
        if (ids === undefined) return query;
        if (!Array.isArray(ids)) ids = [ids];

        return query.whereInIds(ids);
    }

    protected andWhereQuery<Entity>({
        where,
        alias,
        query
    }: {
        entity: EntityTarget<Entity>;
        where: string[] | number[] | boolean[];
        alias: string;
        query: SelectQueryBuilder<Entity>;
    }): SelectQueryBuilder<Entity> {
        if (where == undefined) return query;
        if (!Array.isArray(where)) {
            where = [where];
        }

        const propertyName = alias.substring(alias.lastIndexOf('.') + 1);
        if (propertyName == undefined) return query;
        return query.andWhere(`${alias} IN (:...${propertyName})`, { [propertyName]: where });
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
        pagination,
        query
    }: {
        entity: EntityTarget<Entity>;
        pagination: PaginationDto;
        query: SelectQueryBuilder<Entity>;
    }): SelectQueryBuilder<Entity> {
        if (pagination == undefined) return query;

        const { page, limit } = pagination;

        if (page === undefined || limit === undefined) return query;
        if (page === 0 && limit === 0) return query;

        query.skip((page - 1) * limit);
        query.take(limit);
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

    protected prepareIdsFilter({ filters }: { filters: QueryFilterDto }): QueryFilterDto {
        try {
            const { ids } = filters;

            if (ids == undefined || ids.length < 1) {
                return {
                    ids: undefined,
                    ...filters
                };
            }

            if (!Array.isArray(ids) && Number(ids)) {
                filters.ids = [Number(ids)];
            } else {
                filters.ids = ids.flatMap((id) => Number(id));
            }

            return filters;
        } catch {
            return {
                ids: undefined,
                ...filters
            };
        }
    }

    private preparePagination({ filters }: { filters: QueryFilterDto }): QueryFilterDto {
        try {
            const { pagination } = filters;
            if (Number(pagination.page) > 0 || Number(pagination.limit) > 0) {
                filters.pagination = {
                    page: Number(pagination.page),
                    limit: Number(pagination.limit)
                };
            } else {
                filters.pagination = undefined;
            }

            return filters;
        } catch {
            return {
                pagination: {
                    page: undefined,
                    limit: undefined
                },
                ...filters
            };
        }
    }

    private prepareOrderFilter({ filters, alias }: { filters: QueryFilterDto; alias: string }): QueryFilterDto {
        try {
            if (alias === undefined) {
                return {
                    order: undefined,
                    ...filters
                };
            }

            const { order } = filters;

            if (order.by == undefined || order.direction === OrderDirection.None) {
                filters.order = undefined;
            }
            return filters;
        } catch {
            return {
                order: undefined,
                ...filters
            };
        }
    }
}
