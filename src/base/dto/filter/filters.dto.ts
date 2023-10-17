import { ApiProperty } from '@nestjs/swagger';
import { RuleFilter } from '@src/base/enum/attributes/rule-type.enum';
import { OrderType } from '@src/base/enum/query/query.enum';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
    @ApiProperty({
        title: 'Add this this Column to filter',
        type: String,
        nullable: true,
    })
    @IsOptional()
    @IsString()
    columnName: string;

    @ApiProperty({
        title: 'Add this this value to filter by column',
        type: JSON,
        nullable: true,
    })    
    @IsOptional()
    value: string | number | boolean | Date | JSON;

    @ApiProperty({ 
        title: 'Page Number to take',
        type: Number,
        nullable: false,
        default: 1,
    })
    @IsNotEmpty()
    @IsNumber()
    page: number;

    @ApiProperty({ 
        title: 'Limit Number of items to take',
        type: Number,
        nullable: false,
        default: 5,
    })
    @IsNotEmpty()
    @IsNumber()
    limit: number;

    @ApiProperty({
        title: 'Order By',
        type: String,
        nullable: true,
    })
    @IsOptional()
    @IsString()
    orderBy: string;

    @ApiProperty({
        title: 'Order Direction for Query',
        default: OrderType.ASC,
        enum: OrderType,
        nullable: true,
    })
    @IsOptional()
    @IsEnum(OrderType)
    orderDirection: OrderType;

    @ApiProperty({
        title: 'Infer to amount of returned value, single or array',
        type: Boolean,
        nullable: false,
        default: false,
    })
    @IsNotEmpty()
    @IsBoolean()
    many: boolean;
}

export class AttributerRelationsDto {
    @ApiProperty({
        title: 'Join Options Relation for Attribute Query',
        default: false,
        nullable: false,
    })
    @IsNotEmpty()
    @IsBoolean()
    joinOptions: boolean;

    @ApiProperty({
        title: 'Join Rule Relation for Attribute Query',
        default: false,
        nullable: false,
    })
    @IsNotEmpty()
    @IsBoolean()
    joinRule: boolean;
}

export class AttributeConditionDto extends SingleConditionDto {
    @ApiProperty({
        title: 'Select Properties of this Entity',
        type: String,
        nullable: false,
    })
    @IsNotEmpty()
    @IsString()
    select: string[];

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
    joinRule: boolean;
}

export class RuleConditionDto extends SingleConditionDto  {
    @ApiProperty({
        title: 'Rule Select Filter',
        enum: RuleFilter,
        nullable: false,
        default: RuleFilter.Id,
    })
    @IsNotEmpty()
    @IsEnum(RuleFilter)
    ruleSelect: RuleFilter;
}

export class OptionConditionDto extends SingleConditionDto {
    @ApiProperty({
        title: 'Select Properties of this Entity',
        type: String,
        nullable: false,
    })
    @IsNotEmpty()
    @IsString()
    select: string[];
}