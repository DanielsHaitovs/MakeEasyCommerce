import {
    Column,
    Entity,
    Index,
    ManyToOne,
    OneToMany,
    RelationId,
} from 'typeorm';
import { BaseProduct } from '../inheritance/product-base.entity';
import { Product } from '../product.entity';
import { SimpleProductOptions } from '../inheritance/attribute/options/simple/simple-product-option.entity';
import { MecBaseEntity } from '@src/base/entity/base.entity';

@Entity('product_type_simple')
// @Unique('product_unique_simple', [])
@Index('product_index_simple', ['id', 'description.sku', 'description.name'])
export class SimpleProduct extends MecBaseEntity {
    @Column(() => BaseProduct)
    description: BaseProduct;

    @ManyToOne(() => Product, (product) => product.simple_product)
    relation: Product;

    @OneToMany(() => SimpleProductOptions, (option) => option.simpleProduct)
    options: SimpleProductOptions[];

    @RelationId((simpleProduct: SimpleProduct) => simpleProduct.options)
    options_ids: number[];
}
