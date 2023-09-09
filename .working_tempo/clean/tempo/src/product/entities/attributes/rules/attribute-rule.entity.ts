import { Column, Entity, Index, OneToOne } from 'typeorm';
import { MecBaseEntity } from '@src/base/entity/base.entity';
import { ProductAttributes } from '../attributes-product.entity';
import { Rule } from '@src/base/entity/attributes/rule.entity';

@Entity('product_attribute_rule')
@Index('product_attribute_rule_index', ['id'])
export class ProductAttributeRule extends MecBaseEntity {
    @Column(() => Rule)
    front: Rule;

    @Column(() => Rule)
    back: Rule;

    @OneToOne(() => ProductAttributes, (attribute) => attribute.rule)
    attribute: ProductAttributes;
}
