import {
    Entity,
    Index,
    JoinColumn,
    OneToMany,
    RelationId,
    Unique,
} from 'typeorm';
import { StoreDescription } from './store-base.entity';
import { StoreView } from './store-view.entity';

@Entity('store_index')
@Index('ik_store_index', ['id', 'name', 'code', 'isActive', 'updatedAt'])
@Unique('uk_store_index', ['name', 'code'])
export class Store extends StoreDescription {
    @OneToMany(() => StoreView, (storeView) => storeView.store, {
        cascade: false,
        eager: false,
    })
    @JoinColumn({
        foreignKeyConstraintName: 'fk_store_index',
    })
    storeViews: StoreView[];
    @RelationId((store: Store) => store.storeViews)
    storeViewIds: number[];
}
