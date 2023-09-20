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
import {
    AttributerRelations,
    OrderedPaginationDto,
} from '@src/base/dto/filter/filters.dto';
import { Attributes } from '../entities/attributes.entity';
import { OrderType } from '@src/base/enum/query/query.enum';

// There is option to load data about table columns from database
export const AttributeDescriptionList = {
    all: [
        'id',
        'description.name',
        'description.code',
        'description.isActive',
        'description.isRequired',
    ],
    id: ['id'],
    // short: ['id', 'description.name', 'description.code', 'description.isActive', 'description.isRequired'],
};
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
        const check = await this.ifExists({
            name: createAttribute.description.name,
            code: createAttribute.description.code,
        });
        if (check) {
            return {
                status: 999,
                error: {
                    message: 'Attribute already exists',
                    in: 'Attribute Entity',
                },
            };
        }
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
            const check = await this.ifExists({
                name: createAttribute.description.name,
                code: createAttribute.description.code,
            });

            if (check) {
                return {
                    status: 999,
                    error: {
                        message: 'Attribute already exists',
                        in: 'Attribute Entity',
                    },
                };
            }

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
            filters: {
                page: condition.page,
                limit: condition.limit,
                orderBy: condition.orderBy,
                orderDirection: condition.orderDirection,
                columnName: null,
                value: null,
                select: null,
                joinOptions: false,
                joinRules: false,
            },
        });
    }

    async findOneById({
        id,
    }: {
        id: number;
    }): Promise<AttributeResponseInterface> {
        return await this.attributeHelper.singleConditionAttributeQuery({
            filters: {
                page: 1,
                limit: 1,
                orderBy: null,
                orderDirection: OrderType.ASC,
                columnName: 'id',
                value: id,
                select: null,
                joinOptions: false,
                joinRules: false,
            },
        });
    }

    async findOneWithRelationById({
        id,
        relations,
    }: {
        id: number;
        relations: AttributerRelations;
    }): Promise<AttributeResponseInterface> {
        return await this.attributeHelper.singleConditionAttributeQuery({
            filters: {
                page: 1,
                limit: 1,
                orderBy: null,
                orderDirection: OrderType.ASC,
                columnName: 'id',
                value: id,
                select: null,
                joinOptions: relations.joinOptions,
                joinRules: relations.joinRules,
            },
        });
    }

    update(id: number, updateAttributeDto: UpdateAttributeDto) {
        return `This action updates a #${id} attribute`;
    }

    remove(id: number) {
        return `This action removes a #${id} attribute`;
    }

    protected async ifExists({
        name,
        code,
    }: {
        name: string;
        code: string;
    }): Promise<boolean> {
        const attribute = await this.entityManager
            .getRepository(Attributes)
            .createQueryBuilder('attributes')
            .where('attributes.description.name = :name', { name })
            .orWhere('attributes.description.code = :code', { code })
            .getExists();
        if (attribute && attribute != null) {
            return true;
        }
        return false;
    }
}
