import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { OrderDto, PaginationDto, QueryFilterDto } from '@src/mec/dto/query/filter.dto';
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from '@nestjs/class-validator';

export class StringOptionWhereDto {
    @ApiProperty({
        title: 'String Option Data',
        description: 'Option to include more then 1 of existing option values into filtering using',
        nullable: true,
        isArray: true,
        required: false
    })
    @IsOptional()
    @IsString({ each: true })
    selectWhere: string[];
}

export class NumberOptionWhereDto {
    @ApiProperty({
        title: 'Number Option Data',
        description: 'Option to include more then 1 of existing option values into filtering using',
        type: Number,
        nullable: true,
        isArray: true,
        required: false
    })
    @IsOptional()
    @IsNumber({}, { each: true })
    selectWhere: number[];
}

export class OptionQueryDto {
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

    @ApiProperty({
        title: 'Number Option Data Ids',
        description: 'Option to include more then 1 of existing number option values into filtering using this option ids',
        type: Number,
        nullable: true,
        isArray: true,
        required: false
    })
    @IsOptional()
    @IsNumber({}, { each: true })
    whereNumberIds: number[];

    @ApiProperty({
        title: 'String Option Data Ids',
        description: 'Option to include more then 1 of existing string option values into filtering using this option ids',
        type: Number,
        nullable: true,
        isArray: true,
        required: false
    })
    @IsOptional()
    @IsNumber({}, { each: true })
    whereStringIds: number[];

    @ApiProperty({
        title: 'Number Option Data',
        description: 'Option to include more then 1 of existing option values into filtering using theirs values',
        type: Number,
        nullable: true,
        isArray: true,
        required: false
    })
    @IsOptional()
    @IsNumber({}, { each: true })
    whereNumber: number[];

    @ApiProperty({
        title: 'String Option Data',
        description: 'Option to include more then 1 of existing option values into filtering using theirs values',
        nullable: true,
        isArray: true,
        required: false
    })
    @IsOptional()
    @IsString({ each: true })
    whereString: string[];
}
