import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Attribute } from '../../attribute.entity';

@Entity('attribute_option_values')
export class OptionValues {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    values: number | string | boolean | Date | JSON;

    // @ManyToOne(() => Attribute, (attribute) => attribute.option)
    // attribute: OptionValues;
}