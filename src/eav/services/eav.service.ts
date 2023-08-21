import { Injectable } from '@nestjs/common';
import { UpdateEavDto } from '../dto/update-eav.dto';
import { CreateChildEavDto, CreateEavDto } from '../dto/create-eav.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { EAV } from '../entities/eav.entity';
import { GetParentEavAttributesDto, GetEavParentDto } from '../dto/get-eav.dto';

@Injectable()
export class EavService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}

    async create({
        createEavDto,
    }: {
        createEavDto: CreateEavDto;
    }): Promise<CreateChildEavDto> {
        const parent: GetEavParentDto = await this.entityManager.findOne(EAV, {
            where: { id: createEavDto.parent_id },
        });

        if (parent && parent.id) {
            return await this.entityManager.save(
                EAV,
                this.entityManager.create(EAV, {
                    parent: parent,
                    ...createEavDto,
                }),
            );
        }

        throw `Parent with id ${createEavDto.parent_id} not found`;
    }

    async findAll({
        attributes,
        products,
        customers,
        baskets,
        orders,
    }: {
        attributes: boolean;
        products: boolean;
        customers: boolean;
        baskets: boolean;
        orders: boolean;
    }): Promise<GetParentEavAttributesDto[]> {
        const where = {
            filter: '',
            value: null,
        };
        const relations = {
            attributes: attributes,
            products: products,
            customers: customers,
            baskets: baskets,
            orders: orders,
        };
        try {
            return await this.findEAVQuery({
                where,
                relations,
                many: true,
            });
        } catch (e) {
            return e.message;
        }
    }

    async findOne({
        id,
        attributes,
        products,
        customers,
        baskets,
        orders,
    }: {
        id: number;
        attributes: boolean;
        products: boolean;
        customers: boolean;
        baskets: boolean;
        orders: boolean;
    }): Promise<GetParentEavAttributesDto> {
        const where = {
            filter: 'id',
            value: id,
        };
        const relations = {
            attributes: attributes,
            products: products,
            customers: customers,
            baskets: baskets,
            orders: orders,
        };
        try {
            return (
                await this.findEAVQuery({
                    where,
                    relations,
                    many: false,
                })
            ).shift();
        } catch (e) {
            return e.message;
        }
    }

    update(id: number, updateEavDto: UpdateEavDto) {
        console.log(updateEavDto);
        return `This action updates a #${id} eav`;
    }

    remove(id: number) {
        return `This action removes a #${id} eav`;
    }

    protected async findEAVQuery({
        where,
        relations,
        many,
    }: {
        where: {
            filter: string;
            value: any;
        };
        relations: {
            attributes: boolean;
            products: boolean;
            customers: boolean;
            baskets: boolean;
            orders: boolean;
            // cms: boolean;
        };
        many: boolean;
    }): Promise<any[]> {
        let condition = '';
        let query = null;
        if (where.filter && where.value) {
            condition = 'eav.' + where.filter + ' = :' + where.filter;
            query = {};
            query[where.filter] = where.value;
        }

        if (!many && relations.attributes) {
            return [
                await this.entityManager
                    .getRepository(EAV)
                    .createQueryBuilder('eav')
                    .leftJoinAndSelect('eav.attributes', 'attributes')
                    .where(condition, query)
                    .getOne(),
            ];
        }

        if (many && relations.attributes) {
            return [
                await this.entityManager
                    .getRepository(EAV)
                    .createQueryBuilder('eav')
                    .leftJoinAndSelect('eav.attributes', 'attributes')
                    .where(condition, query)
                    .getMany(),
            ];
        }

        return await this.entityManager
            .getRepository(EAV)
            .createQueryBuilder('eav')
            .where(condition, query)
            .getMany();
    }
}
