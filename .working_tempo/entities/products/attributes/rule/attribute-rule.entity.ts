import { Column, Entity, Index, OneToOne } from 'typeorm';
import { Rule } from './rule.entity';
import { MecBaseEntity } from '@src/base/entity/base.entity';
import { ProductAttributes } from '@src/product/entities/products/attributes/product-attribute.entity';

@Entity('product_attribute_rule')
@Index('product_index_attribute_rule', ['id'])
export class ProductAttributeRule extends MecBaseEntity {
    @Column(() => Rule)
    front: Rule;

    @Column(() => Rule)
    back: Rule;

    @OneToOne(() => ProductAttributes, (attribute) => attribute.rule)
    attribute: ProductAttributes;
}
