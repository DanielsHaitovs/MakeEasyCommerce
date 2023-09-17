import { Injectable } from '@nestjs/common';
import {
    CreateAttributeDto,
    CreateAttributeShortDto,
} from '../dto/create-attribute.dto';
import { UpdateAttributeDto } from '../dto/update-attribute.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Attributes } from '../entities/attribute.entity';
import { AttributeResponseInterface } from '../interfaces/attribute.interface';
import { OptionService } from '../relations/option/services/option.service';
import { GetAttributeDto } from '../dto/get-attribute.dto';

@Injectable()
export class AttributeService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly optionService: OptionService,
    ) {}
    async create({
        createAttribute,
    }: {
        createAttribute: CreateAttributeDto;
    }): Promise<AttributeResponseInterface> {
        try {

            const newAttribute: GetAttributeDto = await this.entityManager.save(
                Attributes,
                this.entityManager.create(Attributes, createAttribute),
            );

            const savedOptions = await this.optionService.createMany({
                createOptions: {
                    relatedAttribute: newAttribute.id,
                    options: createAttribute.options,
                },
            });
            return {
                result: {
                    options: savedOptions,
                    ...newAttribute,
                },
            };
        } catch (e) {
            return {
                error: {
                    message: e.message,
                    in: 'Attribute Entity',
                },
            };
        }
    }

    async createShort({
        createAttribute,
    }: {
        createAttribute: CreateAttributeShortDto;
    }): Promise<AttributeResponseInterface> {
        try {
            return {
                result: await this.entityManager.save(
                    Attributes,
                    this.entityManager.create(Attributes, createAttribute),
                ),
            };
        } catch (e) {
            return {
                error: {
                    message: e.message,
                    in: 'Attribute Entity',
                },
            };
        }
    }

    findAll() {
        return `This action returns all attribute`;
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
