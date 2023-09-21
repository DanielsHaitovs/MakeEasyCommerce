import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Attributes } from '../entities/attributes.entity';
import { Rule } from '../relations/rule/entities/rule.entity';
import { OrderType } from '@src/base/enum/query/query.enum';
import {
    CreateAttributeDto,
    CreateAttributeShortDto,
} from '../dto/create-attribute.dto';
import { UpdateAttributeShortDto } from '../dto/update-attribute.dto';
import {
    AttributerRelations,
    OrderedPaginationDto,
} from '@src/base/dto/filter/filters.dto';
import { UpdateRulesDto } from '../relations/rule/dto/update-rule.dto';
import { UpdateManyOptionsDto } from '../relations/option/dto/update-option.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import {
    AttributeResponseInterface,
    GetAttributeInterface,
} from '../interfaces/attribute.interface';
import { OptionService } from '../relations/option/services/option.service';
import { AttributeHelperService } from '@src/base/services/helper/attributes/attribute-helper.service';
import { Option } from '../relations/option/entities/option.entity';

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
            const newAttribute: GetAttributeInterface =
                await this.entityManager.save(
                    Attributes,
                    this.entityManager.create(Attributes, createAttribute),
                );
            const { result, ...response } = await this.optionService.createMany(
                {
                    createOptions: {
                        relatedAttribute: newAttribute.id,
                        options: createAttribute.options,
                    },
                },
            );

            if (!Array.isArray(result)) {
                return {
                    error: response.error,
                };
            }

            newAttribute.options = result;
            newAttribute.optionsIds = newAttribute.options.map(
                (option: { id: number }) => option.id,
            );
            return {
                result: newAttribute,
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
                orderDirection: OrderType.NO,
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
                orderDirection: OrderType.NO,
                columnName: 'id',
                value: id,
                select: null,
                joinOptions: relations.joinOptions,
                joinRules: relations.joinRules,
            },
        });
    }

    async findAttributeRule({
        id,
    }: {
        id: number;
    }): Promise<AttributeResponseInterface> {
        return await this.attributeHelper.singleConditionAttributeQuery({
            filters: {
                page: 1,
                limit: 1,
                orderBy: null,
                orderDirection: OrderType.NO,
                columnName: 'id',
                value: id,
                select: ['id', 'rules'],
                joinOptions: false,
                joinRules: true,
            },
        });
    }

    async findAttributeOptions({
        id,
    }: {
        id: number;
    }): Promise<AttributeResponseInterface> {
        return await this.attributeHelper.singleConditionAttributeQuery({
            filters: {
                page: 1,
                limit: 1,
                orderBy: null,
                orderDirection: OrderType.NO,
                columnName: 'id',
                value: id,
                select: ['id', 'options'],
                joinOptions: true,
                joinRules: false,
            },
        });
    }

    async update({
        id,
        attribute,
    }: {
        id: number;
        attribute: UpdateAttributeShortDto;
    }): Promise<AttributeResponseInterface> {
        return (
            await this.entityManager.update(
                Attributes,
                id,
                this.entityManager.create(Attributes, {
                    description: {
                        ...attribute,
                    },
                }),
            )
        ).raw;
    }

    async updateRules({
        attributeId,
        updateRules,
    }: {
        attributeId: number;
        updateRules: UpdateRulesDto;
    }): Promise<AttributeResponseInterface> {
        const { result, ...response } =
            await this.attributeHelper.singleConditionAttributeQuery({
                filters: {
                    page: 1,
                    limit: 1,
                    orderBy: null,
                    orderDirection: OrderType.NO,
                    columnName: 'id',
                    value: attributeId,
                    select: ['id', 'rules'],
                    joinOptions: false,
                    joinRules: true,
                },
            });

        if (!Array.isArray(result)) {
            return {
                error: response.error,
            };
        }

        for (const rules of result) {
            const affected = await this.entityManager.update(
                Rule,
                rules.id,
                updateRules,
            );
            if (affected.affected > 0) {
                return {
                    status: 200,
                    message: 'Attribute Rules Successfully updated',
                    result: {
                        id: attributeId,
                        description: null,
                        ...updateRules,
                    },
                };
            }
            return {
                error: {
                    message: 'Failed to update Attribute Rules',
                    in: 'Attribute Entity',
                },
            };
        }
    }

    // Here left to extend functionality so there would be
    // opportunity to do following actions
    // Rest validation should happen in other services ->
    // Maybe would be good after all *** to make them unique
    async updateOptions({
        attributeId,
        updateOptions,
        keepOld,
    }: {
        attributeId: number;
        updateOptions: UpdateManyOptionsDto;
        keepOld: boolean;
    }): Promise<AttributeResponseInterface> {
        const attribute: AttributeResponseInterface =
            await this.attributeHelper.singleConditionAttributeQuery({
                filters: {
                    page: 1,
                    limit: 1,
                    orderBy: null,
                    orderDirection: OrderType.NO,
                    columnName: 'id',
                    value: attributeId,
                    select: ['id'],
                    joinOptions: false,
                    joinRules: false,
                },
            });
        const currentOptionsIds = attribute.result[0].optionsIds;

        if (keepOld) {
            const newOptions = await this.optionService.createMany({
                createOptions: {
                    relatedAttribute: attributeId,
                    options: updateOptions.options,
                },
            });
            if (newOptions.error === null || newOptions.error === undefined) {
                currentOptionsIds.push(
                    newOptions.result.map((option) => option.id),
                );
                return {
                    status: 200,
                    message: 'Attribute Options Successfully updated',
                    result: [
                        {
                            id: attributeId,
                            description: null,
                            options: { ...newOptions.result },
                            rules: null,
                            optionsIds: currentOptionsIds,
                        },
                    ],
                };
            }

            return {
                status: 999,
                error: {
                    message: 'Failed to update Attribute Options',
                    in: 'Attribute Entity',
                },
            };
        }

        if (
            updateOptions.optionsIds != null &&
            updateOptions.optionsIds != undefined
        ) {
            const optionIds: number[] = [];
            const toRemove: number[] = currentOptionsIds.reduce(
                (toDelete: number[], optionId: number) => {
                    if (!updateOptions.optionsIds.includes(optionId)) {
                        toDelete.push(optionId);
                    } else {
                        optionIds.push(optionId);
                    }
                    return toDelete;
                },
                [],
            );

            if (toRemove.length > 0) {
                const deleteOld = await this.entityManager.delete(
                    Option,
                    toRemove,
                );
                if (deleteOld.affected < 1) {
                    return {
                        status: 999,
                        error: {
                            message: 'Failed to delete old Attribute Options',
                            in: 'Attribute Entity',
                        },
                    };
                }
            }

            const newOptions = await this.optionService.createMany({
                createOptions: {
                    relatedAttribute: attributeId,
                    options: updateOptions.options,
                },
            });
            if (newOptions.error === null || newOptions.error === undefined) {
                optionIds.push(
                    ...newOptions.result.flatMap(
                        (option: { id: number }) => option.id,
                    ),
                );
                return {
                    status: 200,
                    message: 'Attribute Options Successfully updated',
                    result: [
                        {
                            id: attributeId,
                            description: null,
                            options: { ...newOptions.result },
                            rules: null,
                            optionsIds: optionIds,
                        },
                    ],
                };
            }
            return {
                status: 999,
                error: {
                    message: 'Failed to update Attribute Options',
                    in: 'Attribute Entity',
                },
            };
        }

        const deleteOld = await this.entityManager.delete(
            Option,
            currentOptionsIds,
        );

        if (deleteOld.affected < 1) {
            return {
                status: 999,
                error: {
                    message: 'Failed to delete old Attribute Options',
                    in: 'Attribute Entity',
                },
            };
        }

        const newOptions = await this.optionService.createMany({
            createOptions: {
                relatedAttribute: attributeId,
                options: updateOptions.options,
            },
        });
        if (newOptions.error === null || newOptions.error === undefined) {
            return {
                status: 200,
                message: 'Attribute Options Successfully updated',
                result: [
                    {
                        id: attributeId,
                        description: null,
                        options: { ...newOptions.result },
                        rules: null,
                        optionsIds: null,
                    },
                ],
            };
        } else {
            return {
                status: 999,
                error: {
                    message: 'Failed to update Attribute Options',
                    in: 'Attribute Entity',
                },
            };
        }

        return null;
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
