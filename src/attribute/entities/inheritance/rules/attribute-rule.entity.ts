import { Column, Entity, Index, OneToOne } from 'typeorm';
import { Attribute } from '../../attribute.entity';
import { MecBaseEntity } from '@src/base/entity/base.entity';
import { Rule } from '@src/base/entity/attributes/rule.entity';

@Entity('attribute_rule')
@Index('attribute_rule_index', ['id'])
export class AttributeRule extends MecBaseEntity {
    @Column(() => Rule)
    front: Rule;

    @Column(() => Rule)
    back: Rule;

    @OneToOne(() => Attribute, (attribute) => attribute.rule)
    attribute: Attribute;
}
