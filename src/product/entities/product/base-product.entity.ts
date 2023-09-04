import { MecBaseEntity } from '@src/base/entity/base.entity';
import { ProductTypes } from '@src/base/enum/product/product-types.enum';
import { ProductVisibility } from '@src/base/enum/product/product-visibility.enum';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Column, Unique } from 'typeorm';

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
