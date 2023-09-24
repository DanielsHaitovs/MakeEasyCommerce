import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { RuleBaseEntity } from './rule-base.entity';

@Entity('eav_attribute_rule')
@Index('eav_attribute_rule_index', ['id'])
export class Rule {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column(() => RuleBaseEntity)
    front: RuleBaseEntity;

    @Column(() => RuleBaseEntity)
    back: RuleBaseEntity;
}
