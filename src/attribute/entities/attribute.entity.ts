import { AttributesBase } from '@src/base/entity/attribute/attribute-base';
import { Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, RelationId, Unique } from 'typeorm';
import { AttributeRule } from '../relations/attribute-rule/entities/rule.entity';
import { AttributeOption } from '../relations/attribute-option/entities/option.entity';
export const AttributesIndexPrefix = 'ik_attribute_index';
export const AttributesUniquePrefix = 'uk_attribute_index';
export const AttributesUniqueKeys: string[] = ['name', 'code'];
export const AttributesIndexKeys: string[] = [
    'id',
    'code',
    'isActive',
    'isRequired',
    'name',
    'parent',
    'rule',
];

@Entity('eav_attribute_index')
@Unique(AttributesUniquePrefix, AttributesUniqueKeys)
@Index(AttributesIndexPrefix, AttributesIndexKeys)
export class Attribute extends AttributesBase {
    @ManyToOne(() => Attribute, { onDelete: 'CASCADE' })
    parent: Attribute;

    @OneToOne(() => AttributeRule, (rule) => rule.id, {
        cascade: true,
        nullable: true,
    })
    @JoinColumn({
        foreignKeyConstraintName: 'fk_attribute_index_rule',
    })
    rule: AttributeRule;

    @OneToMany(() => AttributeOption, (options) => options.relatedAttribute, {
        cascade: false,
        eager: false,
        nullable: true,
    })
    @JoinColumn({
        foreignKeyConstraintName: 'fk_attribute_index_options',
    })
    options: AttributeOption[];
    @RelationId((attribute: Attribute) => attribute.options)
    optionsIds: number[];
}
