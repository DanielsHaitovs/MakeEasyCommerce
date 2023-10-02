import { ApiProperty } from '@nestjs/swagger';
import { QueryResponse } from '@src/base/dto/responses/response.create-query.dto';
import { IsNotEmpty } from 'class-validator';
import { GetRulesDto } from './get-rule.dto';
import { AttributeRuleType } from '@src/base/enum/attributes/attribute-type.enum';

// export class BooleanTransformer {
//     to(value: string): boolean {
//         console.log(value);
//         if (value.toString() == 'false') {
//             return false;
//         }
//         if (value.toString() == 'true') {
//             return true;
//         } else {
//             throw 'error';
//         }
//     }
// }

// export class dataConversion {
//     valueToBoolean(value: string): boolean {
//         if (value === null && value === undefined) {
//             return undefined;
//         }

//         if (['true', 'on', 'yes', '1'].includes(value.toString())) {
//             console.log(value);
//             return true;
//         }
//         if (['false', 'off', 'no', '0'].includes(value.toString())) {
//             return false;
//         }

//         throw 'Value Should be type of boolean';
//     }
// }

export class RuleBaseDto {
    @ApiProperty({
        type: Boolean,
        nullable: false,
    })
    // @Transform(({ value }) => new dataConversion().valueToBoolean(value))
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
        title: 'Front end Attribute Rule',
        type: RuleBaseDto,
        nullable: false,
    })
    back: RuleBaseDto;
}

export class RuleResponseDto extends QueryResponse {
    result?: GetRulesDto | GetRulesDto[];
}

export class RuleFindByType {
    @ApiProperty({
        title: 'Attribute Rule Type',
        enum: AttributeRuleType,
    })
    // @IsEnum(AttributeRuleType)
    ruleType: AttributeRuleType;
}
