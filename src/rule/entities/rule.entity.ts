import { MecBaseEntity } from '@src/mec/entities/mec.entity';
import { BackRuleConfigEntity, FrontRuleConfigEntity } from '@src/rule/entities/base/rule-base';
import { Entity, Column } from 'typeorm';

export const RuleAlias = 'rule';
export const RuleIndex = 'ik_attribute_rule_index';

@Entity('eav_attribute_rule')
export class AttributeRule extends MecBaseEntity {
    @Column(() => FrontRuleConfigEntity)
    front: FrontRuleConfigEntity;
    @Column(() => BackRuleConfigEntity)
    back: BackRuleConfigEntity;
}
