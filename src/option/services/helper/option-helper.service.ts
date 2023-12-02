import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { OptionQueryService } from '@src/option/services/query/option-query.service';
import {
    AttributeOption,
    OptionIndex,
    OptionAlias,
} from '@src/option/entities/option.entity';
import { CreateOptionDto } from '@src/option/dto/create-option.dto';
import { CreateOptionI } from '@src/option/interfaces/option.interface';
import { GetOptionI } from '@src/option/interfaces/get-option.interface';
import {
    OptionQueryFilterI,
    OptionResponseI,
} from '@src/option/interfaces/query/option-query.interface';
import { OptionQueryFilterDto } from '@src/option/dto/filter/option-filter.dto';

@Injectable()
export class OptionHelperService {
    constructor(
        @InjectEntityManager()
        private readonly optionManager: EntityManager,
        private readonly queryService: OptionQueryService,
    ) {}

    prepareOption({ option }: { option: CreateOptionDto }): CreateOptionI {
        const res: CreateOptionI = this.optionManager.create(
            AttributeOption,
            option,
        );

        if (res.data != undefined) {
            return res;
        }

        return undefined;
    }

    prepareManyOptions({
        options,
    }: {
        options: CreateOptionDto[];
    }): CreateOptionI[] {
        const result: CreateOptionI[] = [];

        for (const data of options) {
            const option: CreateOptionI = this.prepareOption({
                option: data,
            });
            if (option != undefined) continue;
            result.push(option);
        }

        if (Array.isArray(result) && result.length > 0) return result;
        return undefined;
    }

    transformResult({
        response,
    }: {
        response: OptionResponseI;
    }): GetOptionI | GetOptionI[] {
        return this.queryService.toOptionObject({ response });
    }

    toSingleOption({ options }: { options: GetOptionI[] }): GetOptionI {
        if (Array.isArray(options)) return options[0];
    }

    async optionQuery({
        filters,
    }: {
        filters: OptionQueryFilterDto;
    }): Promise<OptionResponseI> {
        const optionQuery: OptionQueryFilterI = this.queryService.queryFilter({
            filters,
            alias: OptionAlias,
        });
        if (optionQuery.message === undefined) {
            try {
                optionQuery.query.cache(true);
                optionQuery.query.useIndex(OptionIndex);

                if (optionQuery.many) {
                    const options: GetOptionI[] = await Promise.resolve(
                        optionQuery.query.getMany(),
                    );
                    if (Array.isArray(options) && options.length > 0) {
                        return {
                            status: '200',
                            message: 'test',
                            result: options,
                        };
                    }
                    return this.handleError(
                        '404',
                        'Not found',
                        null,
                        'Option Helper Service -> optionQuery',
                    );
                }

                const option: GetOptionI = await Promise.resolve(
                    optionQuery.query.getOne(),
                );

                if (option != null && option.id != undefined) {
                    return {
                        status: '200',
                        message: 'Success',
                        result: option,
                    };
                }

                return this.handleError(
                    '404',
                    'Not found',
                    null,
                    'Option Helper Service -> optionQuery',
                );
            } catch (e) {
                return this.handleError(
                    '666',
                    'Not Found',
                    e as Error,
                    'Option Helper -> optionQuery',
                );
            }
        }

        return this.handleError(
            '666',
            optionQuery.message,
            null,
            'Option Helper -> optionQuery',
        );
    }

    handleError(
        status: string,
        message: string,
        e: Error,
        where: string,
    ): OptionResponseI {
        return this.queryService.handleError({ e, where, status, message });
    }
}
