import { ApiProperty } from '@nestjs/swagger';
import { FilterRequestDto } from '../../query-filter.dto';
import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import {
    RuleSelect,
    RuleType,
    RuleWhere,
} from '@src/mec/enum/attribute/attributes/rule.enum';
import { IsBoolean } from '@nestjs/class-validator';

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
        nullable: false,
        enum: RuleSelect,
        isArray: true,
        default: RuleSelect.Id,
        required: false,
    })
    @IsOptional()
    @ValidateNested({ each: true })
    select: RuleSelect[];
}

export class RuleWhereDto {
    @ApiProperty({
        title: 'Where Rule Properties',
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
        description: 'If "selectWhere" is not provided, this will be ignored',
        type: Boolean || null,
        nullable: true,
        required: false,
    })
    @IsOptional()
    value: boolean | null;
}

export class RuleQueryFilterDto extends FilterRequestDto {
    @ApiProperty({
        title: 'Filter Rule by this value',
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
        description: 'If "selectWhere" is not provided, this will be ignored',
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
        description: 'If "selectWhere" is not provided, this will be ignored',
        type: Boolean,
        nullable: true,
        required: false,
    })
    @IsOptional()
    @IsBoolean()
    whereValue: boolean;

    @ApiProperty({
        title: 'Select Rule Properties',
        description: 'If "selectProp" is not provided, this will be ignored',
        isArray: true,
        enum: RuleSelect,
        required: false,
        nullable: true,
    })
    @IsOptional()
    @ValidateNested({ each: true })
    selectProp: RuleSelect[];
}
