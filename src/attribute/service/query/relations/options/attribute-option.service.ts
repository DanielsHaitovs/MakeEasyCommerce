import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, SelectQueryBuilder } from 'typeorm';
import { HandlerService } from '@src/mec/service/handler/query.service';
import { AttributeResponseDto } from '@src/attribute/dto/get-attribute.dto';
import { Attribute } from '@src/attribute/entities/attribute.entity';
import { CreateOptionDto } from '@src/attribute/dto/options/create-option.dto';
import { GetNumberOptionDto, GetStringOptionDto, OptionResponseDto } from '@src/attribute/dto/options/get-option.dto';
import { AttributeOptionString, StringOptionIndex } from '@src/attribute/entities/options/string-option.entity';
import { AttributeOptionNumber, NumberOptionIndex } from '@src/attribute/entities/options/number-option.entity';
import { PaginationDto } from '@src/mec/dto/query/filter.dto';
import { OptionCreateService } from './create/create-option.service';
import { AttributeType } from '@src/attribute/enum/attribute.enum';
import { UpdateNumberOptionDto, UpdateOptionDto, UpdateStringOptionDto } from '@src/attribute/dto/options/update-option.dto';
import { OptionUpdateService } from './update/update-option.service';
import { OptionQueryDto } from '@src/attribute/dto/filter/filter-option.dto';
import { OptionQueryFilterI } from '@src/attribute/interface/attribute.interface';
import { OptionQueryService } from './option-query.service';

@Injectable()
export class AttributeOptionsService {
    private logPath = 'attribute/error.log';

    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly handlerService: HandlerService,
        private readonly createService: OptionCreateService,
        private readonly updateService: OptionUpdateService,
        private readonly queryService: OptionQueryService
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

