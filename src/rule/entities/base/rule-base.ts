import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Column } from 'typeorm';

export abstract class RuleConfigEntity {
    @Column({
        default: false,
        nullable: false
    })
    @IsNotEmpty()
    @IsBoolean()
    useInCatalog: boolean;

    @Column({
        default: false,
        nullable: false
    })
    @IsNotEmpty()
    @IsBoolean()
    useInListing: boolean;

    @Column({
        default: false,
        nullable: false
    })
    @IsNotEmpty()
    @IsBoolean()
    useInLayeredNavigation: boolean;

    @Column({
        default: false,
        nullable: false
    })
    @IsNotEmpty()
    @IsBoolean()
    useInFilter: boolean;

    @Column({
        default: false,
        nullable: false
    })
    @IsNotEmpty()
    @IsBoolean()
    useInOptionFilter: boolean;

    @Column({
        default: false,
        nullable: false
    })
    @IsNotEmpty()
    @IsBoolean()
    useInSort: boolean;

    @Column({
        default: false,
        nullable: false
    })
    @IsNotEmpty()
    @IsBoolean()
    useInSearch: boolean;

    @Column({
        default: false,
        nullable: false
    })
    @IsNotEmpty()
    @IsBoolean()
    useInPromo: boolean;

    @Column({
        default: false,
        nullable: false
    })
    @IsNotEmpty()
    @IsBoolean()
    useInReport: boolean;
}

export abstract class FrontRuleConfigEntity extends RuleConfigEntity {}
export abstract class BackRuleConfigEntity extends RuleConfigEntity {}
