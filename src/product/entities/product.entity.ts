import { MecBaseEntity } from '@src/base/entity/base.entity';
import { IsEnum } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { ProductTypes } from './enum/product-types.enum';
import { SimpleProduct } from './inheritance/product-types/simple-product.entity';
import { ConfigurableProduct } from './inheritance/product-types/configurable-product.entity';
import { PersonalizedProduct } from './inheritance/product-types/personalized-product.entity';
import { GroupedProduct } from './inheritance/product-types/grouped-product.entity';

@Entity('product_index')
export class Product extends MecBaseEntity {
    @Column()
    @IsEnum(ProductTypes)
    product_type: ProductTypes;

    @OneToMany(() => ConfigurableProduct, (product) => product.relation, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    configurable_product: ConfigurableProduct[];

    @OneToMany(() => SimpleProduct, (product) => product.relation, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    simple_product: SimpleProduct[];

    @OneToMany(() => PersonalizedProduct, (product) => product.relation, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    personalized_product: PersonalizedProduct[];

    @OneToMany(() => GroupedProduct, (product) => product.relation, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    grouped_product: GroupedProduct[];
}
