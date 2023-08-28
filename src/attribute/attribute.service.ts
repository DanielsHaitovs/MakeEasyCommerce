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

    async findAll({
        attributeRule,
        optionsData,
    }: {
        attributeRule: boolean;
        optionsData: boolean;
    }): Promise<GetAttributeDto[]> {
        const where = {
            filter: '',
            value: null,
        };
        const relations = {
            rule: attributeRule,
            options: optionsData,
        };
        try {
            return await this.findAttributeQuery({
                where,
                relations,
                many: true,
            });
        } catch (e) {
            return e.message;
        }
    }

    async findOneById({
        id,
        attributeRule,
        optionsData,
    }: {
        id: number;
        attributeRule: boolean;
        optionsData: boolean;
    }): Promise<GetAttributeDto[]> {
        const where = {
            filter: 'id',
            value: id,
        };
        const relations = {
            rule: attributeRule,
            options: optionsData,
        };
        try {
            return await this.findAttributeQuery({
                where,
                relations,
                many: false,
            });
        } catch (e) {
            return e.message;
        }
    }

    async findOneBy({
        code,
        value,
        attributeRule,
        optionsData,
    }: {
        code: string;
        value: any;
        attributeRule: boolean;
        optionsData: boolean;
    }): Promise<GetAttributeDto[]> {
        const where = {
            filter: code,
            value: value,
        };

        console.log('here');
        console.log(where);
        const relations = {
            rule: attributeRule,
            options: optionsData,
        };
        try {
            return await this.findAttributeQuery({
                where,
                relations,
                many: false,
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
        where,
        relations,
        many,
    }: {
        where: {
            filter: string;
            value: any;
        };
        relations: {
            rule: boolean;
            options: boolean;
        };
        many: boolean;
    }): Promise<any[]> {
        let condition = '';
        let query = null;
        if (where.filter && where.value) {
            condition = 'attribute.' + where.filter + ' = :' + where.filter;
            query = {};
            query[where.filter] = where.value;
        }

        if (!many && relations.options && relations.rule) {
            console.log(condition);
            console.log(query);
            return [
                await this.entityManager
                    .getRepository(Attribute)
                    .createQueryBuilder('attribute')
                    .leftJoinAndSelect('attribute.rule', 'rule')
                    .leftJoinAndSelect('attribute.options', 'options')
                    .where(condition, query)
                    .getOne(),
            ];
        }

        if (!many && !relations.options && relations.rule) {
            return [
                await this.entityManager
                    .getRepository(Attribute)
                    .createQueryBuilder('attribute')
                    .where(condition, query)
                    .leftJoinAndSelect('attribute.rule', 'rule')
                    .getOne(),
            ];
        }

        if (!many && relations.options && !relations.rule) {
            return [
                await this.entityManager
                    .getRepository(Attribute)
                    .createQueryBuilder('attribute')
                    .where(condition, query)
                    .leftJoinAndSelect('attribute.options', 'options')
                    .getOne(),
            ];
        }

        if (!many && !relations.options && !relations.rule) {
            console.log(condition);
            console.log(query);
            return [
                await this.entityManager
                    .getRepository(Attribute)
                    .createQueryBuilder('attribute')
                    .where(condition, query)
                    .getOne(),
            ];
        }
        //

        if (many && relations.options && relations.rule) {
            return [
                await this.entityManager
                    .getRepository(Attribute)
                    .createQueryBuilder('attribute')
                    .leftJoinAndSelect('attribute.rule', 'rule')
                    .leftJoinAndSelect('attribute.options', 'options')
                    .where(condition, query)
                    .getMany(),
            ];
        }

        if (many && !relations.options && relations.rule) {
            return [
                await this.entityManager
                    .getRepository(Attribute)
                    .createQueryBuilder('attribute')
                    .leftJoinAndSelect('attribute.rule', 'rule')
                    .where(condition, query)
                    .getMany(),
            ];
        }

        if (many && relations.options && !relations.rule) {
            return [
                await this.entityManager
                    .getRepository(Attribute)
                    .createQueryBuilder('attribute')
                    .leftJoinAndSelect('attribute.options', 'options')
                    .where(condition, query)
                    .getMany(),
            ];
        }

        return await this.entityManager
            .getRepository(Attribute)
            .createQueryBuilder('attribute')
            .where(condition, query)
            .getMany();
    }
}
