import { MecBaseEntity } from '@src/base/entity/base.entity';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToOne,
} from 'typeorm';
import { Attributes } from '@src/attribute/entities/attributes.entity';
import { StoreViewRule } from './store-attribute/attribute-rule.entity';
import { StoreAttributeDescription } from './store-attribute/attributes-description.entity';

export const StoreViewIndexPrefix = 'ik_store_view_attribute';
export const StoreViewIndexKeys: string[] = [
    'id',
    'useDefault',
    'defaultAttribute',
    'storeAttribute',
    'rule',
];

@Entity('store_view_attribute')
@Index(StoreViewIndexPrefix, StoreViewIndexKeys)
export class StoreAttribute extends MecBaseEntity {
    @Column({
        type: Number,
        default: 1,
        nullable: false,
    })
    @IsNumber()
    @IsNotEmpty()
    storeView: number;

    @Column({
        default: true,
        nullable: false,
    })
    @IsBoolean()
    useDefault: boolean;

    @ManyToOne(() => Attributes, (attributes) => attributes.id, {
        cascade: ['update', 'remove', 'insert'],
        eager: false,
        nullable: true,
    })
    @JoinColumn({
        foreignKeyConstraintName: 'fk_store_view_related_attribute',
    })
    defaultAttribute: number;

    @OneToOne(() => StoreAttributeDescription, (description) => description, {
        cascade: ['update', 'remove', 'insert'],
        nullable: true,
    })
    @JoinColumn({
        foreignKeyConstraintName: 'fk_store_view_attribute_index',
    })
    storeAttribute: StoreAttributeDescription;

    @OneToOne(() => StoreViewRule, (storeRule) => storeRule, {
        cascade: true,
        nullable: false,
    })
    @JoinColumn({
        foreignKeyConstraintName: 'fk_store_view_attributes_rules',
    })
    rule: StoreViewRule;
}
