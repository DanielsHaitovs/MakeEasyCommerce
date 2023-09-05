import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    RelationId,
} from 'typeorm';
import { MecBaseEntity } from '@src/base/entity/base.entity';
import { AttributeDescription } from '../inheritance/attribute/description/description.entity';
import { ProductAttributeOption } from '../inheritance/attribute/options/attribute-option.entity';
import { Product } from '../product.entity';
import { ProductAttributeRule } from '../inheritance/attribute/rule/attribute-rule.entity';

@Entity('product_attribute_index')
@Index('product_index_attribute', ['id', 'createdAt', 'updatedAt'])
export class ProductAttributes extends MecBaseEntity {
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
