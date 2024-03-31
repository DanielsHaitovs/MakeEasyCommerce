import { PartialType } from '@nestjs/swagger';
import { BackRuleDto, CreateRuleDto, FrontRuleDto } from './create-rule.dto';

export class UpdateRuleDto extends PartialType(CreateRuleDto) {}
export class UpdateFrontRuleDto extends PartialType(FrontRuleDto) {}
export class UpdateBackRuleDto extends PartialType(BackRuleDto) {}
