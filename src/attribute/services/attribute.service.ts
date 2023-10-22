import { Injectable } from '@nestjs/common';
import { CreateAttributeDto } from '../dto/create-attribute.dto';
import { UpdateAttributeDto } from '../dto/update-attribute.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import {
    AttributeResponseI,
    GetAttributeI,
    GetAttributeShortI,
} from '../interface/get-attribute.interface';
import { AttributeHelperService } from '@src/mec/services/attribute/attribute-helper.service';
import { Attribute } from '../entities/attribute.entity';
import { AttributeQueryFilterDto } from '@src/mec/dto/query/attribute/attribute-filter.dto';

@Injectable()
export class AttributeService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly attributeHelper: AttributeHelperService,
    ) {}

    async create({
        createAttribute,
    }: {
        createAttribute: CreateAttributeDto;
    }): Promise<AttributeResponseI> {
        const check = await this.attributeHelper.ifExists({
            name: createAttribute.name,
            code: createAttribute.code,
        });
        if (check) {
            return {
                status: '770',
                message: 'Duplicate',
                error: {
                    message: 'Attribute already exists',
                    in: 'Attribute Entity',
                },
            };
        }
        try {
            const newAttribute: GetAttributeI = await this.entityManager.save(
                Attribute,
                this.attributeHelper.prepareAttribute({ createAttribute }),
            );

            if (newAttribute === null) {
                return {
                    status: '666',
                    message: 'Options are empty',
                    error: {
                        in: 'Attribute Service',
                        message: 'Could not save attribute',
                    },
                };
            }

            return {
                status: '200',
                message: 'Success',
                result: newAttribute,
            };
        } catch (e) {
            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    message: e.message,
                    in: 'Attribute Service',
                },
            };
        }
    }

    async findAttributeQuery({
        attributeQuery,
    }: {
        attributeQuery: AttributeQueryFilterDto;
    }): Promise<AttributeResponseI> {
        return await this.attributeHelper.attributeQueryFilter({
            filters: { ...attributeQuery },
        });
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
