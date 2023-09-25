import { Entity, Index, ManyToOne, Unique } from 'typeorm';
import { StoreViewDescription } from './store-base.entity';
import { Store } from './store.entity';

@Entity('store_index_view')
@Index('ik_store_view_index', ['id', 'name', 'code', 'isActive', 'updatedAt'])
@Unique('uk_store_view_index', ['name', 'code'])
export class StoreView extends StoreViewDescription {
    @ManyToOne(() => Store, (store) => store.storeViews)
    store: number;
}
