import { PartialType } from '@nestjs/swagger';
import { CreateStoreRuleDto } from './create-attribute-rule.dto';

export class UpdateStoreRuleDto extends PartialType(CreateStoreRuleDto) {}