            // Check if the result is defined and that first record of array is not empty
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
            return this.handlerService.handleError({
                e,
                message: 'Could Not Get Attribute String Options',
                where: this.getStringOptions.name,
                name: AttributeOptionsService.name,
                logPath: this.logPath
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
            return this.handlerService.handleError({
                e,
                message: 'Could Not Get Attribute Number Options',
                where: this.getNumberOptions.name,
                name: AttributeOptionsService.name,
                logPath: this.logPath
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
            return this.handlerService.handleError({
                e,
                message: 'Could Not Get Attributes String Options By Theirs Ids',
                where: this.getStringOptionsByIds.name,
                name: AttributeOptionsService.name,
                logPath: this.logPath
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
            return this.handlerService.handleError({
                e,
                message: 'Could Not Get Attributes Number Options By Theirs Ids',
                where: this.getNumberOptionsByIds.name,
                name: AttributeOptionsService.name,
                logPath: this.logPath
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

            const test = stringOptions.expressionMap.parameters;

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
            return this.handlerService.handleError({
                e,
                message: 'Could Not Get Attribute String And Number Options By Theirs Ids',
                where: `${this.getOptionsByIds.name} #Includes Await Resolver#`,
                name: AttributeOptionsService.name,
                logPath: this.logPath
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
            let logPath = '';

            // If the error message does not include 'Provided Invalid Option Type', set the log
            if (!e.message.includes('Provided Invalid Option Type')) {
                logPath = this.logPath;
            }

            return this.handlerService.handleError({
                e,
                message: 'Could not find Attribute Options By Attribute ID',
                where: this.findByAttributeId.name,
                name: AttributeOptionsService.name,
                logPath
            });
        }
    }

    async findAttributeByOptionId({ ids, type }: { ids: number[]; type: AttributeType }): Promise<AttributeResponseDto> {
        try {
            switch (type) {
                case AttributeType.String:
                    const stringOption = await this.entityManager
                        .getRepository(AttributeOptionString)
                        .createQueryBuilder('stringOption')
                        .leftJoinAndSelect('stringOption.attribute', 'optionAttribute')
                        .leftJoinAndSelect('optionAttribute.rule', 'attributeRule')
                        .whereInIds(ids)
                        .getOneOrFail();

                    return {
                        status: '200',
                        result: [stringOption.attribute]
                    };
                case AttributeType.Number:
                    const numberOption = await this.entityManager
                        .getRepository(AttributeOptionNumber)
                        .createQueryBuilder('numberOption')
                        .leftJoinAndSelect('numberOption.attribute', 'optionAttribute')
                        .leftJoinAndSelect('optionAttribute.rule', 'attributeRule')
                        .whereInIds(ids)
                        .getOneOrFail();

                    return {
                        status: '200',
                        result: [numberOption.attribute]
                    };
                default:
                    throw new BadRequestException('Provided Invalid Option Type');
            }
        } catch (error) {
            // If an error occurs, handle it using the handlerService
            const e = error as Error;
            let logPath = '';

            // If the error message does not include 'Provided Invalid Option Type', set the log
            if (!e.message.includes('Provided Invalid Option Type')) {
                logPath = this.logPath;
            }

            return this.handlerService.handleError({
                e,
                message: 'Could not find Attribute By Attribute Option ID',
                where: this.findAttributeByOptionId.name,
                name: AttributeOptionsService.name,
                logPath
            });
        }
    }

    async updateOptions({
        updateOptions,
        type
    }: {
        type?: AttributeType;
        updateOptions: UpdateOptionDto;
    }): Promise<OptionResponseDto> {
        // If the type is not provided, set it to the default value based on the createOptions
        if (type === undefined) {
            // Attribute can have only string or only number options
            if (updateOptions.stringOptions && updateOptions.numberOptions) {
                throw new BadRequestException('Invalid Option Body, received both string and number');
            }

            type = updateOptions.stringOptions ? AttributeType.String : AttributeType.Number;
        }

        return await this.updateService.update({ type, updateOptions });
    }

    async updateStringOption({ updateOption }: { updateOption: UpdateStringOptionDto[] }): Promise<OptionResponseDto> {
        return await this.updateService.updateStringOption(updateOption);
    }

    async updateNumberOption({ updateOption }: { updateOption: UpdateNumberOptionDto[] }): Promise<OptionResponseDto> {
        return await this.updateService.updateNumberOption(updateOption);
    }

    async deleteOptions({ ids, type }: { ids: number[]; type: AttributeType }): Promise<OptionResponseDto> {
        try {
            const query = this.entityManager.createQueryBuilder().delete();
            switch (type) {
                case AttributeType.String:
                    const stringQuery = await query.from(AttributeOptionString).where('id IN (:...ids)', { ids }).execute();
                    return {
                        status: '200',
                        message: stringQuery.affected.toString()
                    };
                case AttributeType.Number:
                    const numberQuery = await query.from(AttributeOptionNumber).where('id IN (:...ids)', { ids }).execute();
                    return {
                        status: '200',
                        message: numberQuery.affected.toString()
                    };
                default:
                    throw new BadRequestException('Invalid Option Type');
            }
        } catch (error) {
            // If an error occurs, handle it using the handlerService
            const e = error as Error;
            let logPath = '';

            // If the error message does not include 'Provided Invalid Option Type', set the log
            if (!e.message.includes('Provided Invalid Option Type')) {
                logPath = this.logPath;
            }

            return this.handlerService.handleError({
                e,
                message: 'Could not Delete Attribute Options By Type',
                where: this.deleteOptions.name,
                name: AttributeOptionsService.name,
                logPath
            });
        }
    }

    async filterQuery({ filters }: { filters: OptionQueryDto }): Promise<OptionResponseDto> {
        // Create a new query filter using the provided filters
        const optionQuery: OptionQueryFilterI = this.queryService.queryFilter({ filters });

        // If the query filter does not contain a message, attempt to execute the query
        if (optionQuery.message === undefined) {
            try {
                if (optionQuery.stringQuery) {
                    console.log(123);
                    // Enable caching for the query and set the index to use
                    optionQuery.stringQuery.cache(true);
                    optionQuery.stringQuery.useIndex(StringOptionIndex);
                } else {
                    optionQuery.stringQuery = undefined;
                }

                if (optionQuery.numberQuery) {
                    console.log(987);
                    optionQuery.numberQuery.cache(true);
                    optionQuery.numberQuery.useIndex(NumberOptionIndex);
                } else {
                    optionQuery.numberQuery = undefined;
                }

                // If the query does not return a result, return null
                return await this.handleOptionsAwait({
                    stringOptions: optionQuery.stringQuery,
                    numberOptions: optionQuery.numberQuery
                });
            } catch (error) {
                // If an error occurs, cast it to an Error object
                const e = error as Error;
                // Handle the error using the handler service
                return this.handlerService.handleError({
                    e,
                    message: 'Could not Filter Attribute Option ',
                    where: this.filterQuery.name,
                    name: AttributeOptionsService.name,
                    logPath: this.logPath
                });
            }
        }

        // If the query filter contains a message, return not found status with the message
        return {
            status: '404',
            message: optionQuery.message
        };
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
            if (stringOptions != undefined && numberOptions != undefined) {
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
            if (stringOptions != undefined) {
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
            if (numberOptions != undefined) {
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
            return this.handlerService.handleError({
                e,
                message: 'Could Not Handle Combined Attributes Options Promise',
                where: this.handleOptionsAwait.name,
                name: AttributeOptionsService.name,
                logPath: this.logPath
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
