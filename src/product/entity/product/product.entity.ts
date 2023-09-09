import { Entity, Index, OneToMany, RelationId, Unique } from 'typeorm';
import { MecProductBase } from '../base/product/product.base.entity';
import { ProductAttributes } from './attributes/attribute.product.entity';
import { SimpleProduct } from './types/simple.product.entity';

@Entity('product_index')
@Index('product_index_index', ['id', 'createdAt', 'updatedAt'])
@Unique('product_unique_index', ['id', 'name', 'sku'])
export class Product extends MecProductBase {
    @OneToMany(() => ProductAttributes, (attributes) => attributes, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    productAttributes: ProductAttributes[];
    @RelationId((product: Product) => product.productAttributes)
    attributesIds: number[];

    @OneToMany(() => SimpleProduct, (product) => product.relation, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    simpleProducts: SimpleProduct[];
    @RelationId((product: Product) => product.simpleProducts)
    simpleProductsIds: number[];
}
