import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';

import { HandlerService } from '@src/mec/service/handler/query.service';
import { CreateAttributeDto } from '@src/attribute/dto/create-attribute.dto';
import { Attribute } from '@src/attribute/entities/attribute.entity';
import { AttributeRuleService } from '../relations/rule/attribute-rule.service';
import { UpdateAttributeRuleDto } from '@src/attribute/dto/update-attribute.dto';
import { AttributeResponseDto } from '@src/attribute/dto/get-attribute.dto';

@Injectable()
export class AttributeHelperService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly handlerService: HandlerService,
        private readonly attributeRuleService: AttributeRuleService
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
    prepareAttribute({ createAttribute }: { createAttribute: CreateAttributeDto }): CreateAttributeDto {
        try {
            delete createAttribute.stringOptions;
            delete createAttribute.numberOptions;

            // Create a new attribute instance with the provided data
            const attribute = this.entityManager.create(Attribute);

            const merged = this.entityManager.merge(Attribute, attribute, createAttribute);
            // Check if the attribute is defined and not empty
            if (merged != undefined && Object.keys(merged).length > 0) {
                // Return the prepared attribute with a success status
                return merged;
            }

            // If the attribute is undefined or empty, return null
            return null;
        } catch (error) {
            // If an error occurs, handle it and return the error response
            const e = error as Error;
            this.handlerService.handleError({
                e,
                message: 'Could Not Prepare Attribute before save',
                where: 'Attribute Helper -> prepareAttribute',
                log: {
                    path: 'attribute/error.log',
                    action: 'Prepare Attribute',
                    name: 'Attribute Helper'
                }
            });

            return null;
        }
    }

    async updateRule({
        rule,
        ruleId,
        attributeId
    }: {
        rule: UpdateAttributeRuleDto;
        ruleId?: number;
        attributeId?: number;
    }): Promise<AttributeResponseDto> {
        return await this.attributeRuleService.updateAttributeRule({ rule, ruleId, attributeId });
    }

    // private async handleCreateAttributePromise({
    //     stringOptions,
    //     numberOptions
    // }: {
    //     stringOptions: SelectQueryBuilder<AttributeOptionString>;
    //     numberOptions: SelectQueryBuilder<AttributeOptionNumber>;
    // }): Promise<OptionResponseDto> {
    //     try {
    //         // If both stringOptions and numberOptions are provided, retrieve both types of options
    //         if (stringOptions && numberOptions) {
    //             // Order is important here, as the results are returned in the same order as the queries
    //             const [stringOptionsResult, numberOptionsResult] = (await Promise.all([
    //                 stringOptions.getMany(),
    //                 numberOptions.getMany()
    //             ])) as [GetStringOptionDto[], GetNumberOptionDto[]];

    //             return {
    //                 status: '200',
    //                 result: [
    //                     {
    //                         stringOptions: stringOptionsResult,
    //                         numberOptions: numberOptionsResult
    //                     }
    //                 ]
    //             };
    //         }

    //         // If only stringOptions is provided, retrieve only the string options
    //         if (stringOptions) {
    //             return {
    //                 status: '200',
    //                 result: [
    //                     {
    //                         stringOptions: await stringOptions.getMany(),
    //                         numberOptions: undefined
    //                     }
    //                 ]
    //             };
    //         }

    //         // If only numberOptions is provided, retrieve only the number options
    //         if (numberOptions) {
    //             return {
    //                 status: '200',
    //                 result: [
    //                     {
    //                         stringOptions: undefined,
    //                         numberOptions: await numberOptions.getMany()
    //                     }
    //                 ]
    //             };
    //         }
    //     } catch (error) {
    //         const e = error as Error;

    //         // If an error occurs, handle it using the handlerService
    //         return this.handlerService.handleError<GetOptionDto>({
    //             e,
    //             message: 'Could Not Handle Attributes Options',
    //             where: 'Attribute Option Service -> handleOptionsAwait',
    //             log: {
    //                 path: 'attribute/options/error.log',
    //                 action: 'Handle Attributes Options',
    //                 name: 'Attribute Option Service'
    //             }
    //         });
    //     }
    // }
}
