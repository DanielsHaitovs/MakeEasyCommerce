import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import {
    AttributeOptionsDto,
    PaginationDto,
} from '@src/attribute/dto/attribute.dto';
import { GetAttributeOptionsDto } from '@src/attribute/dto/get-attribute.dto';
import { OptionValues } from '@src/attribute/entities/inheritance/options/option-values.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class OptionsService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}

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
