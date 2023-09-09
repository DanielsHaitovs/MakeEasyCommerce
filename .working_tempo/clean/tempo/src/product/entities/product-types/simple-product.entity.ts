import { Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { BaseProduct } from './base-product.entity';
import { Product } from '@src/product/entities/product.entity';
import { SimpleProductAttributesValues } from '../attributes/values/attribute-values.entity';

@Entity('product_type_simple')
@Index('product_index_simple', ['id', 'sku', 'name'])
export class SimpleProduct extends BaseProduct {
    @ManyToOne(() => Product, (product) => product.simple_product)
    relation: Product;

    @OneToMany(
        () => SimpleProductAttributesValues,
        (product) => product.relation,
        {
            cascade: true,
            onDelete: 'CASCADE',
        },
    )
    attributes_values: SimpleProductAttributesValues[];
}
