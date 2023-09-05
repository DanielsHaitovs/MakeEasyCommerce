import { Entity, Index, ManyToOne, OneToMany, Unique } from 'typeorm';
import { BaseProduct } from '../inheritance/product-base.entity';
import { Product } from '../product.entity';
import { SimpleProductOptions } from '../inheritance/attribute/options/simple/simple-product-option.entity';

@Entity('product_type_simple')
@Index('product_index_simple', ['id', 'sku', 'name'])
@Unique('product_unique_simple', ['id', 'sku', 'name', 'updatedAt'])
export class SimpleProduct extends BaseProduct {
    @ManyToOne(() => Product, (product) => product.simple_product)
    relation: Product;

    @OneToMany(() => SimpleProductOptions, (option) => option.simpleProduct)
    options: SimpleProductOptions[];
}
