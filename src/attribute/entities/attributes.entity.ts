import {
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    RelationId,
    Unique,
} from 'typeorm';
import { AttributesBase } from './attribute.base.entity';
import { Option } from '../relations/option/entities/option.entity';
import { Rule } from '../relations/rule/entities/rule.entity';
export const AttributesIndexPrefix = 'ik_attribute_index';
export const AttributesUniquePrefix = 'uk_attribute_index';
export const AttributesUniqueKeys: string[] = [
    'description.name',
    'description.code',
];
export const AttributesIndexKeys: string[] = [
    'id',
    'description.code',
    'description.isActive',
    'description.isRequired',
    'rule',
    'parent',
];

@Entity('eav_attribute_index')
@Unique(AttributesUniquePrefix, AttributesUniqueKeys)
@Index(AttributesIndexPrefix, AttributesIndexKeys)
export class Attributes extends AttributesBase {
    @ManyToOne(() => Attributes, { onDelete: 'CASCADE' })
    parent: Attributes;

    @OneToMany(() => Option, (options) => options.relatedAttribute, {
        cascade: false,
        eager: false,
    })
    options: Option[];
    @RelationId((attribute: Attributes) => attribute.options)
    optionsIds: number[];

    @ManyToOne(() => Rule, (rule) => rule.id, {
        cascade: ['update', 'remove', 'insert'],
        nullable: false,
    })
    @JoinColumn({
        foreignKeyConstraintName: 'fk_attribute_index_rule',
    })
    rule: Rule;
}
