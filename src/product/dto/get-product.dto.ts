import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import {
    CreateConfigurableProduct,
    CreateGroupedProductDto,
    CreatePersonalizedProductDto,
    CreateProductDto,
    CreateSimpleProductDto,
    CreateVirtualProductDto,
} from './create-product.dto';
import { ProductTypes } from '../../base/enum/product/product-types.enum';
import { GetResponseOptions } from './requests/product-response.dto';

export class GetVirtualProductDto extends CreateVirtualProductDto {}
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

    @ApiProperty()
    @ValidateNested({ each: true })
    product: GetResponseOptions;
}
