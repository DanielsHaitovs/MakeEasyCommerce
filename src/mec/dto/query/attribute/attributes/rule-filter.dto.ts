import { RuleSelect } from '@src/mec/enum/attribute/attributes/rule-type.enum';
import { FilterRequestDto } from '../../query-filter.dto';
import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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

export class RuleFilterRequestDto extends FilterRequestDto {
    @ApiProperty({
        title: 'Select Rule Properties',
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    selectProp: string[];

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
