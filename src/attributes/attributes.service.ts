import { Injectable } from '@nestjs/common';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { GetAttributeDto } from './dto/get-attribute.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Attribute } from './entities/attribute.entity';

@Injectable()
export class AttributesService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}
    async create({
        createAttributeDto,
    }: {
        createAttributeDto: CreateAttributeDto;
    }): Promise<GetAttributeDto> {
        const new_tree = this.entityManager.create(
            Attribute,
            createAttributeDto,
        );

        return null;
        // return await this.entityManager.save(Attribute, new_tree);
    }

    findAll() {
        return `This action returns all attributes`;
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
