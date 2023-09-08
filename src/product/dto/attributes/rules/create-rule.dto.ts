import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { RuleDto } from '../../base/attributes/rules/rule-base.dto';

export class AttributeRulesDto {
    @ApiProperty({ type: RuleDto })
    @ValidateNested({ each: true })
    @IsNotEmpty()
    front: RuleDto;

    @ApiProperty({ type: RuleDto })
    @ValidateNested({ each: true })
    @IsNotEmpty()
    back: RuleDto;
}

export class CreateAttributeRulesDto extends AttributeRulesDto {}
