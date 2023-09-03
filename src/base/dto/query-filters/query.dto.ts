import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationDto {
    @ApiProperty({ type: Number })
    @IsNumber()
    @IsOptional()
    page: number;

    @ApiProperty({ type: Number })
    @IsNumber()
    @IsOptional()
    limit: number;
}
