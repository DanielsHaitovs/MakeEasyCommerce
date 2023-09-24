import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    RelationId,
    Unique,
} from 'typeorm';
import { AttributeDescription } from './attribute-description.entity';
import { Option } from '../relations/option/entities/option.entity';
import { Rule } from '../relations/rule/entities/rule.entity';

@Entity('eav_attribute_index')
@Index('eav_index_attribute', [
    'id',
    'description.code',
    'description.isActive',
    'description.isRequired',
])
@Unique('eav_unique_attribute', ['description.name', 'description.code'])
export class Attributes {
    @PrimaryGeneratedColumn()
    id: number;

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
