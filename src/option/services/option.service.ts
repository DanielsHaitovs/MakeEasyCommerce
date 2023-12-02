import { Injectable } from '@nestjs/common';
import { UpdateOptionDto } from '../dto/update-option.dto';
import { CreateOptionDto } from '../dto/create-option.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { AttributeOption } from '../entities/option.entity';
import { GetOptionI } from '../interfaces/get-option.interface';
import { OptionHelperService } from '@src/option/services/helper/option-helper.service';
import { CreateOptionI } from '../interfaces/option.interface';
import { OptionResponseI } from '../interfaces/query/option-query.interface';
import { OptionQueryFilterDto } from '../dto/filter/option-filter.dto';

@Injectable()
export class AttributeOptionService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly optionHelper: OptionHelperService,
    ) {}

    async create({
        createOptionDto,
    }: {
        createOptionDto: CreateOptionDto;
    }): Promise<OptionResponseI> {
        const prepareOption = this.optionHelper.prepareOption({
            option: createOptionDto,
        });

        if (prepareOption != undefined) {
            try {
                const res: GetOptionI = await this.entityManager.save(
                    AttributeOption,
                    prepareOption,
                );

                if (res != null) {
                    return {
                        status: '200',
                        message: 'Success',
                        result: res,
                    };
                }
                return this.optionHelper.handleError(
                    '666',
                    'Something Went wrong saving the option',
                    null,
                    'Option Service this.entityManager.save',
                );
            } catch (e) {
                return this.optionHelper.handleError(
                    '666',
                    'Ups, Error',
                    e as Error,
                    'Option Service -> Create Single Option',
                );
            }
        }

        return this.optionHelper.handleError(
            '666',
            'Could not prepare Option',
            null,
            'Option Service this.entityManager.create',
        );
    }

    async createMany({
        createOptionDto,
    }: {
        createOptionDto: CreateOptionDto[];
    }): Promise<OptionResponseI> {
        const prepareOption: CreateOptionI[] =
            this.optionHelper.prepareManyOptions({
                options: createOptionDto,
            });

        if (prepareOption != undefined) {
            try {
                const res: GetOptionI[] = await this.entityManager.save(
                    AttributeOption,
                    prepareOption,
                );

                if (res != null) {
                    return {
                        status: '200',
                        message: 'Success',
                        result: res,
                    };
                }
                return this.optionHelper.handleError(
                    '666',
                    'Something Went wrong saving the options',
                    null,
                    'Option Service this.entityManager.save',
                );
            } catch (e) {
                return this.optionHelper.handleError(
                    '666',
                    'Ups, Error',
                    e as Error,
                    'Option Service -> Create Many Options',
                );
            }
        }

        return this.optionHelper.handleError(
            '666',
            'Could not prepare Option',
            null,
            'Option Service this.entityManager.create',
        );
    }

    async findOptionQuery({
        optionQuery,
    }: {
        optionQuery: OptionQueryFilterDto;
    }): Promise<OptionResponseI> {
        return await this.optionHelper.optionQuery({
            filters: { ...optionQuery },
        });
    }

    async update({
        id,
        option,
    }: {
        id: number;
        option: UpdateOptionDto;
    }): Promise<OptionResponseI> {
        try {
            const affected: number = (
                await this.entityManager.update(AttributeOption, id, option)
            ).affected;

            if (affected > 0) {
                return {
                    status: '200',
                    message: 'Success',
                    result: null,
                };
            }

            return this.optionHelper.handleError(
                '666',
                'Could not update option',
                null,
                'Option Service -> Update',
            );
        } catch (e) {
            return this.optionHelper.handleError(
                '666',
                'Ups, Error',
                e as Error,
                'Option Service -> Remove',
            );
        }
    }

    async remove({ id }: { id: number }): Promise<OptionResponseI> {
        try {
            if (
                (await this.entityManager.delete(AttributeOption, id))
                    .affected > 0
            ) {
                return {
                    status: '200',
                    message: `Record with id ${id} was removed`,
                };
            }
        } catch (e) {
            return this.optionHelper.handleError(
                '666',
                'Ups, Error',
                e as Error,
                'Option Service -> Remove',
            );
        }
    }
}
