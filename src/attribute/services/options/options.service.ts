import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { AttributeOptionsDto } from '@src/attribute/dto/create-attribute.dto';
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
        const savedOptions: GetAttributeOptionsDto[] = [];

        // let try to achieve it by saving multiple options at once
        // Might be handy to inject here env value
        // that will limit amount of options to be saved at once
        for (const option of createOptions) {
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
