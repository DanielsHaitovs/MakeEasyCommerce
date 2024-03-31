import { Entity, Index, JoinColumn, ManyToOne, OneToOne, Unique } from 'typeorm';
import { AttributesBase } from './base.entity';
import { AttributeRule } from '@src/rule/entities/rule.entity';

export const AttributeAlias = 'attribute';
export const AttributeRelationsAlias = ['options', 'rule'];
export const AttributesIndex = 'ik_attribute_index';
export const AttributesUnique = 'uk_attribute_index';

@Entity('eav_attribute_index')
@Index('ik_attribute_index', ['id', 'code', 'isActive', 'isRequired'])
@Unique('uk_attribute_index', ['code', 'name'])
export class Attribute extends AttributesBase {
    @ManyToOne(() => Attribute, { cascade: false })
    @JoinColumn({
        foreignKeyConstraintName: 'fk_attribute_index_parent'
    })
    parent: Attribute;

    @OneToOne(() => AttributeRule, (rule) => rule.id, {
        cascade: true,
        nullable: false
    })
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
