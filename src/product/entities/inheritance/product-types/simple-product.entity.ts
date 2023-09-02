import { Entity, ManyToOne, Unique } from 'typeorm';
import { Product } from '../../product.entity';
import { BaseProduct } from './base-product.entity';

@Entity('product_type_simple')
@Unique(['sku'])
export class SimpleProduct extends BaseProduct {
    @ManyToOne(() => Product, (product) => product.simple_product)
    relation: Product;
}
