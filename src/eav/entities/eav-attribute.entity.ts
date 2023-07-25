import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { EAV } from './eav.entity';
import { EAVAttributeRule } from './Inheritance/eav-attribute-rule.entity';
import { Description } from './Inheritance/description.entity';
import { EAVAttributeOption } from './eav-attribute-option.entity';

@Entity('eav_attributes_index')
export class EAVAttribute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column(() => Description)
    attribute: Description;

    @Column({ type: 'enum', enum: ['string', 'number', 'boolean', 'date'] })
    dataType: 'string' | 'number' | 'boolean' | 'date';

    // Additional fields for admin settings (e.g., useInFilter, useInSort, useInReport, etc.)
    @Column(() => EAVAttributeRule)
    rule: EAVAttributeRule;

    // @ManyToOne(() => EAV, (eav) => eav.attributes)
    // eav: EAV;

    @OneToMany(() => EAVAttributeOption, (option) => option.attribute)
    options: EAVAttributeOption[];
}
