import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { EAV } from '../../eav.entity';
import { Description } from '../description.entity';
import { AttributeEAVRule } from './eav-attribute-rule.entity';

@Entity('eav_attributes_index')
export class AttributeEAV {
    @PrimaryGeneratedColumn()
    id: number;

    @Column(() => Description)
    attribute: Description;

    // @Column({ type: 'enum', enum: ['string', 'number', 'boolean', 'date'] })
    // dataType: 'string' | 'number' | 'boolean' | 'date';

    // Additional fields for admin settings (e.g., useInFilter, useInSort, useInReport, etc.)
    @Column(() => AttributeEAVRule)
    rule: AttributeEAVRule;

    @ManyToOne(() => EAV, (eav) => eav.attributes)
    parent_eav: EAV;

    // @OneToMany(() => EAVAttributeOption, (option) => option.attribute)
    // options: EAVAttributeOption[];
}
