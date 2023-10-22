import { Injectable } from '@nestjs/common';
import {
    FilterRequestDto,
    QueryFilterDto,
} from '@src/mec/dto/query/query-filter.dto';
import { OrderDirection } from '@src/mec/enum/query/query.enum';

@Injectable()
export class QueryFilterService {
    protected prepareQueryFilter({
        filters,
        alias,
    }: {
        filters: FilterRequestDto;
        alias: string;
    }): QueryFilterDto {
        const skip: number =
            filters.page != null && filters.page > 0
                ? (filters.page - 1) * filters.limit
                : 0;

        if (filters.by === undefined || filters.by === null) {
            filters.by = null;
            filters.direction = null;
        } else {
            filters.by = alias + '.' + filters.by;
        }
        return {
            pagination: {
                page: skip,
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
}
