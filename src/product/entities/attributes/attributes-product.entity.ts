import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    RelationId,
} from 'typeorm';
import { Product } from '../product.entity';
import { ProductAttributeDescription } from './description/description-attributes.entity';
import { MecBaseEntity } from '@src/base/entity/base.entity';
import { ProductOptionValues } from './options/option-values.entity';
import { ProductAttributeRule } from './rules/attribute-rule.entity';

@Entity('product_attributes_index')
export class ProductAttributes extends MecBaseEntity {
    @Column(() => ProductAttributeDescription)
    description: ProductAttributeDescription;

    @ManyToOne(() => ProductAttributes, { onDelete: 'CASCADE' })
    parent: ProductAttributes; // Optional parent attribute for handling arrays

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
}
