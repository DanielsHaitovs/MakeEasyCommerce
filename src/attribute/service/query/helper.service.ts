import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';

import { HandlerService } from '@src/mec/service/handler/query.service';
import { CreateAttributeDto } from '@src/attribute/dto/create-attribute.dto';
import { AttributeResponseI } from '@src/attribute/interface/attribute.interface';
import { Attribute } from '@src/attribute/entities/attribute.entity';

@Injectable()
export class AttributeHelperService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly handlerService: HandlerService // private readonly queryService: RuleQueryService,
    ) {}

    /**
     * Prepares an attribute for saving.
     *
     * @param {Object} createAttribute - The attribute to be prepared.
     * @param {CreateAttributeDto} createAttribute.createAttribute - The attribute data transfer object.
     *
     * @returns {PrepareAttributeResponseI} The response object containing the status and the prepared attribute, or null if the attribute is undefined or empty.
     *
     * @throws Will throw an error if the attribute preparation fails.
     */
    prepareAttribute({ createAttribute }: { createAttribute: CreateAttributeDto }): AttributeResponseI<CreateAttributeDto> {
        try {
            // Create a new attribute instance with the provided data
            const attribute = this.entityManager.create(Attribute, createAttribute);
            // Check if the attribute is defined and not empty
            if (attribute != undefined && Object.keys(attribute).length > 0) {
                // Return the prepared attribute with a success status
                return {
                    status: '200',
                    result: attribute
                };
            }

            // If the attribute is undefined or empty, return null
            return null;
        } catch (error) {
            // If an error occurs, handle it and return the error response
            const e = error as Error;
            return this.handlerService.handleError({
                e,
                message: 'Could Not Prepare Attribute before save',
                where: 'Attribute Helper -> prepareAttribute',
                status: '666',
                log: {
                    path: 'attribute/error.log',
                    action: 'Prepare Attribute',
                    name: 'Attribute Helper'
                }
            });
        }
    }
}
