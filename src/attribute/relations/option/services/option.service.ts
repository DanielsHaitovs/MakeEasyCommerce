import { Injectable } from '@nestjs/common';
import { UpdateOptionDto } from '../dto/update-option.dto';
import { CreateOptionDto, CreateOptionsDto } from '../dto/create-option.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Option } from '../entities/option.entity';
import { OptionResponseInterface } from '../interfaces/option.interface';
import { OptionHelperService } from '@src/base/services/helper/attributes/option-helper.service';
import { OrderedPaginationDto } from '@src/base/dto/filter/filters.dto';
import { OrderType } from '@src/base/enum/query/query.enum';

@Injectable()
export class OptionService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly optionHelper: OptionHelperService,
    ) {}
    async create({
        createOption,
    }: {
        createOption: CreateOptionDto;
    }): Promise<OptionResponseInterface> {
        if (createOption.relatedAttribute === 0) {
            createOption.relatedAttribute = null;
        }
        try {
            return {
                result: [
                    await this.entityManager.save(Option, {
                        relatedAttribute: createOption.relatedAttribute,
                        value: createOption.value,
                    }),
                ],
            };
        } catch (e) {
            return {
                error: {
                    message: e.message,
                    in: 'Option Entity',
                },
            };
        }
    }

    async createMany({
        createOptions,
    }: {
        createOptions: CreateOptionsDto;
    }): Promise<OptionResponseInterface> {
        if (createOptions.relatedAttribute === 0) {
            createOptions.relatedAttribute = null;
        }
        const preparedOptions: CreateOptionDto[] = [];
        for (const option of createOptions.options) {
            preparedOptions.push({
                relatedAttribute: createOptions.relatedAttribute,
                value: option.value,
            });
        }
        try {
            return {
                result: await this.entityManager.save(Option, preparedOptions),
            };
        } catch (e) {
            return {
                error: {
                    message: e.message,
                    in: 'Option Service Create Many',
                },
            };
        }
    }

    async findAll({
        condition,
    }: {
        condition: OrderedPaginationDto;
    }): Promise<OptionResponseInterface> {
        return await this.optionHelper.singleConditionOptionQuery({
            alias: 'option',
            filters: {
                page: condition.page,
                limit: condition.limit,
                orderBy: condition.orderBy,
                orderDirection: condition.orderDirection,
                columnName: null,
                value: null,
                select: null,
            },
        });
    }

    async findOne({ id }: { id: number }): Promise<OptionResponseInterface> {
        return await this.optionHelper.singleConditionOptionQuery({
            alias: 'option',
            filters: {
                page: 1,
                limit: 0,
                orderBy: null,
                orderDirection: OrderType.NO,
                columnName: 'id',
                value: id,
                select: null,
            },
        });
    }

    async findOneByAttribute({
        parentId,
    }: {
        parentId: number;
    }): Promise<OptionResponseInterface> {
        return await this.optionHelper.singleConditionOptionQuery({
            alias: 'option',
            filters: {
                page: 1,
                limit: 0,
                orderBy: 'relatedAttributeId',
                orderDirection: OrderType.ASC,
                columnName: 'relatedAttributeId',
                value: parentId,
                select: null,
            },
        });
    }

    async update({
        id,
        updateOptionDto,
    }: {
        id: number;
        updateOptionDto: UpdateOptionDto;
    }): Promise<OptionResponseInterface> {
        if (
            updateOptionDto.relatedAttribute != 0 &&
            updateOptionDto.relatedAttribute != null
        ) {
            try {
                return (
                    await this.entityManager.update(Option, id, updateOptionDto)
                ).raw;
            } catch (e) {
                return {
                    message:
                        'Something went wrong during update of this entity',
                    error: {
                        message: e.message,
                        in: 'Option Entity',
                    },
                };
            }
        }
        return {
            message: 'Something went wrong during update of this entity',
            error: {
                message: 'Parent attribute is not defined',
                in: 'Option Entity',
            },
        };
    }

    async remove({ id }: { id: number }): Promise<OptionResponseInterface> {
        try {
            if ((await this.entityManager.delete(Option, id)).affected > 0) {
                return {
                    message: `Record with id ${id} was removed`,
                };
            }
        } catch (e) {
            return {
                message: 'Something went wrong during remove of this entity',
                error: {
                    message: e.message,
                    in: 'Option Entity',
                },
            };
        }
    }
}
