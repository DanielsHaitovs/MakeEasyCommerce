import { Entity, Index, ManyToOne, Unique } from 'typeorm';
import { ConfigurableProduct } from './configurable-product.entity';
import { BaseProduct } from '../inheritance/product-base.entity';

@Entity('product_type_variants')
@Index('product_index_variants', ['id', 'sku', 'name'])
@Unique('product_unique_variants', ['id', 'sku', 'name', 'updatedAt'])
export class ProductVariants extends BaseProduct {
    @ManyToOne(() => ConfigurableProduct, (product) => product.product_variants)
    relation: ConfigurableProduct;
}
