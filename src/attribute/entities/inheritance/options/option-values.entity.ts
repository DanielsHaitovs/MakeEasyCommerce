import {
    Column,
    Entity,
    Index,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Attribute } from '../../attribute.entity';

@Entity('attribute_options')
@Index('attribute_option_index', ['id', 'value'])
export class OptionValues {
    @PrimaryGeneratedColumn()
    id: number;

    // Maybe there is point of splitting this into several table
    // Number Attribute Table
    // String Attribute Table and etc.
    @Column('jsonb', { nullable: false })
    value: string | number | boolean | Date | JSON;

    @ManyToOne(() => Attribute, (attribute) => attribute.options)
    attribute: OptionValues;
}
