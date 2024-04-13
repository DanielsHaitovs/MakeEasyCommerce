import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateNumberOptionDto, CreateOptionDto, CreateStringOptionDto } from './create-option.dto';
import { QueryResponseDto } from '@src/mec/dto/query/response.dto';
import { IsOptional, ValidateNested } from '@nestjs/class-validator';
import { Type } from '@nestjs/class-transformer';

export class GetStringOptionDto extends CreateStringOptionDto {
    @ApiProperty({
        title: 'Attribute String Option ID',
        type: Number,
        nullable: false,
        required: true,
        isArray: false
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class GetNumberOptionDto extends CreateNumberOptionDto {
    @ApiProperty({
        title: 'Attribute Number Option ID',
        type: Number,
        nullable: false,
        required: true,
        isArray: false
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class GetOptionDto extends CreateOptionDto {
    @ApiProperty({
        title: 'Attribute Option String Data',
        type: GetStringOptionDto,
        required: true,
        nullable: false,
        isArray: true
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => GetStringOptionDto)
    stringOptions: GetStringOptionDto[];

    @ApiProperty({
        title: 'Attribute Option Number Data',
        type: GetNumberOptionDto,
        required: true,
        nullable: false,
        isArray: true
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => GetNumberOptionDto)
    numberOptions: GetNumberOptionDto[];
}

export class OptionResponseDto extends QueryResponseDto {
    @ApiProperty()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => GetOptionDto)
    result?: GetOptionDto[];
}
