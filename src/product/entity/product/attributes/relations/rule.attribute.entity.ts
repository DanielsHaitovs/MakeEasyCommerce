import { Column, Entity, Index, OneToOne } from 'typeorm';
import { MecBaseEntity } from '@src/base/entity/base.entity';
import { Rule } from '@src/product/entity/base/attribute/rule.entity';
import { ProductAttributes } from '../attribute.product.entity';

@Entity('product_attribute_rule')
@Index('product_attribute_rule_index', ['id'])
export class AttributeRule extends MecBaseEntity {
    @Column(() => Rule)
    front: Rule;

    @Column(() => Rule)
    back: Rule;

    @OneToOne(() => ProductAttributes, (attribute) => attribute.rules)
    relatedAttribute: ProductAttributes;
}
