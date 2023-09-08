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
} from 'typeorm';
import { Product } from '../product.entity';
import { ProductAttributeRule } from './rule/attribute-rule.entity';
import { ProductAttributeOption } from './options/attribute-option.entity';
import { SimpleProductOptions } from './options/simple/simple-product-option.entity';
import { AttributeDescription } from './attribute-description.entity';

@Entity('product_attribute_index')
@Index('product_index_attribute', ['id'])
export class ProductAttributes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column(() => AttributeDescription)
    description: AttributeDescription;

    @ManyToOne(() => ProductAttributes, { onDelete: 'CASCADE' })
    parent: ProductAttributes; // Optional parent attribute for handling arrays

    @OneToMany(() => ProductAttributeOption, (option) => option.attribute, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    options: ProductAttributeOption[];
    @RelationId((attribute: ProductAttributes) => attribute.options)
    options_ids: number[];

    @OneToMany(() => SimpleProductOptions, (option) => option.simpleProduct)
    simpleProductAttribute: SimpleProductOptions[];

    @OneToOne(() => ProductAttributeRule, (rule) => rule.attribute, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({
        name: 'rule_id',
        foreignKeyConstraintName: 'fk_product_attribute_index_rule',
    })
    rule: ProductAttributeRule;

    @ManyToOne(() => Product, (product) => product.attributes)
    product: Product;
}
