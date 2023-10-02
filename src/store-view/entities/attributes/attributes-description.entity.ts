import { AttributesBase } from '@src/attribute/entities/attribute.base.entity';
import { Entity, Index, ManyToOne, Unique } from 'typeorm';
import { StoreViewAttributes } from '../store-attributes.entity';

export const StoreViewIndexPrefix = 'ik_store_view_attribute_index';
export const StoreViewUniquePrefix = 'uk_store_view_attribute_index';
export const StoreViewUniqueKeys: string[] = [
    'description.name',
    'description.code',
];
export const StoreViewIndexKeys: string[] = [
    'id',
    'description.code',
    'description.isActive',
    'description.isRequired',
    'relatedAttribute',
];

@Entity('store_view_attribute_index')
@Unique(StoreViewUniquePrefix, StoreViewUniqueKeys)
@Index(StoreViewIndexPrefix, StoreViewIndexKeys)
export class StoreViewAttributesDescription extends AttributesBase {
    @ManyToOne(() => StoreViewAttributes, (attribute) => attribute.id, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        nullable: true,
    })
    relatedAttribute: number;
}
