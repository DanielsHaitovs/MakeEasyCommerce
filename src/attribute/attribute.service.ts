import { Injectable } from '@nestjs/common';
import {
    AttributeOptionsDto,
    CreateAttributeDto,
} from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import {
    GetAttributeDto,
    GetAttributeOptionsDto,
} from './dto/get-attribute.dto';
import { Attribute } from './entities/attribute.entity';
import { OptionValues } from './entities/inheritance/options/option-values.entity';
import { AttributeRule } from './entities/inheritance/rules/attribute-rule.entity';
import {
    AttributeRelationsDto,
    PaginateAttributeRelationsDto,
    PaginationFilterDto,
} from './dto/attribute.dto';

@Injectable()
export class AttributeService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}

    async create({
        createAttributeDto,
    }: {
        createAttributeDto: CreateAttributeDto;
    }): Promise<GetAttributeDto> {
        const newRule = await this.entityManager.save(
            AttributeRule,
            this.entityManager.create(AttributeRule, createAttributeDto.rule),
        );

        const newOptions: GetAttributeOptionsDto[] =
            await this.saveMultipleOptions({
                options: createAttributeDto.options,
            });

        delete createAttributeDto.options;
        delete createAttributeDto.rule;

        const newAttribute: CreateAttributeDto = this.entityManager.create(
            Attribute,
            {
                options: newOptions,
                rule: newRule,
                ...createAttributeDto,
            },
        );

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

    update(id: number, updateAttributeDto: UpdateAttributeDto) {
        return `This action updates a #${id} attribute`;
    }

    remove(id: number) {
        return `This action removes a #${id} attribute`;
    }

    private async saveMultipleOptions({
        options,
    }: {
        options: AttributeOptionsDto[];
    }): Promise<GetAttributeOptionsDto[]> {
        const savedOptions: GetAttributeOptionsDto[] = [];
        for (const option of options) {
            savedOptions.push(
                await this.entityManager.save(OptionValues, {
                    attribute: null,
                    ...this.entityManager.create(OptionValues, {
                        value: option.value,
                    }),
                }),
            );
        }

        return savedOptions;
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
}
