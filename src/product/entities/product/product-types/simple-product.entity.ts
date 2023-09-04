import { Entity, Index, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { BaseProduct } from '../base-product.entity';
import { Product } from '@src/product/entities/product.entity';
import { SimpleProductOptionValues } from '@src/product/entities/attributes/options/simple-product.entity';

@Entity('product_type_simple')
@Index('product_index_simple', ['id', 'sku', 'name'])
export class SimpleProduct extends BaseProduct {
    @ManyToOne(() => Product, (product) => product.simple_product)
    relation: Product;

    @OneToMany(() => SimpleProductOptionValues, (option) => option.attribute, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    options: SimpleProductOptionValues[];
    @RelationId((attribute: SimpleProduct) => attribute.options)
    options_ids: number[];
    // here will be attribute value
}
