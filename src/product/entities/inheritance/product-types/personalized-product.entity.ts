import { Entity, ManyToOne } from 'typeorm';
import { BaseProduct } from './base-product.entity';
import { Product } from '../../product.entity';

@Entity('product_type_personalized')
export class PersonalizedProduct extends BaseProduct {
    @ManyToOne(() => Product, (product) => product.simple_product)
    relation: Product;
}
