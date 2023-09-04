import { Column, Entity, Index, OneToOne } from 'typeorm';
import { MecBaseEntity } from '@src/base/entity/base.entity';
import { ProductAttributes } from '../attributes-product.entity';
import { Rule } from '@src/base/entity/attributes/rule.entity';
import { RuleIndexArray } from '@src/base/enum/attributes/rule/indexing-rule';

@Entity('product_attribute_rule')
@Index('product_attribute_rule_index', RuleIndexArray)
export class ProductAttributeRule extends MecBaseEntity {
    @Column(() => Rule)
    front: Rule;

    @Column(() => Rule)
    back: Rule;

    @OneToOne(() => ProductAttributes, (attribute) => attribute.rule)
    attribute: ProductAttributes;
}
