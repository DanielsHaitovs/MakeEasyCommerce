import { RuleBaseEntity } from '@src/attribute/relations/rule/entities/rule-base.entity';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Column, Entity, Index } from 'typeorm';

export const StoreViewIndexPrefix = 'ik_store_view_attribute_rule';
@Entity('store_view_attribute_rule')
@Index(StoreViewIndexPrefix, ['id', 'storeView']) // ??
export class StoreViewRule extends RuleBaseEntity {
    @Column({
        type: Number,
        default: 1,
        nullable: false,
    })
    @IsNumber()
    @IsNotEmpty()
    storeView: number;
}
