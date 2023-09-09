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
import { AttributeDescription } from '../../base/attribute/description.attribute.entity';
import { AttributeRule } from './relations/rule.attribute.entity';
import { AttributeOption } from './relations/options/option.attribute.entity';

@Entity('product_attribute_index')
@Index('product_index_attribute', [
    'id',
    'description.name',
    'description.code',
    'description.isActive',
    'description.isRequired',
])
@Unique('product_unique_attribute', [
    'id',
    'description.name',
    'description.code',
])
export class ProductAttributes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column(() => AttributeDescription)
    description: AttributeDescription;

    @ManyToOne(() => ProductAttributes, { onDelete: 'CASCADE' })
    parent: ProductAttributes; // Optional parent attribute for handling arrays

    @OneToMany(() => AttributeOption, (options) => options, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    options: AttributeOption[];
    @RelationId((attribute: ProductAttributes) => attribute.options)
    options_ids: number[];

    @OneToOne(() => AttributeRule, (rule) => rule.relatedAttribute, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({
        name: 'rule_id',
        foreignKeyConstraintName: 'fk_product_attribute_index_rule',
    })
    rules: AttributeRule;
}
