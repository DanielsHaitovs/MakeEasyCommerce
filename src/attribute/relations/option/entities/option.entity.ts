import { Attributes } from '@src/attribute/entities/attribute.entity';
import { MecBaseEntity } from '@src/base/entity/base.entity';
import { Column, Entity, Index, ManyToOne } from 'typeorm';

@Entity('product_attribute_option')
@Index('product_attribute_option_index', ['id', 'value'])
export class Option extends MecBaseEntity {
    @Column('jsonb', { nullable: true })
    value: string | number | boolean | Date | JSON;

    // Optional in case if there will be need add only 1 option
    // and request is not related to attribute it self
    @ManyToOne(() => Attributes, (attribute) => attribute.id, {
        nullable: true,
    })
    relatedAttributeID: number;
}
