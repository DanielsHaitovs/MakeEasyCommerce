import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
import { ToBoolean } from '../decorator/eav-attribute-rule.decorator';

export class AttributeDescriptionDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    code: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    dataType: string;

    @ApiProperty()
    @IsBoolean()
    @ToBoolean()
    isArray: boolean;
}

export class AttributeOptionsDto {
    @ApiProperty()
    @IsNotEmpty()
    // value: JSON;
    value: string | number | boolean | Date | JSON;
}

export class RuleDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    // @ToBoolean()
    useInCatalog: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    // @ToBoolean()
    useInListing: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    // @ToBoolean()
    useInLayeredNavigation: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    // @ToBoolean()
    useInFilter: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    // @ToBoolean()
    useInOptionFilter: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    // @ToBoolean()
    useInSort: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    // @ToBoolean()
    useInSearch: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    // @ToBoolean()
    useInPromo: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    // @ToBoolean()
    useInReport: boolean;
}

// Check what after all should be used for valid boolean input
// Since nestjs sends everything as string
export class AttributeRelationsDto {
    @ApiProperty({ type: Boolean })
    @IsOptional()
    @ToBoolean()
    @IsBoolean()
    includeRule: boolean;
    @ApiProperty({ type: Boolean })
    @IsOptional()
    @ToBoolean()
    @IsBoolean()
    includeOptions: boolean;
}

export class FilterDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    code: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    value: string;
    // value: string | number | boolean | JSON | Date;
}

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
