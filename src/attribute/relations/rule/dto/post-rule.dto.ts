import { ApiProperty } from '@nestjs/swagger';
import { RuleDto } from './rule-base.dto';
import { AttributeRuleType } from '@src/base/enum/attributes/attribute-type.enum';
import { IsEnum } from 'class-validator';

export class CreateRulesDto extends RuleDto {
    id: number;
}

export class FilterByRuleTYpe {

}
