import { Entity, Index, ManyToOne, Unique } from 'typeorm';
import { BaseProduct } from '../product-inheritance/product-base.entity';
import { Product } from '../product.entity';

@Entity('product_type_simple')
@Unique(['id'])
@Index('product_index_simple', ['id', 'updatedAt'])
export class SimpleProduct extends BaseProduct {
    // @ManyToOne(() => Product, (product) => product.simple_product)
    // relation: Product;
}
