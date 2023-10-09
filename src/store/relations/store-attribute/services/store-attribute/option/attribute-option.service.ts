import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { OrderType } from '@src/base/enum/query/query.enum';
import {
    CreateManyStoreOptionsDto,
    CreateStoreOptionDto,
} from '../../../dto/store-attribute/option/create-attribute-option.dto';
import {
    CreateStoreOptionI,
    StoreOptionResponseI,
} from '../../../interface/store-attributes/attributes-option.interface';
import { StoreViewOption } from '../../../entities/store-attribute/attribute-option.entity';
import { UpdateStoreOptionDto } from '../../../dto/store-attribute/option/update-attribute-option.dto';
import { StoreOptionHelperService } from '@src/base/services/helper/store/store-attributes/attributes-option-helper.service';
import { StoreViewOrderedPaginationDto } from '@src/base/dto/filter/filters.dto';

@Injectable()
export class StoreViewOptionService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly optionHelper: StoreOptionHelperService,
    ) {}
    async create({
        createOption,
    }: {
        createOption: CreateStoreOptionDto;
    }): Promise<StoreOptionResponseI> {
        try {
            return {
                status: '200',
                message: 'Success',
                result: [
                    await this.entityManager.save(
                        StoreViewOption,
                        createOption,
                    ),
                ],
            };
        } catch (e) {
            return {
                status: '666',
                message: 'Ups, Error',
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
        createOptions: CreateManyStoreOptionsDto;
    }): Promise<StoreOptionResponseI> {
        if (createOptions.storeAttribute === 0) {
            createOptions.storeAttribute = null;
        }
        const preparedOptions: CreateStoreOptionI[] = [];
        for (const option of createOptions.options) {
            preparedOptions.push({
                storeAttribute: createOptions.storeAttribute,
                storeView: createOptions.storeView,
                ...option,
            });
        }
        try {
            return {
                status: '200',
                message: 'Success',
                result: await this.entityManager.save(
                    StoreViewOption,
                    preparedOptions,
                ),
            };
        } catch (e) {
            return {
                status: '666',
                message: 'Ups, Error',
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
        condition: StoreViewOrderedPaginationDto;
    }): Promise<StoreOptionResponseI> {
        return await this.optionHelper.singleConditionOptionQuery({
            alias: 'option',
            filters: {
                storeViewId: condition.storeViewId,
                page: condition.page,
                limit: condition.limit,
                orderBy: condition.orderBy,
                orderDirection: condition.orderDirection,
                columnName: null,
                value: null,
                select: null,
                many: true,
            },
        });
    }

    async findOne({ id }: { id: number }): Promise<StoreOptionResponseI> {
        return await this.optionHelper.singleConditionOptionQuery({
            alias: 'option',
            filters: {
                storeViewId: null,
                page: 1,
                limit: 0,
                orderBy: null,
                orderDirection: OrderType.NO,
                columnName: 'id',
                value: id,
                select: null,
                many: false,
            },
        });
    }

    async findOneByAttribute({
        parentId,
    }: {
        parentId: number;
    }): Promise<StoreOptionResponseI> {
        return await this.optionHelper.singleConditionOptionQuery({
            alias: 'option',
            filters: {
                storeViewId: null,
                page: 1,
                limit: 0,
                orderBy: 'storeAttributeId',
                orderDirection: OrderType.ASC,
                columnName: 'storeAttributeId',
                value: parentId,
                select: null,
                many: false,
            },
        });
    }

    async update({
        id,
        updateOptionDto,
    }: {
        id: number;
        updateOptionDto: UpdateStoreOptionDto;
    }): Promise<StoreOptionResponseI> {
        if (
            updateOptionDto.storeAttribute != 0 &&
            updateOptionDto.storeAttribute != null
        ) {
            try {
                return (
                    await this.entityManager.update(
                        StoreViewOption,
                        id,
                        updateOptionDto,
                    )
                ).raw;
            } catch (e) {
                return {
                    status: '666',
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
            status: '666',
            message: 'Something went wrong during update of this entity',
            error: {
                message: 'Parent attribute is not defined',
                in: 'Option Entity',
            },
        };
    }

    async remove({ id }: { id: number }): Promise<StoreOptionResponseI> {
        try {
            if ((await this.entityManager.delete(Option, id)).affected > 0) {
                return {
                    status: '200',
                    message: `Record with id ${id} was removed`,
                };
            }
        } catch (e) {
            return {
                status: '666',
                message: 'Something went wrong during remove of this entity',
                error: {
                    message: e.message,
                    in: 'Option Entity',
                },
            };
        }
    }
}
