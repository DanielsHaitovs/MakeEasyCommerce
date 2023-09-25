import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    RelationId,
    Unique,
} from 'typeorm';
import { AttributeDescription } from './attribute-description.entity';
import { Option } from '../relations/option/entities/option.entity';
import { Rule } from '../relations/rule/entities/rule.entity';
import { MecBaseEntity } from '@src/base/entity/base.entity';

@Entity('eav_attribute_index')
@Index('ik_attribute_index', [
    'id',
    'description.code',
    'description.isActive',
    'description.isRequired',
])
@Unique('uk_attribute_index', ['description.name', 'description.code'])
export class Attributes extends MecBaseEntity {
    @Column(() => AttributeDescription)
    description: AttributeDescription;

    @ManyToOne(() => Attributes, { onDelete: 'CASCADE' })
    parent: Attributes; // Optional parent attribute for handling arrays

    @OneToMany(() => Option, (options) => options.relatedAttribute, {
        cascade: false,
        eager: false,
    })
    options: Option[];
    @RelationId((attribute: Attributes) => attribute.options)
    optionsIds: number[];

    @OneToOne(() => Rule, (rule) => rule.id, {
        cascade: ['update', 'remove', 'insert'],
        nullable: true,
    })
    @JoinColumn({
        foreignKeyConstraintName: 'fk_attribute_index_rule',
    })
    rules: Rule;
}
