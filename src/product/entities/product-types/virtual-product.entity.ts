import { Entity, Index, ManyToOne } from 'typeorm';
import { Product } from '@src/product/entities/product.entity';
import { BaseProduct } from '../product-inheritance/product-base.entity';

@Entity('product_type_virtual')
@Index('product_index_virtual', ['id', 'sku', 'name'])
export class VirtualProduct extends BaseProduct {
    // @ManyToOne(() => Product, (product) => product.virtual_product)
    // relation: Product;
}
