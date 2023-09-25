import { MecBaseEntity } from '@src/base/entity/base.entity';
import {
    Column,
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
@Index('ik_store_index', [
    'id',
    'description.name',
    'description.code',
    'description.isActive',
])
@Unique('uk_store_index', ['description.name', 'description.code'])
export class Store extends MecBaseEntity {
    @Column(() => StoreDescription)
    description: StoreDescription;

    @OneToMany(() => StoreView, (storeView) => storeView.store, {
        cascade: ['update', 'remove', 'insert'],
        nullable: false,
    })
    @JoinColumn({
        foreignKeyConstraintName: 'fk_store_index_view',
    })
    storeViews: StoreView[];
    @RelationId((store: Store) => store.storeViews)
    storeViewIds: number[];
}
