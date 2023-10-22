import { ApiProperty } from '@nestjs/swagger';
import { RuleType } from '@src/mec/enum/attribute/attributes/rule-type.enum';
import { IsNotEmpty, ValidateNested } from 'class-validator';

export class RuleBaseDto {
    @ApiProperty({
        type: Boolean,
        default: false,
        nullable: false,
    })
    @IsNotEmpty()
    useInCatalog: boolean;

    @ApiProperty({
        title: 'Attribute Rule Boolean',
        type: Boolean,
        default: false,
    })
    @IsNotEmpty()
    useInListing: boolean;

    @ApiProperty({
        title: 'Attribute Rule Boolean',
        type: Boolean,
        default: false,
    })
    @IsNotEmpty()
    useInLayeredNavigation: boolean;

    @ApiProperty({
        title: 'Attribute Rule Boolean',
        type: Boolean,
        default: false,
    })
    @IsNotEmpty()
    useInFilter: boolean;

    @ApiProperty({
        title: 'Attribute Rule Boolean',
        type: Boolean,
        default: false,
    })
    @IsNotEmpty()
    useInOptionFilter: boolean;

    @ApiProperty({
        title: 'Attribute Rule Boolean',
        type: Boolean,
        default: false,
    })
    @IsNotEmpty()
    useInSort: boolean;

    @ApiProperty({
        title: 'Attribute Rule Boolean',
        type: Boolean,
        default: false,
    })
    @IsNotEmpty()
    useInSearch: boolean;

    @ApiProperty({
        title: 'Attribute Rule Boolean',
        type: Boolean,
        default: false,
    })
    @IsNotEmpty()
    useInPromo: boolean;

    @ApiProperty({
        title: 'Attribute Rule Boolean',
        type: Boolean,
        default: false,
    })
    @IsNotEmpty()
    useInReport: boolean;
}

export class FrontRuleDto {
    @ApiProperty({
        type: Boolean,
        default: false,
        nullable: false,
    })
    @IsNotEmpty()
    useInCatalog: boolean;

    @ApiProperty({
        title: 'Attribute Rule Boolean',
        type: Boolean,
        default: false,
    })
    @IsNotEmpty()
    useInListing: boolean;

    @ApiProperty({
        title: 'Attribute Rule Boolean',
        type: Boolean,
        default: false,
    })
    @IsNotEmpty()
    useInLayeredNavigation: boolean;

    @ApiProperty({
        title: 'Attribute Rule Boolean',
        type: Boolean,
        default: false,
    })
    @IsNotEmpty()
    useInFilter: boolean;

    @ApiProperty({
        title: 'Attribute Rule Boolean',
        type: Boolean,
        default: false,
    })
    @IsNotEmpty()
    useInOptionFilter: boolean;

    @ApiProperty({
        title: 'Attribute Rule Boolean',
        type: Boolean,
        default: false,
    })
    @IsNotEmpty()
    useInSort: boolean;

    @ApiProperty({
        title: 'Attribute Rule Boolean',
        type: Boolean,
        default: false,
    })
    @IsNotEmpty()
    useInSearch: boolean;

    @ApiProperty({
        title: 'Attribute Rule Boolean',
        type: Boolean,
        default: false,
    })
    @IsNotEmpty()
    useInPromo: boolean;

    @ApiProperty({
        title: 'Attribute Rule Boolean',
        type: Boolean,
        default: false,
    })
    @IsNotEmpty()
    useInReport: boolean;
}

export class BackRuleDto {
    @ApiProperty({
        type: Boolean,
        default: false,
        nullable: false,
    })
    @IsNotEmpty()
    useInCatalog: boolean;

    @ApiProperty({
        title: 'Attribute Rule Boolean',
        type: Boolean,
        default: false,
    })
    @IsNotEmpty()
    useInListing: boolean;

    @ApiProperty({
        title: 'Attribute Rule Boolean',
        type: Boolean,
        default: false,
    })
    @IsNotEmpty()
    useInLayeredNavigation: boolean;

    @ApiProperty({
        title: 'Attribute Rule Boolean',
        type: Boolean,
        default: false,
    })
    @IsNotEmpty()
    useInFilter: boolean;

    @ApiProperty({
        title: 'Attribute Rule Boolean',
        type: Boolean,
        default: false,
    })
    @IsNotEmpty()
    useInOptionFilter: boolean;

    @ApiProperty({
        title: 'Attribute Rule Boolean',
        type: Boolean,
        default: false,
    })
    @IsNotEmpty()
    useInSort: boolean;

    @ApiProperty({
        title: 'Attribute Rule Boolean',
        type: Boolean,
        default: false,
    })
    @IsNotEmpty()
    useInSearch: boolean;

    @ApiProperty({
        title: 'Attribute Rule Boolean',
        type: Boolean,
        default: false,
    })
    @IsNotEmpty()
    useInPromo: boolean;

    @ApiProperty({
        title: 'Attribute Rule Boolean',
        type: Boolean,
        default: false,
    })
    @IsNotEmpty()
    useInReport: boolean;
}

export class RuleDto {
    @ApiProperty({
        title: 'Front end Attribute Rule',
        type: FrontRuleDto,
        nullable: false,
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    front: FrontRuleDto;

    @ApiProperty({
        title: 'Back end Attribute Rule',
        type: BackRuleDto,
        nullable: false,
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    back: BackRuleDto;
}

export class RuleFindByType {
    @ApiProperty({
        title: 'Attribute Rule Type',
        enum: RuleType,
    })
    ruleType: RuleType;
}
