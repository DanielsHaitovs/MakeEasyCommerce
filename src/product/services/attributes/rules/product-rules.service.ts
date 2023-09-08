import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { PaginationDto } from '@src/base/dto/filters/pagination.dto';
import { CreateAttributeRulesDto } from '@src/product/dto/attributes/rules/create-rule.dto';
import { GetAttributeRulesDto } from '@src/product/dto/attributes/rules/get-rule.dto';
import { UpdateAttributeRulesDto } from '@src/product/dto/attributes/rules/update-rule.dto';
import { ProductAttributeRule } from '@src/product/entities/attributes/rule/attribute-rule.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class ProductRulesService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}

    async create({
        newRule,
    }: {
        newRule: CreateAttributeRulesDto;
    }): Promise<GetAttributeRulesDto> {
        return await this.entityManager.save(
            ProductAttributeRule,
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
                .getRepository(ProductAttributeRule)
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
            return await this.entityManager.findOne(ProductAttributeRule, {
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
        rules: UpdateAttributeRulesDto;
    }): Promise<GetAttributeRulesDto> {
        return (
            await this.entityManager.update(ProductAttributeRule, id, rules)
        ).raw;
    }

    async remove({ id }: { id: number }): Promise<number> {
        return (await this.entityManager.delete(ProductAttributeRule, id))
            .affected;
    }

    protected prepareNewRule(rule: CreateAttributeRulesDto) {
        return this.entityManager.create(ProductAttributeRule, rule);
    }
}
