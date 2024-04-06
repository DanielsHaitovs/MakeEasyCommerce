import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { MecBaseEntity } from '@src/mec/entities/mec.entity';
import { Column, Entity, Index } from 'typeorm';

export const OptionAlias = 'AttributeOption';
export const OptionIndex = 'ik_attribute_index_option';
export const OptionIndexKeys: string[] = ['data'];
@Entity('eav_attribute_string')
export class AttributeOptionString extends MecBaseEntity {
    @Column()
    @Index('ik_option_string')
    @IsNotEmpty()
    @IsString()
    data: string;

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
