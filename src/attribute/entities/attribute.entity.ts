import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    Index,
    OneToMany,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { OptionValues } from './inheritance/options/option-values.entity';
import { AttributeDescription } from './inheritance/description/description.entity';
import { AttributeRule } from './inheritance/rules/attribute-rule.entity';

@Entity('attribute_index')
@Index('attribute_index_index', ['id'])
export class Attribute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column(() => AttributeDescription)
    description: AttributeDescription;

    // This will be handy defining catalog attribute group
    // And adding into this group all related catalog attributes
    // Same should work for all entities!
    // Lets assume that this should be assigned
    // per each eav model that will come in future.
    @ManyToOne(() => Attribute, { onDelete: 'CASCADE' })
    parent: Attribute; // Optional parent attribute for handling arrays

    @OneToMany(() => OptionValues, (option) => option.attribute, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    options: OptionValues[];

    @OneToOne(() => AttributeRule, (rule) => rule.attribute, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({
        name: 'rule_id',
        foreignKeyConstraintName: 'fk_attribute_index_rule',
    })
    rule: AttributeRule;
}
