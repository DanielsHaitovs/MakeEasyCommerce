import { QueryResponseI } from '@src/mec/interface/query/query.interface';
import { SelectQueryBuilder } from 'typeorm';
import { AttributeRule } from '../entities/rule.entity';

export interface RuleBaseI {
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

export type RuleI = AttributeRule;

export type CreateRuleI = RuleI;

export interface UpdateRuleI {
    front?: RuleBaseI;
    back?: RuleBaseI;
}

export type PrepareRuleResponseI = QueryResponseI<CreateRuleI>;

export interface RuleQueryFilterI {
    message?: string;
    many: boolean;
    query: SelectQueryBuilder<AttributeRule>;
}

export interface RuleQueryI {
    many: boolean;
    query: SelectQueryBuilder<AttributeRule>;
}
