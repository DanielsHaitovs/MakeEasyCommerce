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
        // const options: AttributeOptionsDto[] = createAttributeDto.options;

        const newAttribute: GetAttributeDto = await this.entityManager.save(
            Attribute,
            this.entityManager.create(Attribute, {
                options: null,
                ...createAttributeDto,
            }),
        );

        const buildedOptions: GetAttributeOptionsDto[] = [];
        const savedOptions: GetAttributeOptionsDto[] = [];
        for (const option of createAttributeDto.options) {
            buildedOptions.push({
                // attribute: null,
                ...this.entityManager.create(OptionValues, {
                    value: option.value,
                }),
            });

            savedOptions.push(
                await this.entityManager.save(OptionValues, {
                    attribute: newAttribute.id,
                    ...this.entityManager.create(OptionValues, {
                        value: option.value,
                    }),
                }),
            );
        }

        return {
            options: savedOptions,
            ...newAttribute,
        };

        // const newOptions = await this.entityManager.save(
        //     OptionValues,
        //     buildedOptions,
        // );

        // return await this.entityManager.save(
        //     Attribute,
        //     this.entityManager.create(Attribute, {
        //         options: newOptions,
        //         ...createAttributeDto,
        //     }),
        // );
        // console.log(newAttribute);
        // return newAttribute;
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
}
