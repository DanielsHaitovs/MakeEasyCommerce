import { PartialType } from '@nestjs/swagger';
import { AttributeBaseDto } from './create-attribute.dto';
import { UpdateRuleDto } from '@src/rule/dto/update-rule.dto';

export class UpdateAttributeDto extends PartialType(AttributeBaseDto) {}

export class UpdateAttributeRuleDto extends UpdateRuleDto {}
