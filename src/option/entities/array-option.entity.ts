import { IsNotEmpty } from '@nestjs/class-validator';
import { MecBaseEntity } from '@src/mec/entities/mec.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity('eav_attribute_option_array')
export class AttributeOptionJSON extends MecBaseEntity {
    @Column({ type: 'jsonb', nullable: false })
    @Index('ik_option_array')
    @IsNotEmpty()
    data: JSON;

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
