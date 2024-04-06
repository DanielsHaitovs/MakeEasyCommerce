import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { HandlerService } from '@src/mec/service/handler/query.service';
import { RuleHelperService } from '@src/rule/service/query/helper.service';
import { AttributeResponseDto, GetAttributeDto } from '@src/attribute/dto/get-attribute.dto';
import { Attribute } from '@src/attribute/entities/attribute.entity';
import { UpdateAttributeRuleDto } from '@src/attribute/dto/update-attribute.dto';
import { RuleProperties } from '@src/rule/enum/rule.enum';
import { GetRuleDto } from '@src/rule/dto/get-rule.dto';

@Injectable()
export class AttributeRuleService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly handlerService: HandlerService,
        private readonly ruleHelper: RuleHelperService
    ) {}

    /**
     * Finds an attribute by its ID.
     *
     * @param {Object} params - The parameters for finding an attribute.
     * @param {number} params.id - The id of the attribute to find.
     *
     * @returns {Promise<AttributeResponseDto>} A Promise that resolves to an object containing the status of the operation and the found attribute.
     * If the attribute cannot be found, an error message is returned with status '666'.
     *
     * @throws {Error} If there's an error during the operation, it will be caught and handled by the `handlerService`.
     */
    async findByAttributeId({ id }: { id: number }): Promise<AttributeResponseDto> {
        try {
            // Create a query to find the attribute by its ID and join with its rules
            const attributeRuleQuery = this.entityManager
                .createQueryBuilder(Attribute, 'attribute')
                .where('attribute.id = :id', { id })
                .leftJoinAndSelect('attribute.rule', 'rule');

            // Define the properties to select
            const propToSelect = Object.values(RuleProperties) as string[];
            propToSelect.unshift('attribute.id');

            return {
                status: '200',
                result: await attributeRuleQuery.select(propToSelect).getOneOrFail()
            };
        } catch (error) {
            // Handle any errors that occur during the operation
            const e = error as Error;
            return this.handlerService.handleError<GetAttributeDto>({
                e,
                message: 'Could not find Attribute Rule',
                where: 'Attribute Rule Service this.findByAttributeId'
            });
        }
    }

    /**
     * Updates an attribute rule by its rule ID or attribute ID.
     *
     * @param {Object} params - The parameters for updating an attribute rule.
     * @param {UpdateAttributeRuleDto} params.rule - The new rule data.
     * @param {number} [params.ruleId] - The id of the rule to update.
     * @param {number} [params.attributeId] - The id of the attribute whose rule to update.
     *
     * @returns {Promise<AttributeResponseDto | null>} A Promise that resolves to an object containing the status of the operation and the updated attribute rule.
     * If the attribute rule cannot be updated, an error message is returned with status '666'.
     * If both ruleId and attributeId are undefined, null is returned.
     *
     * @throws {Error} If there's an error during the operation, it will be caught and handled by the `handlerService`.
     */
    async updateAttributeRule({
        rule,
        ruleId,
        attributeId
    }: {
        rule: UpdateAttributeRuleDto;
        ruleId?: number;
        attributeId?: number;
    }): Promise<AttributeResponseDto> {
        // If both ruleId and attributeId are undefined, return null
        if (ruleId == undefined && attributeId == undefined) {
            return null;
        }

        try {
            // If ruleId is defined, update the rule by its ID
            if (ruleId != undefined) {
                const updated = await this.ruleHelper.update({ id: ruleId, rule });

                if (updated.status != '200') {
                    return {
                        status: updated.status,
                        message: updated.message,
                        error: {
                            message: updated.error.message,
                            in: updated.error.in
                        }
                    };
                } else {
                    return {
                        status: '200',
                        result: {
                            id: attributeId,
                            isActive: null,
                            isRequired: null,
                            name: null,
                            code: null,
                            isArray: null,
                            description: null,
                            dataType: null,
                            rule: updated.result as GetRuleDto
                        }
                    };
                }
            }

            // If attributeId is defined, find the attribute by its ID and update its rule
            if (attributeId != undefined) {
                const attributeRule = await this.findByAttributeId({ id: attributeId });

                if (attributeRule.status === '200' && attributeRule.result != undefined) {
                    const result = attributeRule.result as GetAttributeDto;
                    const updated = await this.ruleHelper.update({ id: result.rule.id, rule });

                    if (updated.status != '200') {
                        return {
                            status: updated.status,
                            message: updated.message,
                            error: {
                                message: updated.error.message,
                                in: updated.error.in
                            }
                        };
                    } else {
                        return {
                            status: '200',
                            result: {
                                id: result.id,
                                isActive: result.isActive,
                                isRequired: result.isRequired,
                                name: result.name,
                                code: result.code,
                                isArray: result.isArray,
                                description: result.description,
                                dataType: result.dataType,
                                rule: updated.result as GetRuleDto
                            }
                        };
                    }
                } else {
                    throw new Error(attributeRule.error.message);
                }
            }
        } catch (error) {
            // Handle any errors that occur during the operation
            const e = error as Error;
            return this.handlerService.handleError<GetAttributeDto>({
                e,
                message: 'Could not update Attribute Rule',
                where: 'Attribute Rule Service this.ruleHelper.update',
                log: {
                    path: 'attribute/error.log',
                    action: 'update',
                    name: 'Attribute Rule Update'
                }
            });
        }
    }
}
