import { ApiProperty } from '@nestjs/swagger';

import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    ValidateNested,
} from 'class-validator';
import { AttributeDescriptionDto } from '../../base/attributes/attribute-base.dto';
import { GetAttributeOptionsDto } from '../options/get-option.dto';
import { GetAttributeRulesDto } from '../rules/get-rule.dto';

export class UpdateAttributeDto {
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    id: number;

    @ApiProperty({ type: AttributeDescriptionDto })
    @ValidateNested({ each: true })
    @IsNotEmpty()
    description: AttributeDescriptionDto;

    @ApiProperty({ type: [GetAttributeOptionsDto] })
    @ValidateNested({ each: true })
    @IsNotEmpty()
    options: GetAttributeOptionsDto[];

    @ApiProperty({ type: GetAttributeRulesDto })
    @ValidateNested({ each: true })
    @IsNotEmpty()
    rule: GetAttributeRulesDto;

    @ApiProperty({ type: [Number] })
    @IsOptional()
    @IsArray()
    options_ids: number[];
}
