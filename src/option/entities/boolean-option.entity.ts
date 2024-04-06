import { IsBoolean, IsNotEmpty } from '@nestjs/class-validator';
import { MecBaseEntity } from '@src/mec/entities/mec.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity('eav_attribute_boolean')
export class AttributeOptionBoolean extends MecBaseEntity {
    @Column({ nullable: false })
    @Index('ik_option_boolean')
    @IsNotEmpty()
    @IsBoolean()
    data: boolean;

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
