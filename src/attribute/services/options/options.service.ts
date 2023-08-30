import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { AttributeOptionsDto } from '@src/attribute/dto/attribute.dto';
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
