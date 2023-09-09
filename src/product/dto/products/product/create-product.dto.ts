import { ApiProperty } from '@nestjs/swagger';
import { ProductDto } from '../../base/product/product.base.dto';
import { ProductTypes } from '@src/base/enum/product/product-types.enum';
import { IsEnum, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateSimpleProductDto } from '../type/simple/create-simple.product.dto';
import { CreateConfigurableProductDto } from '../type/configurable/create-configurable.product.dto';
import { CreateAttributeDto } from '../../attributes/attribute/create-attribute.dto';

export class CreateProductDto extends ProductDto {
    @ApiProperty({ title: 'product type', type: ProductTypes })
    @IsNotEmpty()
    @IsEnum(ProductTypes)
    productType: string;

    @ApiProperty({
        type: CreateSimpleProductDto || CreateConfigurableProductDto,
    })
    @ValidateNested({ each: true })
    product: CreateSimpleProductDto | CreateConfigurableProductDto;

    @ApiProperty({
        title: 'Product Attributes',
        type: [CreateAttributeDto],
    })
    @ValidateNested({ each: true })
    attributes: CreateAttributeDto[];
}
