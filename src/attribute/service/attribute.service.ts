import { ConflictException, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { HandlerService } from '@src/mec/service/handler/query.service';
import { AttributeHelperService } from './query/helper.service';
import { CreateAttributeDto } from '../dto/create-attribute.dto';
import { AttributeResponseDto, GetAttributeDto } from '../dto/get-attribute.dto';
import { Attribute, AttributesUnique } from '../entities/attribute.entity';
import { PaginationDto } from '@src/mec/dto/query/filter.dto';
import { AttributeRelationSelectDto } from '../dto/filter-attribute.dto';
import { UpdateAttributeDto, UpdateAttributeRuleDto } from '../dto/update-attribute.dto';
import { AttributeRule } from '@src/rule/entities/rule.entity';

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
            if (createAttribute.rule == undefined) {
                throw new TypeError('Rule is required');
            }

            // Prepare the attribute for saving
            const attribute = this.attributeHelper.prepareAttribute({ createAttribute: createAttribute });

            // Check if the attribute is defined
            if (attribute != null) {
                // Save the attribute and return the result with a success status
                // The 'as CreateAttributeI' is a type assertion, telling TypeScript to treat 'result' as 'CreateAttributeI' type
                return {
                    status: '200',
                    result: await this.entityManager.save(Attribute, attribute)
                };
            }

            // If the attribute is undefined, return null
            return null;
        } catch (error) {
            // If an error occurs, handle it and return the error response
            const e = error as Error;
            let where = '';
            Object.keys(AttributesUnique).forEach((key) => {
                if (e.message.includes(AttributesUnique[key] as string)) {
                    where = key;
                }
            });

            if (where != '') {
                return this.handlerService.handleWarning<GetAttributeDto>({
                    message: `Attribute with such ${where} already exists`,
                    where: 'Attribute Service -> createAttribute',
                    status: '409'
                });
            }

            return this.handlerService.handleError<GetAttributeDto>({
                e,
                message: 'Could Not Create Attribute',
                where: 'Attribute Service -> createAttribute',
                log: {
                    path: 'attribute/error.log',
                    action: 'Create Attribute',
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
            // Create a query to fetch the attributes, skipping and taking according to the pagination parameters.
            const query = this.entityManager.getRepository(Attribute).createQueryBuilder('attribute');

            // If the relations are defined, add them to the query
            if (relations != undefined && (relations.joinRule != undefined || relations.joinOptions != undefined)) {
                if (relations.joinRule === true) query.leftJoinAndSelect('attribute.rule', 'rule');
                if (relations.joinOptions === true) query.leftJoinAndSelect('attribute.options', 'options');
            }

            pagination = this.paginateAttribute({ pagination });
            if (pagination != null) {
                query.skip(pagination.page).take(pagination.limit);
            }

            // Execute the query and get the result
            const result: GetAttributeDto[] = await query.getMany();

            // Check if the result is defined and not empty
            if (result != undefined && result.length > 0 && Object.keys(result[0]).length > 0) {
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

                log: {
                    path: 'attribute/error.log',
                    action: 'Get Attributes',
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
                if (relations.joinRule === true) query.leftJoinAndSelect('attribute.rule', 'rule');
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

                log: {
                    path: 'attribute/error.log',
                    action: 'Get Attribute',
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
                const update = await this.entityManager.update(Attribute, id, updateAttribute);

                // Check if the update affected one row
                if (update.affected > 0) {
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

                log: {
                    path: 'attribute/error.log',
                    action: 'Update Attribute',
                    name: 'Attribute Service'
                }
            });
        }
    }

    /**
     * This method updates an attribute rule.
     *
     * @param {Object} params - An object containing the parameters for the update operation.
     * @param {number} params.id - The ID of the attribute. This is optional.
     * @param {number} params.ruleId - The ID of the rule to be updated. This is optional.
     * @param {UpdateAttributeRuleDto} params.rule - The new rule data to be updated.
     *
     * @returns {Promise<AttributeResponseDto>} - Returns a promise that resolves with the updated attribute response data transfer object.
     */
    async updateAttributeRule({
        id,
        ruleId,
        rule
    }: {
        id?: number;
        ruleId?: number;
        rule: UpdateAttributeRuleDto;
    }): Promise<AttributeResponseDto> {
        // Call the attribute helper's updateRule method with the provided parameters
        return await this.attributeHelper.updateRule({ rule, ruleId, attributeId: id });
    }

    /**
     * Deletes an Attribute and its related AttributeRule.
     *
     * @param {Object} param0 - An object.
     * @param {number} param0.id - The ID of the Attribute to delete.
     *
     * @returns {Promise<AttributeResponseDto>} - A promise that resolves to an AttributeResponseDto.
     * If the Attribute is successfully deleted, the status is '200'.
     * If an error occurs, the promise resolves to null and the error is handled by the handlerService.
     */
    async deleteAttribute({ id }: { id: number }): Promise<AttributeResponseDto> {
        try {
            // Get the full Attribute entity, including its related AttributeRule
            const attributeEntity = await this.entityManager.findOne(Attribute, { where: { id }, relations: ['rule'] });

            // Remove the Attribute from the database
            const deletedAttribute = await this.entityManager.remove(Attribute, attributeEntity);
            if (deletedAttribute.id === undefined) {
                // Remove the related AttributeRule from the database
                const deletedRule = await this.entityManager.remove(AttributeRule, attributeEntity.rule);

                if (deletedRule.id === undefined) {
                    return { status: '200' };
                }

                throw new ConflictException(
                    `Could Not Delete Attribute Rule with id: ${attributeEntity.rule.id}, but Attribute with ${attributeEntity.id} was Deleted`
                );
            }

            throw new ConflictException(`Could Not Delete Attribute with id: ${attributeEntity.id}`);
        } catch (error) {
            // If an error occurs, cast it to an Error object
            const e = error as Error;

            // Handle the error with the handlerService
            return this.handlerService.handleError<GetAttributeDto>({
                e,
                message: 'Could Not Delete Attribute',
                where: 'Attribute Service -> deleteAttribute',
                log: {
                    path: 'attribute/error.log',
                    action: 'Delete Attribute',
                    name: 'Attribute Service'
                }
            });
        }
    }

    private paginateAttribute({ pagination }: { pagination: PaginationDto }): PaginationDto {
        if (pagination.limit === undefined || pagination.page === undefined) {
            return {
                limit: 0,
                page: 0
            };
        }

        if (!isNaN(Number(pagination.limit))) {
            pagination.limit = Number(pagination.limit);
        } else {
            return {
                limit: 0,
                page: 0
            };
        }

        if (!isNaN(Number(pagination.page))) {
            pagination.page = Number(pagination.page);
        } else {
            return {
                limit: 0,
                page: 0
            };
        }

        pagination.page = (pagination.page - 1) * pagination.limit;

        return pagination;
    }
}
