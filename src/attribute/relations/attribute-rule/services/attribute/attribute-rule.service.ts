// import { Injectable } from '@nestjs/common';
// import { InjectEntityManager } from '@nestjs/typeorm';
// import { EntityManager } from 'typeorm';
// import { OrderType } from '@src/base/enum/query/query.enum';
// import { RuleFindByType } from '@src/base/dto/mec/attribute/attributes/rule.dto';
// import { RuleHelperService } from '@src/base/services/attribute/attributes/rule-helper.service';
// import { RuleResponseI } from '../../interface/rule.interface';
// import { AttributeRule } from '../../entities/rule.entity';
// import { UpdateRuleDto } from '../../dto/update-rule.dto';
// import { CreateRuleDto } from '../../dto/create-rule.dto';

// @Injectable()
// export class AttributeRuleService {
//     constructor(
//         @InjectEntityManager()
//         private readonly entityManager: EntityManager,
//         private readonly ruleHelper: RuleHelperService,
//     ) {}

//     async createAttributeRule({
//         createRuleDto,
//     }: {
//         createRuleDto: CreateRuleDto;
//     }): Promise<RuleResponseI> {
//         try {
//             return {
//                 status: '200',
//                 message: 'Success',
//                 result: await this.entityManager.save(
//                     AttributeRule,
//                     this.ruleHelper.prepareRule({
//                         relatedAttribute:
//                         createRuleDto: createRuleDto,
//                     }),
//                 ),
//             };
//         } catch (e) {
//             return {
//                 status: '666',
//                 message: 'Ups, Error',
//                 error: {
//                     message: e.message,
//                     in: 'Rule Entity',
//                 },
//             };
//         }
//     }

//     async findOneByAttributeId({
//         relatedAttribute,
//     }: {
//         relatedAttribute: number;
//     }): Promise<RuleResponseI> {
//         return await this.ruleHelper.singleConditionRuleQuery({
//             filters: {
//                 page: 1,
//                 limit: 0,
//                 orderBy: 'relatedAttribute',
//                 orderDirection: OrderType.ASC,
//                 columnName: 'relatedAttribute',
//                 value: relatedAttribute,
//                 select: null,
//                 many: false,
//             },
//         });
//     }

//     async findAttributeRuleType({
//         relatedAttribute,
//         type,
//     }: {
//         relatedAttribute: number;
//         type: RuleFindByType;
//     }): Promise<RuleResponseI> {
//         return await this.ruleHelper.singleConditionRuleQuery({
//             filters: {
//                 page: 1,
//                 limit: 1,
//                 orderBy: null,
//                 orderDirection: OrderType.ASC,
//                 columnName: 'relatedAttribute',
//                 value: relatedAttribute,
//                 select: [type.ruleType],
//                 many: false,
//             },
//         });
//     }

//     async updateByAttributeId({
//         relatedAttribute,
//         rule,
//     }: {
//         relatedAttribute: number;
//         rule: UpdateRuleDto;
//     }): Promise<RuleResponseI> {
//         const ruleId: number = this.ruleHelper.toSingleRuleObject({
//             ruleResponse: await this.ruleHelper.singleConditionRuleQuery({
//                 filters: {
//                     page: 1,
//                     limit: 0,
//                     orderBy: 'relatedAttribute',
//                     orderDirection: OrderType.ASC,
//                     columnName: 'relatedAttribute',
//                     value: relatedAttribute,
//                     select: ['id'],
//                     many: false,
//                 },
//             }),
//         }).id;

//         return (await this.entityManager.update(AttributeRule, ruleId, rule))
//             .raw;
//     }

//     async removeByAttributeId({
//         relatedAttribute,
//     }: {
//         relatedAttribute: number;
//     }): Promise<RuleResponseI> {
//         const ruleId: number = this.ruleHelper.toSingleRuleObject({
//             ruleResponse: await this.ruleHelper.singleConditionRuleQuery({
//                 filters: {
//                     page: 1,
//                     limit: 0,
//                     orderBy: 'relatedAttribute',
//                     orderDirection: OrderType.ASC,
//                     columnName: 'relatedAttribute',
//                     value: relatedAttribute,
//                     select: ['id'],
//                     many: false,
//                 },
//             }),
//         }).id;

//         try {
//             if (
//                 (await this.entityManager.delete(AttributeRule, ruleId))
//                     .affected > 0
//             ) {
//                 return {
//                     status: '200',
//                     message: `Record with id ${ruleId} was removed`,
//                 };
//             }
//         } catch (e) {
//             return {
//                 status: '666',
//                 message: 'Something went wrong during remove of this entity',
//                 error: {
//                     message: e.message,
//                     in: 'Rule Entity',
//                 },
//             };
//         }
//     }
// }
