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
import { Product } from '../product.entity';
import { ProductAttributeDescription } from './description/description-attributes.entity';
import { MecBaseEntity } from '@src/base/entity/base.entity';
import { ProductOptionValues } from './options/option-values.entity';
import { ProductAttributeRule } from './rules/attribute-rule.entity';

@Entity('product_attributes_index')
@Unique('product_attribute_description_unique', [
    'id',
    'description.name',
    'description.code',
])
@Index('product_attribute_description_index', [
    'id',
    'description.name',
    'description.code',
])
export class ProductAttributes extends MecBaseEntity {
    @Column(() => ProductAttributeDescription)
    description: ProductAttributeDescription;

    @ManyToOne(() => ProductAttributes, { onDelete: 'CASCADE' })
    parent: ProductAttributes;

    @OneToMany(() => ProductOptionValues, (option) => option.attribute, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    options: ProductOptionValues[];
    @RelationId((attribute: ProductAttributes) => attribute.options)
    options_ids: number[];

    @OneToOne(() => ProductAttributeRule, (rule) => rule.attribute, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({
        name: 'rule_id',
    })
    rule: ProductAttributeRule;

    @ManyToOne(() => Product, (product) => product.product_attributes)
    relation: Product;
    @RelationId((attributes: ProductAttributes) => attributes.relation)
    products_ids: number[];
}
