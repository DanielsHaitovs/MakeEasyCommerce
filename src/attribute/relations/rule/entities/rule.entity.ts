import { Entity, Index } from 'typeorm';
import { RuleBaseEntity } from './rule-base.entity';

export const RulesIndexPrefix = 'ik_attribute_rule_index';
@Entity('eav_attribute_rule')
@Index(RulesIndexPrefix, ['id']) // ??
export class Rule extends RuleBaseEntity {}
