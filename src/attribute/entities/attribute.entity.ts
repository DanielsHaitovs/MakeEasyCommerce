import { Entity, Index, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { AttributesBase } from './base/attribute-base.entity';

export const AttributeAlias = 'attribute';
export const AttributesIndex = 'ik_attribute_index';
export const AttributesUnique = 'uk_attribute_index';
export const AttributeRelationsAlias = ['options', 'rule'];

export const AttributesUniqueKeys: string[] = ['id', 'name', 'code'];
export const AttributesIndexKeys: string[] = [
    'id',
    'code',
    'isActive',
    'isRequired',
    'name',
    'parent',
];

@Entity('eav_attribute_index')
@Unique(AttributesUnique, AttributesUniqueKeys)
@Index(AttributesIndex, AttributesIndexKeys)
export class Attribute extends AttributesBase {
    @ManyToOne(() => Attribute, { onDelete: 'CASCADE' })
    @JoinColumn({
        foreignKeyConstraintName: 'fk_attribute_index_parent',
    })
    parent: Attribute;
}

// @OneToOne(() => Rule, (rule) => rule.id, {
//     cascade: true,
//     nullable: true,
// })
// @JoinColumn({
//     name: 'rule_id',
//     referencedColumnName: 'id',
//     foreignKeyConstraintName: 'fk_attribute_index_rule',
// })
// rule: Rule;

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
