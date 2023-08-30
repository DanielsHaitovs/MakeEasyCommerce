import {
    Column,
    Entity,
    Index,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Attribute } from '../../attribute.entity';
import { IsEnum } from 'class-validator';
import { AttributeType } from '../../enum/type.enum';

@Entity('attribute_options')
@Index('attribute_option_index', ['id', 'value'])
export class OptionValues {
    @PrimaryGeneratedColumn()
    id: number;

    // Maybe there is point of splitting this into several tables
    // Number Attribute Table
    // String Attribute Table and etc.
    @Column('jsonb', { nullable: false })
    @IsEnum(AttributeType)
    value: string | number | boolean | Date | JSON;

    @ManyToOne(() => Attribute, (attribute) => attribute.options)
    attribute: OptionValues;
}
