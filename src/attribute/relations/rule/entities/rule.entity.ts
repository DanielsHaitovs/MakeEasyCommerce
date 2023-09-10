import { MecBaseEntity } from '@src/base/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';
import { RuleBaseEntity } from './rule-base.entity';

@Entity('product_attribute_rule')
@Index('product_attribute_rule_index', ['id'])
export class Rule extends MecBaseEntity {
    @Column(() => RuleBaseEntity)
    front: RuleBaseEntity;

    @Column(() => RuleBaseEntity)
    back: RuleBaseEntity;
}
