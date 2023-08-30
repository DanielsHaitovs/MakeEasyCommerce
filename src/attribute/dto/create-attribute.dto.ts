import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import {
    AttributeDescriptionDto,
    AttributeOptionsDto,
    RuleDto,
} from './attribute.dto';

export class AttributeRuleDto {
    @ApiProperty({ type: RuleDto })
    @ValidateNested({ each: true })
    front: RuleDto;

    @ApiProperty({ type: RuleDto })
    @ValidateNested({ each: true })
    back: RuleDto;
}

export class CreateAttributeDto {
    @ApiProperty({ type: AttributeDescriptionDto })
    @ValidateNested({ each: true })
    description: AttributeDescriptionDto;

    @ApiProperty({ type: [AttributeOptionsDto] })
    @ValidateNested({ each: true })
    options: AttributeOptionsDto[];

    @ApiProperty({ type: AttributeRuleDto })
    @IsNotEmpty()
    rule: AttributeRuleDto;
}
