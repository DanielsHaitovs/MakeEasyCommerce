import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { PaginationDto } from '@src/base/dto/filters/pagination.dto';
import { CreateAttributeOptionsDto } from '.working_tempo/dto/attributes/options/create-option.dto';
import {
    GetAttributeOptionsDto,
    GetUpdatedOptionsDto,
} from '.working_tempo/dto/attributes/options/get-option.dto';
import { UpdateAttributeOptionsDto } from '.working_tempo/dto/attributes/options/update-option.dto';
import { EntityManager } from 'typeorm';

@Injectable()
export class ProductOptionsService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}

    async create({
        createOption,
        attributeId,
    }: {
        createOption: CreateAttributeOptionsDto;
        attributeId: number;
    }): Promise<GetAttributeOptionsDto> {
        return await this.entityManager.save(
            ProductAttributeOption,
            this.entityManager.create(ProductAttributeOption, {
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
        createOptions: CreateAttributeOptionsDto[];
    }): Promise<GetAttributeOptionsDto[]> {
        return await this.entityManager.save(
            ProductAttributeOption,
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
                .getRepository(ProductAttributeOption)
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
            return await this.entityManager.findOne(ProductAttributeOption, {
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
                    ProductAttributeOption,
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
            updatedOptions: newOptions,
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
        return await this.entityManager.update(ProductAttributeOption, id, {
            value: value,
            attribute: {
                id: parentId,
            },
        });
    }

    async remove({ id }: { id: number }): Promise<number> {
        return (await this.entityManager.delete(ProductAttributeOption, id))
            .affected;
    }

    protected async prepareOptions({
        options,
    }: {
        options: CreateAttributeOptionsDto[];
    }) {
        return options.map((option) => {
            return this.entityManager.create(ProductAttributeOption, {
                value: option.value,
            });
        });
    }
}
