import { MecBaseEntity } from '@src/base/entity/base.entity';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Column, Entity, Index } from 'typeorm';
export const StoreViewIndexPrefix = 'ik_store_view_attribute_options';
export const StoreViewIndexKeys: string[] = [
    'id',
    'value',
    'relatedAttribute',
    'parentOptionId',
];

@Entity('store_view_attribute_option')
@Index(StoreViewIndexPrefix, StoreViewIndexKeys)
export class StoreViewOption extends MecBaseEntity {
    @Column('jsonb', { nullable: false })
    value: string | number | boolean | Date | JSON;

    @Column({
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    parentOptionId: number;

    @Column({
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    relatedAttribute: number;

    @Column({
        type: Number,
        default: 1,
        nullable: false,
    })
    @IsNumber()
    @IsNotEmpty()
    storeView: number;
}
