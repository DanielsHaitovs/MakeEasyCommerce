import { MecBaseEntity } from '@src/base/entity/base.entity';
import { IsBoolean } from 'class-validator';
import { Column } from 'typeorm';

export abstract class FrontRuleConfigEntity {
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

export abstract class BackRuleConfigEntity {
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

export abstract class RuleBaseEntity extends MecBaseEntity {
    @Column(() => FrontRuleConfigEntity)
    front: FrontRuleConfigEntity;

    @Column(() => BackRuleConfigEntity)
    back: BackRuleConfigEntity;
}
