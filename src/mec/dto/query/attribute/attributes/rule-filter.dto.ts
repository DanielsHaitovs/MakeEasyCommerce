import { RuleSelect } from '@src/mec/enum/attribute/attributes/rule-type.enum';
import { FilterRequestDto, QueryFilterDto } from '../../query-filter.dto';
import {
    IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OptionI } from '@src/mec/interface/attribute/attributes/option-base.interface';
import { OptionDto } from '@src/mec/dto/attribute/attributes/option.dto';

export class RuleSelectDto {
    @ApiProperty({
        title: 'Select Rule Properties',
        nullable: false,
        enum: RuleSelect,
        isArray: true,
        default: RuleSelect.Id,
        required: false,
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    properties: RuleSelect[];
}

export class RuleColumnDto {
    @ApiProperty({
        title: 'Filter Rule using Select Rule Properties',
        nullable: false,
        enum: RuleSelect,
        default: RuleSelect.Id,
        required: false,
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    column: RuleSelect;

    @ApiProperty({
        title: 'Filter Rule by this value',
        nullable: true,
        isArray: true,
        required: false,
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    value: string[] | number[] | boolean[] | Date[] | JSON[];
}

export class RuleQueryFilterDto extends QueryFilterDto {
    @ApiProperty({
        title: 'Select Rule Properties',
        nullable: false,
        enum: RuleSelect,
        isArray: true,
        default: RuleSelect.Id,
        required: false,
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    select: RuleSelect[];

    @ApiProperty({
        title: 'Rule Filter Settings',
        type: RuleSelectDto,
        nullable: false,
        required: true,
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    filter: RuleColumnDto;

    // @ApiProperty({
    //     title: 'Rule IDs',
    //     type: [Number],
    //     nullable: true,
    //     default: null,
    //     required: false,
    // })
    // @IsOptional()
    // @IsNumber()
    // ruleIds: number[];
}

export class RuleFilterRequestDto extends FilterRequestDto {
    @ApiProperty({
        title: 'Select Rule Properties',
        nullable: false,
        enum: RuleSelect,
        isArray: true,
        default: RuleSelect.Id,
        required: false,
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    select: RuleSelect[];

    @ApiProperty({
        title: 'Filter Rule by this value',
        type: [Number],
        nullable: true,
        required: false,
    })
    @IsNotEmpty()
    @IsNumber()
    @ValidateNested({ each: true })
    valueIds: number[];

    @ApiProperty({
        title: 'Filter Rule by this value',
        type: Boolean,
        nullable: true,
        required: false,
    })
    @IsOptional()
    @IsBoolean()
    valueSettings: boolean;
}
