import { Entity, Index, ManyToOne } from 'typeorm';
import { BaseProduct } from './base-product.entity';
import { Product } from '@src/product/entities/product.entity';

@Entity('product_type_simple')
@Index('product_index_simple', ['id', 'sku', 'name'])
export class SimpleProduct extends BaseProduct {
    @ManyToOne(() => Product, (product) => product.simple_product)
    relation: Product;
}
