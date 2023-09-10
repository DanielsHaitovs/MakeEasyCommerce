import { ApiProperty } from '@nestjs/swagger';
import { ProductVisibility } from '@src/base/enum/product/product-visibility.enum';
import {
    IsDate,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsString,
} from 'class-validator';

export class ProductDto {
    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;

    @ApiProperty({ title: 'product name', type: String })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ title: 'product sku', type: String })
    @IsNotEmpty()
    @IsString()
    sku: string;

    @ApiProperty({
        title: 'product visibility',
        default: ProductVisibility.AVAILABLE,
    })
    @IsNotEmpty()
    @IsEnum(ProductVisibility)
    visibility: ProductVisibility;

    @ApiProperty({
        title: 'product quantity',
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsNumber()
    totalPrice: number;
}
