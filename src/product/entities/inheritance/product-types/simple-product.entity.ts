import { Entity, Index, ManyToOne } from 'typeorm';
import { Product } from '../../product.entity';
import { BaseProduct } from './base-product.entity';

@Entity('product_type_simple')
@Index('product_index_simple', ['id', 'sku', 'name'])
export class SimpleProduct extends BaseProduct {
    @ManyToOne(() => Product, (product) => product.simple_product)
    relation: Product;
}
