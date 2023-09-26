import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { StoreHelperService } from '@src/base/services/helper/store/store-helper.service';
import { EntityManager } from 'typeorm';
import { CreateStoreDto } from '../dto/create-store.dto';
import { StoreI, StoreResponseI } from '../interfaces/store.interfaces';
import { Store } from '../entities/store.entity';
import { OrderedPaginationDto } from '@src/base/dto/filter/filters.dto';
import { OrderType } from '@src/base/enum/query/query.enum';
import { UpdateStoreDto } from '../dto/update-store.dto';

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
        createStoreDto: CreateStoreDto;
    }): Promise<StoreResponseI> {
        const exists = await this.ifExists({
            name: createStoreDto.name,
            code: createStoreDto.code,
        });

        if (exists) {
            return {
                error: {
                    message: 'Store with this name or code already exist',
                    in: 'Store Entity',
                },
            };
        }
        try {
            return {
                result: await this.entityManager.save(
                    Store,
                    await this.prepareStore({ createStoreDto }),
                ),
            };
        } catch (e) {
            return {
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
        if (
            createStoreDto.storeViews === null ||
            createStoreDto.storeViews === undefined
        ) {
            return {
                error: {
                    message: 'Store views are not defined',
                    in: 'Store Entity',
                },
            };
        }

        const exists = await this.ifExists({
            name: createStoreDto.name,
            code: createStoreDto.code,
        });
        if (exists) {
            return {
                error: {
                    message: 'Store with this name or code already exist',
                    in: 'Store Entity',
                },
            };
        }

        try {
            return {
                result: await this.entityManager.save(
                    Store,
                    await this.prepareStore({ createStoreDto }),
                ),
            };
        } catch (e) {
            return {
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
        return await this.storeHelper.singleConditionStoreQuery({
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

    async findOneById({ id }: { id: number }): Promise<StoreResponseI> {
        return await this.storeHelper.singleConditionStoreQuery({
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
                    message: `Record with id ${id} was removed`,
                };
            }
        } catch (e) {
            return {
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

    async ifExists({
        name,
        code,
    }: {
        name: string;
        code: string;
    }): Promise<boolean> {
        return await this.entityManager
            .getRepository(Store)
            .createQueryBuilder('store')
            .where('store.name = :name', { name })
            .orWhere('store.code = :code', { code })
            .getExists();
    }

    async ifStoreViewExists({
        name,
        code,
    }: {
        name: string;
        code: string;
    }): Promise<boolean> {
        return await this.entityManager
            .getRepository(Store)
            .createQueryBuilder('store_view')
            .where('store_view.name = :name', { name })
            .orWhere('store_view.code = :code', { code })
            .getExists();
    }
}
