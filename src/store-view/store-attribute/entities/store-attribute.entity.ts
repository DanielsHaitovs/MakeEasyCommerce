import { MecBaseEntity } from '@src/base/entity/base.entity';
import { IsBoolean } from 'class-validator';
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToOne,
} from 'typeorm';
import { Attributes } from '@src/attribute/entities/attributes.entity';
import { StoreRule } from './store-attributes/attribute-rule.entity';
import { StoreAttributeDescription } from './store-attributes/attributes-description.entity';
import { StoreView } from '@src/store-view/entities/store-view.entity';

export const StoreViewIndexPrefix = 'ik_store_view_attribute';
export const StoreViewIndexKeys: string[] = [
    'id',
    'useDefault',
    'storeView',
    'relatedAttribute',
    'rule',
];

@Entity('store_view_attribute')
@Index(StoreViewIndexPrefix, StoreViewIndexKeys)
export class StoreAttribute extends MecBaseEntity {
    @Column({
        default: true,
    })
    @IsBoolean()
    useDefault: boolean;

    @OneToOne(() => StoreRule, (storeRule) => storeRule.id, {
        cascade: true,
        nullable: false,
    })
    @JoinColumn({
        foreignKeyConstraintName: 'fk_store_view_attributes_rules',
    })
    rule: StoreRule;

    @ManyToOne(() => StoreView, (storeView) => storeView.id, {
        cascade: false,
        eager: false,
        nullable: false,
    })
    storeView: number;

    @OneToOne(() => StoreAttributeDescription, (attribute) => attribute.id, {
        cascade: ['update', 'remove', 'insert'],
    })
    @JoinColumn({
        foreignKeyConstraintName: 'fk_store_view_attribute_index',
    })
    attributes: StoreAttributeDescription;

    @ManyToOne(() => Attributes, (attributes) => attributes.id, {
        cascade: ['update', 'remove', 'insert'],
        eager: false,
        nullable: true,
    })
    @JoinColumn({
        foreignKeyConstraintName: 'fk_store_view_related_attribute',
    })
    relatedAttribute: number;
}
