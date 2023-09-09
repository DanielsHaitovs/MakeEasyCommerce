import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, ValidateNested } from 'class-validator';
import { ProductTypes } from '@src/base/enum/product/product-types.enum';
import { ProductDto } from '@src/product/dto/base/product/product.base.dto';
import { GetSimpleProductAttributes } from '@src/product/dto/attributes/attribute/get-attribute.dto';
import { GetSimpleProductOption } from '@src/product/dto/attributes/option/get-option.attribute.dto';
import { GetProductShortDto } from '../../product/get-product.dto';

export class GetSimpleProductDto extends ProductDto {
    @ApiProperty({ title: 'product type', type: ProductTypes.SIMPLE })
    @IsNotEmpty()
    @IsEnum(ProductTypes)
    productType: string;

    @ApiProperty({
        title: 'Gets simple product data from main product table',
        type: GetProductShortDto,
    })
    @ValidateNested({ each: true })
    description: GetProductShortDto;

    @ApiProperty({
        title: 'Gets simple product options from separate table',
        type: [GetSimpleProductOption],
    })
    @ValidateNested({ each: true })
    options: GetSimpleProductOption[];

    @ApiProperty({
        title: 'Get Simple Product Attributes',
        type: [GetSimpleProductAttributes],
    })
    @ValidateNested({ each: true })
    productAttributes: GetSimpleProductAttributes[];
}
