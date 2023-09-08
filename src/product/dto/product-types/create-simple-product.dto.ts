import { ProductDto } from '../base/products/product-base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { AssignedOptionsDto } from '../base/attributes/options/option-base.dto';
import { Exclude } from 'class-transformer';
import { ProductTypes } from '@src/base/enum/product/product-types.enum';

export class CreateSimpleProductDto {
    @ApiProperty({ type: ProductDto })
    @IsNotEmpty()
    description: ProductDto;

    @ApiProperty({ type: [AssignedOptionsDto] })
    @ValidateNested({ each: true })
    attribute_values: [AssignedOptionsDto];

    @Exclude()
    product_type: ProductTypes;
}
