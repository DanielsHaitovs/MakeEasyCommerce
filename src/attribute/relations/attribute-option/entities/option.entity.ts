import { Attribute } from '@src/attribute/entities/attribute.entity';
import { MecBaseEntity } from '@src/base/entity/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

export const AttributeOptionIndexPrefix = 'ik_attribute_option_index';
export const AttributeOptionIndexKeys: string[] = [
    'id',
    'value',
    'relatedAttribute',
];

@Entity('eav_attribute_option')
@Index(AttributeOptionIndexPrefix, AttributeOptionIndexKeys)
export class AttributeOption extends MecBaseEntity {
    @Column('jsonb', { nullable: false })
    value: string | number | boolean | Date | JSON;

    @ManyToOne(() => Attribute, (attribute) => attribute.id, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({
        foreignKeyConstraintName: 'fk_attribute_option_index',
    })
    relatedAttribute: number;
}
