import { Injectable } from '@nestjs/common';
import { CreateAttributeDto } from '../dto/create-attribute.dto';
import { UpdateAttributeDto } from '../dto/update-attribute.dto';
import { GetAttributeDto } from '../dto/get-attribute.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Attribute } from '../entities/attribute.entity';
import { AttributeRule } from '../entities/inheritance/rules/attribute-rule.entity';
import { OptionValues } from '../entities/inheritance/options/option-values.entity';

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
        console.log(createAttributeDto);
        const newRule = this.entityManager.create(
            AttributeRule,
            createAttributeDto.rule,
        );
        const newOptions = this.entityManager.create(
            OptionValues,
            createAttributeDto.option,
        );

        const save = await this.entityManager.save(OptionValues, newOptions);

        console.log('newOptions');
        console.log(save);

        const newAttribute = this.entityManager.create(Attribute, {
            rule: newRule,
            option: save,
            description: createAttributeDto.description,
        });

        return await this.entityManager.save(Attribute, newAttribute);
    }

    async findAll() {
        return await this.entityManager
            .getRepository(Attribute)
            .createQueryBuilder('attribute')
            .leftJoinAndSelect('attribute.options', 'options')
            .leftJoinAndSelect('attribute.rule', 'rule')
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
}
