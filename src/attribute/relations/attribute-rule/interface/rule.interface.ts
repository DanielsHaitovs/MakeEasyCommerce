import { QueryResponseI } from '@src/base/interface/response/response.interface';

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
    relatedAttribute: number;
}

export interface CreateRuleI {
    front: RuleConfigI;
    back: RuleConfigI;
}

export interface GetRuleI extends CreateRuleI {
    id: number;
}

export interface GetRuleFrontI extends RuleConfigI {
    id: number;
    relatedAttribute: number;
}

export interface GetRuleBackI extends RuleConfigI {
    id: number;
    relatedAttribute: number;
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
