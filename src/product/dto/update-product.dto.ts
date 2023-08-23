import { ApiProperty } from '@nestjs/swagger';
import { ProductDto } from './create-product.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateProductDto extends ProductDto {
    @IsNumber()
    @IsOptional()
    @ApiProperty()
    id: number;
}
