import { PartialType } from '@nestjs/swagger';
import { CreateRuleDto, RuleBaseDto } from './create-rule.dto';

export class UpdateRuleDto extends PartialType(CreateRuleDto) {}
export class UpdateRuleTypeDto extends PartialType(RuleBaseDto) {}
