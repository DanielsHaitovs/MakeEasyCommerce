import { Attributes } from '@src/attribute/entities/attributes.entity';
import { MecBaseEntity } from '@src/base/entity/base.entity';
import {
    Column,
    Entity,
    Index,
    ManyToOne,
    OneToMany,
    RelationId,
} from 'typeorm';

@Entity('eav_attribute_option')
@Index('ik_attribute_option_index', ['id', 'value'])
export class Option extends MecBaseEntity {
    @Column('jsonb', { nullable: false })
    value: string | number | boolean | Date | JSON;

    // Optional in case if there will be need add only 1 option
    // and request is not related to attribute it self
    @ManyToOne(() => Attributes, (attribute) => attribute.id, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        nullable: true,
    })
    relatedAttribute: number;

    // @OneToMany(() => StoreOption, (store) => store.relatedOption, {
    //     cascade: false,
    //     eager: false,
    // })
    // store: StoreOption;
    // @RelationId((option: Option) => option.store)
    // storeIds: number[];
}

// For multi store I need to find way how to create new table every time new store is created!
// When new store is created should appear new table that contains same table as this Option Class
// Also I need to find way how to make it look like I created new typeorm One To Many relation in Attribute Entity
// I guess it finally time to create db schema for my attribute
