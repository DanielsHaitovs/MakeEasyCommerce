import { Injectable } from '@nestjs/common';
import { CreateAttributeDto } from '../../dto/create-attribute.dto';
import { UpdateAttributeDto } from '../../dto/update-attribute.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import {
    GetAttributeDto,
    GetAttributeOptionsDto,
    GetUpdatedOptionsDto,
} from '../../dto/get-attribute.dto';
import { Attribute } from '../../entities/attribute.entity';
import {
    AttributeRelationsDto,
    PaginateAttributeRelationsDto,
    PaginationFilterDto,
} from '../../dto/attribute.dto';
import { OptionsService } from '../options/options.service';
import { RuleService } from '../rules/rule.service';
import { AttributeResponse } from '@src/attribute/dto/responses/response.dto';
import { AttributeRule } from '@src/attribute/entities/inheritance/rules/attribute-rule.entity';
import { OptionValues } from '@src/attribute/entities/inheritance/options/option-values.entity';

@Injectable()
export class AttributeService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly optionsService: OptionsService,
        private readonly ruleService: RuleService,
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
                        status: 200,
                    },
                ],
            };
        }

        const newAttribute: CreateAttributeDto = this.entityManager.create(
            Attribute,
            {
                description: createAttributeDto.description,
                options: null,
                rule: null,
            },
        );

        newAttribute.rule = await this.ruleService.createRule({
            newRule: createAttributeDto.rule,
        });

        newAttribute.options = await this.optionsService.createOptions({
            createOptions: createAttributeDto.options,
        });

        return await this.entityManager.save(Attribute, newAttribute);
    }

    async findOneById({
        id,
        loadRelations,
    }: {
        id: number;
        loadRelations: AttributeRelationsDto;
    }): Promise<GetAttributeDto> {
        try {
            return (
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
                })
            ).shift();
        } catch (e) {
            return e.message;
        }
    }

    async findAll({
        condition,
    }: {
        condition: PaginateAttributeRelationsDto;
    }): Promise<GetAttributeDto[]> {
        try {
            return await this.findAttributeQuery({
                condition: {
                    limit: condition.limit,
                    page: condition.page,
                    includeOptions: condition.includeOptions,
                    includeRule: condition.includeRule,
                    code: '',
                    value: '',
                },
                many: true,
            });
        } catch (e) {
            return e.message;
        }
    }

    async findBy({
        condition,
    }: {
        condition: PaginationFilterDto;
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
        keepOldOptions,
        updateAttributeDto,
    }: {
        id: number;
        keepOldOptions: boolean;
        updateAttributeDto: UpdateAttributeDto;
    }): Promise<GetAttributeDto | AttributeResponse> {
        const attribute: GetAttributeDto = await this.entityManager.preload(
            Attribute,
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
                keepOldOptions: keepOldOptions,
            });

        if (updatedOptions.newOptionsIds.length > 0) {
            attribute.options_ids.push(...updatedOptions.newOptionsIds);
        }
        return await this.entityManager.save(Attribute, attribute);
    }

    async remove({ id }: { id: number }): Promise<string | AttributeResponse> {
        const attribute: GetAttributeDto = await this.findOneById({
            id: id,
            loadRelations: {
                includeOptions: true,
                includeRule: true,
            },
        });

        if (attribute.options != null && attribute.options != undefined) {
            for (const option of attribute.options) {
                const deletedOption = (
                    await this.entityManager.delete(OptionValues, option.id)
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
            await this.entityManager.delete(Attribute, attribute.id)
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
                    AttributeRule,
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
    }): Promise<any[]> {
        let where = '';
        let query = null;
        if (condition.code && condition.value) {
            where = 'attribute.' + condition.code + ' = :' + condition.code;
            query = {};
            query[condition.code] = condition.value;
        }

        if (!many && condition.includeOptions && condition.includeRule) {
            return [
                await this.entityManager
                    .getRepository(Attribute)
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
                    .getRepository(Attribute)
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
                    .getRepository(Attribute)
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
                    .getRepository(Attribute)
                    .createQueryBuilder('attribute')
                    .where(where, query)
                    .orderBy('options.id', 'ASC')
                    .getOne(),
            ];
        }

        // Multiple Records
        const skip = (condition.page - 1) * condition.limit;

        if (many && condition.includeOptions && condition.includeRule) {
            return [
                await this.entityManager
                    .getRepository(Attribute)
                    .createQueryBuilder('attribute')
                    .leftJoinAndSelect('attribute.rule', 'rule')
                    .leftJoinAndSelect('attribute.options', 'options')
                    .where(where, query)
                    .orderBy('options.id', 'ASC')
                    .skip(skip)
                    .take(condition.limit)
                    .getMany(),
            ];
        }

        if (many && !condition.includeOptions && condition.includeRule) {
            return [
                await this.entityManager
                    .getRepository(Attribute)
                    .createQueryBuilder('attribute')
                    .leftJoinAndSelect('attribute.rule', 'rule')
                    .where(where, query)
                    .orderBy('options.id', 'ASC')
                    .skip(skip)
                    .take(condition.limit)
                    .getMany(),
            ];
        }

        if (many && condition.includeOptions && !condition.includeRule) {
            return [
                await this.entityManager
                    .getRepository(Attribute)
                    .createQueryBuilder('attribute')
                    .leftJoinAndSelect('attribute.options', 'options')
                    .where(where, query)
                    .orderBy('options.id', 'ASC')
                    .skip(skip)
                    .take(condition.limit)
                    .getMany(),
            ];
        }

        return await this.entityManager
            .getRepository(Attribute)
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
            .getRepository(Attribute)
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
                .getRepository(Attribute)
                .createQueryBuilder(relationsAlias)
                .relation(Attribute, relation)
                .of(id)
                .remove(current_relation);
        } catch (e) {
            return e.message;
        }
    }
}
