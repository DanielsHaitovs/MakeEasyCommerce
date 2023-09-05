import { Entity, Index, ManyToOne } from 'typeorm';
import { Product } from '@src/product/entities/product.entity';
import { BaseProduct } from '../product-inheritance/product-base.entity';

@Entity('product_type_personalized')
@Index('product_index_personalized', ['id', 'sku', 'name'])
export class PersonalizedProduct extends BaseProduct {
    // @ManyToOne(() => Product, (product) => product.simple_product)
    // relation: Product;
}
