import {
    BackRuleSettingsI,
    FrontRuleSettingsI,
    RuleBaseI,
} from '@src/mec/interface/attribute/attributes/rule-base.interface';
import { QueryResponseI } from '@src/mec/interface/response/response.interface';

export type RuleI = RuleBaseI;
export type CreateRuleI = RuleI;

export interface UpdateRuleI {
    front?: FrontRuleSettingsI;
    back?: BackRuleSettingsI;
}

export interface PrepareRuleResponseI extends QueryResponseI {
    result?: CreateRuleI;
}
