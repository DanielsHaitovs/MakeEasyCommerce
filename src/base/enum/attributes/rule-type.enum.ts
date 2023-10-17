import { CreateRuleI } from "@src/attribute/relations/attribute-rule/interface/rule.interface";

export const defaultRule: CreateRuleI = {
    front: {
        useInCatalog: false,
        useInListing: false,
        useInLayeredNavigation: false,
        useInFilter: false,
        useInOptionFilter: false,
        useInSort: false,
        useInSearch: false,
        useInPromo: false,
        useInReport: false,
    },
    back: {
        useInCatalog: false,
        useInListing: false,
        useInLayeredNavigation: false,
        useInFilter: false,
        useInOptionFilter: false,
        useInSort: false,
        useInSearch: false,
        useInPromo: false,
        useInReport: false,
    },
};

export enum RuleFilter {
    All = 'all',
    Id = 'id',
    Front = 'front',
    Back = 'back',
}