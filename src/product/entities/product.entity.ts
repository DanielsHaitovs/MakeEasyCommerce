import { Entity, JoinColumn, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { ProductBase } from './product-base.entity';
import { Attribute } from '@src/attribute/entities/attribute.entity';

@Entity('eav_product_index')
export class Product extends ProductBase {
    @ManyToOne(() => Product, { cascade: false })
    @JoinColumn({
        foreignKeyConstraintName: 'fk_attribute_index_parent'
    })
    parent: Product;

    @OneToMany(() => Attribute, (attribute) => attribute.product)
    attributes: Attribute[];
    @RelationId((product: Product) => product.attributes)
    attributeIds: number[];
}
