import { MecBaseEntity } from '@src/base/entity/base.entity';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { StoreAttributeDescription } from './attributes-description.entity';
import { Option } from '@src/attribute/relations/option/entities/option.entity';
export const StoreViewIndexPrefix = 'ik_store_view_attribute_options';
export const StoreViewIndexKeys: string[] = [
    'id',
    'value',
    'storeAttribute',
    'parentOption',
];

@Entity('store_view_attribute_option')
@Index(StoreViewIndexPrefix, StoreViewIndexKeys)
export class StoreViewOption extends MecBaseEntity {
    @Column('jsonb', { nullable: false })
    value: string | number | boolean | Date | JSON;

    // @Column({
    //     type: Number,
    //     nullable: false,
    // })
    // @IsNotEmpty()
    // @IsNumber()
    @OneToOne(() => Option, (option) => option.id, {
        cascade: false,
        eager: false,
        nullable: false,
    })
    @JoinColumn({
        foreignKeyConstraintName: 'fk_attributes_store_view_option',
    })
    parentOption: number;

    @ManyToOne(() => StoreAttributeDescription, (attribute) => attribute.id, {
        cascade: false,
        eager: false,
        nullable: false,
    })
    @JoinColumn({
        foreignKeyConstraintName: 'fk_store_view_option_attribute',
    })
    storeAttribute: number;

    @Column({
        type: Number,
        default: 1,
        nullable: false,
    })
    @IsNumber()
    @IsNotEmpty()
    storeView: number;
}
