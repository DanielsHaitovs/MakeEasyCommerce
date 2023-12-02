import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRuleDto } from './create-rule.dto';
import { IsOptional } from '@nestjs/class-validator';

export class RuleUpdateTypeDto {
    @ApiProperty({
        title: 'Use In Catalog Rule Boolean',
        type: Boolean,
        default: false,
        nullable: false,
        required: false,
    })
    @IsOptional()
    useInCatalog: boolean;

    @ApiProperty({
        title: 'Use In Listing Rule Boolean',
        type: Boolean,
        default: false,
        nullable: false,
        required: false,
    })
    @IsOptional()
    useInListing: boolean;

    @ApiProperty({
        title: 'Use In LayeredNavigation Rule Boolean',
        type: Boolean,
        default: false,
        nullable: false,
        required: false,
    })
    @IsOptional()
    useInLayeredNavigation: boolean;

    @ApiProperty({
        title: 'Use In Filter Rule Boolean',
        type: Boolean,
        default: false,
        nullable: false,
        required: false,
    })
    @IsOptional()
    useInFilter: boolean;

    @ApiProperty({
        title: 'Use In OptionFilter Rule Boolean',
        type: Boolean,
        default: false,
        nullable: false,
        required: false,
    })
    @IsOptional()
    useInOptionFilter: boolean;

    @ApiProperty({
        title: 'Use In Sort Rule Boolean',
        type: Boolean,
        default: false,
        nullable: false,
        required: false,
    })
    @IsOptional()
    useInSort: boolean;

    @ApiProperty({
        title: 'Use In Search Rule Boolean',
        type: Boolean,
        default: false,
        nullable: false,
        required: false,
    })
    @IsOptional()
    useInSearch: boolean;

    @ApiProperty({
        title: 'Use In Promo Rule Boolean',
        type: Boolean,
        default: false,
        nullable: false,
        required: false,
    })
    @IsOptional()
    useInPromo: boolean;

    @ApiProperty({
        title: 'Use In Report Rule Boolean',
        type: Boolean,
        default: false,
        nullable: false,
        required: false,
    })
    @IsOptional()
    useInReport: boolean;
}

export class UpdateRuleDto extends PartialType(CreateRuleDto) {}
export class UpdateRuleTypeDto extends PartialType(RuleUpdateTypeDto) {}
