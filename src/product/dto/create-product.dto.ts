import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';

export class CreateProductDto {
    @ApiProperty({ type: CreateProductDto })
    products: CreateProductDto;
}
