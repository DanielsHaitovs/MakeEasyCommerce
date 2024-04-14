import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { HandlerService } from '@src/mec/service/handler/query.service';
import { CreateNumberOptionDto, CreateOptionDto, CreateStringOptionDto } from '@src/attribute/dto/options/create-option.dto';
import { OptionResponseDto } from '@src/attribute/dto/options/get-option.dto';
import { AttributeOptionString } from '@src/attribute/entities/options/string-option.entity';
import { AttributeOptionNumber } from '@src/attribute/entities/options/number-option.entity';
import { AttributeType } from '@src/attribute/enum/attribute.enum';

@Injectable()
export class OptionCreateService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly handlerService: HandlerService
    ) {}

    /**
     * This service method is responsible for creating attribute options based on the provided type.
     * It takes an object with id, type, and createOptions properties, creates the options using the appropriate method,
     * and returns a Promise that resolves with an OptionResponseDto object.
     *
     * @param {Object} params - The parameters for creating the options.
     * @param {number} params.id - The id of the attribute.
     * @param {OptionType} params.type - The type of the options to be created.
     * @param {CreateOptionDto} params.createOptions - The options to be created.
     * @returns {Promise<OptionResponseDto>} - A promise that resolves with the created options.
     * @throws {BadRequestException} - If the id or type is missing, or if the type is invalid, a BadRequestException is thrown.
     * @throws {Error} - If an error occurs during the creation of the options, it is caught and handled by the handlerService.
     */
    async create({
        id,
        type,
        createOptions
    }: {
        id: number;
        type: AttributeType;
        createOptions: CreateOptionDto;
    }): Promise<OptionResponseDto> {
        // Check if the id is provided
        if (id === undefined) {
            throw new BadRequestException('Attribute ID is missing to create attribute options');
        }

        // Check if the type is provided
        if (type === undefined) {
            throw new BadRequestException('Attribute Option Type is missing to create attribute option');
        }

        try {
            // Depending on the type, create the appropriate options
            switch (type) {
                case AttributeType.Number:
                    return await this.createNumberOption(id, createOptions.numberOptions);
                case AttributeType.String:
                    return await this.createStringOption(id, createOptions.stringOptions);
                default:
                    throw new BadRequestException('Provided Invalid Option Type');
            }
        } catch (error) {
            const e = error as Error;

            // If an error occurs, handle it using the handlerService
            return this.handlerService.handleError({
                e,
                message: 'Could Not Save Attribute Options',
                where: 'Attribute Helper -> prepareAttribute',
                log: {
                    path: 'attribute/error.log',
                    action: 'Prepare Attribute',
                    name: 'Attribute Helper'
                }
            });
        }
    }

    /**
     * This service method is responsible for creating string options.
     * It takes an array of CreateStringOptionDto objects, saves them using the entityManager,
     * and returns an array of GetStringOptionDto objects.
     *
     * @param {CreateStringOptionDto[]} createOption - The array of options to be created.
     * @returns {Promise<GetStringOptionDto[]>} - A promise that resolves with an array of created options.
     * @throws {Error} - If an error occurs during the save operation, it is caught and handled by the handlerService.
     */
    async createStringOption(id: number, createOption: CreateStringOptionDto[]): Promise<OptionResponseDto> {
        try {
            const options = createOption.flatMap((option) => {
                return {
                    ...option,
                    attribute: { id }
                };
            });

            // Use the entityManager to save the new options
            return {
                status: '200',
                result: [
                    {
                        stringOptions: await this.entityManager.save(AttributeOptionString, options),
                        numberOptions: undefined
                    }
                ]
            };
        } catch (error) {
            const e = error as Error;

            // If an error occurs, handle it using the handlerService
            return this.handlerService.handleError({
                e,
                message: 'Could not save String Option',
                where: 'Option Service this.createStringOption',
                log: {
                    path: 'attribute/options/error.log',
                    action: 'Create String Option',
                    name: 'Option Service'
                }
            });
        }
    }

    /**
     * This service method is responsible for creating number options.
     * It takes an array of CreateNumberOptionDto objects, saves them using the entityManager,
     * and returns an array of GetNumberOptionDto objects.
     *
     * @param {CreateNumberOptionDto[]} createOption - The array of options to be created.
     * @returns {Promise<GetNumberOptionDto[]>} - A promise that resolves with an array of created options.
     * @throws {Error} - If an error occurs during the save operation, it is caught and handled by the handlerService.
     */
    async createNumberOption(id: number, createOption: CreateNumberOptionDto[]): Promise<OptionResponseDto> {
        try {
            if (id === undefined) throw new BadRequestException('Missing Attribute ID to create Number Option');
            const options = createOption.flatMap((option) => {
                return {
                    ...option,
                    attribute: { id }
                };
            });

            // Use the entityManager to save the new options
            return {
                status: '200',
                result: [
                    {
                        stringOptions: undefined,
                        numberOptions: await this.entityManager.save(AttributeOptionNumber, options)
                    }
                ]
            };
        } catch (error) {
            const e = error as Error;

            // If an error occurs, handle it using the handlerService
            return this.handlerService.handleError({
                e,
                message: 'Could not save Number Option',
                where: 'Option Service this.createNumberOption',
                log: {
                    path: 'attribute/options/error.log',
                    action: 'Create Boolean Option',
                    name: 'Option Service'
                }
            });
        }
    }
}
