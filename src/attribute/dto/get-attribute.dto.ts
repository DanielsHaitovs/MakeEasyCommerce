import { ApiProperty } from '@nestjs/swagger';
import { CreateAttributeDto } from './create-attribute.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { QueryResponseDto } from '@src/mec/dto/query/response.dto';
import { IsOptional, ValidateNested } from '@nestjs/class-validator';
import { Type } from '@nestjs/class-transformer';
import { GetRuleDto } from '@src/rule/dto/get-rule.dto';
import { GetNumberOptionDto, GetStringOptionDto } from './options/get-option.dto';

export class GetAttributeDto extends CreateAttributeDto {
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
        title: 'Rule',
        nullable: true,
        required: false,
        type: GetRuleDto
    })
    @IsOptional()
    @ValidateNested()
    @Type(() => GetRuleDto)
    rule: GetRuleDto;

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

export class AttributeResponseDto extends QueryResponseDto {
    @ApiProperty()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => GetAttributeDto)
    result?: GetAttributeDto[];
}
