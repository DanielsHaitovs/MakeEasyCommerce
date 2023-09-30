import { RuleBaseEntity } from '@src/attribute/relations/rule/entities/rule-base.entity';
import { Entity, Index } from 'typeorm';

export const StoreViewIndexPrefix = 'ik_store_view_attribute_rule';
@Entity('store_view_attribute_rule')
@Index(StoreViewIndexPrefix, ['id']) // ??
export class StoreViewRule extends RuleBaseEntity {}
