import { MecBaseEntity } from '@src/base/entity/base.entity';
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { StoreViewAttributes } from '../store-attributes.entity';
import { Option } from '@src/attribute/relations/option/entities/option.entity';
export const StoreViewIndexPrefix = 'ik_store_view_attribute_options';
export const StoreViewIndexKeys: string[] = [
    'id',
    'value',
    'relatedAttribute',
    'relatedOption',
];

@Entity('store_view_attribute_option')
@Index(StoreViewIndexPrefix, StoreViewIndexKeys)
export class StoreViewOption extends MecBaseEntity {
    @Column('jsonb', { nullable: false })
    value: string | number | boolean | Date | JSON;

    // Optional in case if there will be need add only 1 option
    // and request is not related to attribute it self
    @ManyToOne(() => StoreViewAttributes, (attribute) => attribute.id, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        nullable: true,
    })
    relatedAttribute: number;

    @ManyToOne(() => Option, (option) => option.id, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        nullable: true,
    })
    relatedOption: number;
}
