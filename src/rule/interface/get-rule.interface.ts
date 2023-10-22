import { QueryResponseI } from '@src/mec/interface/response/response.interface';
import { CreateRuleI } from './rule.interface';
import {
    BackRuleSettingsI,
    FrontRuleSettingsI,
} from '@src/mec/interface/attribute/attributes/rule-base.interface';

export interface GetRuleI extends CreateRuleI {
    id: number;
}

export interface GetRuleFrontI {
    id: number;
    front: FrontRuleSettingsI;
}

export interface GetRuleBackI {
    id: number;
    back: BackRuleSettingsI;
}

export interface RuleResponseI extends QueryResponseI {
    status: string;
    message: string;
    result?: GetRuleI | GetRuleI[];
}
