import { MecBaseEntity } from '@src/base/entity/base.entity';
import { IsBoolean } from 'class-validator';
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    RelationId,
} from 'typeorm';
import { StoreView } from './store-view.entity';
import { Attributes } from '@src/attribute/entities/attributes.entity';
import { StoreViewRule } from './Attributes/attributes-rule.entity';
import { StoreViewAttributesDescription } from './Attributes/attributes-description.entity';

export const StoreViewIndexPrefix = 'ik_store_view_attribute';
export const StoreViewIndexKeys: string[] = [
    'id',
    'isDefault',
    'storeView',
    'relatedAttribute',
    'rules',
];

@Entity('store_view_attribute')
@Index(StoreViewIndexPrefix, StoreViewIndexKeys)
export class StoreViewAttributes extends MecBaseEntity {
    @Column()
    @IsBoolean()
    isDefault: boolean;

    @ManyToOne(() => StoreView, (storeView) => storeView.id, {
        cascade: false,
        eager: false,
        nullable: false,
    })
    storeView: number;

    @OneToMany(
        () => StoreViewAttributesDescription,
        (attribute) => attribute.relatedAttribute,
        {
            cascade: false,
            eager: false,
            nullable: false,
        },
    )
    attributes: StoreViewAttributesDescription[];
    @RelationId(
        (storeViewAttributes: StoreViewAttributes) =>
            storeViewAttributes.attributes,
    )
    attributesIds: number[];

    @OneToOne(() => Attributes, (attributes) => attributes.id, {
        cascade: false,
        eager: false,
        nullable: true,
    })
    @JoinColumn({
        foreignKeyConstraintName: 'fk_store_view_parent_attribute',
    })
    relatedAttribute: number;

    @OneToOne(() => StoreViewRule, (storeRule) => storeRule, {
        cascade: ['update', 'remove', 'insert'],
        nullable: true,
    })
    @JoinColumn({
        foreignKeyConstraintName: 'fk_store_view_attributes_rules',
    })
    rules: StoreViewRule;
}
