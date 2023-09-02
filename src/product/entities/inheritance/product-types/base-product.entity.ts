import { MecBaseEntity } from '@src/base/entity/base.entity';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Column, ManyToOne, Unique } from 'typeorm';
import { Product } from '../../product.entity';
import { ProductTypes } from '../../enum/product-types.enum';
import { ProductVisibility } from '../../enum/product-visibility.enum';

@Unique(['sku', 'name'])
export class BaseProduct extends MecBaseEntity {
    @Column()
    @IsEnum(ProductTypes)
    product_type: ProductTypes;

    @Column()
    @IsString()
    sku: string;

    @Column()
    @IsString()
    name: string;

    @Column()
    @IsEnum(ProductVisibility)
    visibility: ProductVisibility;

    @Column()
    @IsNumber()
    quantity: number;

    @Column({
        type: 'numeric',
        precision: 20,
        scale: 2,
    })
    final_price: number;
}
