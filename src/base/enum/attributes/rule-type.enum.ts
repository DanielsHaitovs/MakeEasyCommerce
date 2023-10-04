import { CreateRuleI } from '@src/attribute/relations/rule/interface/rule.interface';

export const defaultrule: CreateRuleI = {
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
