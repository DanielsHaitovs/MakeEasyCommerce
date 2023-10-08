import { Attributes } from '@src/attribute/entities/attributes.entity';
import { MecBaseEntity } from '@src/base/entity/base.entity';
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';

export const AttributeOptionIndexPrefix = 'ik_attribute_option_index';
export const AttributeOptionIndexKeys: string[] = [
    'id',
    'value',
    'relatedAttribute',
];

@Entity('eav_attribute_option')
@Index(AttributeOptionIndexPrefix, AttributeOptionIndexKeys)
export class Option extends MecBaseEntity {
    @Column('jsonb', { nullable: false })
    value: string | number | boolean | Date | JSON;

    // Optional in case if there will be need add only 1 option
    // and request is not related to attribute it self
    @ManyToOne(() => Attributes, (attribute) => attribute.id, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        nullable: false,
    })
    relatedAttribute: number;

    // @OneToMany(() => StoreOption, (storeOption) => storeOption, {
    //     cascade: false,
    //     eager: false,
    //     nullable: true,
    // })
    // @JoinColumn({
    //     foreignKeyConstraintName: 'fk_attribute_store_view_options',
    // })
    // storeOptions: StoreOption[];
    // @RelationId((option: Option) => option.storeViewOptions)
    // storeViewOptionsIds: number[];
}

// For multi store I need to find way how to create new table every time new store is created!
// When new store is created should appear new table that contains same table as this Option Class
// Also I need to find way how to make it look like I created new typeorm One To Many relation in Attribute Entity
// I guess it finally time to create db schema for my attribute
