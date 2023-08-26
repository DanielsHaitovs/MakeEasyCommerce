import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { ToBoolean } from '../decorator/eav-attribute-rule.decorator';
import { AttributeType } from '../entities/enum/type.enum';
import { Any } from 'typeorm';

export class AttributeDescriptionDto {
    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    name: string;
    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    code: string;
    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    description: string;
    @ApiProperty({ enum: AttributeType, enumName: 'AttributeType' })
    @IsNotEmpty()
    type: AttributeType;
}

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

export class AttributeOptionsDto {
    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    name: string;
    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    code: string;
    @ApiProperty({
        type: [String, Number, Boolean, JSON, Date],
    })
    @IsNotEmpty()
    values: [number] | [string] | [boolean] | [JSON] | [Date];
}

export class AttributeRuleDto {
    @ApiProperty({ type: () => RuleDto })
    @ValidateNested({ each: true })
    front: RuleDto;
    @ApiProperty({ type: () => RuleDto })
    @ValidateNested({ each: true })
    back: RuleDto;
}

export class CreateAttributeDto {
    @ApiProperty({ type: () => AttributeDescriptionDto })
    @ValidateNested({ each: true })
    description: AttributeDescriptionDto;

    @ApiProperty({ type: () => AttributeRuleDto })
    @ValidateNested({ each: true })
    rule: AttributeRuleDto;

    @ApiProperty({ type: () => AttributeOptionsDto })
    @ValidateNested({ each: true })
    options: AttributeOptionsDto;
}
