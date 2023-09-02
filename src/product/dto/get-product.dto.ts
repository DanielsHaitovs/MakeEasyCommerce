import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import {
    CreateConfigurableProduct,
    CreateGroupedProductDto,
    CreatePersonalizedProductDto,
    CreateProductDto,
    CreateSimpleProductDto,
} from './create-product.dto';
import { ProductTypes } from '../entities/enum/product-types.enum';

export class GetSimpleProductDto extends CreateSimpleProductDto {}
export class GetConfigurableProduct extends CreateConfigurableProduct {
    @ApiProperty({ type: [GetSimpleProductDto] })
    @ValidateNested({ each: true })
    variants: GetSimpleProductDto[];
}
export class GetPersonalizedProductDto extends CreatePersonalizedProductDto {}
export class GetGroupedProductDto extends CreateGroupedProductDto {}

export class GetProductDto extends CreateProductDto {
    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({
        enum: ProductTypes,
        enumName: 'ProductTypes',
    })
    @IsEnum(ProductTypes)
    product_type: ProductTypes;

    @ApiProperty({
        type:
            GetSimpleProductDto ||
            GetConfigurableProduct ||
            GetPersonalizedProductDto ||
            GetGroupedProductDto,
    })
    @ValidateNested({ each: true })
    product:
        | GetSimpleProductDto
        | GetConfigurableProduct
        | GetPersonalizedProductDto
        | GetGroupedProductDto;
}
