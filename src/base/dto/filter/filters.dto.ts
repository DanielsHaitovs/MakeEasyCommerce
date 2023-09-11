import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

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

export class FilterDto extends PaginationDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    columnName: string;

    @ApiProperty()
    @IsOptional()
    value: any;
}

export class OrderedPaginationDto extends PaginationDto {
    @ApiProperty()
    @IsOptional()
    by: string;

    @ApiProperty()
    @IsOptional()
    type: 'ASC' | 'DESC';
}

export class FilterOrderPaginationDto extends FilterDto {
    @ApiProperty()
    @IsOptional()
    by: string;

    @ApiProperty()
    @IsOptional()
    type: 'ASC' | 'DESC';
}
