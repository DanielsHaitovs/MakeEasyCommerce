import { RuleBaseEntity } from '@src/attribute/relations/rule/entities/rule-base.entity';
import { Entity, Index } from 'typeorm';

export const RulesIndexPrefix = 'ik_store_view_attribute_rule';
@Entity('store_view_attribute_rule')
@Index(RulesIndexPrefix, ['id']) // ??
export class StoreRule extends RuleBaseEntity {}
