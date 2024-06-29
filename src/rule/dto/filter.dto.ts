import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, ValidateNested, IsBoolean, IsString } from '@nestjs/class-validator';
import { RuleType, RuleProperties, RuleWhereProperties } from '@src/rule/enum/rule.enum';
import { QueryFilterDto } from '@src/mec/dto/query/filter.dto';
import { Type } from '@nestjs/class-transformer';

export class RuleFindByType {
    @ApiProperty({
        title: 'Attribute Rule Type',
        enum: RuleType
    })
    ruleType: RuleType;
}

export class RuleSelectDto {
    @ApiProperty({
        title: 'Select Rule Properties',
        description: 'We can define how will look our response body by providing list of rule properties to select',
        nullable: false,
        enum: RuleProperties,
        isArray: true,
        default: RuleProperties.Id,
        required: false
    })
    @IsOptional()
    @ValidateNested({ each: true })
    selectProp: RuleProperties[];
}

export class RuleWhereDto {
    @ApiProperty({
        title: 'Where Rule Properties',
        description: 'Option to include more then 1 of existing rule properties into filtering using same boolean from "whereValue"',
        nullable: false,
        enum: RuleWhereProperties,
        default: '',
        isArray: false,
        required: false
    })
    @IsOptional()
    @ValidateNested({ each: true })
    property: RuleWhereProperties;
}

export class RuleWhereFilterDto extends RuleWhereDto {
    @ApiProperty({
        title: 'Where Rule is this boolean value',
        description: 'If "selectWhere" is not provided, this will be ignored! This value is been used in "selectWhere"',
        type: Boolean,
        nullable: true,
        required: false
    })
    @IsOptional()
    value: boolean;
}

export class RuleQueryDto extends QueryFilterDto {
    @ApiProperty({
        title: 'Find Where Value',
        description: 'Value to find in "selectWhere" properties',
        type: RuleWhereFilterDto,
        isArray: true,
        nullable: false,
        required: false
    })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => RuleWhereFilterDto)
    findWhere: RuleWhereFilterDto[];

    @ApiProperty({
        title: 'Select Rule Properties',
        description: 'We can define how will look our response body by providing list of rule properties to select',
        isArray: true,
        enum: RuleProperties,
        required: false,
        nullable: true
    })
    @IsOptional()
    @ValidateNested({ each: true })
    selectProp: RuleProperties[];
}
