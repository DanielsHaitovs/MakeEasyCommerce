import { IsNotEmpty, IsNumber } from '@nestjs/class-validator';
import { MecBaseEntity } from '@src/mec/entities/mec.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity('eav_attribute_number')
export class AttributeOptionNumber extends MecBaseEntity {
    @Column({ nullable: false })
    @Index('ik_option_number')
    @IsNotEmpty()
    @IsNumber()
    data: number;

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
