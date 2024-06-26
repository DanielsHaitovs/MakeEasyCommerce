/**
 * This enum is used to define the possible types of a rule.
 * It can be either 'front' or 'back'.
 */
export enum RuleType {
    Front = 'front',
    Back = 'back'
}

export enum RuleShortSelect {
    All = 'all',
    Id = 'id',
    Front = 'front',
    Back = 'back'
}

export enum FrontRuleSelect {
    id = 'rule.id',
    UseInCatalog = 'rule.front.useInCatalog',
    UseInListing = 'rule.front.useInListing',
    UseInLayeredNavigation = 'rule.front.useInLayeredNavigation',
    UseInFilter = 'rule.front.useInFilter',
    UseInOptionFilter = 'rule.front.useInOptionFilter',
    UseInSort = 'rule.front.useInSort',
    UseInSearch = 'rule.front.useInSearch',
    UseInPromo = 'rule.front.useInPromo',
    UseInReport = 'rule.front.useInReport'
}

export enum BackRuleSelect {
    id = 'rule.id',
    UseInCatalog = 'rule.back.useInCatalog',
    UseInListing = 'rule.back.useInListing',
    UseInLayeredNavigation = 'rule.back.useInLayeredNavigation',
    UseInFilter = 'rule.back.useInFilter',
    UseInOptionFilter = 'rule.back.useInOptionFilter',
    UseInSort = 'rule.back.useInSort',
    UseInSearch = 'rule.back.useInSearch',
    UseInPromo = 'rule.back.useInPromo',
    UseInReport = 'rule.back.useInReport'
}

export enum RuleProperties {
    Id = 'rule.id',
    FrontUseInCatalog = 'rule.front.useInCatalog',
    FrontUseInListing = 'rule.front.useInListing',
    FrontUseInLayeredNavigation = 'rule.front.useInLayeredNavigation',
    FrontUseInFilter = 'rule.front.useInFilter',
    FrontUseInOptionFilter = 'rule.front.useInOptionFilter',
    FrontUseInSort = 'rule.front.useInSort',
    FrontUseInSearch = 'rule.front.useInSearch',
    FrontUseInPromo = 'rule.front.useInPromo',
    FrontUseInReport = 'rule.front.useInReport',
    BackUseInCatalog = 'rule.back.useInCatalog',
    BackUseInListing = 'rule.back.useInListing',
    BackUseInLayeredNavigation = 'rule.back.useInLayeredNavigation',
    BackUseInFilter = 'rule.back.useInFilter',
    BackUseInOptionFilter = 'rule.back.useInOptionFilter',
    BackUseInSort = 'rule.back.useInSort',
    BackUseInSearch = 'rule.back.useInSearch',
    BackUseInPromo = 'rule.back.useInPromo',
    BackUseInReport = 'rule.back.useInReport'
}

// FrontUseInCatalog = 'rule.front.useInCatalog = :value',
// FrontUseInListing = 'rule.front.useInListing = :value',
// FrontUseInLayeredNavigation = 'rule.front.useInLayeredNavigation = :value',
// FrontUseInFilter = 'rule.front.useInFilter = :value',
// FrontUseInOptionFilter = 'rule.front.useInOptionFilter = :value',
// FrontUseInSort = 'rule.front.useInSort = :value',
// FrontUseInSearch = 'rule.front.useInSearch = :value',
// FrontUseInPromo = 'rule.front.useInPromo = :value',
// FrontUseInReport = 'rule.front.useInReport = :value',
// BackUseInCatalog = 'rule.back.useInCatalog = :value',
// BackUseInListing = 'rule.back.useInListing = :value',
// BackUseInLayeredNavigation = 'rule.back.useInLayeredNavigation = :value',
// BackUseInFilter = 'rule.back.useInFilter = :value',
// BackUseInOptionFilter = 'rule.back.useInOptionFilter = :value',
// BackUseInSort = 'rule.back.useInSort = :value',
// BackUseInSearch = 'rule.back.useInSearch = :value',
// BackUseInPromo = 'rule.back.useInPromo = :value',
// BackUseInReport = 'rule.back.useInReport = :value',
