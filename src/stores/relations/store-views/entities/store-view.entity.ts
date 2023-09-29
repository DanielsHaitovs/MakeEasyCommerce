import {
    Entity,
    Index,
    ManyToMany,
    ManyToOne,
    RelationId,
    Unique,
} from 'typeorm';
import { StoreViewDescription } from './store-base.entity';
import { Store } from '@src/stores/entities/store.entity';
export const StoreViewIndexPrefix = 'ik_storeView_index';
export const StoreViewUniquePrefix = 'uk_storeView_index';
export const StoreViewUniqueKeys: string[] = ['name', 'code'];
export const StoreViewIndexKeys: string[] = [
    'id',
    'name',
    'code',
    'isActive',
    'updatedAt',
];

@Entity('store_index_view')
@Unique(StoreViewUniquePrefix, StoreViewUniqueKeys)
@Index(StoreViewIndexPrefix, StoreViewIndexKeys)
export class StoreView extends StoreViewDescription {
    @ManyToOne(() => Store, (store) => store.storeViews, {
        cascade: false,
        eager: false,
        nullable: false,
    })
    store: number;

    // @ManyToMany(() => Attributes, (attributes) => attributes.storesViews, {
    //     onUpdate: 'CASCADE',
    //     cascade: false,
    //     onDelete: 'NO ACTION',
    //     eager: false,
    //     nullable: true,
    // })
    // attributes: Attributes;
    // @RelationId((storeViews: StoreView) => storeViews.attributes)
    // attributesIds: number[];
}
