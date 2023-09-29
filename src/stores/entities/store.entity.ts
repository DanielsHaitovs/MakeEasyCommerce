import {
    Entity,
    Index,
    JoinColumn,
    OneToMany,
    RelationId,
    Unique,
} from 'typeorm';
import { StoreDescription } from '../relations/store-views/entities/store-base.entity';
import { StoreView } from '../relations/store-views/entities/store-view.entity';
export const StoreIndexPrefix = 'ik_store_index';
export const StoreUniquePrefix = 'uk_store_index';
export const StoreUniqueKeys: string[] = ['name', 'code'];
export const StoreIndexKeys: string[] = [
    'id',
    'name',
    'code',
    'isActive',
    'updatedAt',
];

@Entity('store_index')
@Unique(StoreUniquePrefix, StoreUniqueKeys)
@Index(StoreIndexPrefix, StoreIndexKeys)
export class Store extends StoreDescription {
    @OneToMany(() => StoreView, (storeView) => storeView.store, {
        cascade: ['update', 'remove', 'insert'],
        eager: false,
        nullable: true,
    })
    @JoinColumn({
        foreignKeyConstraintName: 'fk_store_view_index',
    })
    storeViews: StoreView[];
    @RelationId((store: Store) => store.storeViews)
    storeViewIds: number[];
}
