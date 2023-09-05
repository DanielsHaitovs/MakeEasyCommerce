import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class AttributeRelationsDto {
    @ApiProperty({ type: Boolean })
    @IsOptional()
    @IsBoolean()
    includeRule: boolean;
    @ApiProperty({ type: Boolean })
    @IsOptional()
    @IsBoolean()
    includeOptions: boolean;
}

export class PaginateAttributeRelationsDto extends AttributeRelationsDto {
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    page: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    limit: number;
}

export class PaginationFilterDto extends AttributeRelationsDto {
    @ApiProperty({ type: Number })
    @IsNumber()
    @IsOptional()
    page: number;

    @ApiProperty({ type: Number })
    @IsNumber()
    @IsOptional()
    limit: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    code: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    value: string;
}
