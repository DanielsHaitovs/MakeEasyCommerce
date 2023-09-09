import { Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { MecBaseEntity } from '@src/base/entity/base.entity';
import { Product } from '../product.entity';
import { SingleAttributeOption } from '../attributes/relations/options/single-option.attribute.entity';
import { ProductAttributes } from '../attributes/attribute.product.entity';

@Entity('product_type_simple')
export class SimpleProduct extends MecBaseEntity {
    @ManyToOne(() => Product, (product) => product.simpleProducts)
    relation: Product;

    @OneToMany(() => SingleAttributeOption, (option) => option, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    options: SingleAttributeOption[];
    @RelationId((simpleProduct: SimpleProduct) => simpleProduct.options)
    options_ids: number[];

    @OneToMany(() => ProductAttributes, (attributes) => attributes, {
        cascade: false,
    })
    productAttributes: ProductAttributes[];
    @RelationId((simpleProduct: SimpleProduct) => simpleProduct.options)
    productAttributesIds: number[];
}
