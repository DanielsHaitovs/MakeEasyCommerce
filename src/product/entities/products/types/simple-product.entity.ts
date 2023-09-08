import {
    Column,
    Entity,
    Index,
    ManyToOne,
    OneToMany,
    RelationId,
} from 'typeorm';
import { Product } from '../../product.entity';
import { MecBaseEntity } from '@src/base/entity/base.entity';
import { BaseProduct } from '../product-base.entity';
import { SimpleProductOptions } from '../../attributes/options/simple/simple-product-option.entity';

@Entity('product_type_simple')
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
