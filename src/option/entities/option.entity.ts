import { MecBaseEntity } from '@src/mec/entities/mec.entity';
import { Column, Entity, Index } from 'typeorm';

export const OptionAlias = 'AttributeOption';
export const OptionIndex = 'ik_attribute_index_option';
export const OptionIndexKeys: string[] = ['data'];
@Entity('eav_attribute_option')
@Index(OptionIndex, OptionIndexKeys)
export class AttributeOption extends MecBaseEntity {
    @Column('jsonb', { nullable: false })
    data: string | number | boolean | Date | JSON;

    // @ManyToOne(() => Attribute, (attribute) => attribute.id, {
    //     cascade: false,
    //     eager: false,
    //     nullable: false,
    // })
    // @JoinColumn({
    //     name: 'attributeId',
    //     referencedColumnName: 'id',
    //     foreignKeyConstraintName: 'fk_option_index_attribute',
    // })
    // attributeId: number;
}
