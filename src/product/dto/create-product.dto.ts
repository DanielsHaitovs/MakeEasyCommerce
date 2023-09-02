import { ApiProperty } from '@nestjs/swagger';
import { ProductTypes } from '../entities/enum/product-types.enum';
import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsString,
    ValidateNested,
} from 'class-validator';
import { ProductVisibility } from '../entities/enum/product-visibility.enum';
import { MecBaseDto } from '@src/base/dto/mec-base.dto';

export class ProductDto {
    @ApiProperty({
        enum: ProductTypes,
        enumName: 'ProductTypes',
    })
    @IsEnum(ProductTypes)
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
    price: string;
}

export class CreateSimpleProductDto extends ProductDto {}
export class CreateConfigurableProduct extends ProductDto {}
export class CreatePersonalizedProductDto extends ProductDto {}
export class CreateGroupedProductDto extends ProductDto {}

export class CreateProductDto extends MecBaseDto {
    @ApiProperty({
        enum: ProductTypes,
        enumName: 'ProductTypes',
    })
    @IsEnum(ProductTypes)
    product_type: ProductTypes;

    @ApiProperty({
        type:
            CreateSimpleProductDto ||
            CreateConfigurableProduct ||
            CreatePersonalizedProductDto ||
            CreateGroupedProductDto,
    })
    @ValidateNested({ each: true })
    product:
        | CreateSimpleProductDto
        | CreateConfigurableProduct
        | CreatePersonalizedProductDto
        | CreateGroupedProductDto;
}
