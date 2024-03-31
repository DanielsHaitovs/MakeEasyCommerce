import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';

export class RuleBaseDto {
    @ApiProperty({
        title: 'Use In Catalog Rule Boolean',
        type: Boolean,
        default: false,
        nullable: false
    })
    @IsNotEmpty()
    useInCatalog: boolean;

    @ApiProperty({
        title: 'Use In Listing Rule Boolean',
        type: Boolean,
        default: false,
        nullable: false
    })
    @IsNotEmpty()
    useInListing: boolean;

    @ApiProperty({
        title: 'Use In LayeredNavigation Rule Boolean',
        type: Boolean,
        default: false,
        nullable: false
    })
    @IsNotEmpty()
    useInLayeredNavigation: boolean;

    @ApiProperty({
        title: 'Use In Filter Rule Boolean',
        type: Boolean,
        default: false,
        nullable: false
    })
    @IsNotEmpty()
    useInFilter: boolean;

    @ApiProperty({
        title: 'Use In OptionFilter Rule Boolean',
        type: Boolean,
        default: false,
        nullable: false
    })
    @IsNotEmpty()
    useInOptionFilter: boolean;

    @ApiProperty({
        title: 'Use In Sort Rule Boolean',
        type: Boolean,
        default: false,
        nullable: false
    })
    @IsNotEmpty()
    useInSort: boolean;

    @ApiProperty({
        title: 'Use In Search Rule Boolean',
        type: Boolean,
        default: false,
        nullable: false
    })
    @IsNotEmpty()
    useInSearch: boolean;

    @ApiProperty({
        title: 'Use In Promo Rule Boolean',
        type: Boolean,
        default: false,
        nullable: false
    })
    @IsNotEmpty()
    useInPromo: boolean;

    @ApiProperty({
        title: 'Use In Report Rule Boolean',
        type: Boolean,
        default: false,
        nullable: false
    })
    @IsNotEmpty()
    useInReport: boolean;
}

export class FrontRuleDto extends RuleBaseDto {}
export class BackRuleDto extends RuleBaseDto {}

export class RuleDto {
    @ApiProperty({
        title: 'Front end Attribute Rule',
        type: FrontRuleDto,
        nullable: false
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    front: FrontRuleDto;

    @ApiProperty({
        title: 'Back end Attribute Rule',
        type: BackRuleDto,
        nullable: false
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    back: BackRuleDto;
}

export class CreateRuleDto extends RuleDto {}
