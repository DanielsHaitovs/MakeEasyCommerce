import { IsBoolean } from 'class-validator';
import {
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export abstract class RuleConfigEntity {
    @Column()
    @IsBoolean()
    useInCatalog: boolean;

    @Column()
    @IsBoolean()
    useInListing: boolean;

    @Column()
    @IsBoolean()
    useInLayeredNavigation: boolean;

    @Column()
    @IsBoolean()
    useInFilter: boolean;

    @Column()
    @IsBoolean()
    useInOptionFilter: boolean;

    @Column()
    @IsBoolean()
    useInSort: boolean;

    @Column()
    @IsBoolean()
    useInSearch: boolean;

    @Column()
    @IsBoolean()
    useInPromo: boolean;

    @Column()
    @IsBoolean()
    useInReport: boolean;
}

export abstract class RuleBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column(() => RuleConfigEntity)
    front: RuleConfigEntity;

    @Column(() => RuleConfigEntity)
    back: RuleConfigEntity;
}
