import { Entity, Index, OneToMany, RelationId } from 'typeorm';
import { ProductVariants } from './product-variants.entity';
import { BaseProduct } from '../product-inheritance/product-base.entity';

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
}
