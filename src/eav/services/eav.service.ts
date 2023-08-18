import { Injectable } from '@nestjs/common';
import { UpdateEavDto } from '../dto/update-eav.dto';
import { CreateChildEavDto, CreateEavDto } from '../dto/create-eav.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { EAV } from '../entities/eav.entity';
import { GetEavParentDto } from '../dto/get-eav.dto';

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

    findAll() {
        return `This action returns all eav`;
    }

    async findOne(id: number): Promise<GetEavParentDto> {
        return await this.entityManager.findOne(EAV, {
            where: {
                id: id,
            },
        });
    }

    update(id: number, updateEavDto: UpdateEavDto) {
        return `This action updates a #${id} eav`;
    }

    remove(id: number) {
        return `This action removes a #${id} eav`;
    }
}
