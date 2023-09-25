import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class StoreViewService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}

    async create({
        createStoreViewDto,
    }: {
        createStoreViewDto: CreateStoreViewDto;
    }): Promise<StoreViewResponseInterface> {
        const exists = await this.ifExists({
            name: createStoreViewDto.view.name,
            code: createStoreViewDto.view.code,
        });

        if (exists) {
            return {
                error: {
                    message: 'Store vie with this name or code already exist',
                    in: 'Store View Entity',
                },
            };
        }
        try {
            const newStoreView: CreateStoreViewInterface = (
                await this.prepareStoreView({ createStoreViewDto })
            ).result[0];

            return {
                result: await this.entityManager.save(StoreView, newStoreView),
            };
        } catch (e) {
            return {
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
    }): Promise<StoreViewResponseInterface> {
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

    async findOneById({
        id,
    }: {
        id: number;
    }): Promise<StoreViewResponseInterface> {
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
    }): Promise<StoreViewResponseInterface> {
        return (await this.entityManager.update(StoreView, id, null)).raw;
    }

    async remove({ id }: { id: number }): Promise<StoreViewResponseInterface> {
        try {
            if ((await this.entityManager.delete(StoreView, id)).affected > 0) {
                return {
                    message: `Record with id ${id} was removed`,
                };
            }
        } catch (e) {
            return {
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
    }): Promise<CreateStoreViewResponse> {
        return {
            result: this.entityManager.create(StoreView, {
                view: createStoreViewDto.view,
                store: {
                    id: createStoreViewDto.store,
                },
            }),
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
            .getRepository(StoreView)
            .createQueryBuilder('store_view')
            .where('store.view.name = :name', { name })
            .orWhere('store.view.code = :code', { code })
            .getExists();
    }
}
