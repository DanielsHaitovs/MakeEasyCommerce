import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { ProductRulesService } from '../rules/product-rules.service';
import { ProductOptionsService } from '../options/product-options.service';
import { CreateAttributeDto } from '@src/base/dto/attributes/create-attribute.dto';
import { AttributeResponse } from '@src/base/dto/attributes/requests/attribute-response.dto';
import {
    GetAttributeDto,
    GetUpdatedOptionsDto,
} from '@src/base/dto/attributes/get-attribute.dto';
import { ProductAttributes } from '@src/product/entities/attributes/attributes-product.entity';
import {
    AttributeConditionsDto,
    AttributeFilterByRelation,
} from '@src/base/dto/attributes/requests/attribute-requests.dto';
import { UpdateAttributeDto } from '@src/base/dto/attributes/update-attribute.dto';
import { ProductOptionValues } from '@src/product/entities/attributes/options/option-values.entity';
import { ProductAttributeRule } from '@src/product/entities/attributes/rules/attribute-rule.entity';

export const alias = {
    parentAlias: 'productAttribute',
    orderBy: 'productAttribute.id',
    ruleAlias: 'rule',
    ruleSelect: 'productAttribute.rule',
    optionsRule: 'options',
    optionsSelect: 'productAttribute.options',
    attrName: 'productAttribute.name =:name',
    nameSelect: 'productAttribute.options',
    attrCode: 'code',
    codeSelect: 'productAttribute.code =:code',
};

