import { MecBaseEntity } from '@src/base/entity/base.entity';
import { Entity, Index, OneToMany, OneToOne, RelationId } from 'typeorm';

@Entity('product_index')
@Index('product_index_index', ['id', 'createdAt', 'updatedAt'])
export class Product extends MecBaseEntity {
    // @OneToOne(() => SimpleProduct, (product) => product.relation)
    // simple_product: SimpleProduct;
    // @RelationId((product: Product) => product.simple_product)
    // simple_product_id: number[];

    // @OneToMany(() => ProductAttributes, (attribute) => attribute.product)
    // attributes: ProductAttributes[];
    // @RelationId((product: Product) => product.attributes)
    // attributes_ids: number[];
}
