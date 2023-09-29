import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { StoreHelperService } from '@src/base/services/helper/store/store-helper.service';
import { EntityManager } from 'typeorm';
import { OrderedPaginationDto } from '@src/base/dto/filter/filters.dto';
import { OrderType } from '@src/base/enum/query/query.enum';
import { StoreView } from '../entities/store-view.entity';
import { CreateStoreViewDto } from '../dto/create-store-view.dto';
import {
    CreateStoreViewI,
    StoreViewResponseI,
} from '../interfaces/store-view.interface';
import { UpdateStoreViewDto } from '../dto/update-store-view.dto';

@Injectable()
export class StoreViewService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly storeHelper: StoreHelperService,
    ) {}

    async create({
        createStoreViewDto,
    }: {
        createStoreViewDto: CreateStoreViewDto;
    }): Promise<StoreViewResponseI> {
        const exists = await this.storeHelper.ifExists({
            name: createStoreViewDto.name,
            code: createStoreViewDto.code,
        });

        if (exists) {
            return {
                status: '770',
                message: 'Duplicate',
                error: {
                    message: 'Store view with this name or code already exist',
                    in: 'Store View Entity',
                },
            };
        }
        try {
            return {
                status: '200',
                message: 'Success',
                result: await this.entityManager.save(
                    StoreView,
                    await this.prepareStoreView({ createStoreViewDto }),
                ),
            };
        } catch (e) {
            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    message: e.message,
                    in: 'Store View Entity',
                },
            };
        }
    }

    async findAll({
        condition,
    }: {
        condition: OrderedPaginationDto;
    }): Promise<StoreViewResponseI> {
        return await this.storeHelper.singleConditionStoreViewQuery({
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

    async findOneById({ id }: { id: number }): Promise<StoreViewResponseI> {
        return await this.storeHelper.singleConditionStoreViewQuery({
            filters: {
                page: 1,
                limit: 0,
                orderBy: 'id',
                orderDirection: OrderType.ASC,
                columnName: 'id',
                value: id,
                select: null,
            },
        });
    }

    async update({
        id,
        storeView,
    }: {
        id: number;
        storeView: UpdateStoreViewDto;
    }): Promise<StoreViewResponseI> {
        return (await this.entityManager.update(StoreView, id, storeView)).raw;
    }

    async remove({ id }: { id: number }): Promise<StoreViewResponseI> {
        try {
            if ((await this.entityManager.delete(StoreView, id)).affected > 0) {
                return {
                    status: '200',
                    message: `Record with id ${id} was removed`,
                };
            } else {
                return {
                    status: '404',
                    message: `Record with id ${id} was not found`,
                };
            }
        } catch (e) {
            return {
                status: '666',
                message: 'Something went wrong during remove of this entity',
                error: {
                    message: e.message,
                    in: 'Store View Entity',
                },
            };
        }
    }

    protected async prepareStoreView({
        createStoreViewDto,
    }: {
        createStoreViewDto: CreateStoreViewDto;
    }): Promise<CreateStoreViewI> {
        return this.entityManager.create(StoreView, createStoreViewDto);
    }
}
