import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EAVAttribute } from './eav-attribute.entity';

@Entity('eav_attributes_options')
export class EAVAttributeOption {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNumber()
    type: number;

    @Column()
    @IsString()
    value: string;

    @ManyToOne(() => EAVAttribute, (attribute) => attribute.options)
    attribute: EAVAttribute;
    // Other properties specific to your app's requirements (e.g., description, units, etc.)
    // Specifically Attribute options values
    // Keep in mind that Options might be different
    // Swatch option should have different types of options
    // like image, color, svg, (url?)
    // single attribute value option (only 1 color or only 1 size)
}
