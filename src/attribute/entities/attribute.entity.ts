import {
    Column,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    RelationId,
} from 'typeorm';
import { AttributeRule } from './inheritance/rules/attribute-rule.entity';
import { AttributeDescription } from './inheritance/description/description.entity';
import { OptionValues } from './inheritance/options/option-values.entity';

@Entity('attribute_index')
@Index('attribute_index_index', ['rule'])
export class Attribute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column(() => AttributeDescription)
    description: AttributeDescription;

    @OneToOne(() => AttributeRule, (rule) => rule.attribute, {
        cascade: true,
        eager: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({
        name: 'rule_id',
        foreignKeyConstraintName: 'fk_attribute_rules_index',
    })
    rule: AttributeRule;

    @OneToMany(() => OptionValues, (options) => options.attribute, {
        cascade: true,
        eager: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    values: OptionValues[];

    @RelationId((attribute: Attribute) => attribute.values)
    values_ids: number[];
}
