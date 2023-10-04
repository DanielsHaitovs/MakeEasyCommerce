import { StoreViewDescription } from '@src/stores/entities/store-base.entity';
import { Store } from '@src/stores/entities/store.entity';
import {
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    RelationId,
    Unique,
} from 'typeorm';
import { StoreAttribute } from '../store-attribute/entities/store-attribute.entity';
export const StoreViewIndexPrefix = 'ik_store_view_index';
export const StoreViewUniquePrefix = 'uk_store_view_index';
export const StoreViewUniqueKeys: string[] = ['name', 'code'];
export const StoreViewIndexKeys: string[] = [
    'id',
    'name',
    'code',
    'isActive',
    'updatedAt',
    'store',
];

@Entity('store_view')
@Unique(StoreViewUniquePrefix, StoreViewUniqueKeys)
@Index(StoreViewIndexPrefix, StoreViewIndexKeys)
export class StoreView extends StoreViewDescription {
    @ManyToOne(() => Store, (store) => store.storeViews, {
        cascade: false,
        eager: false,
        nullable: false,
    })
    store: number;

    @OneToMany(
        () => StoreAttribute,
        (storeAttributes) => storeAttributes.storeView,
        {
            cascade: ['update', 'remove', 'insert'],
            nullable: true,
        },
    )
    @JoinColumn({
        foreignKeyConstraintName: 'fk_store_attribute_index',
    })
    storeAttributes: StoreAttribute;
    @RelationId((storeView: StoreView) => storeView.storeAttributes)
    attributesIds: number[];
}
