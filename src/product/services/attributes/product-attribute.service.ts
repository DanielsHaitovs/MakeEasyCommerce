import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CreateAttributeDto } from '@src/product/dto/attributes/attribute/create-attribute.dto';
import { ProductAttributes } from '@src/product/entities/attributes/product-attribute.entity';
import { EntityManager } from 'typeorm';
import { ProductOptionsService } from './options/product-options.service';
import { ProductRulesService } from './rules/product-rules.service';
import {
    AttributeRelationsDto,
    PaginateAttributeRelationsDto,
    PaginationFilterDto,
} from '@src/base/dto/filters/attribute/attribute-relation.dto';
import { GetUpdatedOptionsDto } from '@src/product/dto/attributes/options/get-option.dto';
import { ProductAttributeRule } from '@src/product/entities/attributes/rule/attribute-rule.entity';
import { AttributeResponse } from '@src/base/dto/response/attribute.response.dto';
import { ProductAttributeOption } from '@src/product/entities/attributes/options/attribute-option.entity';
import { GetAttributeDto } from '@src/product/dto/attributes/attribute/get-attribute.dto';
import { UpdateAttributeDto } from '@src/product/dto/attributes/attribute/update-attribute.dto';

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
    }): Promise<any> {
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
                        status: 200,
                    },
                ],
            };
        }

        // Order should be changed
        // currently if I do save and error occurs when saving attribute
        // there will appear records for options and rules
        // Lets take risk and try with cascade approach
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
        loadRelations: AttributeRelationsDto;
    }): Promise<AttributeResponse> {
        try {
            const res: GetAttributeDto | GetAttributeDto[] =
                await this.findAttributeQuery({
                    condition: {
                        page: 1,
                        limit: 1,
                        code: 'id',
                        value: `${id}`,
                        includeRule: loadRelations.includeRule,
                        includeOptions: loadRelations.includeOptions,
                    },
                    many: false,
                });

            if (res != null) {
                return {
                    result: {
                        message:
                            'Successfully retrieved list of product attributes',
                        status: 999,
                        result: res,
                    },
                };
            }
        } catch (e) {
            return e.message;
        }
    }

    async findAll({
        condition,
    }: {
        condition: PaginateAttributeRelationsDto;
    }): Promise<AttributeResponse> {
        try {
            return {
                result: {
                    message: 'Successfully retrieved list of attributes',
                    status: 999,
                    result: await this.findAttributeQuery({
                        condition: {
                            limit: condition.limit,
                            page: condition.page,
                            includeOptions: condition.includeOptions,
                            includeRule: condition.includeRule,
                            code: '',
                            value: '',
                        },
                        many: true,
                    }),
                },
            };
        } catch (e) {
            return {
                result: {
                    message: 'Failed to retrieve list of attributes',
                    result: {
                        message: `${e.message}`,
                        status: 999,
                    },
                },
            };
        }
    }

    async findBy({
        condition,
    }: {
        condition: PaginationFilterDto;
    }): Promise<AttributeResponse> {
        try {
            return {
                result: {
                    message: 'Successfully retrieved list of attributes',
                    status: 999,
                    result: await this.findAttributeQuery({
                        condition: condition,
                        many: true,
                    }),
                },
            };
        } catch (e) {
            return {
                result: {
                    message: 'Failed to retrieve list of attributes',
                    result: {
                        message: `${e.message}`,
                        status: 999,
                    },
                },
            };
        }
    }

    async update({
        id,
        updateAttributeDto,
    }: {
        id: number;
        updateAttributeDto: UpdateAttributeDto;
    }): Promise<any> {
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
        return await this.entityManager.save(ProductAttributes, attribute);
    }

    async remove({ id }: { id: number }): Promise<any> {
        const attribute: GetAttributeDto = (
            await this.findBy({
                condition: {
                    page: 1,
                    limit: 0,
                    code: 'id',
                    value: `${id}`,
                    includeOptions: true,
                    includeRule: true,
                },
            })
        ).result.result;

        if (attribute.options != null && attribute.options != undefined) {
            for (const option of attribute.options) {
                const deletedOption = (
                    await this.entityManager.delete(
                        ProductAttributeOption,
                        option.id,
                    )
                ).affected;

                if (deletedOption < 1) {
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
        condition: PaginationFilterDto;
        many: boolean;
    }): Promise<GetAttributeDto[] | GetAttributeDto> {
        let where = '';
        let query = null;
        if (condition.code && condition.value) {
            where = 'attribute.' + condition.code + ' = :' + condition.code;
            query = {};
            query[condition.code] = condition.value;
        }

        console.log(where, query);

        if (!many && condition.includeOptions && condition.includeRule) {
            return [
                await this.entityManager
                    .getRepository(ProductAttributes)
                    .createQueryBuilder('attribute')
                    .leftJoinAndSelect('attribute.rule', 'rule')
                    .leftJoinAndSelect('attribute.options', 'options')
                    .where(where, query)
                    .orderBy('options.id', 'ASC')
                    .getOne(),
            ];
        }

        if (!many && !condition.includeOptions && condition.includeRule) {
            return [
                await this.entityManager
                    .getRepository(ProductAttributes)
                    .createQueryBuilder('attribute')
                    .leftJoinAndSelect('attribute.rule', 'rule')
                    .where(where, query)
                    .orderBy('options.id', 'ASC')
                    .getOne(),
            ];
        }

        if (!many && condition.includeOptions && !condition.includeRule) {
            return [
                await this.entityManager
                    .getRepository(ProductAttributes)
                    .createQueryBuilder('attribute')
                    .leftJoinAndSelect('attribute.options', 'options')
                    .where(where, query)
                    .orderBy('options.id', 'ASC')
                    .getOne(),
            ];
        }

        if (!many && !condition.includeOptions && !condition.includeRule) {
            return [
                await this.entityManager
                    .getRepository(ProductAttributes)
                    .createQueryBuilder('attribute')
                    .where(where, query)
                    .orderBy('options.id', 'ASC')
                    .getOne(),
            ];
        }

        // Multiple Records
        const skip = (condition.page - 1) * condition.limit;

        if (many && condition.includeOptions && condition.includeRule) {
            return await this.entityManager
                .getRepository(ProductAttributes)
                .createQueryBuilder('attribute')
                .leftJoinAndSelect('attribute.rule', 'rule')
                .leftJoinAndSelect('attribute.options', 'options')
                .where(where, query)
                .orderBy('options.id', 'ASC')
                .skip(skip)
                .take(condition.limit)
                .getMany();
        }

        if (many && !condition.includeOptions && condition.includeRule) {
            return await this.entityManager
                .getRepository(ProductAttributes)
                .createQueryBuilder('attribute')
                .leftJoinAndSelect('attribute.rule', 'rule')
                .where(where, query)
                .orderBy('options.id', 'ASC')
                .skip(skip)
                .take(condition.limit)
                .getMany();
        }

        if (many && condition.includeOptions && !condition.includeRule) {
            return await this.entityManager
                .getRepository(ProductAttributes)
                .createQueryBuilder('attribute')
                .leftJoinAndSelect('attribute.options', 'options')
                .where(where, query)
                .orderBy('options.id', 'ASC')
                .skip(skip)
                .take(condition.limit)
                .getMany();
        }

        return await this.entityManager
            .getRepository(ProductAttributes)
            .createQueryBuilder('attribute')
            .where(where, query)
            .orderBy('options.id', 'ASC')
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
            .createQueryBuilder('attribute')
            .where('attribute.code =:code', { code: code })
            .orWhere('attribute.name =:name', { name: name })
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
