import { PartialType } from '@nestjs/swagger';
import { CreateRuleDto } from './create-rule.dto';

export class UpdateRuleDto extends PartialType(CreateRuleDto) {}
export class UpdateAttributeRuleDto extends PartialType(CreateRuleDto) {}
