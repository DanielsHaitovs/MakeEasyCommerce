import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { AttributeRule } from '@src/attribute/entities/inheritance/rules/attribute-rule.entity';
import { AttributeRulesDto } from '@src/base/dto/attributes/create-attribute.dto';
import { GetAttributeRulesDto } from '@src/base/dto/attributes/get-attribute.dto';
import { UpdateRulesDto } from '@src/base/dto/attributes/update-attribute.dto';
import { PaginationDto } from '@src/base/dto/query-filters/query.dto';
import { EntityManager } from 'typeorm';

@Injectable()
export class RulesService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}

    async create({
        newRule,
    }: {
        newRule: AttributeRulesDto;
    }): Promise<GetAttributeRulesDto> {
        return await this.entityManager.save(
            AttributeRule,
            this.prepareNewRule(newRule),
        );
    }

    async findAll({
        condition,
    }: {
        condition: PaginationDto;
    }): Promise<GetAttributeRulesDto[]> {
        try {
            const skip = (condition.page - 1) * condition.limit;
            return await this.entityManager
                .getRepository(AttributeRule)
                .createQueryBuilder('rules')
                .skip(skip)
                .take(condition.limit)
                .getMany();
        } catch (e) {
            return e.message;
        }
    }

    async findOneById({ id }: { id: number }): Promise<GetAttributeRulesDto> {
        try {
            return await this.entityManager.findOne(AttributeRule, {
                where: {
                    id: id,
                },
            });
        } catch (e) {
            return e.message;
        }
    }

    async update({
        id,
        rules,
    }: {
        id: number;
        rules: UpdateRulesDto;
    }): Promise<GetAttributeRulesDto> {
        return (await this.entityManager.update(AttributeRule, id, rules)).raw;
    }

    async remove({ id }: { id: number }): Promise<number> {
        return (await this.entityManager.delete(AttributeRule, id)).affected;
    }

    protected prepareNewRule(rule: AttributeRulesDto) {
        return this.entityManager.create(AttributeRule, rule);
    }
}
