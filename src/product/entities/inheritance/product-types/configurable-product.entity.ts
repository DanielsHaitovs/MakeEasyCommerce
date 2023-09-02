import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseProduct } from './base-product.entity';
import { Product } from '../../product.entity';
import { ProductVariants } from './product-variants.entity';

@Entity('product_type_configurable')
export class ConfigurableProduct extends BaseProduct {
    @OneToMany(() => ProductVariants, (product) => product.relation, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    product_variants: ProductVariants[];

    @ManyToOne(() => Product, (product) => product.simple_product)
    relation: Product;
}
