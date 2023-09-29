import { MecBaseEntity } from '@src/base/entity/base.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    RelationId,
} from 'typeorm';
import { AttributeDescription } from './attribute-description.entity';
import { Option } from '../relations/option/entities/option.entity';
import { Rule } from '../relations/rule/entities/rule.entity';
import { Attributes } from './attributes.entity';

@Entity()
export class AttributesBase extends MecBaseEntity {
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
