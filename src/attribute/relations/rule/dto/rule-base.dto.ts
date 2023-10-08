import { ApiProperty } from '@nestjs/swagger';
import { QueryResponse } from '@src/base/dto/responses/response.create-query.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { GetRuleDto } from './get-rule.dto';
import { AttributeRuleType } from '@src/base/enum/attributes/attribute-type.enum';

export class RuleBaseDto {
    @ApiProperty({
        type: Boolean,
        nullable: false,
    })
    @IsNotEmpty()
    useInCatalog: boolean;

    @ApiProperty({
        title: 'Attribute Rule Boolean',
        type: Boolean,
    })
    @IsNotEmpty()
    useInListing: boolean;

    @ApiProperty({
        title: 'Attribute Rule Boolean',
        type: Boolean,
    })
    @IsNotEmpty()
    useInLayeredNavigation: boolean;

    @ApiProperty({
        title: 'Attribute Rule Boolean',
        type: Boolean,
    })
    @IsNotEmpty()
    useInFilter: boolean;

    @ApiProperty({
        title: 'Attribute Rule Boolean',
        type: Boolean,
    })
    @IsNotEmpty()
    useInOptionFilter: boolean;

    @ApiProperty({
        title: 'Attribute Rule Boolean',
        type: Boolean,
    })
    @IsNotEmpty()
    useInSort: boolean;

    @ApiProperty({
        title: 'Attribute Rule Boolean',
        type: Boolean,
    })
    @IsNotEmpty()
    useInSearch: boolean;

    @ApiProperty({
        title: 'Attribute Rule Boolean',
        type: Boolean,
    })
    @IsNotEmpty()
    useInPromo: boolean;

    @ApiProperty({
        title: 'Attribute Rule Boolean',
        type: Boolean,
    })
    @IsNotEmpty()
    useInReport: boolean;
}

export class RuleDto {
    @ApiProperty({
        title: 'Front end Attribute Rule',
        type: RuleBaseDto,
        nullable: false,
    })
    front: RuleBaseDto;

    @ApiProperty({
        title: 'Back end Attribute Rule',
        type: RuleBaseDto,
        nullable: false,
    })
    back: RuleBaseDto;
}

export class StoreRuleDto {
    @ApiProperty({
        title: 'Front end Attribute Rule',
        type: RuleBaseDto,
        nullable: false,
    })
    @IsNotEmpty()
    front: RuleBaseDto;

    @ApiProperty({
        title: 'Back end Attribute Rule',
        type: RuleBaseDto,
        nullable: false,
    })
    @IsNotEmpty()
    back: RuleBaseDto;
}

export class RuleResponseDto extends QueryResponse {
    result?: GetRuleDto | GetRuleDto[];
}

export class RuleFindByType {
    @ApiProperty({
        title: 'Attribute Rule Type',
        enum: AttributeRuleType,
    })
    ruleType: AttributeRuleType;
}

export class StoreRuleFindBy {
    @ApiProperty({
        title: 'Related Attribute ID',
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    relatedAttribute: number;

    @ApiProperty({
        title: 'Related Store View ID',
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    storeView: number;
}

export class StoreRuleFindByType {
    @ApiProperty({
        title: 'Related Store View ID',
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    storeView: number;

    @ApiProperty({
        title: 'Attribute Rule Type',
        enum: AttributeRuleType,
    })
    ruleType: AttributeRuleType;
}
