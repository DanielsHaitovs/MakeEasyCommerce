import { Column, Entity, Index } from 'typeorm';
import { AttributeDescription } from '@src/attribute/entities/attribute-description.entity';
import { MecBaseEntity } from '@src/base/entity/base.entity';

export const StoreViewIndexPrefix = 'ik_store_view_attribute_index';
export const StoreViewIndexKeys: string[] = [
    'id',
    'description.code',
    'description.isActive',
    'description.isRequired',
];

@Entity('store_view_attribute_index')
@Index(StoreViewIndexPrefix, StoreViewIndexKeys)
export class StoreAttributeDescription extends MecBaseEntity {
    @Column(() => AttributeDescription)
    description: AttributeDescription;
}
