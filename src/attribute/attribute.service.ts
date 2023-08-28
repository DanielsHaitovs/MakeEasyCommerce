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

    async findAll(): Promise<GetAttributeDto[]> {
        return await this.entityManager
            .getRepository(Attribute)
            .createQueryBuilder('attribute')
            .getMany();
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
}
