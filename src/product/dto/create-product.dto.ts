import { ApiProperty } from '@nestjs/swagger';
import { ProductTypes } from '../../base/enum/product/product-types.enum';
import {
    IsArray,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsString,
    ValidateNested,
} from 'class-validator';
import { ProductVisibility } from '../../base/enum/product/product-visibility.enum';
import { CreateResponseOptions } from './requests/product-response.dto';

export class ProductDto {
    product_type: ProductTypes;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    sku: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        enum: ProductVisibility,
        enumName: 'ProductVisibility',
    })
    @IsNotEmpty()
    @IsEnum(ProductVisibility)
    visibility: ProductVisibility;

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsNumber()
    final_price: number;
}

export class CreateVirtualProductDto extends ProductDto {}

export class CreateSimpleProductDto extends ProductDto {}

export class CreateConfigurableProduct extends ProductDto {
    @ApiProperty({ type: [CreateSimpleProductDto] })
    @ValidateNested({ each: true })
    variants: CreateSimpleProductDto[];
}

export class CreatePersonalizedProductDto extends ProductDto {}

export class CreateGroupedProductDto extends ProductDto {
    @ApiProperty({ type: [Number] })
    @IsNotEmpty()
    @IsArray()
    product_ids: number[];
}

export class CreateProductDto {
    @ApiProperty({
        enum: ProductTypes,
        enumName: 'ProductTypes',
    })
    @IsEnum(ProductTypes)
    product_type: ProductTypes;

    @ApiProperty()
    @ValidateNested()
    product: CreateResponseOptions;
}
