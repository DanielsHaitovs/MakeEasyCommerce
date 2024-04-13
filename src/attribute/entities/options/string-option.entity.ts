import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { MecBaseEntity } from '@src/mec/entities/mec.entity';
import { Column, Entity, Index, ManyToOne, JoinColumn } from 'typeorm';
import { Attribute } from '../attribute.entity';

// export const OptionAlias = 'AttributeOption';
// export const OptionIndex = 'ik_attribute_index_option';
// export const OptionIndexKeys: string[] = ['data'];
@Entity('attribute_option_string')
export class AttributeOptionString extends MecBaseEntity {
    @Column({ nullable: false })
    @Index('ik_option_string')
    @IsNotEmpty()
    @IsString()
    data: string;

    @ManyToOne(() => Attribute, (attribute) => attribute.stringOptions, {})
    @JoinColumn({
        name: 'attributeId',
        referencedColumnName: 'id'
    })
    attribute: Attribute;
}
