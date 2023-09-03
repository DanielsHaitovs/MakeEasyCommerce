import { Entity, Index, ManyToOne } from 'typeorm';
import { Product } from '../../product.entity';
import { BaseProduct } from './base-product.entity';

@Entity('product_type_virtual')
@Index('product_index_virtual', ['id', 'sku', 'name'])
export class VirtualProduct extends BaseProduct {
    @ManyToOne(() => Product, (product) => product.virtual_product)
    relation: Product;
}
