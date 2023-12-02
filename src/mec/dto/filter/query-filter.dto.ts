import { ApiProperty } from '@nestjs/swagger';
import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Length,
    Min,
    ValidateNested,
} from 'class-validator';

import { OrderDirection } from '@src/mec/enum/query/query.enum';

export class FilterWhereValueDto {
    @ApiProperty({
        title: 'Value which should be used in filter',
        nullable: true,
    })
    where: string | number | boolean | Date | JSON;

    // @ApiProperty({
    //     title: 'Property Name Alias for where statement',
    //     type: String,
    //     nullable: true,
    // })
    // propertyName: string;

    @ApiProperty({
        title: 'Alias for where statement',
        type: String,
        nullable: true,
    })
    alias: string;
}

export class FilterByIdsDto {
    @ApiProperty({
        title: 'Filter by ids',
        type: [Number],
        nullable: true,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    // @IsNumber({}, { each: true }) // typescript (docs) way
    @ValidateNested({ each: true })
    ids: number[];
}

export class PaginationDto {
    @ApiProperty({
        title: 'Page number',
        type: Number,
        nullable: true,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    page: number;

    @ApiProperty({
        title: 'Limit page items',
        type: Number,
        nullable: true,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    limit: number;
}

export class OrderDto {
    @ApiProperty({
        title: 'Order by value',
        type: String,
        nullable: true,
        required: true,
    })
    @IsOptional()
    @IsString()
    by: string;

    @ApiProperty({
        title: 'Order Direction for Query',
        enum: OrderDirection,
        default: OrderDirection.ASC, //??May increase time, but supposed to be followed by index and cache
        nullable: true,
        required: false,
    })
    @IsOptional()
    @IsEnum(OrderDirection)
    direction: OrderDirection;
}

export class QueryFilterDto {
    @ApiProperty({
        title: 'Pagination Settings',
        type: PaginationDto,
        nullable: false,
        required: true,
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    pagination: PaginationDto;

    @ApiProperty({
        title: 'Order Settings',
        type: OrderDto,
        nullable: false,
        required: true,
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    order: OrderDto;
}

export class FilterRequestDto {
    @ApiProperty({
        title: 'Order by value',
        description: 'If "by" is not provided, this will be ignored',
        type: String,
        nullable: true,
        required: false,
    })
    @IsOptional()
    @IsString()
    @Length(1, 255)
    by: string;

    @ApiProperty({
        title: 'Order Direction for Query',
        description: 'If "by" is not provided, this will be ignored',
        enum: OrderDirection,
        default: OrderDirection.ASC,
        nullable: true,
        required: false,
    })
    @IsOptional()
    @IsEnum(OrderDirection)
    direction: OrderDirection;

    @ApiProperty({
        title: 'Page number',
        type: Number,
        nullable: true,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    @Min(0)
    page: number;

    @ApiProperty({
        title: 'Limit page items',
        type: Number,
        nullable: true,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    @Min(1)
    limit: number;
}
