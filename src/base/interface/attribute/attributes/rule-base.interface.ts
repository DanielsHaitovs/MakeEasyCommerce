export interface FrontRuleSettingsI {
    useInCatalog: false;
    useInListing: false;
    useInLayeredNavigation: false;
    useInFilter: false;
    useInOptionFilter: false;
    useInSort: false;
    useInSearch: false;
    useInPromo: false;
    useInReport: false;
}

export interface BackRuleSettingsI {
    useInCatalog: false;
    useInListing: false;
    useInLayeredNavigation: false;
    useInFilter: false;
    useInOptionFilter: false;
    useInSort: false;
    useInSearch: false;
    useInPromo: false;
    useInReport: false;
}

export interface RuleBaseI {
    front: FrontRuleSettingsI;
    back: BackRuleSettingsI;
}
