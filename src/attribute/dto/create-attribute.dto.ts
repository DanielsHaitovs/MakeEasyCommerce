import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
    IsBoolean,
    ValidateNested,
    IsArray,
} from 'class-validator';
import { ToBoolean } from '../decorator/eav-attribute-rule.decorator';

export class RuleDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    @ToBoolean()
    useInCatalog: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    @ToBoolean()
    useInListing: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    @ToBoolean()
    useInLayeredNavigation: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    @ToBoolean()
    useInFilter: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    @ToBoolean()
    useInOptionFilter: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    @ToBoolean()
    useInSort: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    @ToBoolean()
    useInSearch: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    @ToBoolean()
    useInPromo: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    @ToBoolean()
    useInReport: boolean;
}

export class AttributeRuleDto {
    @ApiProperty({ type: RuleDto })
    @ValidateNested({ each: true })
    front: RuleDto;

    @ApiProperty({ type: RuleDto })
    @ValidateNested({ each: true })
    back: RuleDto;
}

export class AttributeOptionsDto {
    @ApiProperty({ type: JSON })
    @IsNotEmpty()
    value: string | number | boolean | Date | JSON;
}

export class AttributeDescriptionDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    code: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    dataType: string;

    @ApiProperty()
    @IsBoolean()
    @ToBoolean()
    isArray: boolean;
}

export class CreateAttributeDto {
    @ApiProperty({ type: AttributeDescriptionDto })
    @ValidateNested({ each: true })
    description: AttributeDescriptionDto;

    @ApiProperty({ type: [AttributeOptionsDto] })
    @IsArray()
    @ValidateNested({ each: true })
    options: AttributeOptionsDto[];

    @ApiProperty({ type: AttributeRuleDto })
    @IsNotEmpty()
    rule: AttributeRuleDto;
}
