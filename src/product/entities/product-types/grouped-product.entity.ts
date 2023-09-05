import {
    Column,
    Entity,
    Index,
    ManyToOne,
    OneToMany,
    RelationId,
} from 'typeorm';
import { SimpleProduct } from './simple-product.entity';
import { ConfigurableProduct } from './configurable-product.entity';
import { PersonalizedProduct } from './personalized-product.entity';
import { IsEnum } from 'class-validator';
import { GroupTypes } from '@src/base/enum/product/group-types.enum';
import { Product } from '@src/product/entities/product.entity';
import { BaseProduct } from '../product-inheritance/product-base.entity';

@Entity('product_type_grouped')
@Index('product_index_grouped', ['id', 'sku', 'name'])
export class GroupedProduct extends BaseProduct {
    @Column()
    @IsEnum(GroupTypes)
    group_type: GroupTypes;

    // @OneToMany(() => SimpleProduct, (product) => product.relation, {
    //     cascade: true,
    //     onDelete: 'CASCADE',
    // })
    // simple: SimpleProduct[];
    // @RelationId((group: GroupedProduct) => group.simple)
    // simple_ids: number[];

    // @OneToMany(() => ConfigurableProduct, (product) => product.relation, {
    //     cascade: true,
    //     onDelete: 'CASCADE',
    // })
    // configurable: ConfigurableProduct[];
    // @RelationId((group: GroupedProduct) => group.configurable)
    // configurable_ids: number[];

    // @OneToMany(() => PersonalizedProduct, (product) => product.relation, {
    //     cascade: true,
    //     onDelete: 'CASCADE',
    // })
    // personalized: PersonalizedProduct[];
    // @RelationId((group: GroupedProduct) => group.personalized)
    // personalized_ids: number[];

    // @ManyToOne(() => Product, (product) => product.simple_product)
    // relation: Product;
}
