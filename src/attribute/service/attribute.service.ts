import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { HandlerService } from '@src/mec/service/handler/query.service';
import { AttributeHelperService } from './query/helper.service';
import { CreateAttributeDto } from '../dto/create-attribute.dto';
import { AttributeResponseDto, GetAttributeDto } from '../dto/get-attribute.dto';
import { Attribute, AttributesUnique } from '../entities/attribute.entity';
import { PaginationDto } from '@src/mec/dto/query/filter.dto';
import { AttributeRelationSelectDto } from '../dto/filter-attribute.dto';
import { UpdateAttributeDto } from '../dto/update-attribute.dto';

@Injectable()
export class AttributeService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly handlerService: HandlerService,
        private readonly attributeHelper: AttributeHelperService
    ) {}

    /**
     * Creates a new attribute.
     *
     * @param {Object} attribute - The attribute to be created.
     * @param {CreateAttributeDto} attribute.attribute - The attribute data transfer object.
     *
     * @returns {Promise<AttributeResponseDto>} A promise that resolves to the response object containing the status and the created attribute, or null if the attribute could not be created.
     *
     * @throws Will throw an error if the attribute creation fails.
     */
    async createAttribute({ createAttribute }: { createAttribute: CreateAttributeDto }): Promise<AttributeResponseDto> {
        try {
            // Prepare the attribute for saving
            const attribute = this.attributeHelper.prepareAttribute({ createAttribute: createAttribute });

            // Check if the attribute is defined
            if (attribute != null && attribute.result != undefined) {
                const { result } = attribute;
                // Save the attribute and return the result with a success status
                // The 'as CreateAttributeI' is a type assertion, telling TypeScript to treat 'result' as 'CreateAttributeI' type
                return {
                    status: '200',
                    result: await this.entityManager.save(Attribute, result as CreateAttributeDto)
                };
            }

            // If the attribute is undefined, return null
            return null;
        } catch (error) {
            // If an error occurs, handle it and return the error response
            const e = error as Error;
            if (e.message.includes(AttributesUnique)) {
                return this.handlerService.handleWarning<GetAttributeDto>({
                    message: 'Attribute With Such Name or Code Already Exists',
                    where: 'Attribute Service -> createAttribute',
                    status: '409'
                });
            }

            return this.handlerService.handleError<GetAttributeDto>({
                e,
                message: 'Could Not Create Attribute',
                where: 'Attribute Service -> createAttribute',
                status: '666',
                log: {
                    path: 'attribute/error.log',
                    action: 'Create Attribute',
                    name: 'Attribute Service'
                }
            });
        }
    }

    /**
     * Retrieves an attribute by its ID, with optional relations.
     *
     * @param {Object} id - The ID of the attribute to be retrieved.
     * @param {number} id.id - The ID number.
     * @param {AttributeRelationSelectDto} id.relations - The relations to be retrieved with the attribute.
     *
     * @returns {Promise<AttributeResponseDto>} A promise that resolves to the response object containing the status and the retrieved attribute, or null if the attribute could not be retrieved.
     *
     * @throws Will throw an error if the attribute retrieval fails.
     */
    async getAttributeById({ id, relations }: { id: number; relations: AttributeRelationSelectDto }): Promise<AttributeResponseDto> {
        try {
            // Check if the ID is defined
            if (id == undefined) {
                return {
                    status: '400',
                    result: null,
                    message: 'Attribute ID is required'
                };
            }

            // Create a query to fetch the attribute by its ID
            const query = this.entityManager.createQueryBuilder(Attribute, 'attribute').where('attribute.id = :id', { id });

            // If the relations are defined, add them to the query
            if (relations != undefined && (relations.joinRule != undefined || relations.joinOptions != undefined)) {
                if (relations.joinRule === true) query.leftJoinAndSelect('attribute.rules', 'rules');
                if (relations.joinOptions === true) query.leftJoinAndSelect('attribute.options', 'options');
            }

            // Execute the query and get the result
            const result: GetAttributeDto = await query.getOneOrFail();

            // Check if the result is defined and not empty
            if (result != undefined && Object.keys(result).length > 0) {
                // If the operation is successful, return the result with a success status
                return {
                    status: '200',
                    result
                };
            }

            // If the result is undefined or empty, return null
            return null;
        } catch (error) {
            // If an error occurs, handle it and return the error response
            const e = error as Error;
            return this.handlerService.handleError<GetAttributeDto>({
                e,
                message: 'Could Not Get Attribute',
                where: 'Attribute Service -> getAttributeById',
                status: '666',
                log: {
                    path: 'attribute/error.log',
                    action: 'Get Attribute',
                    name: 'Attribute Service'
                }
            });
        }
    }

    /**
     * Retrieves a paginated list of attributes with optional relations.
     *
     * @param {Object} pagination - The pagination parameters.
     * @param {PaginationDto} pagination.pagination - The pagination data transfer object.
     * @param {AttributeRelationSelectDto} pagination.relations - The relations to be retrieved with the attributes.
     *
     * @returns {Promise<AttributeResponseDto>} A promise that resolves to the response object containing the status and the retrieved attributes, or null if the attributes could not be retrieved.
     *
     * @throws Will throw an error if the attribute retrieval fails.
     */
    async getAttributes({
        pagination,
        relations
    }: {
        pagination: PaginationDto;
        relations: AttributeRelationSelectDto;
    }): Promise<AttributeResponseDto> {
        try {
            // If the limit or page is not defined in the pagination object, set them to 0.
            if (pagination.limit == undefined || pagination.page == undefined) {
                pagination.limit = 0;
                pagination.page = 0;
            }

            // Create a query to fetch the attributes, skipping and taking according to the pagination parameters.
            const query = this.entityManager
                .createQueryBuilder(Attribute, 'attribute')
                .skip((Number(pagination.page) - 1) * Number(pagination.limit))
                .take(Number(pagination.limit));

            // If the relations are defined, add them to the query
            if (relations != undefined && (relations.joinRule != undefined || relations.joinOptions != undefined)) {
                if (relations.joinRule === true) query.leftJoinAndSelect('attribute.rules', 'rules');
                if (relations.joinOptions === true) query.leftJoinAndSelect('attribute.options', 'options');
            }

            // Execute the query and get the result
            const result: GetAttributeDto[] = await query.getMany();

            // Check if the result is defined and not empty
            if (result != undefined && Object.keys(result[0]).length > 0) {
                // If the operation is successful, return the result with a success status
                return {
                    status: '200',
                    result
                };
            }

            // If the result is undefined or empty, return null
            return null;
        } catch (error) {
            // If an error occurs, handle it and return the error response
            const e = error as Error;
            return this.handlerService.handleError<GetAttributeDto>({
                e,
                message: 'Could Not Get Attributes',
                where: 'Attribute Service -> getAttributes',
                status: '666',
                log: {
                    path: 'attribute/error.log',
                    action: 'Get Attributes',
                    name: 'Attribute Service'
                }
            });
        }
    }

    /**
     * Updates an attribute by its ID.
     *
     * @param {Object} id - The ID of the attribute to be updated.
     * @param {number} id.id - The ID number.
     * @param {UpdateAttributeDto} id.updateAttribute - The new attribute data.
     *
     * @returns {Promise<AttributeResponseDto>} A promise that resolves to the response object containing the status and the updated attribute, or a warning if the attribute could not be updated.
     *
     * @throws Will throw an error if the attribute update fails.
     */
    async updateAttribute({
        id,
        updateAttribute
    }: {
        id: number;
        updateAttribute: UpdateAttributeDto;
    }): Promise<AttributeResponseDto> {
        try {
            // Preload the attribute to be updated
            const preload = await this.entityManager.preload(Attribute, { id, ...updateAttribute });

            // Check if the preloaded attribute is defined and its ID matches the provided ID
            if (preload != undefined && preload.id === id) {
                // Update the attribute
                const update = await this.entityManager.update(Attribute, id, preload);

                // Check if the update affected one row
                if (update.affected === 1) {
                    // If the operation is successful, return the updated attribute with a success status
                    return {
                        status: '200',
                        result: preload
                    };
                }
            }

            // If the attribute could not be updated, handle the warning
            return this.handlerService.handleWarning<GetAttributeDto>({
                message: 'Could Not Update Attribute',
                where: 'Attribute Service -> updateAttribute',
                status: '404',
                log: {
                    path: 'attribute/warning.log',
                    action: 'Update Attribute',
                    name: 'Attribute Service'
                }
            });
        } catch (error) {
            // If an error occurs, handle it and return the error response
            const e = error as Error;
            return this.handlerService.handleError<GetAttributeDto>({
                e,
                message: 'Could Not Update Attribute',
                where: 'Attribute Service -> updateAttribute',
                status: '666',
                log: {
                    path: 'attribute/error.log',
                    action: 'Update Attribute',
                    name: 'Attribute Service'
                }
            });
        }
    }

    async deleteAttribute({ id }: { id: number }): Promise<AttributeResponseDto> {
        try {
            const attribute = await this.getAttributeById({ id, relations: { joinRule: true, joinOptions: false } });

            if (attribute != null && attribute.result != undefined && attribute.status === '200') {
                await this.entityManager.remove(attribute);

                return { status: '200' };
            }
        } catch (error) {
            const e = error as Error;
            this.handlerService.handleError<GetAttributeDto>({
                e,
                message: 'Could Not Delete Attribute',
                where: 'Attribute Service -> deleteAttribute',
                status: '666',
                log: {
                    path: 'attribute/error.log',
                    action: 'Delete Attribute',
                    name: 'Attribute Service'
                }
            });

            return null;
        }
    }
}
