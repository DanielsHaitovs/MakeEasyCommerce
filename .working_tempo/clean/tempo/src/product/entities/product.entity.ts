import { MecBaseEntity } from '@src/base/entity/base.entity';
import { IsEnum } from 'class-validator';
import { Column, Entity, Index, OneToMany, RelationId } from 'typeorm';
import { ConfigurableProduct } from './product-types/configurable-product.entity';
import { SimpleProduct } from './product-types/simple-product.entity';
import { PersonalizedProduct } from './product-types/personalized-product.entity';
import { GroupedProduct } from './product-types/grouped-product.entity';
import { VirtualProduct } from './product-types/virtual-product.entity';
import { ProductAttributes } from './attributes/attributes-product.entity';
import { ProductTypes } from '@src/base/enum/product/product-types.enum';

@Entity('product_index')
@Index('product_index_index', ['id', 'product_type'])
export class Product extends MecBaseEntity {
    @Column()
    @IsEnum(ProductTypes)
    product_type: ProductTypes;

    @OneToMany(() => SimpleProduct, (product) => product.relation, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    simple_product: SimpleProduct[];
    @RelationId((product: Product) => product.simple_product)
    simple_product_ids: number[];

    @OneToMany(() => ConfigurableProduct, (product) => product.relation, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    configurable_product: ConfigurableProduct[];
    @RelationId((product: Product) => product.configurable_product)
    configurable_product_ids: number[];

    @OneToMany(() => PersonalizedProduct, (product) => product.relation, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    personalized_product: PersonalizedProduct[];
    @RelationId((product: Product) => product.personalized_product)
    personalized_product_ids: number[];

    @OneToMany(() => GroupedProduct, (product) => product.relation, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    grouped_product: GroupedProduct[];
    @RelationId((product: Product) => product.grouped_product)
    grouped_product_ids: number[];

    @OneToMany(() => VirtualProduct, (product) => product.relation, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    virtual_product: VirtualProduct[];
    @RelationId((product: Product) => product.virtual_product)
    virtual_product_ids: number[];

    @OneToMany(() => ProductAttributes, (product) => product.relation, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    product_attributes: ProductAttributes[];
    @RelationId((product: Product) => product.product_attributes)
    attributes_ids: number[];
}
