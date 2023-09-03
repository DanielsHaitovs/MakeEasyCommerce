import { Entity, Index, ManyToOne } from 'typeorm';
import { ConfigurableProduct } from './configurable-product.entity';
import { BaseProduct } from './base-product.entity';

@Entity('product_type_variants')
@Index('product_index_variants', ['id', 'sku', 'name'])
export class ProductVariants extends BaseProduct {
    @ManyToOne(() => ConfigurableProduct, (product) => product.product_variants)
    relation: ConfigurableProduct;
}
