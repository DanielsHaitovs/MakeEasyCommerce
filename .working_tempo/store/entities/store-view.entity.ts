import { MecBaseEntity } from '@src/base/entity/base.entity';
import { Column, Entity, Index, ManyToOne, Unique } from 'typeorm';
import { StoreViewDescription } from './store-base.entity';
import { Store } from './store.entity';

@Entity('store_index_view')
@Index('ik_store_view_index', ['id', 'view.name', 'view.code', 'view.isActive'])
@Unique('uk_store_view_index', ['view.name', 'view.code'])
export class StoreView extends MecBaseEntity {
    @Column(() => StoreViewDescription)
    view: StoreViewDescription;

    @ManyToOne(() => Store, (store) => store.storeViews)
    store: Store;
}
