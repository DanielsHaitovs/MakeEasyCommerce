import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { AttributesBase } from './base.entity';
import { AttributeRule } from '@src/rule/entities/rule.entity';

export const AttributesIndex = {
    isActive: 'ik_attribute_active',
    code: 'ik_attribute_code'
};

export const AttributesUnique = {
    name: 'uk_attribute_name',
    code: 'uk_attribute_code'
};

@Entity('eav_attribute_index')
export class Attribute extends AttributesBase {
    @ManyToOne(() => Attribute, { cascade: false })
    @JoinColumn({
        foreignKeyConstraintName: 'fk_attribute_index_parent'
    })
    parent: Attribute;

    @OneToOne(() => AttributeRule, {
        cascade: true,
        nullable: false
    })
    @JoinColumn()
    rule: AttributeRule;
}

// @OneToMany(() => Value, (values) => values.attributeId, {
//     cascade: false,
//     eager: false,
//     nullable: true,
// })
// @JoinColumn({
//     foreignKeyConstraintName: 'fk_attribute_index_values',
// })
// values: Value[];
// @RelationId((attribute: Attribute) => attribute.values)
// valuesIds: number[];
