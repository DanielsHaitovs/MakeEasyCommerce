import {
    Entity,
    Index,
    JoinColumn,
    ManyToMany,
    OneToMany,
    RelationId,
    Unique,
} from 'typeorm';
import { StoreDescription } from './store-base.entity';
import { StoreView } from './store-view.entity';
import { Attributes } from '@src/attribute/entities/attributes.entity';

@Entity('store_index')
@Index('ik_store_index', ['id', 'name', 'code', 'isActive', 'updatedAt'])
@Unique('uk_store_index', ['name', 'code'])
export class Store extends StoreDescription {
    // For multi store I need to find way how to create new table every time new store is created!
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

    @ManyToMany(() => Attributes, (attributes) => attributes.stores, {
        onUpdate: 'CASCADE',
        cascade: false,
        onDelete: 'NO ACTION',
        eager: false,
        nullable: true,
    })
    attributes: Attributes;
    @RelationId((store: Store) => store.attributes)
    attributesIds: number[];
}
