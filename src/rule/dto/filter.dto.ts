import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, ValidateNested, IsBoolean, IsString } from '@nestjs/class-validator';
import { RuleType, RuleProperties } from '@src/rule/enum/rule.enum';
import { QueryFilterDto } from '@src/mec/dto/query/filter.dto';

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
        enum: RuleProperties,
        default: '',
        isArray: true,
        required: false
    })
    @IsOptional()
    @ValidateNested({ each: true })
    selectWhere: RuleProperties[];
}

export class RuleWhereValueDto {
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
        title: 'Filter Rule by ID(s)',
        description: 'We can specify with which rule(s) we need to work, by providing list of rule ids',
        type: Number,
        nullable: true,
        required: false,
        isArray: true
    })
    @IsOptional()
    @IsNumber({}, { each: true })
    ruleIds: number[];

    @ApiProperty({
        title: 'Where Rule Properties',
        description: 'Option to include more then 1 of existing rule properties into filtering using value from "findByValue"',
        isArray: true,
        type: [String],
        required: false,
        nullable: true
    })
    @IsOptional()
    @IsString({ each: true })
    selectWhere: string[];

    @ApiProperty({
        title: 'Where Rule is this boolean value',
        description: 'If "selectWhere" is not provided, this will be ignored! This value is been used in "selectWhere"',
        type: Boolean,
        nullable: true,
        required: false
    })
    @IsOptional()
    @IsBoolean()
    findByValue: boolean;

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
