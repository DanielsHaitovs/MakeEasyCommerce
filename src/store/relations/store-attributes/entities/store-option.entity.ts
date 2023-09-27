import { Option } from '@src/attribute/relations/option/entities/option.entity';
import { MecBaseEntity } from '@src/base/entity/base.entity';
import { Column, Entity, Index, ManyToOne } from 'typeorm';

@Entity('eav_store_option')
@Index('ik_store_option_index', ['id', 'value'])
export class StoreOption extends MecBaseEntity {
    @Column('jsonb', { nullable: false })
    value: string | number | boolean | Date | JSON;

    @ManyToOne(() => Option, (option) => option.id, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        nullable: true,
    })
    relatedOption: number;
}

// That would be seek
// For multi store I need to find way how to create new table every time new store is created!
// When new store is created should appear new table that contains same table as this Option Class
// Also I need to find way how to make it look like I created new typeorm One To Many relation in Attribute Entity
// I guess it finally time to create db schema for my attribute

// export abstract class OptionBase {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @CreateDateColumn()
//     createdAt: Date;

//     @UpdateDateColumn()
//     updatedAt: Date;

//     @Column('jsonb', { nullable: false })
//     value: string | number | boolean | Date | JSON;

//     @ManyToOne(() => Store, (store) => store.id)
//     store: number;

//     @ManyToOne(() => Attributes, (attribute) => attribute.id, {
//         onUpdate: 'CASCADE',
//         onDelete: 'CASCADE',
//         nullable: true,
//     })
//     relatedAttribute: number;
// }

// Function to dynamically create a new entity class and relationship
// export function createNewEntity(storeName: string) {
//     @Entity(`${storeName}_option`)
//     class StoreOption extends OptionBase {}

//     return { StoreOption };
// }
