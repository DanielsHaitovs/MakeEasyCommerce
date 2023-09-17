import { MecBaseEntity } from '@src/base/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';
import { RuleBaseEntity } from './rule-base.entity';

@Entity('eav_attribute_rule')
@Index('eav_attribute_rule_index', ['id'])
export class Rule extends MecBaseEntity {
    @Column(() => RuleBaseEntity)
    front: RuleBaseEntity;

    @Column(() => RuleBaseEntity)
    back: RuleBaseEntity;
}
