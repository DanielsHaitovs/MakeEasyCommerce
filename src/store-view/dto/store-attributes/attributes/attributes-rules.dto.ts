import { UpdateRulesDto } from '@src/attribute/relations/rule/dto/update-rule.dto';
import {
    GetBackRuleDto,
    GetFrontRuleDto,
    GetRulesDto,
} from '@src/attribute/relations/rule/dto/get-rule.dto';
import { CreateRulesDto } from '@src/attribute/relations/rule/dto/create-rule.dto';

export class CreateStoreViewRulesDto extends CreateRulesDto {}

export class GetStoreViewRulesDto extends GetRulesDto {}
export class GetStoreViewFrontRuleDto extends GetFrontRuleDto {}
export class GetStoreViewBackRuleDto extends GetBackRuleDto {}

export class UpdateStoreViewRulesDto extends UpdateRulesDto {}
