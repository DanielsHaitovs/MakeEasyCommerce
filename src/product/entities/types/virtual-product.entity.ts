import { Entity, Index, Unique } from 'typeorm';
import { BaseProduct } from '../inheritance/product-base.entity';

@Entity('product_type_virtual')
@Index('product_index_virtual', ['id', 'sku', 'name'])
@Unique('product_unique_virtual', ['id', 'sku', 'name', 'updatedAt'])
export class VirtualProduct extends BaseProduct {
    // @ManyToOne(() => Product, (product) => product.virtual_product)
    // relation: Product;
}
