import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationDto {
    @ApiProperty({ type: Number })
    @IsOptional()
    @IsNumber()
    page: number;

    @ApiProperty({ type: Number })
    @IsOptional()
    @IsNumber()
    limit: number;
}
