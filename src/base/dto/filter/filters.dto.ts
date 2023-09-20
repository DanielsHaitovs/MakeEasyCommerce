import { ApiProperty } from '@nestjs/swagger';
import { JoinAttributeRelations } from '@src/base/enum/attributes/attribute-type.enum';
import { OrderType } from '@src/base/enum/query/query.enum';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

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
    value: string | number | boolean | Date | JSON;
}

export class SimpleFilterDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    columnName: string;

    @ApiProperty()
    @IsOptional()
    value: string | number | boolean | Date | JSON;
}

export class OrderedPaginationDto extends PaginationDto {
    @ApiProperty()
    @IsOptional()
    orderBy: string;

    @ApiProperty({
        title: 'Order Direction for Query',
    })
    @IsOptional()
    @IsEnum(OrderType)
    orderDirection: OrderType;
}

export class FilterOrderPaginationDto extends FilterDto {
    @ApiProperty()
    @IsOptional()
    by: string;

    @ApiProperty({
        title: 'Order Direction for Query',
    })
    @IsOptional()
    @IsEnum(OrderType)
    orderDirection: OrderType;
}

export class SingleConditionDto {
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
    orderBy: string;

    @ApiProperty({
        title: 'Order Direction for Query',
        default: OrderType.ASC,
    })
    @IsOptional()
    @IsEnum(OrderType)
    orderDirection: OrderType;

    @ApiProperty()
    @IsOptional()
    @IsString()
    columnName: string;

    @ApiProperty()
    @IsOptional()
    value: string | number | boolean | Date | JSON;

    @ApiProperty()
    @IsOptional()
    @IsString()
    select: string[];
}

export class AttributeSingleConditionDto extends SingleConditionDto {
    @ApiProperty({
        title: 'Join Options Relation for Attribute Query',
        default: false,
    })
    @IsOptional()
    @IsBoolean()
    joinOptions: boolean;

    @ApiProperty({
        title: 'Join Rule Relation for Attribute Query',
        default: false,
    })
    @IsOptional()
    @IsBoolean()
    joinRules: boolean;
}
