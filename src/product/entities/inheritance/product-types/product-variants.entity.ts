import { Entity, ManyToOne, Unique } from 'typeorm';
import { Product } from '../../product.entity';
import { ConfigurableProduct } from './configurable-product.entity';
import { SimpleProduct } from './simple-product.entity';

@Entity('product_type_variants')
@Unique(['sku'])
export class ProductVariants extends SimpleProduct {
    @ManyToOne(() => ConfigurableProduct, (product) => product.product_variants)
    relation: Product;
}
