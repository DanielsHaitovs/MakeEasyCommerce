import { RuleBaseEntity } from '@src/base/entity/attribute/attributes/rule-base';
import { Entity, Index } from 'typeorm';

export const ruleIndexPrefix = 'ik_attribute_rule_index';
@Entity('eav_attribute_rule')
@Index(ruleIndexPrefix, ['id']) // ??
export class AttributeRule extends RuleBaseEntity {}
