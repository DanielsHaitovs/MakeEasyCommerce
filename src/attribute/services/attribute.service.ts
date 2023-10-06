import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Attributes } from '../entities/attributes.entity';
import { Rule } from '../relations/rule/entities/rule.entity';
import { OrderType } from '@src/base/enum/query/query.enum';
import { UpdateAttributeShortDto } from '../dto/update-attribute.dto';
import {
    AttributerRelations,
    OrderedPaginationDto,
} from '@src/base/dto/filter/filters.dto';
import { UpdateRuleDto } from '../relations/rule/dto/update-rule.dto';
import { UpdateManyOptionsDto } from '../relations/option/dto/update-option.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import {
    AttributeResponseI,
    CreateAttributeI,
    CreateAttributeShortI,
    GetAttributeI,
} from '../interfaces/attribute.interface';
import { OptionService } from '../relations/option/services/option.service';
import { AttributeHelperService } from '@src/base/services/helper/attributes/attribute-helper.service';
import { Option } from '../relations/option/entities/option.entity';

// It might be also good to keep in mind that
// result amount that is based on page and limit #(.getMany())
// can be represent 1 that we can predict...

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
        createAttribute: CreateAttributeI;
    }): Promise<AttributeResponseI> {
        const check = await this.ifExists({
            name: createAttribute.description.name,
            code: createAttribute.description.code,
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
                    status: '666',
                    message: 'Options are empty',
                    error: response.error,
                };
            }

            newAttribute.options = result;
            newAttribute.optionsIds = newAttribute.options.map(
                (option: { id: number }) => option.id,
            );
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
                    in: 'Attribute Entity',
                },
            };
        }
    }

    async createShort({
        createAttribute,
    }: {
        createAttribute: CreateAttributeShortI;
    }): Promise<AttributeResponseI> {
        try {
            const check = await this.ifExists({
                name: createAttribute.description.name,
                code: createAttribute.description.code,
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

            return {
                status: '200',
                message: 'Success',
                result: await this.entityManager.save(
                    Attributes,
                    this.entityManager.create(Attributes, createAttribute),
                ),
            };
        } catch (e) {
            return {
                status: '666',
                message: 'Ups, Error',
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
    }): Promise<AttributeResponseI> {
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
                joinRule: false,
                many: true,
            },
        });
    }

    async findOneById({ id }: { id: number }): Promise<AttributeResponseI> {
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
                joinRule: false,
                many: false,
            },
        });
    }

    async findOneWithRelationById({
        id,
        relations,
    }: {
        id: number;
        relations: AttributerRelations;
    }): Promise<AttributeResponseI> {
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
                joinRule: relations.joinRule,
                many: false,
            },
        });
    }

    async findAttributeRule({
        id,
    }: {
        id: number;
    }): Promise<AttributeResponseI> {
        return await this.attributeHelper.singleConditionAttributeQuery({
            filters: {
                page: 1,
                limit: 1,
                orderBy: null,
                orderDirection: OrderType.NO,
                columnName: 'id',
                value: id,
                select: ['id', 'rule'],
                joinOptions: false,
                joinRule: true,
                many: false,
            },
        });
    }

    async findAttributeOptions({
        id,
    }: {
        id: number;
    }): Promise<AttributeResponseI> {
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
                joinRule: false,
                many: false,
            },
        });
    }

    async update({
        id,
        attribute,
    }: {
        id: number;
        attribute: UpdateAttributeShortDto;
    }): Promise<AttributeResponseI> {
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

    async updateRule({
        attributeId,
        updateRule,
    }: {
        attributeId: number;
        // updateRule: UpdateRuleI;  ?
        updateRule: UpdateRuleDto;
    }): Promise<AttributeResponseI> {
        const { result, ...response } =
            await this.attributeHelper.singleConditionAttributeQuery({
                filters: {
                    page: 1,
                    limit: 1,
                    orderBy: null,
                    orderDirection: OrderType.NO,
                    columnName: 'id',
                    value: attributeId,
                    select: ['id', 'rule'],
                    joinOptions: false,
                    joinRule: true,
                    many: false,
                },
            });

        if (!Array.isArray(result)) {
            return {
                status: '666',
                message: 'Ups, Error',
                error: response.error,
            };
        }

        for (const rule of result) {
            const res = await this.entityManager.update(
                Rule,
                rule.id,
                updateRule,
            );
            if (res.affected > 0) {
                return {
                    status: '200',
                    message: 'Attribute rule Successfully updated',
                    result: {
                        id: attributeId,
                        description: null,
                        ...updateRule,
                    },
                };
            }
            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    message: 'Failed to update Attribute rule',
                    in: 'Attribute Entity',
                },
            };
        }
    }

    // Here left to extend functionality
    // so there would be option to delete old options
    // update some of options byt theirs id
    // just add new options
    // I don't remember what actually is happening
    // Keep old options is working 100%
    async updateOptions({
        attributeId,
        updateOptions,
        keepOld,
    }: {
        attributeId: number;
        updateOptions: UpdateManyOptionsDto;
        keepOld: boolean;
    }): Promise<AttributeResponseI> {
        const attribute: AttributeResponseI =
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
                    joinRule: false,
                    many: false,
                },
            });
        const currentOptionsIds: number[] = attribute.result[0].optionsIds;

        if (keepOld) {
            const newOptions = await this.optionService.createMany({
                createOptions: {
                    relatedAttribute: attributeId,
                    options: updateOptions.options,
                },
            });
            if (newOptions.error === null || newOptions.error === undefined) {
                currentOptionsIds.push(
                    ...newOptions.result.map((option) => option.id),
                );
                return {
                    status: '200',
                    message: 'Attribute Options Successfully updated',
                    result: [
                        {
                            id: attributeId,
                            options: { ...newOptions.result },
                            optionsIds: currentOptionsIds,
                        },
                    ],
                };
            }

            return {
                status: '666',
                message: 'Ups, Error',
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
                        status: '999',
                        message: 'Ups, Error',
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
                    status: '200',
                    message: 'Attribute Options Successfully updated',
                    result: [
                        {
                            id: attributeId,
                            options: { ...newOptions.result },
                            optionsIds: optionIds,
                        },
                    ],
                };
            }
            return {
                status: '999',
                message: 'Ups, Error',
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
                status: '999',
                message: 'Ups, Error',
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
                status: '200',
                message: 'Attribute Options Successfully updated',
                result: [
                    {
                        id: attributeId,
                        options: { ...newOptions.result },
                        optionsIds: newOptions.result.flatMap(
                            (option: { id: number }) => option.id,
                        ),
                    },
                ],
            };
        }

        return {
            status: '999',
            message: 'Ups, Error',
            error: {
                message: 'Failed to update Attribute Options',
                in: 'Attribute Entity',
            },
        };
    }

    async remove({ id }: { id: number }): Promise<AttributeResponseI> {
        try {
            const attribute: AttributeResponseI =
                await this.attributeHelper.singleConditionAttributeQuery({
                    filters: {
                        page: 1,
                        limit: 1,
                        orderBy: null,
                        orderDirection: OrderType.NO,
                        columnName: 'id',
                        value: id,
                        select: ['id', 'rule'],
                        joinOptions: false,
                        joinRule: true,
                        many: false,
                    },
                });

            if (!Array.isArray(attribute.result)) {
                return {
                    status: '666',
                    message: 'Ups, Error',
                    error: attribute.error,
                };
            }

            const affectedAttribute: number = (
                await this.entityManager.delete(Attributes, id)
            ).affected;

            const affectedRule: number = (
                await this.entityManager
                    .getRepository(Rule)
                    .createQueryBuilder('rule')
                    .delete()
                    .from(Rule)
                    .where('id = :id', {
                        id: attribute.result.shift().rule.id,
                    })
                    .execute()
            ).affected;

            if (affectedAttribute > 0 && affectedRule > 0) {
                return {
                    status: '200',
                    message:
                        'Attribute and all related data was successfully removed',
                };
            }
        } catch (e) {
            return {
                status: '999',
                message: 'Could not delete attribute',
                error: {
                    message: e.message,
                    in: 'Attribute Entity',
                },
            };
        }
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
