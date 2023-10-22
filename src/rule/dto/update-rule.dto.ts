import { PartialType } from '@nestjs/swagger';
import { CreateRuleDto } from './create-rule.dto';
import { RuleBaseDto } from '@src/mec/dto/attribute/attributes/rule.dto';

export class UpdateRuleDto extends PartialType(CreateRuleDto) {}
export class UpdateRuleTypeDto extends PartialType(RuleBaseDto) {}
