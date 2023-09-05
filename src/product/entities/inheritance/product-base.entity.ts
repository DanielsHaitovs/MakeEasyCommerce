import { MecBaseEntity } from '@src/base/entity/base.entity';
import { ProductTypes } from '@src/base/enum/product/product-types.enum';
import { ProductVisibility } from '@src/base/enum/product/product-visibility.enum';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class BaseProduct extends MecBaseEntity {
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
