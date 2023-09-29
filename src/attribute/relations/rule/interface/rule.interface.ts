import { QueryResponseInterface } from '@src/base/interfaces/responses/response.create-query.dto';

export interface RuleBaseInterface {
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
    front: RuleBaseInterface;
    back: RuleBaseInterface;
}

export type CreateRulesInterface = RuleInterface;

export type UpdateRulesInterface = RuleInterface;

export interface GetRuleInterface {
    id: number;
    front: RuleBaseInterface;
    back: RuleBaseInterface;
}

export interface GetRuleFrontInterface extends RuleBaseInterface {
    id: number;
}

export interface GetRuleBackInterface extends RuleBaseInterface {
    id: number;
}

export interface RuleResponseInterface extends QueryResponseInterface {
    status: string;
    message: string;
    result?: GetRuleInterface | GetRuleInterface[];
}
