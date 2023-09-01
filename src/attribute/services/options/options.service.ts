import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import {
    AttributeOptionsDto,
    PaginationDto,
} from '@src/attribute/dto/attribute.dto';
import { GetAttributeOptionsDto, GetUpdatedOptionsDto } from '@src/attribute/dto/get-attribute.dto';
import { UpdateAttributeOptionsDto } from '@src/attribute/dto/update-attribute.dto';
import { OptionValues } from '@src/attribute/entities/inheritance/options/option-values.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class OptionsService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}

    async create({
        createOption,
        attributeId,
    }: {
        createOption: AttributeOptionsDto;
        attributeId: number;
    }): Promise<GetAttributeOptionsDto> {
        return await this.entityManager.save(
            OptionValues,
            this.entityManager.create(OptionValues, {
                value: createOption.value,
                attribute: {
                    id: attributeId,
                },
            }),
        );
    }

    async createOptions({
        createOptions,
    }: {
        createOptions: AttributeOptionsDto[];
    }): Promise<GetAttributeOptionsDto[]> {
        return await this.entityManager.save(
            OptionValues,
            await this.prepareOptions({
                options: createOptions,
            }),
        );
    }

    async findAll({
        condition,
    }: {
        condition: PaginationDto;
    }): Promise<GetAttributeOptionsDto[]> {
        try {
            // return await this.entityManager.find(OptionValues);
            const skip = (condition.page - 1) * condition.limit;
            return await this.entityManager
                .getRepository(OptionValues)
                .createQueryBuilder('options')
                .skip(skip)
                .take(condition.limit)
                .getMany();
        } catch (e) {
            return e.message;
        }
    }

    async updateOptions({
        options,
        parentId,
        keepOldOptions,
    }: {
        options: UpdateAttributeOptionsDto[];
        parentId: number;
        keepOldOptions: boolean;
    }): Promise<GetUpdatedOptionsDto> {
        const newOptions: GetAttributeOptionsDto[] = [];
        const optionsIds: number[] = [];

        for (const option of options) {
            if (option.id != undefined && option != null) {
                const preloadOption = await this.entityManager.preload(
                    OptionValues,
                    option,
                );
                await this.entityManager.save(OptionValues, preloadOption);
            } else {
                const newRecord: GetAttributeOptionsDto = await this.create({
                    createOption: option,
                    attributeId: parentId,
                });
                newOptions.push({ ...newRecord });
                optionsIds.push(newRecord.id);
            }
        }

        return {
            updatedOptions: newOptions,
            newOptionsIds: optionsIds,
        };
    }

    async addNewOptions({
        options,
        parentId,
    }: {
        options: UpdateAttributeOptionsDto[];
        parentId: number;
    }): Promise<any> {
        const currentOptions = await this.entityManager.find(OptionValues, {
            where: {
                attribute: {
                    id: parentId,
                },
            },
        });
    }

    protected async prepareOptions({
        options,
    }: {
        options: AttributeOptionsDto[];
    }) {
        return options.map((option) => {
            return this.entityManager.create(OptionValues, {
                value: option.value,
            });
        });
    }
}
