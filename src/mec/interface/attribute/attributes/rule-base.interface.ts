import { QueryFilterI } from '../../query/query-base.interface';
import { SelectQueryBuilder } from 'typeorm';
import { Rule } from '@src/rule/entities/rule.entity';

export interface FrontRuleSettingsI {
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

export interface BackRuleSettingsI {
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

export interface RuleBaseI {
    front: FrontRuleSettingsI;
    back: BackRuleSettingsI;
}

export interface RuleSelectI {
    all?: boolean;
    id?: boolean;
    front?: FrontRuleSettingsI;
    back?: BackRuleSettingsI;
}

export interface RuleQueryFilterI extends QueryFilterI {
    message?: string;
    many: boolean;
    query: SelectQueryBuilder<Rule>;
}

export interface RuleQueryI {
    many: boolean;
    query: SelectQueryBuilder<Rule>;
}