@Injectable()
export class ProductAttributeService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly optionsService: ProductOptionsService,
        private readonly ruleService: ProductRulesService,
    ) {}

    async create({
        createAttributeDto,
    }: {
        createAttributeDto: CreateAttributeDto;
    }): Promise<GetAttributeDto | AttributeResponse> {
        const exists = await this.ifAttributeExist({
            code: createAttributeDto.description.code,
            name: createAttributeDto.description.name,
        });

        if (exists) {
            return {
                message: 'Already exists',
                errors: [
                    {
                        message:
                            'Attribute with this name ' +
                            `${createAttributeDto.description.name}` +
                            ' or code ' +
                            `${createAttributeDto.description.code}` +
                            ' already exists in this entity',
                    },
                    {
                        status: 999,
                    },
                ],
            };
        }

        const newAttribute: CreateAttributeDto = this.entityManager.create(
            ProductAttributes,
            {
                description: createAttributeDto.description,
                options: null,
                rule: null,
            },
        );

        newAttribute.rule = await this.ruleService.create({
            newRule: createAttributeDto.rule,
        });

        newAttribute.options = await this.optionsService.createOptions({
            createOptions: createAttributeDto.options,
        });

        return await this.entityManager.save(ProductAttributes, newAttribute);
    }

    async findOneById({
        id,
        loadRelations,
    }: {
        id: number;
        loadRelations: AttributeFilterByRelation;
    }): Promise<GetAttributeDto | any> {
        try {
            return (
                await this.findAttributeQuery({
                    condition: {
                        page: 1,
                        limit: 1,
                        filter: {
                            code: 'id',
                            value: `${id}`,
                        },
                        relations: loadRelations,
                    },
                    many: false,
                })
            ).shift();
        } catch (e) {
            return {
                message: 'Failed Retrieving Product',
                errors: [
                    {
                        message: e.message,
                    },
                    {
                        status: 999,
                    },
                ],
            };
        }
    }

    async findAll({
        condition,
    }: {
        condition: AttributeConditionsDto;
    }): Promise<GetAttributeDto[]> {
        try {
            return await this.findAttributeQuery({
                condition: condition,
                many: true,
            });
        } catch (e) {
            return e.message;
        }
    }

    async findBy({
        condition,
    }: {
        condition: AttributeConditionsDto;
    }): Promise<GetAttributeDto[]> {
        try {
            return await this.findAttributeQuery({
                condition: condition,
                many: true,
            });
        } catch (e) {
            return e.message;
        }
    }

    async update({
        id,
        updateAttributeDto,
    }: {
        id: number;
        updateAttributeDto: UpdateAttributeDto;
    }): Promise<GetAttributeDto | AttributeResponse> {
        const attribute: GetAttributeDto = await this.entityManager.preload(
            ProductAttributes,
            {
                id: id,
                description: updateAttributeDto.description,
                rule: updateAttributeDto.rule,
                options: null,
            },
        );

        const updatedOptions: GetUpdatedOptionsDto =
            await this.optionsService.updateOptions({
                options: updateAttributeDto.options,
                parentId: id,
            });

        if (updatedOptions.newOptionsIds.length > 0) {
            attribute.options_ids.push(...updatedOptions.newOptionsIds);
        }
        return {
            options: updatedOptions.newOptions,
            ...(await this.entityManager.save(ProductAttributes, attribute)),
        };
    }

    async remove({ id }: { id: number }): Promise<string | AttributeResponse> {
        const attribute: GetAttributeDto = await this.findOneById({
            id: id,
            loadRelations: {
                includeOptions: true,
                includeRules: true,
            },
        });

        if (attribute === null) {
            return {
                message: 'Attribute was not deleted',
                errors: [
                    {
                        message: 'this attribute id was not found',
                    },
                    {
                        status: 999,
                    },
                ],
            };
        }

        for (const option of attribute.options) {
            const deletedOption = (
                await this.entityManager.delete(ProductOptionValues, option.id)
            ).affected;

            if (deletedOption < 1) {
                return {
                    message: 'Delete Attribute Option Failed',
                    errors: [
                        {
                            message:
                                'Attribute Option with id ' +
                                option.id +
                                ' was not deleted',
                        },
                        {
                            status: 999,
                        },
                    ],
                };
            }
        }

        const deletedAttribute = (
            await this.entityManager.delete(ProductAttributes, attribute.id)
        ).affected;

        if (deletedAttribute < 1) {
            return {
                message: 'Delete Attribute Failed',
                errors: [
                    {
                        message: 'Attribute was not deleted',
                    },
                    {
                        status: 999,
                    },
                ],
            };
        }

        if (attribute.rule != null && attribute.rule.id != null) {
            const deletedRule = (
                await this.entityManager.delete(
                    ProductAttributeRule,
                    attribute.rule.id,
                )
            ).affected;

            if (deletedRule < 1) {
                return {
                    message: 'Delete Attribute Rule Failed',
                    errors: [
                        {
                            message: 'Attribute  Rule was not deleted',
                        },
                        {
                            status: 999,
                        },
                    ],
                };
            }
        }

        return 'success';
    }

    protected async findAttributeQuery({
        condition,
        many,
    }: {
        condition: AttributeConditionsDto;
        many: boolean;
    }): Promise<any[]> {
        let where = '';
        let query = null;

        if (condition.filter.code != null && condition.filter.value != null) {
            where =
                alias.parentAlias +
                '.' +
                condition.filter.code +
                ' = :' +
                condition.filter.code;
            query = {};
            query[condition.filter.code] = condition.filter.value;
        }

        if (
            !many &&
            condition.relations.includeOptions &&
            condition.relations.includeRules
        ) {
            return [
                await this.entityManager
                    .getRepository(ProductAttributes)
                    .createQueryBuilder(alias.parentAlias)
                    .leftJoinAndSelect(alias.ruleSelect, alias.ruleAlias)
                    .leftJoinAndSelect(alias.optionsSelect, alias.optionsRule)
                    .where(where, query)
                    .orderBy(alias.orderBy, 'ASC')
                    .getOne(),
            ];
        }

        if (
            !many &&
            !condition.relations.includeOptions &&
            condition.relations.includeRules
        ) {
            return [
                await this.entityManager
                    .getRepository(ProductAttributes)
                    .createQueryBuilder(alias.parentAlias)
                    .leftJoinAndSelect(alias.ruleSelect, alias.ruleAlias)
                    .where(where, query)
                    .orderBy(alias.orderBy, 'ASC')
                    .getOne(),
            ];
        }

        if (
            !many &&
            condition.relations.includeOptions &&
            !condition.relations.includeRules
        ) {
            return [
                await this.entityManager
                    .getRepository(ProductAttributes)
                    .createQueryBuilder(alias.parentAlias)
                    .leftJoinAndSelect(alias.optionsSelect, alias.optionsRule)
                    .where(where, query)
                    .orderBy(alias.orderBy, 'ASC')
                    .getOne(),
            ];
        }

        if (
            !many &&
            !condition.relations.includeOptions &&
            !condition.relations.includeRules
        ) {
            return [
                await this.entityManager
                    .getRepository(ProductAttributes)
                    .createQueryBuilder(alias.parentAlias)
                    .where(where, query)
                    .orderBy(alias.orderBy, 'ASC')
                    .getOne(),
            ];
        }

        // Multiple Records
        const skip = (condition.page - 1) * condition.limit;

        if (
            many &&
            condition.relations.includeOptions &&
            condition.relations.includeRules
        ) {
            return [
                await this.entityManager
                    .getRepository(ProductAttributes)
                    .createQueryBuilder(alias.parentAlias)
                    .leftJoinAndSelect(alias.ruleSelect, alias.ruleAlias)
                    .leftJoinAndSelect(alias.optionsSelect, alias.optionsRule)
                    .where(where, query)
                    .orderBy(alias.orderBy, 'ASC')
                    .skip(skip)
                    .take(condition.limit)
                    .getMany(),
            ];
        }

        if (
            many &&
            !condition.relations.includeOptions &&
            condition.relations.includeRules
        ) {
            return [
                await this.entityManager
                    .getRepository(ProductAttributes)
                    .createQueryBuilder(alias.parentAlias)
                    .leftJoinAndSelect(alias.ruleSelect, alias.ruleAlias)
                    .where(where, query)
                    .orderBy(alias.orderBy, 'ASC')
                    .skip(skip)
                    .take(condition.limit)
                    .getMany(),
            ];
        }

        if (
            many &&
            condition.relations.includeOptions &&
            !condition.relations.includeRules
        ) {
            return [
                await this.entityManager
                    .getRepository(ProductAttributes)
                    .createQueryBuilder(alias.parentAlias)
                    .leftJoinAndSelect(alias.optionsSelect, alias.optionsRule)
                    .where(where, query)
                    .orderBy(alias.orderBy, 'ASC')
                    .skip(skip)
                    .take(condition.limit)
                    .getMany(),
            ];
        }

        return await this.entityManager
            .getRepository(ProductAttributes)
            .createQueryBuilder(alias.parentAlias)
            .where(where, query)
            .orderBy(alias.orderBy, 'ASC')
            .skip(skip)
            .take(condition.limit)
            .getMany();
    }

    protected async ifAttributeExist({
        code,
        name,
    }: {
        code: string;
        name: string;
    }): Promise<boolean> {
        return await this.entityManager
            .getRepository(ProductAttributes)
            .createQueryBuilder(alias.parentAlias)
            .where('productAttribute.code =:code', { code: code })
            .orWhere('productAttribute.name =:name', { name: name })
            .getExists();
    }

    protected async deleteAttributeRelations({
        id,
        relationsAlias,
        relation,
        current_relation,
    }: {
        id: number;
        relationsAlias: 'attribute';
        relation: string;
        current_relation: any[] | any;
    }): Promise<any> {
        try {
            await this.entityManager
                .getRepository(ProductAttributes)
                .createQueryBuilder(relationsAlias)
                .relation(ProductAttributes, relation)
                .of(id)
                .remove(current_relation);
        } catch (e) {
            return e.message;
        }
    }
}
