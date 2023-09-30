import { QueryResponseInterface } from '@src/base/interfaces/responses/response.create-query.dto';

export interface RuleConfigInterface {
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

export interface RuleInterface {
    front: RuleConfigInterface;
    back: RuleConfigInterface;
}

export type CreateRulesInterface = RuleInterface;

export type UpdateRulesInterface = RuleInterface;

export interface GetRuleInterface {
    id: number;
    front: RuleConfigInterface;
    back: RuleConfigInterface;
}

export interface GetRuleFrontInterface extends RuleConfigInterface {
    id: number;
}

export interface GetRuleBackInterface extends RuleConfigInterface {
    id: number;
}

export interface RuleResponseInterface extends QueryResponseInterface {
    status: string;
    message: string;
    result?: GetRuleInterface | GetRuleInterface[];
}
