import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateAttributeRulesDto } from '../rules/create-rule.dto';
import { AttributeDescriptionDto } from '../../base/attributes/attribute-base.dto';
import { CreateAttributeOptionsDto } from '../options/create-option.dto';

export class CreateAttributeDto {
    @ApiProperty({ type: AttributeDescriptionDto })
    @ValidateNested({ each: true })
    description: AttributeDescriptionDto;

    @ApiProperty({ type: [CreateAttributeOptionsDto] })
    @ValidateNested({ each: true })
    options: CreateAttributeOptionsDto[];

    @ApiProperty({ type: CreateAttributeRulesDto })
    @IsNotEmpty()
    rule: CreateAttributeRulesDto;
}
