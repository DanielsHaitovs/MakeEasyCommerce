import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { EAV } from '../../eav.entity';
import { Description } from '../description.entity';
import { AttributeEAVRule } from './eav-attribute-rule.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('eav_attributes_index')
export class AttributeEAV {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ type: () => Description })
    @Column(() => Description)
    attribute: Description;

    // @Column({ type: 'enum', enum: ['string', 'number', 'boolean', 'date'] })
    // dataType: 'string' | 'number' | 'boolean' | 'date';

    // Additional fields for admin settings (e.g., useInFilter, useInSort, useInReport, etc.)
    // @ApiProperty({ type: () => AttributeEAVRule })
    @Column(() => AttributeEAVRule)
    rule: AttributeEAVRule;

    // @ApiProperty({ type: () => EAV })
    @ManyToOne(() => EAV, (eav) => eav.attributes)
    parent_eav: EAV;

    // @OneToMany(() => EAVAttributeOption, (option) => option.attribute)
    // options: EAVAttributeOption[];
}
