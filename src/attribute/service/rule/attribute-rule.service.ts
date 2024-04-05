import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { HandlerService } from '@src/mec/service/handler/query.service';
import { RuleHelperService } from '@src/rule/service/query/helper.service';
import { CreateAttributeRuleDto } from '@src/attribute/dto/create-attribute.dto';
import { AttributeResponseDto, GetAttributeDto } from '@src/attribute/dto/get-attribute.dto';
import { Attribute } from '@src/attribute/entities/attribute.entity';

@Injectable()
export class AttributeRuleService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly handlerService: HandlerService,
        private readonly ruleHelper: RuleHelperService
    ) {}

    /**
     * This method is used to create an attribute rule.
     * @param {CreateAttributeRuleDto} createAttributeRule - The data transfer object containing the details of the attribute rule to be created.
     * @returns {Promise<AttributeResponseDto>} - A promise that resolves to an AttributeResponseDto.
     */
    async createAttributeRule({
        createAttributeRule
    }: {
        createAttributeRule: CreateAttributeRuleDto;
    }): Promise<AttributeResponseDto> {
        try {
            // Prepare the rule using the helper function
            const attributeRule = this.ruleHelper.prepareRule({ createRule: createAttributeRule.rule });

            // If the attribute rule is not null, save the attribute with the new rule
            if (!attributeRule != null) {
                return {
                    status: '200',
                    result: await this.entityManager.save(Attribute, {
                        id: createAttributeRule.id,
                        rule: attributeRule
                    })
                };
            }

            // If the attribute rule is null, return null
            return null;
        } catch (error) {
            // If an error occurs, handle it and return the error response
            const e = error as Error;
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
}
