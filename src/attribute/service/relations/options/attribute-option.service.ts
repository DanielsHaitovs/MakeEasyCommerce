import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, SelectQueryBuilder } from 'typeorm';
import { HandlerService } from '@src/mec/service/handler/query.service';
import { AttributeResponseDto, GetAttributeDto } from '@src/attribute/dto/get-attribute.dto';
import { Attribute } from '@src/attribute/entities/attribute.entity';
import { CreateOptionDto } from '@src/attribute/dto/options/create-option.dto';
import { GetNumberOptionDto, GetOptionDto, GetStringOptionDto, OptionResponseDto } from '@src/attribute/dto/options/get-option.dto';
import { AttributeOptionString } from '@src/attribute/entities/options/string-option.entity';
import { AttributeOptionNumber } from '@src/attribute/entities/options/number-option.entity';
import { PaginationDto } from '@src/mec/dto/query/filter.dto';
import { LogI } from '@src/mec/interface/query/query.interface';
import { OptionCreateService } from './create/create-option.service';
import { AttributeType } from '@src/attribute/enum/attribute.enum';

@Injectable()
export class AttributeOptionsService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly handlerService: HandlerService,
        private readonly createService: OptionCreateService
    ) {}

    /**
     * This method is responsible for creating a new attribute option.
     * It takes an object with id, type, and createOptions properties, and passes them to the createService to create the option.
     *
     * @param {Object} params - The parameters for creating the option.
     * @param {number} params.id - The ID of the attribute to which the option will be added.
     * @param {AttributeType} params.type - The type of the option (e.g., string, number).
     * @param {CreateOptionDto} params.createOptions - The data transfer object containing the details of the option to be created.
     * @returns {Promise<unknown>} - A promise that resolves with the result of the create operation.
     */
    async create({
        id,
        type,
        createOptions
    }: {
        id: number;
        type?: AttributeType;
        createOptions: CreateOptionDto;
    }): Promise<OptionResponseDto> {
        // If the type is not provided, set it to the default value based on the createOptions
        if (type === undefined) {
            if (createOptions.stringOptions && createOptions.numberOptions) {
                throw new BadRequestException('Invalid Option Body, received both string and number');
            }

            type = createOptions.stringOptions ? AttributeType.String : AttributeType.Number;
        }

        // Call the create method of the createService with the provided parameters and return the result
        return await this.createService.create({ id, type, createOptions });
    }

    async getStringOptions({ pagination }: { pagination: PaginationDto }): Promise<OptionResponseDto> {
        try {
            const query = this.entityManager.getRepository(AttributeOptionString).createQueryBuilder('stringOption');

            pagination = this.paginateOption({ pagination });
            if (pagination != null) {
                query.skip(pagination.page).take(pagination.limit);
            }

            // Execute the query and get the result
            const result: GetStringOptionDto[] = await query.getMany();

            // Check if the result is defined and not empty
            if (result != undefined && result.length > 0 && Object.keys(result[0]).length > 0) {
                // If the operation is successful, return the result with a success status
                return {
                    status: '200',
                    result: [
                        {
                            stringOptions: result,
                            numberOptions: undefined
                        }
                    ]
                };
            }

            // If the result is undefined or empty, return null
            return null;
        } catch (error) {
            // If an error occurs, handle it and return the error response
            const e = error as Error;
            return this.handlerService.handleError<GetAttributeDto>({
                e,
                message: 'Could Not Get String Attribute Options',
                where: 'Attribute Option Service -> getStringOptions',
                log: {
                    path: 'attribute/options/error.log',
                    action: 'Get String Attributes Options',
                    name: 'Attribute Option Service'
                }
            });
        }
    }

    async getNumberOptions({ pagination }: { pagination: PaginationDto }): Promise<OptionResponseDto> {
        try {
            const query = this.entityManager.getRepository(AttributeOptionNumber).createQueryBuilder('stringOption');

            pagination = this.paginateOption({ pagination });
            if (pagination != null) {
                query.skip(pagination.page).take(pagination.limit);
            }

            // Execute the query and get the result
            const result: GetNumberOptionDto[] = await query.getMany();

            // Check if the result is defined and not empty
            if (result != undefined && result.length > 0 && Object.keys(result[0]).length > 0) {
                // If the operation is successful, return the result with a success status
                return {
                    status: '200',
                    result: [
                        {
                            stringOptions: undefined,
                            numberOptions: result
                        }
                    ]
                };
            }

            // If the result is undefined or empty, return null
            return null;
        } catch (error) {
            // If an error occurs, handle it and return the error response
            const e = error as Error;
            return this.handlerService.handleError<GetAttributeDto>({
                e,
                message: 'Could Not Get Number Attribute Options',
                where: 'Attribute Option Service -> getNumberOptions',
                log: {
                    path: 'attribute/options/error.log',
                    action: 'Get Number Attributes Options',
                    name: 'Attribute Option Service'
                }
            });
        }
    }

    /**
     * This method is responsible for getting string attribute options by their IDs.
     * It takes an object with ids and pagination properties, retrieves the options using the provided IDs,
     * and returns a Promise that resolves with an OptionResponseDto object.
     *
     * @param {Object} params - The parameters for getting the options.
     * @param {number[]} params.ids - The IDs of the string options.
     * @param {PaginationDto} params.pagination - The pagination parameters.
     * @returns {Promise<OptionResponseDto>} - A promise that resolves with the retrieved options.
     * @throws {Error} - If an error occurs during the retrieval of the options, it is caught and handled by the handlerService.
     */
    async getStringOptionsByIds({ ids, pagination }: { ids: number[]; pagination: PaginationDto }): Promise<OptionResponseDto> {
        try {
            // Create a query to retrieve the string options by their IDs
            const query = this.entityManager.getRepository(AttributeOptionString).createQueryBuilder('options').whereInIds(ids);

            // Apply pagination to the query if provided
            pagination = this.paginateOption({ pagination });
            if (pagination != null) {
                query.skip(pagination.page).take(pagination.limit);
            }

            // Retrieve the options and return the result
            return {
                status: '200',
                result: [
                    {
                        stringOptions: await query.getMany(),
                        numberOptions: undefined
                    }
                ]
            };
        } catch (error) {
            // If an error occurs, handle it using the handlerService
            const e = error as Error;
            return this.handlerService.handleError<GetOptionDto>({
                e,
                message: 'Could Not Get Attributes String Options',
                where: 'Attribute Option Service -> getStringOptions',
                log: {
                    path: 'attribute/options/error.log',
                    action: 'Get Attributes String Options',
                    name: 'Attribute Option Service'
                }
            });
        }
    }

    /**
     * This method is responsible for getting number attribute options by their IDs.
     * It takes an object with ids and pagination properties, retrieves the options using the provided IDs,
     * and returns a Promise that resolves with an OptionResponseDto object.
     *
     * @param {Object} params - The parameters for getting the options.
     * @param {number[]} params.ids - The IDs of the number options.
     * @param {PaginationDto} params.pagination - The pagination parameters.
     * @returns {Promise<OptionResponseDto>} - A promise that resolves with the retrieved options.
     * @throws {Error} - If an error occurs during the retrieval of the options, it is caught and handled by the handlerService.
     */
    async getNumberOptionsByIds({ ids, pagination }: { ids: number[]; pagination: PaginationDto }): Promise<OptionResponseDto> {
        try {
            // Create a query to retrieve the number options by their IDs
            const query = this.entityManager.getRepository(AttributeOptionNumber).createQueryBuilder('options').whereInIds(ids);

            // Apply pagination to the query if provided
            pagination = this.paginateOption({ pagination });
            if (pagination != null) {
                query.skip(pagination.page).take(pagination.limit);
            }

            // Retrieve the options and return the result
            return {
                status: '200',
                result: [
                    {
                        stringOptions: undefined,
                        numberOptions: await query.getMany()
                    }
                ]
            };
        } catch (error) {
            // If an error occurs, handle it using the handlerService
            const e = error as Error;
            return this.handlerService.handleError<GetOptionDto>({
                e,
                message: 'Could Not Get Attributes Number Options',
                where: 'Attribute Option Service -> getNumberOptions',
                log: {
                    path: 'attribute/options/error.log',
                    action: 'Get Attributes Number Options',
                    name: 'Attribute Option Service'
                }
            });
        }
    }

    /**
     * This method is responsible for getting attribute options by their IDs.
     * It takes an object with stringOptionIds and numberOptionIds properties, retrieves the options using the provided IDs,
     * and returns a Promise that resolves with an OptionResponseDto object.
     *
     * @param {Object} params - The parameters for getting the options.
     * @param {number[]} params.stringOptionIds - The IDs of the string options.
     * @param {number[]} params.numberOptionIds - The IDs of the number options.
     * @returns {Promise<OptionResponseDto>} - A promise that resolves with the retrieved options.
     * @throws {Error} - If an error occurs during the retrieval of the options, it is caught and re-thrown.
     */
    async getOptionsByIds({
        stringOptionIds,
        numberOptionIds
    }: {
        stringOptionIds: number[];
        numberOptionIds: number[];
    }): Promise<OptionResponseDto> {
        try {
            // If both stringOptionIds and numberOptionIds are undefined, throw an error
            if (numberOptionIds == undefined && numberOptionIds == undefined) {
                throw new BadRequestException('Missing ids to find options');
            }

            let stringOptions: SelectQueryBuilder<AttributeOptionString>;
            let numberOptions: SelectQueryBuilder<AttributeOptionNumber>;

            // If stringOptionIds is defined and not empty, create a query to retrieve the string options
            if (stringOptionIds != undefined && stringOptionIds.length > 0) {
                stringOptions = this.entityManager
                    .getRepository(AttributeOptionString)
                    .createQueryBuilder('stringOptions')
                    .whereInIds(stringOptionIds);
            }

            // If numberOptionIds is defined and not empty, create a query to retrieve the number options
            if (numberOptionIds != undefined && numberOptionIds.length > 0) {
                numberOptions = this.entityManager
                    .getRepository(AttributeOptionNumber)
                    .createQueryBuilder('numberOptions')
                    .whereInIds(numberOptionIds);
            }

            // Handle the options and return the result
            return await this.handleOptionsAwait({ stringOptions, numberOptions });
        } catch (error) {
            // If an error occurs, handle it and return the error response
            const e = error as Error;
            return this.handlerService.handleError<GetAttributeDto>({
                e,
                message: 'Could Not Get Attribute Options',
                where: 'Attribute Option Service -> getOptionsByIds().handleOptionAwait',
                log: {
                    path: 'attribute/options/error.log',
                    action: 'Get Attributes Options',
                    name: 'Attribute Option Service'
                }
            });
        }
    }

    /**
     * This method is responsible for finding an attribute by its ID and type.
     * It takes an object with id and type properties, retrieves the attribute using the provided ID and type,
     * and returns a Promise that resolves with an AttributeResponseDto object.
     *
     * @param {Object} params - The parameters for finding the attribute.
     * @param {number} params.id - The ID of the attribute.
     * @param {AttributeType} params.type - The type of the attribute.
     * @returns {Promise<AttributeResponseDto>} - A promise that resolves with the retrieved attribute.
     * @throws {Error} - If an error occurs during the retrieval of the attribute, it is caught and handled by the handlerService.
     */
    async findByAttributeId({ id, type }: { id: number; type: AttributeType }): Promise<AttributeResponseDto> {
        try {
            // Create a query to find the attribute by its ID
            const attributeOptionQuery = this.entityManager
                .createQueryBuilder(Attribute, 'attribute')
                .where('attribute.id = :id', { id });

            // Depending on the type of the attribute, join with the appropriate options and retrieve the attribute
            switch (type) {
                case AttributeType.String:
                    return {
                        status: '200',
                        result: [
                            await attributeOptionQuery.leftJoinAndSelect('attribute.stringOptions', 'stringOption').getOneOrFail()
                        ]
                    };
                case AttributeType.Number:
                    return {
                        status: '200',
                        result: [
                            await attributeOptionQuery.leftJoinAndSelect('attribute.numberOptions', 'numberOption').getOneOrFail()
                        ]
                    };
                default:
                    // If the provided type is not valid, throw an error
                    throw new BadRequestException('Provided Invalid Option Type');
            }
        } catch (error) {
            // If an error occurs, handle it using the handlerService
            const e = error as Error;
            let log: LogI;

            // If the error message does not include 'Provided Invalid Option Type', set the log
            if (!e.message.includes('Provided Invalid Option Type')) {
                log = {
                    path: 'attribute/option/error.log',
                    action: 'Get Attribute Options',
                    name: 'Attribute Option Service'
                };
            }

            return this.handlerService.handleError<GetAttributeDto>({
                e,
                message: 'Could not find Attribute Options',
                where: 'Attribute Options Service this.findByAttributeId',
                log
            });
        }
    }

    /**
     * This method is responsible for handling attribute options.
     * It takes an object with stringOptions and numberOptions properties, retrieves the options using the provided query builders,
     * and returns a Promise that resolves with an OptionResponseDto object.
     *
     * @param {Object} params - The parameters for handling the options.
     * @param {SelectQueryBuilder<AttributeOptionString>} params.stringOptions - The query builder for retrieving the string options.
     * @param {SelectQueryBuilder<AttributeOptionNumber>} params.numberOptions - The query builder for retrieving the number options.
     * @returns {Promise<OptionResponseDto>} - A promise that resolves with the retrieved options.
     * @throws {Error} - If an error occurs during the retrieval of the options, it is caught and handled by the handlerService.
     */
    private async handleOptionsAwait({
        stringOptions,
        numberOptions
    }: {
        stringOptions: SelectQueryBuilder<AttributeOptionString>;
        numberOptions: SelectQueryBuilder<AttributeOptionNumber>;
    }): Promise<OptionResponseDto> {
        try {
            // If both stringOptions and numberOptions are provided, retrieve both types of options
            if (stringOptions && numberOptions) {
                // Order is important here, as the results are returned in the same order as the queries
                const [stringOptionsResult, numberOptionsResult] = (await Promise.all([
                    stringOptions.getMany(),
                    numberOptions.getMany()
                ])) as [GetStringOptionDto[], GetNumberOptionDto[]];

                return {
                    status: '200',
                    result: [
                        {
                            stringOptions: stringOptionsResult,
                            numberOptions: numberOptionsResult
                        }
                    ]
                };
            }

            // If only stringOptions is provided, retrieve only the string options
            if (stringOptions) {
                return {
                    status: '200',
                    result: [
                        {
                            stringOptions: await stringOptions.getMany(),
                            numberOptions: undefined
                        }
                    ]
                };
            }

            // If only numberOptions is provided, retrieve only the number options
            if (numberOptions) {
                return {
                    status: '200',
                    result: [
                        {
                            stringOptions: undefined,
                            numberOptions: await numberOptions.getMany()
                        }
                    ]
                };
            }
        } catch (error) {
            const e = error as Error;

            // If an error occurs, handle it using the handlerService
            return this.handlerService.handleError<GetOptionDto>({
                e,
                message: 'Could Not Handle Attributes Options',
                where: 'Attribute Option Service -> handleOptionsAwait',
                log: {
                    path: 'attribute/options/error.log',
                    action: 'Handle Attributes Options',
                    name: 'Attribute Option Service'
                }
            });
        }
    }

    /**
     * This method is responsible for paginating options.
     * It takes an object with a pagination property, validates and transforms the limit and page properties,
     * and returns a PaginationDto object.
     *
     * @param {Object} params - The parameters for paginating the options.
     * @param {PaginationDto} params.pagination - The pagination parameters.
     * @returns {PaginationDto} - The validated and transformed pagination parameters.
     */
    private paginateOption({ pagination }: { pagination: PaginationDto }): PaginationDto {
        // Check if the limit and page are provided
        if (pagination.limit === undefined || pagination.page === undefined) {
            return {
                limit: 0,
                page: 0
            };
        }

        // Check if the limit is a number and convert it to a number if it is
        if (!isNaN(Number(pagination.limit))) {
            pagination.limit = Number(pagination.limit);
        } else {
            return {
                limit: 0,
                page: 0
            };
        }

        // Check if the page is a number and convert it to a number if it is
        if (!isNaN(Number(pagination.page))) {
            pagination.page = Number(pagination.page);
        } else {
            return {
                limit: 0,
                page: 0
            };
        }

        // Calculate the offset for the pagination
        pagination.page = (pagination.page - 1) * pagination.limit;

        // Return the validated and transformed pagination parameters
        return pagination;
    }
}
