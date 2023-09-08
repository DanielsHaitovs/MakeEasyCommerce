import { Column, Unique } from 'typeorm';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ProductTypes } from '@src/base/enum/product/product-types.enum';
import { ProductVisibility } from '@src/base/enum/product/product-visibility.enum';

@Unique(['name', 'sku'])
export class BaseProduct {
    @Column()
    @IsEnum(ProductTypes)
    product_type: ProductTypes;

    @Column()
    @IsString()
    name: string;

    @Column()
    @IsString()
    sku: string;

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
