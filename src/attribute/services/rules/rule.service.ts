import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { AttributeRuleDto } from '@src/attribute/dto/create-attribute.dto';
import { GetAttributeRuleDto } from '@src/attribute/dto/get-attribute.dto';
import { AttributeRule } from '@src/attribute/entities/inheritance/rules/attribute-rule.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class RuleService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}

    prepareNewRule(rule: AttributeRuleDto) {
        return this.entityManager.create(AttributeRule, rule);
    }

    async createRule({
        newRule,
    }: {
        newRule: AttributeRuleDto;
    }): Promise<GetAttributeRuleDto> {
        return await this.entityManager.save(
            AttributeRule,
            this.prepareNewRule(newRule),
        );
    }
}
