import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { OptionHelperService } from '@src/base/services/attribute/attributes/option-helper.service';
import { EntityManager } from 'typeorm';
import { OptionResponseI } from '../interface/create-option.interface';
import { AttributeOption } from '../entities/option.entity';
import { CreateOptionDto } from '../dto/create-option.dto';
import { UpdateOptionDto } from '../dto/update-option.dto';
import { OptionFilterDto } from '@src/base/dto/filter/attributes/option.attribute.dto';

@Injectable()
export class OptionService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly optionHelper: OptionHelperService,
    ) {}

    async create({
        relatedAttribute,
        createOption,
    }: {
        relatedAttribute: number;
        createOption: CreateOptionDto;
    }): Promise<OptionResponseI> {
        if (relatedAttribute === 0 || relatedAttribute === null) {
            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    message: 'Related Attribute is not defined',
                    in: 'Attribute Option Service Create One',
                },
            };
        }

        try {
            return {
                status: '200',
                message: 'Success',
                result: await this.entityManager.save(AttributeOption, {
                    relatedAttribute: relatedAttribute,
                    value: createOption.value,
                }),
            };
        } catch (e) {
            return this.handleRemoveError(e, 'create');
        }
    }

    async createMany({
        relatedAttribute,
        createOptions,
    }: {
        relatedAttribute: number;
        createOptions: CreateOptionDto[];
    }): Promise<OptionResponseI> {
        try {
            const preparedOptions = this.optionHelper.prepareAttributeOptions({
                relatedAttribute,
                prepareOptions: createOptions,
            });

            return {
                status: '200',
                message: 'Success',
                result: await this.entityManager.save(AttributeOption, preparedOptions),
            };
        } catch (e) {
            return this.handleRemoveError(e, 'createMany');
        }
    }


    async findOption({
        optionFilters,
    }: {
        optionFilters: OptionFilterDto,
    }): Promise<OptionResponseI> {
        return await this.optionHelper.simpleOptionQuery({
            filters: optionFilters,
        });
    } 

    /**
     * Update an option
     * @param id
     * @query updateOptionDto
     */
    async update({
        id,
        updateOptionDto,
    }: {
        id: number;
        updateOptionDto: UpdateOptionDto;
    }): Promise<OptionResponseI> {
        try {
            return (
                await this.entityManager.update(
                    AttributeOption,
                    id,
                    updateOptionDto,
                )
            ).raw;
        } catch (e) {
            return this.handleRemoveError(e, 'update');
        }
    }


    async remove({ id }: { id: number }): Promise<OptionResponseI> {
        try {
            if ((await this.entityManager.delete(Option, id)).affected > 0) {
                return {
                    status: '200',
                    message: `Record with id ${id} was removed`,
                };
            }
        } catch (e) {
            return this.handleRemoveError(e, 'remove');
        }
    }

    private handleRemoveError(e: Error, functionName: string): OptionResponseI {
        return {
            status: '666',
            message: functionName,
            error: {
                message: e.message,
                in: 'Option Entity',
            },
        };
    }
}
