/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { QueryResponseI } from '@src/mec/interface/query/query.interface';
import { QueryFilterService } from '@src/mec/service/query/query-filter.service';
import { OptionQueryFilterDto } from '@src/option/dto/filter/option-filter.dto';
import { AttributeOption } from '@src/option/entities/option.entity';
import { GetOptionI } from '@src/option/interfaces/get-option.interface';
import {
    OptionQueryFilterI,
    OptionResponseI,
} from '@src/option/interfaces/query/option-query.interface';
import { DataHelperService } from '@src/utils/data-help.service';
import { ErrorHandlerService } from '@src/utils/error-handler.service';
import { EntityManager } from 'typeorm';

@Injectable()
export class OptionQueryService extends QueryFilterService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly dataHelper: DataHelperService,
        private readonly errorHandler: ErrorHandlerService,
    ) {
        super();
    }

    queryFilter({
        filters,
        alias,
    }: {
        filters: OptionQueryFilterDto;
        alias: string;
    }): OptionQueryFilterI {
        const queryFilter = super.queryFilter({ filters, alias });
        let many = true;
        try {
            let optionQuery = this.entityManager
                .getRepository(AttributeOption)
                .createQueryBuilder(alias);

            if (filters.optionIds != undefined) {
                optionQuery = this.whereIdsQuery({
                    ids: filters.optionIds,
                    alias: alias,
                    query: optionQuery,
                    entity: AttributeOption,
                });

                if (filters.optionIds.length === 1) {
                    many = false;
                }
            }
            if (queryFilter.order.by != undefined) {
                optionQuery = this.orderQuery({
                    by: queryFilter.order.by,
                    direction: queryFilter.order.direction,
                    query: optionQuery,
                    entity: AttributeOption,
                });
            }

            if (many) {
                optionQuery = this.paginateQuery({
                    page: queryFilter.pagination.page,
                    limit: queryFilter.pagination.limit,
                    query: optionQuery,
                    entity: AttributeOption,
                });
            }

            return {
                message: undefined,
                many: many,
                query: optionQuery,
                ...queryFilter,
            };
        } catch (e) {
            const error = e as Error;
            return {
                message: error.message,
                query: undefined,
                many: undefined,
                ...queryFilter,
            };
        }
    }

    toOptionObject({
        response,
    }: {
        response: OptionResponseI;
    }): GetOptionI | GetOptionI[] {
        return this.dataHelper.toObject({ response });
    }

    handleError({
        status,
        e,
        where,
        message,
    }: {
        status: string;
        e: Error;
        where: string;
        message: string;
    }): OptionResponseI {
        const handler: QueryResponseI = this.errorHandler.handleError({
            status,
            message,
            e,
            where,
        });

        return {
            status: handler.status,
            message: handler.message,
            error: handler.error,
            result: undefined,
        };
    }
}
