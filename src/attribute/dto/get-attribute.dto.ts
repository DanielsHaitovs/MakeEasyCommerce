import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { CreateRuleAttributeDto } from './attributes/rule/create-attribute.rule.dto';
import { CreateAttributeDto, CreateAttributeShortDto } from './create-attribute.dto';
import { GetAttributeRuleDto } from './attributes/rule/get-attribute.rule.dto';
import { GetOneAttributeOptionDto } from './attributes/option/get-attribute.option.dto';
import { AttributeDescriptionDto } from '@src/base/dto/mec/attribute/attribute.dto';

export class GetAttributeDescriptionDto extends AttributeDescriptionDto {
    @ApiProperty({
        title: 'Attribute ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({
        title: 'Attribute Option Relations ID',
        type: [Number],
        nullable: true,
    })
    @IsOptional()
    @IsNumber()
    optionsIds: number[];
}

export class GetAttributeShortDto extends CreateAttributeShortDto {
    @ApiProperty({
        title: 'Attribute Rule',
        type: CreateRuleAttributeDto,
        nullable: false,
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    rule: GetAttributeRuleDto;
}

export class GetAttributeDto extends CreateAttributeDto {
    @ApiProperty({
        title: 'Attribute ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({
        title: 'Attribute Rule',
        type: CreateRuleAttributeDto,
        nullable: false,
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    rule: GetAttributeRuleDto;

    @ApiProperty({
        title: 'Attribute Options',
        type: [GetOneAttributeOptionDto],
        nullable: false,
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    options: GetOneAttributeOptionDto[];
}
