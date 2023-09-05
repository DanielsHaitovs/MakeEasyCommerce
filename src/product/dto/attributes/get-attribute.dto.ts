import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    ValidateNested,
} from 'class-validator';
import { GetAttributeOptionsDto } from './option/get-option.dto';
import { GetAttributeRulesDto } from './rule/get-rule.dto';
import { AttributeDescriptionDto } from '../base/attributes/attribute-base.dto';

export class GetAttributeShortDto {
    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({ type: AttributeDescriptionDto })
    @ValidateNested({ each: true })
    description: AttributeDescriptionDto;
}

export class GetAttributeDto extends GetAttributeShortDto {
    @ApiProperty({ type: [GetAttributeOptionsDto] })
    @ValidateNested({ each: true })
    options: GetAttributeOptionsDto[];

    @ApiProperty({ type: GetAttributeRulesDto })
    @IsNotEmpty()
    rule: GetAttributeRulesDto;

    @ApiProperty({ type: [Number] })
    @IsOptional()
    @IsArray()
    options_ids: number[];
}
