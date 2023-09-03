import { Entity, Index, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { BaseProduct } from './base-product.entity';
import { ProductVariants } from './product-variants.entity';
import { Product } from '@src/product/entities/product.entity';

@Entity('product_type_configurable')
@Index('product_index_configurable', ['id', 'sku', 'name'])
export class ConfigurableProduct extends BaseProduct {
    @OneToMany(() => ProductVariants, (product) => product.relation, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    product_variants: ProductVariants[];

    @RelationId((variants: ConfigurableProduct) => variants.product_variants)
    variants_ids: number[];

    @ManyToOne(() => Product, (product) => product.simple_product)
    relation: Product;
}
