import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, ValidateNested } from 'class-validator';
import { ProductTypes } from '@src/base/enum/product/product-types.enum';
import { CreateSimpleProductOption } from '@src/product/dto/attributes/option/create-option.attribute.dto';
import { ProductDto } from '@src/product/dto/base/product/product.base.dto';
import { GetSimpleProductAttributes } from '@src/product/dto/attributes/attribute/get-attribute.dto';

export class CreateSimpleProductDto extends ProductDto {
    @ApiProperty({ title: 'product type', type: ProductTypes.SIMPLE })
    @IsNotEmpty()
    @IsEnum(ProductTypes)
    productType: string;

    @ApiProperty({
        title: 'Creates simple product options in separate table',
        type: [CreateSimpleProductOption],
    })
    @ValidateNested({ each: true })
    product: CreateSimpleProductOption[];

    @ApiProperty({
        title: 'Get Simple Product Attributes',
        type: [GetSimpleProductAttributes],
    })
    @ValidateNested({ each: true })
    productAttributes: GetSimpleProductAttributes[];
}
