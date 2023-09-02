import { MecBaseEntity } from '@src/base/entity/base.entity';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Column, ManyToOne, Unique } from 'typeorm';
import { Product } from '../../product.entity';
import { ProductTypes } from '../../enum/product-types.enum';

@Unique(['sku', 'name'])
export class BaseProduct extends MecBaseEntity {
    @Column()
    @IsString()
    sku: string;

    @Column()
    @IsString()
    name: string;

    @Column()
    @IsEnum(ProductTypes)
    product_type: ProductTypes;

    @Column()
    @IsNumber()
    visibility: number;

    @Column()
    @IsNumber()
    quantity: number;

    @Column({
        type: 'numeric',
        precision: 20,
        scale: 2,
    })
    final_price: number;

    @Column()
    @IsNumber()
    store_id: number;

    @ManyToOne(() => Product, (product) => product.simple_product)
    relation: Product;
}
