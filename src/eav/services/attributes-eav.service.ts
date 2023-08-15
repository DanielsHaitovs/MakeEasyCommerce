import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CreateEavAttribute } from '../dto/attribute/create-eav-attribute.dto';
import { AttributeEAV } from '../entities/inheritance/attribute/eav-attribute.entity';

@Injectable()
export class AttributeEavService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}

    async create({
        createAttributeEavDto,
    }: {
        createAttributeEavDto: CreateEavAttribute;
    }): Promise<any> {
        return this.entityManager.create(AttributeEAV, {
            ...createAttributeEavDto,
        });
    }

    findAll() {
        return `This action returns all eav`;
    }

    findOne(id: number) {
        return `This action returns a #${id} eav`;
    }

    update(id: number) {
        return `This action updates a #${id} eav`;
    }

    remove(id: number) {
        return `This action removes a #${id} eav`;
    }
}
