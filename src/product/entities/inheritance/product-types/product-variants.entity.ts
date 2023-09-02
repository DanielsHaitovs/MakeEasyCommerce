import { Entity, ManyToOne, Unique } from 'typeorm';
import { Product } from '../../product.entity';
import { BaseProduct } from './base-product.entity';
import { ConfigurableProduct } from './configurable-product.entity';

@Entity('product_type_variants')
@Unique(['sku'])
export class ProductVariants extends BaseProduct {
    @ManyToOne(() => ConfigurableProduct, (product) => product.product_variants)
    relation: Product;
}
