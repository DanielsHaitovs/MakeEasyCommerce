import { AttributesBase } from '@src/mec/entity/attribute/attribute-base';
import { Rule } from '@src/rule/entities/rule.entity';
import {
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToOne,
    Unique,
} from 'typeorm';

export const AttributesIndexPrefix = 'ik_attribute_index';
export const AttributesUniquePrefix = 'uk_attribute_index';
export const AttributesUniqueKeys: string[] = ['id', 'name', 'code', 'rule'];
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
    @JoinColumn({
        foreignKeyConstraintName: 'fk_attribute_index_attribute',
    })
    parent: Attribute;

    @OneToOne(() => Rule, (rule) => rule.id, {
        cascade: true,
        nullable: true,
    })
    @JoinColumn({
        name: 'rule_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'fk_attribute_index_rule',
    })
    rule: Rule;
}
