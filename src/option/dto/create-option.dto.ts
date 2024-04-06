import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IsBoolean, IsEnum, IsNumber, IsString, ValidateNested } from '@nestjs/class-validator';
import { OptionType } from '../enum/option.enum';
import { Type } from '@nestjs/class-transformer';

export class OptionTypeDto {
    @ApiProperty({
        title: 'Attribute Option Type',
        enum: OptionType,
        nullable: false,
        required: true,
        isArray: false
    })
    @IsNotEmpty()
    @IsEnum(OptionType)
    type: OptionType;
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

export class CreateBooleanOptionDto {
    @ApiProperty({
        title: 'Attribute Boolean Option',
        type: Boolean,
        nullable: false,
        required: true,
        isArray: false
    })
    @IsNotEmpty()
    @IsBoolean()
    data: boolean;
}

export class CreateOptionDto {
    @ApiProperty({
        title: 'Attribute Option Data',
        type: String || Number || Boolean,
        nullable: false,
        required: true,
        isArray: false
    })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => String || Number || Boolean)
    data: string | number | boolean;
}
