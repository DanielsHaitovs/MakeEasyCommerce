import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { OptionService } from '@src/attribute/relations/attribute-option/services/option.service';
import { CreateAttributeOptionsDto, CreateOneAttributeOptionDto } from '@src/attribute/dto/attributes/option/create-attribute.option.dto';
import { GetOptionAttributeI } from '@src/attribute/interfaces/attributes/attributes.interface';
import { OptionHelperService } from '@src/base/services/attribute/attributes/option-helper.service';
import { AttributeOptionResponseI } from '@src/attribute/interfaces/attribute.interface';

// There is option to load data about table columns from database
@Injectable()
export class AttributeOptionService extends OptionService {
        constructor(
            @InjectEntityManager()
            private readonly attributeOptionManager: EntityManager,
            private readonly optionBaseHelperService: OptionHelperService,
        ) {
            super(attributeOptionManager, optionBaseHelperService);
        }

    async createOneAttributeOption({
        newAttributeOption,
    }: {
        newAttributeOption: CreateOneAttributeOptionDto;
    }): Promise<AttributeOptionResponseI> {
        const newOption = this.optionBaseHelperService.toSingleOptionObject({
            optionResponse: await super.create({
                relatedAttribute: newAttributeOption.relatedAttribute,
                createOption: { ...newAttributeOption }
            }),
        })
        
        if (newOption != null) {
            return {
                status: '200',
                message: 'Success',
                result: {
                    id: newOption.id,
                    relatedAttribute: newOption.relatedAttribute,
                    value: newOption.value,
                },
            }
        }
    }

    async createManyAttributeOption({
        newAttributeOption,
    }: {
        newAttributeOption: CreateAttributeOptionsDto;
    }): Promise<AttributeOptionResponseI> {
        const newOptions = await super.createMany({
            relatedAttribute: newAttributeOption.relatedAttribute,
            createOptions: newAttributeOption.options
        })

        if (newOptions != null && newOptions.error === undefined) {
            const preparedOptions: GetOptionAttributeI[] = this.optionBaseHelperService.toArrayOptionObject({
                optionResponse: newOptions,
            }).map((option) => {
                return {
                    id: option.id,
                    relatedAttribute: option.relatedAttribute,
                    value: option.value,
                }
            });

            if (preparedOptions != null) {
                return {
                    status: '200',
                    message: 'Success',
                    result: preparedOptions,
                }
            }
        }

        return {
            status: '666',
            message: 'Ups, Error',
            error: {
                message: newOptions.error.message,
                in: 'Attribute Option Service',
            }
        }
    }
}