import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateBooleanOptionDto, CreateNumberOptionDto, CreateStringOptionDto } from './create-option.dto';
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

export class GetBooleanOptionDto extends CreateBooleanOptionDto {
    @ApiProperty({
        title: 'Attribute Boolean Option ID',
        type: Number,
        nullable: false,
        required: true,
        isArray: false
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class GetArrayOptionDto {
    @ApiProperty({
        title: 'Attribute Option ID',
        type: GetStringOptionDto || GetNumberOptionDto || GetBooleanOptionDto,
        nullable: false,
        required: true,
        isArray: true
    })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => GetStringOptionDto || GetNumberOptionDto || GetBooleanOptionDto)
    data: GetStringOptionDto[] | GetNumberOptionDto[] | GetBooleanOptionDto[];
}

export class OptionResponseDto extends QueryResponseDto {
    @ApiProperty()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => GetStringOptionDto || GetNumberOptionDto || GetBooleanOptionDto || GetArrayOptionDto)
    result?: GetStringOptionDto | GetNumberOptionDto | GetBooleanOptionDto | GetArrayOptionDto;
}
