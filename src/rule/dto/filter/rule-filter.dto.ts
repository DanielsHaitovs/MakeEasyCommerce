import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { RuleSelect, RuleType, RuleWhere } from '@src/rule/enum/rule.enum';
import { IsBoolean } from '@nestjs/class-validator';
import { FilterRequestDto } from '@src/mec/dto/filter/query-filter.dto';

export class RuleFindByType {
    @ApiProperty({
        title: 'Attribute Rule Type',
        enum: RuleType,
    })
    ruleType: RuleType;
}

export class RuleSelectDto {
    @ApiProperty({
        title: 'Select Rule Properties',
        description:
            'We can define how will look our response body by providing list of rule properties to select',
        nullable: false,
        enum: RuleSelect,
        isArray: true,
        default: RuleSelect.Id,
        required: false,
    })
    @IsOptional()
    @ValidateNested({ each: true })
    selectProp: RuleSelect[];
}

export class RuleWhereDto {
    @ApiProperty({
        title: 'Where Rule Properties',
        description:
            'Option to include more then 1 of existing rule properties into filtering using same boolean from "whereValue"',
        nullable: false,
        enum: RuleWhere,
        default: '',
        isArray: true,
        required: false,
    })
    @IsOptional()
    @ValidateNested({ each: true })
    selectWhere: RuleWhere[];
}

export class RuleWhereValueDto {
    @ApiProperty({
        title: 'Where Rule is this boolean value',
        description:
            'If "selectWhere" is not provided, this will be ignored! This value is been used in "selectWhere"',
        type: Boolean,
        nullable: true,
        required: false,
    })
    @IsOptional()
    value: boolean;
}

export class RuleQueryFilterDto extends FilterRequestDto {
    @ApiProperty({
        title: 'Filter Rule by ID(s)',
        description: 'We can specify with which rule(s) we need to work',
        type: [Number],
        nullable: true,
        required: false,
        isArray: true,
    })
    @IsOptional()
    @IsNumber()
    @ValidateNested({ each: true })
    ruleIds: number[];

    @ApiProperty({
        title: 'Where Rule Properties',
        description:
            'Option to include more then 1 of existing rule properties into filtering using same boolean from "whereValue"',
        isArray: true,
        enum: RuleWhere,
        required: false,
        nullable: true,
    })
    @IsOptional()
    @ValidateNested({ each: true })
    selectWhere: RuleWhere[];

    @ApiProperty({
        title: 'Where Rule is this boolean value',
        description:
            'If "selectWhere" is not provided, this will be ignored! This value is been used in "selectWhere"',
        type: Boolean,
        nullable: true,
        required: false,
    })
    @IsOptional()
    @IsBoolean()
    whereValue: boolean;

    @ApiProperty({
        title: 'Select Rule Properties',
        description:
            'We can define how will look our response body by providing list of rule properties to select',
        isArray: true,
        enum: RuleSelect,
        required: false,
        nullable: true,
    })
    @IsOptional()
    @ValidateNested({ each: true })
    selectProp: RuleSelect[];
}
