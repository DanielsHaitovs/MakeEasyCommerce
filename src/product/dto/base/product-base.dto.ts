import { ApiProperty } from '@nestjs/swagger';
import { ProductTypes } from '@src/base/enum/product/product-types.enum';
import { ProductVisibility } from '@src/base/enum/product/product-visibility.enum';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDto {
    @ApiProperty({ type: ProductTypes })
    @IsNotEmpty()
    @IsEnum(ProductTypes)
    product_type: ProductTypes;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    sku: string;

    @ApiProperty({ type: ProductVisibility })
    @IsNotEmpty()
    @IsEnum(ProductVisibility)
    visibility: ProductTypes;

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsNumber()
    final_price: number;
}
