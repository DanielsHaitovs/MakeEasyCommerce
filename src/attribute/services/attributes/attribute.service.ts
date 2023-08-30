import { Injectable } from '@nestjs/common';
import { CreateAttributeDto } from '../../dto/create-attribute.dto';
import { UpdateAttributeDto } from '../../dto/update-attribute.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import {
    GetAttributeDto,
    GetAttributeOptionsDto,
    GetAttributeRuleDto,
} from '../../dto/get-attribute.dto';
import { Attribute } from '../../entities/attribute.entity';
import {
    AttributeDescriptionDto,
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

    // Not working!
    async update({
        id,
        updateAttributeDto,
    }: {
        id: number;
        updateAttributeDto: UpdateAttributeDto;
    }): Promise<GetAttributeDto | AttributeResponse> {
        const preparedRule: GetAttributeRuleDto = updateAttributeDto.rule;

        const updatedRules: GetAttributeRuleDto = (
            await this.entityManager.update(AttributeRule, id, preparedRule)
        ).raw;

        const preparedOptions: GetAttributeOptionsDto[] =
            updateAttributeDto.options;

        const updatedOptions: GetAttributeOptionsDto[] = [];
        for (const option of preparedOptions) {
            updatedOptions.push(
                (await this.entityManager.update(OptionValues, id, option)).raw,
            );
        }

        const updateDescription: AttributeDescriptionDto =
            updateAttributeDto.description;
        updateDescription['id'] = updateAttributeDto.id;

        const updatedAttribute = await this.entityManager.update(
            Attribute,
            id,
            {
                options: updatedOptions,
                rule: updatedRules,
                description: updateDescription,
            },
        );

        console.log(updatedRules);
        console.log(updatedOptions);
        console.log(updatedAttribute);
        return null;
        // return updatedAttribute;
    }

    remove(id: number) {
        return `This action removes a #${id} attribute`;
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
                    .getOne(),
            ];
        }

        if (!many && !condition.includeOptions && !condition.includeRule) {
            return [
                await this.entityManager
                    .getRepository(Attribute)
                    .createQueryBuilder('attribute')
                    .where(where, query)
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
                    .skip(skip)
                    .take(condition.limit)
                    .getMany(),
            ];
        }

        return await this.entityManager
            .getRepository(Attribute)
            .createQueryBuilder('attribute')
            .where(where, query)
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
}
