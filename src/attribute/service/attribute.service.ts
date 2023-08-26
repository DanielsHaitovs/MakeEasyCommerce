import { Injectable } from '@nestjs/common';
import { CreateAttributeDto } from '../dto/create-attribute.dto';
import { UpdateAttributeDto } from '../dto/update-attribute.dto';
import { GetAttributeDto } from '../dto/get-attribute.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Attribute } from '../entities/attribute.entity';

@Injectable()
export class AttributeService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}

    async create({
        createAttributeDto,
    }: {
        createAttributeDto: CreateAttributeDto;
    }): Promise<GetAttributeDto> {
        return null;
        // return await this.entityManager.save(
        //     Attribute,
        //     this.entityManager.create(Attribute, {
        //         options: newOptions,
        //         rule: this.entityManager.create(
        //             AttributeRule,
        //             createAttributeDto.rule,
        //         ),
        //         ...createAttributeDto,
        //     }),
        // );
    }

    async findAll() {
        return await this.entityManager
            .getRepository(Attribute)
            .createQueryBuilder('attribute')
            .leftJoinAndSelect('attribute.options', 'options')
            .leftJoinAndSelect('attribute.rule', 'rule')
            .getMany();
    }

    findOne(id: number) {
        return `This action returns a #${id} attribute`;
    }

    update(id: number, updateAttributeDto: UpdateAttributeDto) {
        return `This action updates a #${id} attribute`;
    }

    remove(id: number) {
        return `This action removes a #${id} attribute`;
    }
}
