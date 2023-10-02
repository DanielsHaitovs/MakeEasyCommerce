import { QueryResponseI } from '@src/base/interfaces/responses/response.create-query.dto';

export interface RuleConfigI {
    useInCatalog: boolean;
    useInListing: boolean;
    useInLayeredNavigation: boolean;
    useInFilter: boolean;
    useInOptionFilter: boolean;
    useInSort: boolean;
    useInSearch: boolean;
    useInPromo: boolean;
    useInReport: boolean;
}

export interface RuleI {
    front: RuleConfigI;
    back: RuleConfigI;
}

export type CreateRulesI = RuleI;

export type UpdateRulesI = RuleI;

export interface GetRuleI {
    id: number;
    front: RuleConfigI;
    back: RuleConfigI;
}

export interface GetRuleFrontI extends RuleConfigI {
    id: number;
}

export interface GetRuleBackI extends RuleConfigI {
    id: number;
}

export interface UpdateRuleI {
    front?: RuleConfigI;
    back?: RuleConfigI;
}

export interface RuleResponseI extends QueryResponseI {
    status: string;
    message: string;
    result?: GetRuleI | GetRuleI[];
}
