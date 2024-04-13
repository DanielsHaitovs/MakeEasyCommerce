import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IsEnum, IsNumber, IsString, ValidateNested } from '@nestjs/class-validator';
import { Type } from '@nestjs/class-transformer';
import { AttributeType } from '@src/attribute/enum/attribute.enum';

export class OptionTypeDto {
    @ApiProperty({
        title: 'Attribute Option Type',
        enum: AttributeType,
        nullable: false,
        required: true,
        isArray: false
    })
    @IsNotEmpty()
    @IsEnum(AttributeType)
    type: AttributeType;
}

export class CreateStringOptionDto {
    @ApiProperty({
        title: 'Attribute String Option',
        type: String,
        nullable: false,
        required: true,
        isArray: false
    })
    @IsNotEmpty()
    @IsString()
    data: string;
}

export class CreateNumberOptionDto {
    @ApiProperty({
        title: 'Attribute Number Option',
        type: Number,
        nullable: false,
        required: true,
        isArray: false
    })
    @IsNotEmpty()
    @IsNumber()
    data: number;
}

export class CreateOptionDto {
    @ApiProperty({
        title: 'Attribute Option String Data',
        type: CreateStringOptionDto,
        required: true,
        nullable: false,
        isArray: true
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreateStringOptionDto)
    stringOptions: CreateStringOptionDto[];

    @ApiProperty({
        title: 'Attribute Option Number Data',
        type: CreateNumberOptionDto,
        required: true,
        nullable: false,
        isArray: true
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreateNumberOptionDto)
    numberOptions: CreateNumberOptionDto[];
}
