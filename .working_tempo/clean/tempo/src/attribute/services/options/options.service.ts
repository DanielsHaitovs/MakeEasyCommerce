import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { OptionValues } from '@src/attribute/entities/inheritance/options/option-values.entity';
import { AttributeOptionsDto } from '@src/base/dto/attributes/attribute.dto';
import {
    GetAttributeOptionsDto,
    GetUpdatedOptionsDto,
} from '@src/base/dto/attributes/get-attribute.dto';
import { UpdateAttributeOptionsDto } from '@src/base/dto/attributes/update-attribute.dto';
import { PaginationDto } from '@src/base/dto/query-filters/query.dto';
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

    async findOneById({ id }: { id: number }): Promise<GetAttributeOptionsDto> {
        try {
            return await this.entityManager.findOne(OptionValues, {
                where: {
                    id: id,
                },
            });
        } catch (e) {
            return e.message;
        }
    }

    async updateOptions({
        options,
        parentId,
    }: {
        options: UpdateAttributeOptionsDto[];
        parentId: number;
    }): Promise<GetUpdatedOptionsDto> {
        const newOptions: GetAttributeOptionsDto[] = [];
        const optionsIds: number[] = [];

        for (const option of options) {
            if (option.id != undefined && option != null) {
                await this.entityManager.update(
                    OptionValues,
                    option.id,
                    option,
                );
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
            updatedOptions: null,
            newOptions: newOptions,
            newOptionsIds: optionsIds,
        };
    }

    async update({
        id,
        value,
        parentId,
    }: {
        id: number;
        value: string | number | boolean | Date | JSON;
        parentId: number;
    }): Promise<any> {
        return await this.entityManager.update(OptionValues, id, {
            value: value,
            attribute: {
                id: parentId,
            },
        });
    }

    async remove({ id }: { id: number }): Promise<number> {
        return (await this.entityManager.delete(OptionValues, id)).affected;
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
