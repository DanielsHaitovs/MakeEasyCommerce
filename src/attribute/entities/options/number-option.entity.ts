import { IsNotEmpty, IsNumber } from '@nestjs/class-validator';
import { MecBaseEntity } from '@src/mec/entities/mec.entity';
import { Column, Entity, Index, ManyToOne, JoinColumn } from 'typeorm';
import { Attribute } from '../attribute.entity';

@Entity('attribute_option_number')
export class AttributeOptionNumber extends MecBaseEntity {
    @Column({ nullable: false })
    @Index('ik_option_number')
    @IsNotEmpty()
    @IsNumber()
    data: number;

    @ManyToOne(() => Attribute, (attribute) => attribute.numberOptions, {})
    @JoinColumn({
        name: 'attribute',
        referencedColumnName: 'id'
    })
    attribute: Attribute;
}
