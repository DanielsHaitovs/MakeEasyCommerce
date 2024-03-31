import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';

import { OrderDirection } from '@src/mec/enum/query/query.enum';

export class FilterWhereValueDto {
    @ApiProperty({
        title: 'Value which should be used in filter',
        nullable: true
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
        nullable: true
    })
    alias: string;
}

export class FilterByIdsDto {
    @ApiProperty({
        title: 'Filter by ids',
        type: [Number],
        nullable: true,
        required: false
    })
    @IsOptional()
    @IsNumber({}, { each: true }) // typescript (docs) way
    ids: number[];
}

export class PaginationDto {
    @ApiProperty({
        title: 'Page number',
        type: Number,
        nullable: true,
        required: false
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    page: number;

    @ApiProperty({
        title: 'Limit page items',
        type: Number,
        nullable: true,
        required: false
    })
    @IsNumber()
    @IsOptional()
    @Min(1)
    limit: number;
}

export class OrderDto {
    @ApiProperty({
        title: 'Order by value',
        type: String,
        nullable: true,
        required: true
    })
    @IsOptional()
    @IsString()
    by: string;

    @ApiProperty({
        title: 'Order Direction for Query',
        enum: OrderDirection,
        default: OrderDirection.None,
        nullable: false,
        required: true
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
        required: true
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    pagination: PaginationDto;

    @ApiProperty({
        title: 'Order Settings',
        type: OrderDto,
        nullable: false,
        required: true
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    order: OrderDto;
}
