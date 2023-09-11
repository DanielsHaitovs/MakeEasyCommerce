import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, EntityTarget } from 'typeorm';
import { QueryErrorResponse } from '@src/base/dto/responses/response.create-query.dto';

@Injectable()
export class CreateQueryService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}

    async prepareQuery<Entity>(
        entity: EntityTarget<Entity>,
        toEntity: Entity,
    ): Promise<Entity> {
        return await this.entityManager.create(entity, toEntity);
    }

    async saveQuery<Entity, GetDTO>({
        entity,
        newObj,
        getDto,
    }: {
        entity: EntityTarget<Entity>;
        newObj: any | any[];
        getDto: GetDTO;
    }): Promise<GetDTO | QueryErrorResponse> {
        try {
            return await this.entityManager.save(
                entity,
                this.entityManager.create(entity, newObj),
            );
        } catch (e) {
            return {
                result: getDto,
                error: {
                    message: e.message,
                    in: `Error happened while saving new ${entity.constructor.name} entity, trying to create`,
                },
            };
        }
    }
    // async saveQuery<Entity>(
    //     entity: EntityTarget<Entity>,
    //     toEntity: Entity,
    // ): Promise<QueryResponse<Entity>> {
    //     const newEntity = await this.prepareQuery(entity, toEntity);

    //     try {
    //         if (newEntity != null) {
    //             return await this.entityManager.save(entity, newEntity);
    //         }
    //     } catch (e) {
    //         return {
    //             result: {
    //                 message: e.message,
    //                 for: newEntity,
    //             },
    //         };
    //     }
    // }
}
