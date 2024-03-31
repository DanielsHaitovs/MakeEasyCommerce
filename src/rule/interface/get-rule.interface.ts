import { QueryResponseI } from '@src/mec/interface/query/query.interface';
import { CreateRuleI, RuleBaseI } from './rule.interface';

export interface GetRuleI extends CreateRuleI {
    id: number;
}

export interface GetFrontRuleI {
    id: number;
    front: RuleBaseI;
}

export interface GetBackRuleI {
    id: number;
    back: RuleBaseI;
}

export type RuleResponseI<T> = QueryResponseI<T>;
