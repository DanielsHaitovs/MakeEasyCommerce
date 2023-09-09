import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { ProductDto } from '../../base/products/product-base.dto';
import { GetAttributeOptionsDto } from '../../attributes/options/get-option.dto';

export class GetSimpleProductDto {
    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    // @ApiProperty({ type: ProductDto })
    // @IsNotEmpty()
    // description: ProductDto;

    @ApiProperty({ type: GetAttributeOptionsDto })
    @ValidateNested({ each: true })
    options: GetAttributeOptionsDto[];
}
