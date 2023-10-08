import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { StoreHelperService } from '@src/base/services/helper/store/store-helper.service';
import { CreateStoreDto, CreateStoreShortDto } from '../dto/create-store.dto';
import { Store } from '../entities/store.entity';
import { OrderedPaginationDto } from '@src/base/dto/filter/filters.dto';
import { OrderType } from '@src/base/enum/query/query.enum';
import { UpdateStoreDto } from '../dto/update-store.dto';
import { EntityManager } from 'typeorm';
import { StoreI, StoreResponseI } from '../interfaces/store.interface';

@Injectable()
export class StoreService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly storeHelper: StoreHelperService,
    ) {}

    async create({
        createStoreDto,
    }: {
        createStoreDto: CreateStoreShortDto;
    }): Promise<StoreResponseI> {
        const exists = await this.storeHelper.ifExists({
            name: createStoreDto.name,
            code: createStoreDto.code,
        });

        if (exists) {
            return {
                status: '770',
                message: 'Duplicate',
                error: {
                    message: 'Store with this name or code already exist',
                    in: 'Store Entity',
                },
            };
        }
        try {
            return {
                status: '200',
                message: 'Success',
                result: await this.entityManager.save(
                    Store,
                    await this.prepareStore({
                        createStoreDto: {
                            // storeViews: null,
                            ...createStoreDto,
                        },
                    }),
                ),
            };
        } catch (e) {
            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    message: e.message,
                    in: 'Store Entity',
                },
            };
        }
    }

    async createCollection({
        createStoreDto,
    }: {
        createStoreDto: CreateStoreDto;
    }): Promise<StoreResponseI> {
        // if (
        //     createStoreDto.storeViews === null ||
        //     createStoreDto.storeViews === undefined
        // ) {
        //     return {
        //         status: '6666',
        //         message: 'Ups, Error',
        //         error: {
        //             message: 'Store views are not defined',
        //             in: 'Store Entity',
        //         },
        //     };
        // }

        const exists = await this.storeHelper.ifExists({
            name: createStoreDto.name,
            code: createStoreDto.code,
        });
        if (exists) {
            return {
                status: '770',
                message: 'Duplicate',
                error: {
                    message: 'Store with this name or code already exist',
                    in: 'Store Entity',
                },
            };
        }

        try {
            return {
                status: '200',
                message: 'Success',
                result: await this.entityManager.save(
                    Store,
                    await this.prepareStore({ createStoreDto }),
                ),
            };
        } catch (e) {
            return {
                status: '6666',
                message: 'Ups, Error',
                error: {
                    message: e.message,
                    in: 'Store Entity',
                },
            };
        }
    }

    async findAll({
        condition,
    }: {
        condition: OrderedPaginationDto;
    }): Promise<StoreResponseI> {
        const response = await this.storeHelper.singleConditionStoreQuery({
            filters: {
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

        if (response.result === null || response.result === undefined) {
            return {
                status: '404',
                message: 'No records was not found',
            };
        }

        return response;
    }

    async findOneById({ id }: { id: number }): Promise<StoreResponseI> {
        const response = await this.storeHelper.singleConditionStoreQuery({
            filters: {
                page: 1,
                limit: 0,
                orderBy: 'id',
                orderDirection: OrderType.ASC,
                columnName: 'id',
                value: id,
                select: null,
                many: false,
            },
        });

        if (response.result === null || response.result === undefined) {
            return {
                status: '404',
                message: 'No records was not found',
            };
        }

        return response;
    }

    async update({
        id,
        store,
    }: {
        id: number;
        store: UpdateStoreDto;
    }): Promise<StoreResponseI> {
        return (await this.entityManager.update(Store, id, store)).raw;
    }

    async remove({ id }: { id: number }): Promise<StoreResponseI> {
        try {
            if ((await this.entityManager.delete(Store, id)).affected > 0) {
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
                    in: 'Store Entity',
                },
            };
        }
    }

    protected async prepareStore({
        createStoreDto,
    }: {
        createStoreDto: CreateStoreDto;
    }): Promise<StoreI> {
        return this.entityManager.create(Store, createStoreDto);
    }
}
