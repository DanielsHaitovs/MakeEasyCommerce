import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { AttributeType } from '@src/mec/enum/attribute/attribute.enum';

export class CreateAttributeShortDto {
    @ApiProperty({
        title: 'Attribute Name',
        type: String,
        nullable: false,
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        title: 'Attribute Code',
        type: String,
        nullable: false,
    })
    @IsNotEmpty()
    @IsString()
    code: string;

    @ApiProperty({
        title: 'Is Attribute Required',
        type: Boolean,
        nullable: false,
        default: false,
    })
    @IsNotEmpty()
    @IsBoolean()
    isRequired: boolean;

    @ApiProperty({
        title: 'Is Attribute Active',
        type: Boolean,
        nullable: false,
        default: false,
    })
    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;

    @ApiProperty({
        title: 'Attribute description',
        type: String,
        nullable: false,
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
        title: 'Attribute Type',
        type: String,
        nullable: false,
        enum: AttributeType,
    })
    @IsNotEmpty()
    @IsEnum(AttributeType)
    dataType: AttributeType;

    @ApiProperty({
        title: 'Is Attribute Array',
        type: Boolean,
        nullable: false,
        default: false,
    })
    @IsNotEmpty()
    @IsBoolean()
    isArray: boolean;
}

export class CreateAttributeDto extends CreateAttributeShortDto {}
