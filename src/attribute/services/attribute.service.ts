import { Injectable } from '@nestjs/common';
import {
    CreateAttributeDto,
    CreateAttributeShortDto,
} from '../dto/create-attribute.dto';
import { UpdateAttributeDto } from '../dto/update-attribute.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { AttributeResponseInterface } from '../interfaces/attribute.interface';
import { OptionService } from '../relations/option/services/option.service';
import { GetAttributeDto } from '../dto/get-attribute.dto';
import { AttributeHelperService } from '@src/base/services/helper/attributes/attribute-helper.service';
import { OrderedPaginationDto } from '@src/base/dto/filter/filters.dto';
import { Attributes } from '../entities/attributes.entity';

@Injectable()
export class AttributeService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly optionService: OptionService,
        private readonly attributeHelper: AttributeHelperService,
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

    async findAll({
        condition,
    }: {
        condition: OrderedPaginationDto;
    }): Promise<AttributeResponseInterface> {
        return await this.attributeHelper.singleConditionAttributeQuery({
            alias: 'attributes',
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
