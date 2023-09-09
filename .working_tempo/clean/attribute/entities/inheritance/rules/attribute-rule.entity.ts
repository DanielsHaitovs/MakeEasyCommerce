import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Rule } from './rule.entity';
import { Attribute } from '../../attribute.entity';

@Entity('attribute_rule')
export class AttributeRule {
    @PrimaryGeneratedColumn()
    id: number;

    @Column(() => Rule)
    front: Rule;

    @Column(() => Rule)
    back: Rule;

    @OneToOne(() => Attribute, (attribute) => attribute.rule)
    attribute: Attribute;
}
