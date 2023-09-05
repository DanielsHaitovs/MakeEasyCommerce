import { AttributeOptionsDto } from '@src/attribute/dto/attribute.dto';
import { ProductDto } from '../base/product-base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';

export class CreateSimpleProductDto extends ProductDto {
    @ApiProperty({ type: [AttributeOptionsDto] })
    @ValidateNested({ each: true })
    options: AttributeOptionsDto[];
}
