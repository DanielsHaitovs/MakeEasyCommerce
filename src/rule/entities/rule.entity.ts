import { RuleBaseEntity } from '@src/mec/entities/attribute/attributes/rule-base';
import { Entity, Index } from 'typeorm';

export const RuleAlias = 'rule';
export const RuleIndex = `ik_attribute_rule_index`;
export const RuleIndexKeys: string[] = [
    'id',
    'front.useInCatalog',
    'front.useInListing',
    'front.useInLayeredNavigation',
    'front.useInFilter',
    'front.useInOptionFilter',
    'front.useInSort',
    'front.useInSearch',
    'front.useInPromo',
    'front.useInReport',
    'back.useInCatalog',
    'back.useInListing',
    'back.useInLayeredNavigation',
    'back.useInFilter',
    'back.useInOptionFilter',
    'back.useInSort',
    'back.useInSearch',
    'back.useInPromo',
    'back.useInReport',
];
@Entity('eav_attribute_rule')
@Index(RuleIndex, RuleIndexKeys)
export class AttributeRule extends RuleBaseEntity {}
