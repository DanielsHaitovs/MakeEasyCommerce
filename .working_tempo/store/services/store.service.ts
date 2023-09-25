import { Injectable } from '@nestjs/common';
import {
    CreateStoreDto,
    CreateStoreShortDto,
    CreateStoreViewDto,
} from '../dto/create-store.dto';
import { UpdateStoreDto } from '../dto/update-store.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { StoreHelperService } from '@src/base/services/helper/store/store-helper.service';
import {
    CreateStoreResponse,
    CreateStoreViewInterface,
    CreateStoreViewResponse,
    StoreResponseInterface,
} from '../interfaces/store.interface';
import { Store } from '../entities/store.entity';
import { OrderedPaginationDto } from '@src/base/dto/filter/filters.dto';
import { OrderType } from '@src/base/enum/query/query.enum';
import { StoreView } from '../entities/store-view.entity';
import { StoreDescriptionDto } from '../dto/store-base.dto';

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
    }): Promise<StoreResponseInterface> {
        const exists = await this.ifExists({
            name: createStoreDto.description.name,
            code: createStoreDto.description.code,
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
            // return {
            //     result: await this.entityManager.save(
            //         Store,
            //         await this.prepareStore({ createStoreDto }),
            //     ),
            // };
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
    }): Promise<StoreResponseInterface> {
        const exists = await this.ifExists({
            name: createStoreDto.description.name,
            code: createStoreDto.description.code,
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
            // const newStore = await this.entityManager.save(
            //     Store,
            //     await this.prepareStore({
            //         createStoreDto: { },
            //     }),
            // );

            // const itsStoreViews =
            return null;
            // return {
            //     result: await this.entityManager.save(
            //         Store,
            //         await this.prepareStore({ createStoreDto }),
            //     ),
            // };
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
    }): Promise<StoreResponseInterface> {
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

    async findOneById({ id }: { id: number }): Promise<StoreResponseInterface> {
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
    }): Promise<StoreResponseInterface> {
        return (await this.entityManager.update(Store, id, store)).raw;
    }

    async remove({ id }: { id: number }): Promise<StoreResponseInterface> {
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
        createStoreDto: StoreDescriptionDto;
    }): Promise<CreateStoreResponse> {
        return {
            result: {
                storeViews: null,
                description: createStoreDto,
            },
        };
    }

    protected async prepareStoreViews({
        createStoreViewsDto,
    }: {
        createStoreViewsDto: CreateStoreViewDto[];
    }): Promise<CreateStoreViewResponse> {
        const newStoreViews: CreateStoreViewInterface[] = [];
        let validation = null;
        for (const storeView of createStoreViewsDto) {
            if (
                await this.ifStoreViewExists({
                    name: storeView.view.name,
                    code: storeView.view.code,
                })
            ) {
                validation = storeView;
                break;
            }
            newStoreViews.push(
                this.entityManager.create(StoreView, {
                    view: storeView.view,
                    store: {
                        id: storeView.store,
                    },
                }),
            );
        }
        if (validation != null) {
            return {
                status: '999',
                result: validation,
                error: {
                    message: 'Stove View Already exist',
                    in: 'Store View Entity',
                },
            };
        }

        return {
            status: '200',
            result: newStoreViews,
        };
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
            .where('store.description.name = :name', { name })
            .orWhere('store.description.code = :code', { code })
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
            .where('store_view.description.name = :name', { name })
            .orWhere('store_view.description.code = :code', { code })
            .getExists();
    }
}
