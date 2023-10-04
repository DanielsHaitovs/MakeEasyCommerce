import { Entity, Index } from 'typeorm';
import { RuleBaseEntity } from './rule-base.entity';

export const ruleIndexPrefix = 'ik_attribute_rule_index';
@Entity('eav_attribute_rule')
@Index(ruleIndexPrefix, ['id']) // ??
export class Rule extends RuleBaseEntity {}
