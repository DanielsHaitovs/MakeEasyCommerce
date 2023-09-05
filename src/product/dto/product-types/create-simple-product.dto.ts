import { ProductDto } from '../base/products/product-base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { AttributeOptionsDto } from '../base/attributes/options/option-base.dto';

export class CreateSimpleProductDto extends ProductDto {
    @ApiProperty({ type: [AttributeOptionsDto] })
    @ValidateNested({ each: true })
    options: AttributeOptionsDto[];
}
