import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { AttributeType } from '../enum/attribute.enum';
import { CreateRuleDto } from '@src/rule/dto/create-rule.dto';
import { IsNumber, ValidateNested } from '@nestjs/class-validator';
import { Type } from '@nestjs/class-transformer';

export class AttributeBaseDto {
    @ApiProperty({
        title: 'Is Attribute Active',
        type: Boolean,
        nullable: false,
        default: false
    })
    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;

    @ApiProperty({
        title: 'Is Attribute Required',
        type: Boolean,
        nullable: false,
        default: false
    })
    @IsNotEmpty()
    @IsBoolean()
    isRequired: boolean;

    @ApiProperty({
        title: 'Attribute Name',
        type: String,
        nullable: false
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        title: 'Attribute Code',
        type: String,
        nullable: false
    })
    @IsNotEmpty()
    @IsString()
    code: string;

    @ApiProperty({
        title: 'Attribute description',
        type: String,
        nullable: false
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
        title: 'Attribute Type',
        type: String,
        nullable: false,
        enum: AttributeType
    })
    @IsNotEmpty()
    @IsEnum(AttributeType)
    dataType: AttributeType;

    @ApiProperty({
        title: 'Is Attribute Array',
        type: Boolean,
        nullable: false,
        default: false
    })
    @IsNotEmpty()
    @IsBoolean()
    isArray: boolean;
}

export class CreateAttributeDto extends AttributeBaseDto {
    @ApiProperty({
        title: 'Attribute Rule',
        type: CreateRuleDto,
        nullable: false,
        required: true,
        isArray: false
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreateRuleDto)
    rule: CreateRuleDto;
}

export class CreateAttributeRuleDto {
    @ApiProperty({
        title: 'Attribute Id',
        type: Number,
        nullable: false,
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({
        title: 'Attribute Rule',
        type: CreateRuleDto,
        nullable: false,
        required: true,
        isArray: false
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreateRuleDto)
    rule: CreateRuleDto;
}
