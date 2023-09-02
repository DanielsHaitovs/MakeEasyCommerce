import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class GetProductDto extends PartialType(CreateProductDto) {
    @ApiProperty({ type: Number })
    @IsOptional()
    @IsNumber()
    id: number;
}
