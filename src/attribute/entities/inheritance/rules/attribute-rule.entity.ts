import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Rule } from './rule.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Attribute } from '../../attribute.entity';

@Entity('attribute_rule')
export class AttributeRule {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ type: () => Rule })
    @Column(() => Rule)
    front: Rule;

    @ApiProperty({ type: () => Rule })
    @Column(() => Rule)
    back: Rule;

    @OneToOne(() => Attribute, (attribute) => attribute.rule)
    attribute: Attribute;
}
